import React from 'react';
import {
  Activity,
  Flame,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Send,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { SystemMetrics, TrafficSummary, Product } from '../types';

interface TrafficAnalyzerViewProps {
  metrics: SystemMetrics | null;
  traffic: TrafficSummary | null;
  products: Product[];
  onControlTraffic: (action: 'START' | 'PAUSE' | 'RESET' | 'SET_MODE', mode?: 'NORMAL' | 'HIGH' | 'SPIKE') => void;
  onSingleRequest: () => void;
  onFillCapacity: () => void;
}

export const TrafficAnalyzerView: React.FC<TrafficAnalyzerViewProps> = ({
  metrics,
  traffic,
  products,
  onControlTraffic,
  onSingleRequest,
  onFillCapacity
}) => {
  const isRunning = metrics?.trafficSimulator?.isRunning || false;
  const currentMode = metrics?.trafficSimulator?.mode || 'NORMAL';
  const isSpike = metrics?.isSpikeDetected || false;
  const currentRps = traffic?.currentRps || 0.0;
  const totalWindowReqs = traffic?.windowTotalRequests || 0;
  const windowHitRate = traffic?.windowHitRate || 0.0;

  // Category breakdown for chart
  const categoryData = traffic?.categoryBreakdown
    ? Object.entries(traffic.categoryBreakdown).map(([cat, count]) => ({
        category: cat,
        requests: count
      }))
    : [];

  const timeSeriesData = traffic?.timeSeries || [];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Traffic Spike Detection Banner */}
      {isSpike && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-950/80 via-amber-950/70 to-slate-900 border-2 border-rose-500/60 shadow-2xl animate-pulse flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
              <Flame className="w-7 h-7 text-rose-400 animate-bounce" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-rose-400 flex items-center gap-1.5">
                <span>SYSTEM NOTIFICATION</span>
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
              </div>
              <h2 className="text-xl font-extrabold text-white">
                TRAFFIC SPIKE DETECTED &bull; RATE: {currentRps} REQ/S
              </h2>
              <p className="text-xs text-rose-200">
                Sudden exponential request surge detected. Smart Cache Middleware is proactively escalating priority scores and boosting dynamic TTL to protect the database layer.
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-900/90 border border-rose-500/40 text-right shrink-0">
            <div className="text-[10px] text-slate-400 font-mono">Response Action:</div>
            <div className="text-xs font-bold text-emerald-400 font-mono">DYNAMIC TTL &rarr; 1800s HOT</div>
          </div>
        </div>
      )}

      {/* 2. Simulator Control Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Traffic Analyzer & Simulator Engine
            </h2>
            <p className="text-xs text-slate-400">
              Real-time request rate monitoring and synthetic burst generation passed through API Gateway
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onSingleRequest}
              className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Single Request</span>
            </button>

            <button
              onClick={onFillCapacity}
              className="px-3.5 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
              title="Dispatches multiple cold items to fill cache capacity"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Fill Cache Capacity</span>
            </button>

            <div className="h-6 w-px bg-slate-800 mx-1"></div>

            {/* Play/Pause */}
            <button
              onClick={() => onControlTraffic(isRunning ? 'PAUSE' : 'START', currentMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pause Traffic' : 'Start Simulation'}</span>
            </button>

            {/* Mode Selector */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => onControlTraffic('SET_MODE', 'NORMAL')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  currentMode === 'NORMAL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Normal (~8 req/s)
              </button>
              <button
                onClick={() => onControlTraffic('SET_MODE', 'HIGH')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  currentMode === 'HIGH' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                High (~30 req/s)
              </button>
              <button
                onClick={() => onControlTraffic('SET_MODE', 'SPIKE')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all ${
                  currentMode === 'SPIKE'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'text-rose-400 hover:text-rose-300'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                Spike (~85 req/s)
              </button>
            </div>

            <button
              onClick={() => onControlTraffic('RESET')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
              title="Reset Traffic State"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Real-time Rate Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-800">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400">Current Request Throughput (RPS)</div>
            <div className="text-3xl font-extrabold font-mono text-cyan-400">{currentRps} <span className="text-xs text-slate-500 font-normal">req/sec</span></div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400">Sliding Window Requests (60s)</div>
            <div className="text-3xl font-extrabold font-mono text-white">{totalWindowReqs}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-400">Window Cache Hit Rate</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400">{windowHitRate}%</div>
          </div>
        </div>
      </div>

      {/* 3. Charts: Real-time Throughput Area & Category Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real-time Area Chart */}
        <div className="lg:col-span-8 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Real-Time Traffic Rate Trend
              </h3>
              <p className="text-xs text-slate-400">Requests per second across 6-second time buckets</p>
            </div>
            <span className="text-xs font-mono text-slate-400">Mode: <strong>{currentMode}</strong></span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#F8FAFC',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  name="Total Requests"
                  stroke="#06B6D4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#trafficGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Bar Chart */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              Traffic by Category
            </h3>
            <p className="text-xs text-slate-400">Distribution across e-commerce product sectors</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 10, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" stroke="#64748B" fontSize={11} />
                <YAxis dataKey="category" type="category" stroke="#94A3B8" fontSize={10} width={70} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#F8FAFC',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="requests" fill="#8B5CF6" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
