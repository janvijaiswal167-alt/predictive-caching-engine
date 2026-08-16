import React from 'react';
import {
  LayoutDashboard,
  Layers,
  Activity,
  Brain,
  DollarSign,
  ScrollText,
  Settings,
  Flame,
  ShieldCheck,
  Cpu,
  Database
} from 'lucide-react';
import { NavigationTab, SystemMetrics } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  metrics: SystemMetrics | null;
  logCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  metrics,
  logCount = 0
}) => {
  const cachedCount = metrics?.activeCachedKeys || 0;
  const isSpike = metrics?.isSpikeDetected || false;
  const hitRate = metrics?.cacheHitRate || 0;

  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: `${hitRate}% Hit`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'cache' as NavigationTab,
      label: 'Cache Management',
      icon: Layers,
      badge: `${cachedCount} Keys`,
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    {
      id: 'traffic' as NavigationTab,
      label: 'Traffic Analyzer',
      icon: Activity,
      badge: isSpike ? 'SPIKE' : 'Live',
      badgeColor: isSpike ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-slate-700/50 text-slate-300 border-slate-600'
    },
    {
      id: 'prediction' as NavigationTab,
      label: 'Prediction / Analytics',
      icon: Brain,
      badge: 'ML Engine',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    },
    {
      id: 'cost' as NavigationTab,
      label: 'Cost & Metrics',
      icon: DollarSign,
      badge: 'Savings',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'logs' as NavigationTab,
      label: 'Activity Logs',
      icon: ScrollText,
      badge: logCount > 0 ? `${logCount}` : undefined,
      badgeColor: 'bg-slate-700 text-slate-300'
    },
    {
      id: 'settings' as NavigationTab,
      label: 'System Settings',
      icon: Settings
    }
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between p-4 shrink-0">
      <div>
        {/* Navigation Section Title */}
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 flex items-center justify-between">
          <span>System Navigation</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-medium ${
                      isActive ? 'bg-white/20 text-white border-white/30' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Architecture Topology Card */}
      <div className="mt-6 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Active Topology
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
            SYNCED
          </span>
        </div>

        <div className="space-y-2 text-[11px] text-slate-400 font-mono">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800/60">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-purple-400" />
              Smart Middleware:
            </span>
            <span className="text-slate-200">5-Stage Engine</span>
          </div>
          <div className="flex items-center justify-between pb-1 border-b border-slate-800/60">
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3 text-blue-400" />
              Redis Layer:
            </span>
            <span className="text-slate-200">In-Memory Cache</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3 text-indigo-400" />
              Product Catalog:
            </span>
            <span className="text-slate-200">46 DB Products</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 leading-tight">
          Value Metric: <strong className="text-emerald-400">$0.0045</strong> saved per cache hit.
        </div>
      </div>
    </aside>
  );
};
