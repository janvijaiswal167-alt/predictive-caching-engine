import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { CacheManagementView } from './components/CacheManagementView';
import { TrafficAnalyzerView } from './components/TrafficAnalyzerView';
import { PredictionAnalyticsView } from './components/PredictionAnalyticsView';
import { CostMetricsView } from './components/CostMetricsView';
import { ActivityLogsView } from './components/ActivityLogsView';
import { SystemSettingsView } from './components/SystemSettingsView';
import { DemoModeModal } from './components/DemoModeModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { api } from './services/api';
import {
  NavigationTab,
  SystemMetrics,
  Product,
  CacheEntry,
  TrafficSummary,
  ActivityLog,
  SystemHealth,
  EngineSettings
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [traffic, setTraffic] = useState<TrafficSummary | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [settings, setSettings] = useState<EngineSettings | null>(null);
  
  // Modals
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Initial and Periodic Data Fetching
  const refreshAllState = useCallback(async () => {
    try {
      const [
        metricsData,
        productsData,
        cacheData,
        trafficData,
        logsData,
        healthData,
        settingsData
      ] = await Promise.all([
        api.getMetrics().catch(() => null),
        api.getProducts().catch(() => ({ products: [], totalCount: 0 })),
        api.getCacheEntries().catch(() => ({ entries: [], count: 0, memoryStats: null })),
        api.getAnalytics().catch(() => null),
        api.getLogs(50).catch(() => ({ logs: [], total: 0 })),
        api.getHealth().catch(() => null),
        api.getSettings().catch(() => null)
      ]);

      if (metricsData) setMetrics(metricsData);
      if (productsData?.products) setProducts(productsData.products);
      if (cacheData?.entries) setCacheEntries(cacheData.entries);
      if (trafficData) setTraffic(trafficData);
      if (logsData?.logs) setLogs(logsData.logs);
      if (healthData) setHealth(healthData);
      if (settingsData) setSettings(settingsData);
    } catch (err) {
      console.error('Error refreshing system state:', err);
    }
  }, []);

  // Poll state every 1.2 seconds for real-time synchronization
  useEffect(() => {
    refreshAllState();
    const interval = setInterval(refreshAllState, 1200);
    return () => clearInterval(interval);
  }, [refreshAllState]);

  // Traffic Simulator Handler
  const handleControlTraffic = async (action: 'START' | 'PAUSE' | 'RESET' | 'SET_MODE', mode?: 'NORMAL' | 'HIGH' | 'SPIKE') => {
    await api.controlTraffic(action, mode);
    await refreshAllState();
  };

  // Single Product Request Handler
  const handleSingleRequest = async (productId?: string) => {
    const targetId = productId || (products.length > 0 ? products[Math.floor(Math.random() * Math.min(5, products.length))].id : undefined);
    const res = await api.triggerSingleTrafficRequest(targetId);
    await refreshAllState();
    return res;
  };

  // Cache Actions
  const handleCacheProduct = async (productId: string, ttlSeconds?: number) => {
    await api.manualCacheProduct(productId, ttlSeconds);
    await refreshAllState();
  };

  const handleEvictProduct = async (productId: string) => {
    await api.manualEvictProduct(productId);
    await refreshAllState();
  };

  const handleRecalculateAll = async () => {
    await api.recalculateCache();
    await refreshAllState();
  };

  const handleTriggerEviction = async (count: number = 1) => {
    await api.triggerEviction(count);
    await refreshAllState();
  };

  const handleUpdateTtl = async (productId: string, newTtlSeconds: number) => {
    await api.updateTtl(productId, newTtlSeconds);
    await refreshAllState();
  };

  const handleFillCapacity = async () => {
    await api.fillCacheCapacity();
    await refreshAllState();
  };

  // Settings Handlers
  const handleUpdateSettings = async (newSettings: Partial<EngineSettings>) => {
    await api.updateSettings(newSettings);
    await refreshAllState();
  };

  const handleResetSystem = async () => {
    await api.resetSystem();
    await refreshAllState();
  };

  // Find cache entry for selected modal product if any
  const selectedCachedEntry = selectedProductForDetail
    ? cacheEntries.find(e => e.productId === selectedProductForDetail.id)
    : undefined;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header
        metrics={metrics}
        health={health}
        onControlTraffic={handleControlTraffic}
        onSingleRequest={() => handleSingleRequest()}
        onOpenDemo={() => setIsDemoOpen(true)}
        onReset={handleResetSystem}
      />

      {/* Main Layout: Sidebar + Active View */}
      <div className="flex-1 flex overflow-hidden max-w-[1600px] w-full mx-auto">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          metrics={metrics}
          logCount={logs.length}
        />

        {/* Dynamic Main View Content */}
        <main className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-65px)]">
          {activeTab === 'dashboard' && (
            <DashboardView
              metrics={metrics}
              traffic={traffic}
              recentLogs={logs}
              onSingleRequest={() => handleSingleRequest()}
              onControlTraffic={handleControlTraffic}
              onOpenDemo={() => setIsDemoOpen(true)}
            />
          )}

          {activeTab === 'cache' && (
            <CacheManagementView
              products={products}
              cacheEntries={cacheEntries}
              memoryStats={metrics?.memoryStats || null}
              onCacheProduct={handleCacheProduct}
              onEvictProduct={handleEvictProduct}
              onRecalculateAll={handleRecalculateAll}
              onTriggerEviction={handleTriggerEviction}
              onUpdateTtl={handleUpdateTtl}
              onRequestProduct={handleSingleRequest}
              onSelectProductForDetail={setSelectedProductForDetail}
            />
          )}

          {activeTab === 'traffic' && (
            <TrafficAnalyzerView
              metrics={metrics}
              traffic={traffic}
              products={products}
              onControlTraffic={handleControlTraffic}
              onSingleRequest={() => handleSingleRequest()}
              onFillCapacity={handleFillCapacity}
            />
          )}

          {activeTab === 'prediction' && (
            <PredictionAnalyticsView products={products} />
          )}

          {activeTab === 'cost' && (
            <CostMetricsView metrics={metrics} />
          )}

          {activeTab === 'logs' && (
            <ActivityLogsView logs={logs} onRefresh={refreshAllState} />
          )}

          {activeTab === 'settings' && (
            <SystemSettingsView
              settings={settings}
              health={health}
              onUpdateSettings={handleUpdateSettings}
              onResetSystem={handleResetSystem}
            />
          )}
        </main>
      </div>

      {/* Interactive 20-Step Demo Mode Modal */}
      <DemoModeModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onRefreshMetrics={refreshAllState}
      />

      {/* Product Detail Inspection Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        cachedEntry={selectedCachedEntry}
        onClose={() => setSelectedProductForDetail(null)}
        onRequestProduct={handleSingleRequest}
      />
    </div>
  );
}
