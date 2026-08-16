import React, { useState, useEffect } from 'react';
import {
  Settings,
  DollarSign,
  Clock,
  HardDrive,
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  Server,
  Database,
  Layers,
  Cpu
} from 'lucide-react';
import { EngineSettings, SystemHealth } from '../types';

interface SystemSettingsViewProps {
  settings: EngineSettings | null;
  health: SystemHealth | null;
  onUpdateSettings: (newSettings: Partial<EngineSettings>) => Promise<void>;
  onResetSystem: () => Promise<void>;
}

export const SystemSettingsView: React.FC<SystemSettingsViewProps> = ({
  settings,
  health,
  onUpdateSettings,
  onResetSystem
}) => {
  const [form, setForm] = useState<EngineSettings>({
    costPerDbQuery: 0.0045,
    costPerCacheLookup: 0.00015,
    hotTtlSeconds: 1800,
    warmTtlSeconds: 600,
    coldTtlSeconds: 120,
    maxCacheCapacity: 12
  });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      await onUpdateSettings(form);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    setForm({
      costPerDbQuery: 0.0045,
      costPerCacheLookup: 0.00015,
      hotTtlSeconds: 1800,
      warmTtlSeconds: 600,
      coldTtlSeconds: 120,
      maxCacheCapacity: 12
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Settings Header */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
              <Settings className="w-7 h-7 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Engine Configuration & Cloud Billing Tuning
              </h2>
              <p className="text-xs text-slate-400">
                Dynamically adjust mathematical cloud unit costs, TTL durations, and cache memory limits
              </p>
            </div>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Settings Applied!</span>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cost Parameters */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Cloud Billing Parameters ($ USD)
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Cost per Database Query ($ USD)
              </label>
              <input
                type="number"
                step="0.0001"
                min="0.0001"
                max="1.0"
                value={form.costPerDbQuery}
                onChange={e => setForm({ ...form, costPerDbQuery: parseFloat(e.target.value) || 0.0045 })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Standard cloud SQL/NoSQL query rate ($0.0045 = $4.50 per 1,000 queries).
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Cost per Redis In-Memory Lookup ($ USD)
              </label>
              <input
                type="number"
                step="0.00001"
                min="0.00001"
                max="0.1"
                value={form.costPerCacheLookup}
                onChange={e => setForm({ ...form, costPerCacheLookup: parseFloat(e.target.value) || 0.00015 })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-blue-400 focus:outline-none focus:border-blue-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Managed Redis lookup rate ($0.00015 = $0.15 per 1,000 lookups).
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic TTL & Capacity Parameters */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Dynamic TTL Durations & Capacity
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-rose-400 mb-1.5">
                  HOT TTL (sec)
                </label>
                <input
                  type="number"
                  min="60"
                  max="86400"
                  value={form.hotTtlSeconds}
                  onChange={e => setForm({ ...form, hotTtlSeconds: parseInt(e.target.value) || 1800 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-rose-300 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-400 mb-1.5">
                  WARM TTL (sec)
                </label>
                <input
                  type="number"
                  min="30"
                  max="86400"
                  value={form.warmTtlSeconds}
                  onChange={e => setForm({ ...form, warmTtlSeconds: parseInt(e.target.value) || 600 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-blue-300 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  COLD TTL (sec)
                </label>
                <input
                  type="number"
                  min="10"
                  max="86400"
                  value={form.coldTtlSeconds}
                  onChange={e => setForm({ ...form, coldTtlSeconds: parseInt(e.target.value) || 120 })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300 focus:outline-none focus:border-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-400 mb-1.5">
                Maximum Cache Key Capacity (Items)
              </label>
              <input
                type="number"
                min="5"
                max="50"
                value={form.maxCacheCapacity}
                onChange={e => setForm({ ...form, maxCacheCapacity: parseInt(e.target.value) || 12 })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Threshold that triggers proactive capacity warning (&gt;80%) and intelligent eviction.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="lg:col-span-12 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Reset Form to Defaults
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetSystem}
              className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Full System Reset</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save & Apply Configuration'}
            </button>
          </div>
        </div>
      </form>

      {/* Subsystems Health Verification Table */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Subsystem Diagnostics & Connectivity Health
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {health?.subsystems &&
            Object.entries(health.subsystems).map(([key, sys]) => (
              <div
                key={key}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-200">{sys.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">Type: {sys.type}</div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold">
                  {sys.status}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
