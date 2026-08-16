import {
  Product,
  CacheEntry,
  SystemMetrics,
  TrafficSummary,
  ActivityLog,
  RequestRecord,
  SystemHealth,
  EngineSettings,
  DemoStepResult
} from '../types';

const API_BASE = 'https://predictive-caching-engine.onrender.com/api';

export const api = {
  // --- Products ---
  async getProducts(): Promise<{ products: Product[]; totalCount: number }> {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch product catalog');
    return res.json();
  },

  async requestProduct(productId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/products/${productId}`);
    if (!res.ok) throw new Error(`Failed to request product ${productId}`);
    return res.json();
  },

  // --- Cache ---
  async getCacheEntries(): Promise<{ entries: CacheEntry[]; count: number; memoryStats: any }> {
    const res = await fetch(`${API_BASE}/cache`);
    if (!res.ok) throw new Error('Failed to fetch cache entries');
    return res.json();
  },

  async manualCacheProduct(productId: string, ttlSeconds?: number): Promise<any> {
    const res = await fetch(`${API_BASE}/cache`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, ttlSeconds })
    });
    if (!res.ok) throw new Error('Failed to cache product');
    return res.json();
  },

  async manualEvictProduct(productId: string): Promise<any> {
    const res = await fetch(`${API_BASE}/cache/${productId}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to evict product');
    return res.json();
  },

  async recalculateCache(): Promise<any> {
    const res = await fetch(`${API_BASE}/cache/recalculate`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to recalculate cache priorities');
    return res.json();
  },

  async triggerEviction(count: number = 1): Promise<any> {
    const res = await fetch(`${API_BASE}/cache/evict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count })
    });
    if (!res.ok) throw new Error('Failed to trigger eviction');
    return res.json();
  },

  async updateTtl(productId: string, newTtlSeconds: number): Promise<any> {
    const res = await fetch(`${API_BASE}/ttl/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, newTtlSeconds })
    });
    if (!res.ok) throw new Error('Failed to update TTL');
    return res.json();
  },

  // --- Traffic & Simulator ---
  async triggerSingleTrafficRequest(productId?: string): Promise<any> {
    const res = await fetch(`${API_BASE}/traffic/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    if (!res.ok) throw new Error('Failed to dispatch traffic request');
    return res.json();
  },

  async controlTraffic(action: 'START' | 'PAUSE' | 'RESET' | 'SET_MODE', mode?: 'NORMAL' | 'HIGH' | 'SPIKE'): Promise<any> {
    const res = await fetch(`${API_BASE}/traffic/control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, mode })
    });
    if (!res.ok) throw new Error(`Failed to control traffic: ${action}`);
    return res.json();
  },

  async fillCacheCapacity(): Promise<any> {
    const res = await fetch(`${API_BASE}/traffic/fill-cache`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to fill cache');
    return res.json();
  },

  // --- Analytics & Metrics ---
  async getMetrics(): Promise<SystemMetrics> {
    const res = await fetch(`${API_BASE}/metrics`);
    if (!res.ok) throw new Error('Failed to fetch system metrics');
    return res.json();
  },

  async getAnalytics(): Promise<TrafficSummary> {
    const res = await fetch(`${API_BASE}/analytics`);
    if (!res.ok) throw new Error('Failed to fetch traffic analytics');
    return res.json();
  },

  async getCost(): Promise<any> {
    const res = await fetch(`${API_BASE}/cost`);
    if (!res.ok) throw new Error('Failed to fetch cost analytics');
    return res.json();
  },

async getLogs(limit: number = 50, eventType?: string): Promise<{ logs: ActivityLog[]; total: number }> {
  const url = new URL(`${API_BASE}/logs`);

  url.searchParams.set('limit', limit.toString());

  if (eventType && eventType !== 'ALL') {
    url.searchParams.set('eventType', eventType);
  }

  const res = await fetch(url.toString());

  if (!res.ok) throw new Error('Failed to fetch activity logs');

  return res.json();
},


  async getRequests(limit: number = 50): Promise<{ requests: RequestRecord[]; total: number }> {
    const res = await fetch(`${API_BASE}/requests?limit=${limit}`);
    if (!res.ok) throw new Error('Failed to fetch request history');
    return res.json();
  },

  // --- System Health & Settings ---
  async getHealth(): Promise<SystemHealth> {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Failed to fetch system health');
    return res.json();
  },

  async getSettings(): Promise<EngineSettings> {
    const res = await fetch(`${API_BASE}/settings`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  },

  async updateSettings(settings: Partial<EngineSettings>): Promise<any> {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  async resetSystem(): Promise<any> {
    const res = await fetch(`${API_BASE}/reset`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to reset system');
    return res.json();
  },

  // --- Interactive Demo Step Runner ---
  async runDemoStep(stepNumber: number): Promise<DemoStepResult> {
    const res = await fetch(`${API_BASE}/demo/step/${stepNumber}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error(`Failed to execute demo step ${stepNumber}`);
    return res.json();
  }
};
