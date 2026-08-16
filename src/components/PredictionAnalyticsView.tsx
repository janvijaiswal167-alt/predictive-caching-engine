import React from 'react';
import {
  Brain,
  Cpu,
  Flame,
  Zap,
  TrendingUp,
  Clock,
  ShieldCheck,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';
import { Product } from '../types';

interface PredictionAnalyticsViewProps {
  products: Product[];
}

export const PredictionAnalyticsView: React.FC<PredictionAnalyticsViewProps> = ({
  products
}) => {
  const hotProducts = products.filter(p => (p.dynamicClassification ?? 'WARM') === 'HOT');
  const warmProducts = products.filter(p => (p.dynamicClassification ?? 'WARM') === 'WARM');
  const coldProducts = products.filter(p => (p.dynamicClassification ?? 'WARM') === 'COLD');

  return (
    <div className="space-y-6 pb-12">
      {/* Overview Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
            <Brain className="w-7 h-7 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Predictive Demand Scoring & Dynamic TTL Intelligence
            </h2>
            <p className="text-xs text-slate-400">
              Deterministic AI/ML feature weighting calculates real-time priority scores to optimize cache allocation
            </p>
          </div>
        </div>
      </div>

      {/* Feature Importance & Scoring Model Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Deterministic Priority Score Model Weighting
          </h3>
          <p className="text-xs text-slate-400">
            Every product calculates an explainable Priority Score $(0 - 100)$ to dynamically decide whether to keep, update, reduce TTL, or evict:
          </p>

          <div className="space-y-3 pt-2">
            {/* Feature 1 */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-cyan-400">1. Recent Request Frequency (Sliding 60s)</span>
                <span className="text-slate-300 font-mono">Weight: 35%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Number of queries received in the past 60 seconds. Rapid surges immediately boost demand priority.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-blue-400">2. Exponential Access Recency</span>
                <span className="text-slate-300 font-mono">Weight: 20%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {'Decays exponentially as time since last lookup increases: exp(-Δt / 45s).'}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-400">3. Cumulative Cache Hit Rate</span>
                <span className="text-slate-300 font-mono">Weight: 20%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Measures proven cache utility. High hit-rate items are prioritized to protect database query avoidance.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-purple-400">4. Logarithmic Total Request Volume</span>
                <span className="text-slate-300 font-mono">Weight: 15%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {'Historical catalog prominence modeled via log(1 + Total_Requests).'}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-rose-400">5. Traffic Spike Burst Multiplier</span>
                <span className="text-slate-300 font-mono">Weight: 10%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Active burst protection multiplier injected during detected traffic spikes.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic TTL Tier Rules */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            Dynamic Classification & TTL Tier Policy
          </h3>

          <div className="space-y-4 pt-2">
            {/* HOT TIER */}
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-xs border border-rose-500/40">
                  HOT TIER ({hotProducts.length} items)
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">TTL: 1800s (30m)</span>
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Condition: Priority Score &ge; 75.0 or active burst demand.
              </div>
              <div className="text-[11px] text-slate-400">
                Action: Extended retention in Redis memory to maximize continuous database query avoidance.
              </div>
            </div>

            {/* WARM TIER */}
            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold text-xs border border-blue-500/40">
                  WARM TIER ({warmProducts.length} items)
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">TTL: 600s (10m)</span>
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Condition: Priority Score 40.0 – 74.9 with steady request rate.
              </div>
              <div className="text-[11px] text-slate-400">
                Action: Standard operational caching with periodic re-evaluation.
              </div>
            </div>

            {/* COLD TIER */}
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-700/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono font-bold text-xs border border-slate-700">
                  COLD TIER ({coldProducts.length} items)
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">TTL: 120s (2m)</span>
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Condition: Priority Score &lt; 40.0 and low access frequency.
              </div>
              <div className="text-[11px] text-slate-400">
                Action: Short TTL & immediate candidate for Intelligent Eviction Engine when memory pressure arises.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
