import React from 'react';
import {
  DollarSign,
  Zap,
  Layers,
  Database,
  Activity,
  Trash2,
  TrendingUp,
  Clock,
  HardDrive,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  CheckCircle2,
  Play,
  RotateCcw
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { SystemMetrics, TrafficSummary, ActivityLog } from '../types';

interface DashboardViewProps {
  metrics: SystemMetrics | null;
  traffic: TrafficSummary | null;
  recentLogs: ActivityLog[];
  onSingleRequest: () => void;
  onControlTraffic: (action: 'START' | 'PAUSE' | 'RESET' | 'SET_MODE', mode?: 'NORMAL' | 'HIGH' | 'SPIKE') => void;
  onOpenDemo: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  traffic,
  recentLogs,
  onSingleRequest,
  onControlTraffic,
  onOpenDemo
}) => {
  const savings = metrics?.estimatedDatabaseCostSavings || 0.0;
  const grossSavings = metrics?.estimatedDatabaseCostSavings || 0.0;
  const netSavings = metrics?.netEstimatedSavings || 0.0;
  const hitRate = metrics?.cacheHitRate || 0.0;
  const missRate = metrics?.cacheMissRate || 0.0;
  const totalRequests = metrics?.totalRequests || 0;
  const avoidedQueries = metrics?.databaseRequestsAvoided || 0;
  const loadReduction = metrics?.databaseLoadReductionPercent || 0.0;
  const avgLatency = metrics?.averageResponseTimeMs || 0.0;
  const hitLatency = metrics?.avgHitLatencyMs || 1.5;
  const missLatency = metrics?.avgMissLatencyMs || 38.0;
  const cachedCount = metrics?.activeCachedKeys || 0;
  const totalEvictions = metrics?.totalEvictions || 0;
  const memoryStats = metrics?.memoryStats;
  const isSpike = metrics?.isSpikeDetected || false;
  const isCapacityWarning = memoryStats?.isCapacityWarning || false;

  // Chart Data: Hits vs Misses Pie
  const hitMissPieData = [
    { name: 'Cache Hits (Redis)', value: metrics?.cacheHits || 0, color: '#10B981' },
    { name: 'Cache Misses (Database)', value: metrics?.cacheMisses || 0, color: '#F43F5E' }
  ];

  // If no requests yet, give placeholder slice for visualization
  const pieDisplayData = (metrics?.cacheHits === 0 && metrics?.cacheMisses === 0)
    ? [{ name: 'Awaiting Requests', value: 1, color: '#334155' }]
    : hitMissPieData;

  // Chart Data: Traffic Time Series
  const trafficChartData = traffic?.timeSeries?.length
    ? traffic.timeSeries
    : [
        { time: '-60s', requests: 0, hits: 0, misses: 0 },
        { time: '-45s', requests: 0, hits: 0, misses: 0 },
        { time: '-30s', requests: 0, hits: 0, misses: 0 },
        { time: '-15s', requests: 0, hits: 0, misses: 0 },
        { time: 'now', requests: 0, hits: 0, misses: 0 }
      ];

  // Chart Data: Memory Usage
  const memoryBarData = [
    {
      name: 'Cache Keys',
      used: memoryStats?.itemCount || 0,
      capacity: memoryStats?.maxCapacityItems || 12
    }
  ];

  // Dynamic Cost Curve Data
  const costCurveData = [
    { step: '0 Req', withoutCache: 0, withCache: 0, savings: 0 },
    {
      step: 'Current',
      withoutCache: Number((metrics?.estimatedDatabaseCostNoCache || 0).toFixed(4)),
      withCache: Number((metrics?.estimatedDatabaseCostActual || 0).toFixed(4)),
      savings: Number(savings.toFixed(4))
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Visual Story Architecture Progression Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-500/20 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Core Cloud Optimization Value Pipeline
              </h3>
              <p className="text-sm font-semibold text-slate-200">
                Deterministic demand prediction avoids database queries to slash cloud infrastructure bills.
              </p>
            </div>
          </div>

          {/* Interactive Visual Progression Chain */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span>Hit Rate</span>
              <strong className="font-bold">&uarr; {hitRate}%</strong>
            </div>
            <span className="text-slate-600">&rarr;</span>
            <div className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
              <span>DB Requests</span>
              <strong className="font-bold">&darr; {avoidedQueries} Avoided</strong>
            </div>
            <span className="text-slate-600">&rarr;</span>
            <div className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
              <span>DB Load</span>
              <strong className="font-bold">&darr; -{loadReduction}%</strong>
            </div>
            <span className="text-slate-600">&rarr;</span>
            <div className="px-2.5 py-1 rounded-lg bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-md flex items-center gap-1">
              <span>Savings</span>
              <strong className="font-bold text-emerald-300">&uarr; ${savings.toFixed(4)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Hero KPI Card: ESTIMATED DATABASE COST SAVINGS ($) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/40 border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <DollarSign className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                      PRIMARY SYSTEM KPI &bull; LIVE FINANCIAL IMPACT
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
                      ESTIMATED
                    </span>
                  </div>
                  <h1 className="text-2xl font-extrabold text-white tracking-tight">
                    ESTIMATED DATABASE COST SAVINGS
                  </h1>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onSingleRequest}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Send Live Request</span>
                </button>
                <button
                  onClick={onOpenDemo}
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/25 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Judge Demo Flow</span>
                </button>
              </div>
            </div>

            {/* Savings Big Number & Detailed Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Big Dollar Value */}
              <div className="md:col-span-2 space-y-2 p-5 rounded-2xl bg-slate-950/60 border border-emerald-500/20">
                <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                  <span>Gross Database Cost Saved</span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {avoidedQueries} queries &times; $0.0045/query
                  </span>
                </div>
                <div className="text-5xl lg:text-6xl font-black font-mono tracking-tight text-emerald-400 flex items-baseline gap-2">
                  ${savings.toFixed(4)}
                  <span className="text-base font-normal text-slate-400 font-sans">USD</span>
                </div>
                <p className="text-xs text-slate-400 font-medium pt-1">
                  Dynamically calculated from real cache hits avoiding full database query execution.
                </p>
              </div>

              {/* Net Savings & Load Reduction Stats */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-[11px] text-slate-400">Net Financial Savings (after Redis cost)</div>
                  <div className="text-xl font-bold font-mono text-emerald-300">
                    ${netSavings.toFixed(4)} <span className="text-xs text-slate-400 font-normal">USD</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-[11px] text-slate-400">Database Load Reduction</div>
                  <div className="text-xl font-bold font-mono text-cyan-400 flex items-center gap-1">
                    <ArrowDownRight className="w-4 h-4 text-emerald-400" />
                    {loadReduction}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latency & Hardware Performance Box */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                Response Latency
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                {avgLatency} ms avg
              </span>
            </div>

            <div className="space-y-4">
              {/* Cache Hit Latency */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Redis Cache Hit Latency:
                  </span>
                  <span className="font-mono font-bold text-emerald-400">{hitLatency} ms</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (hitLatency / 50) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Database Miss Latency */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    Database Query Latency:
                  </span>
                  <span className="font-mono font-bold text-rose-400">{missLatency} ms</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (missLatency / 50) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 leading-relaxed font-mono">
            Speedup Ratio: <strong className="text-emerald-400">~{missLatency > 0 ? (missLatency / Math.max(0.1, hitLatency)).toFixed(1) : 25}x faster</strong> via Redis in-memory lookup.
          </div>
        </div>
      </div>

      {/* 3. Real-Time System Metrics KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* KPI 1: Cache Hit Rate */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
            <span>Cache Hit Rate</span>
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{hitRate}%</div>
          <div className="text-[10px] text-slate-400 font-mono">{metrics?.cacheHits || 0} hits</div>
        </div>

        {/* KPI 2: Cache Miss Rate */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
            <span>Cache Miss Rate</span>
            <Activity className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400">{missRate}%</div>
          <div className="text-[10px] text-slate-400 font-mono">{metrics?.cacheMisses || 0} misses</div>
        </div>

        {/* KPI 3: Total Requests */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
            <span>Total Requests</span>
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{totalRequests}</div>
          <div className="text-[10px] text-slate-400 font-mono">Live telemetry</div>
        </div>

        {/* KPI 4: Avoided DB Queries */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
            <span>DB Queries Saved</span>
            <Database className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-300">{avoidedQueries}</div>
          <div className="text-[10px] text-slate-400 font-mono">Avoided roundtrips</div>
        </div>

        {/* KPI 5: Active Cached Keys */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
            <span>Products Cached</span>
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-indigo-300">
            {cachedCount} <span className="text-xs text-slate-400">/ {memoryStats?.maxCapacityItems || 12}</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">In Redis memory</div>
        </div>

        {/* KPI 6: Total Evictions */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-md space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
            <span>Evictions</span>
            <Trash2 className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">{totalEvictions}</div>
          <div className="text-[10px] text-slate-400 font-mono">Cold items pruned</div>
        </div>
      </div>

      {/* 4. Core Visual Charts Grid (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Real-Time Traffic & Hit vs Miss Area Chart */}
        <div className="lg:col-span-8 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Live Request Throughput & Hit Flow
              </h3>
              <p className="text-xs text-slate-400">
                Sliding 60-second window tracking Cache Hits (Redis) vs Cache Misses (Database)
              </p>
            </div>
            {isSpike && (
              <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold animate-pulse">
                SPIKE BURST
              </span>
            )}
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorMisses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area
                  type="monotone"
                  dataKey="hits"
                  name="Cache Hits (Redis)"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorHits)"
                />
                <Area
                  type="monotone"
                  dataKey="misses"
                  name="Cache Misses (Database)"
                  stroke="#F43F5E"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorMisses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cache Hit vs Miss Ratio Donut */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Cache Hit Ratio Breakdown
            </h3>
            <p className="text-xs text-slate-400">Proportion of queries served from in-memory cache</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieDisplayData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieDisplayData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#F8FAFC',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-around pt-2 border-t border-slate-800 text-xs font-mono">
            <div className="text-center">
              <div className="text-emerald-400 font-bold">{metrics?.cacheHits || 0}</div>
              <div className="text-[10px] text-slate-400">Hits ({hitRate}%)</div>
            </div>
            <div className="text-center">
              <div className="text-rose-400 font-bold">{metrics?.cacheMisses || 0}</div>
              <div className="text-[10px] text-slate-400">Misses ({missRate}%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Memory Capacity & Live Activity Feed Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Memory Pressure & Capacity Monitor */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-purple-400" />
              Cache Capacity & Memory Pressure
            </h3>
            {isCapacityWarning && (
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                Capacity Warning (&gt;80%)
              </span>
            )}
          </div>

          {/* Progress Bars */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300">Item Count Capacity</span>
                <span className="font-mono font-bold text-slate-200">
                  {memoryStats?.itemCount || 0} / {memoryStats?.maxCapacityItems || 12} keys ({memoryStats?.capacityItemPercentage || 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    (memoryStats?.capacityItemPercentage || 0) >= 80 ? 'bg-amber-400' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(100, memoryStats?.capacityItemPercentage || 0)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300">Memory Allocation Footprint</span>
                <span className="font-mono font-bold text-slate-200">
                  {memoryStats?.usedMemoryKb || 0} KB / {memoryStats?.maxMemoryKb || 48} KB ({memoryStats?.usedPercentage || 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    (memoryStats?.usedPercentage || 0) >= 80 ? 'bg-rose-400' : 'bg-purple-500'
                  }`}
                  style={{ width: `${Math.min(100, memoryStats?.usedPercentage || 0)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 font-mono space-y-1">
            <div className="text-slate-300 font-semibold">Automatic Eviction Engine:</div>
            <div>Triggers proactive eviction of COLD products when capacity reaches &gt;80%.</div>
          </div>
        </div>

        {/* Live Event Activity Feed */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Live Activity Stream (Smart Cache Middleware)
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Real-Time Events</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {recentLogs.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                Awaiting request traffic. Dispatch requests or start the simulation to see real-time events.
              </div>
            ) : (
              recentLogs.slice(0, 5).map(log => {
                let badgeClass = 'bg-slate-800 text-slate-300 border-slate-700';
                if (log.eventType === 'CACHE_HIT') badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
                if (log.eventType === 'CACHE_MISS') badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                if (log.eventType === 'TTL_UPDATED') badgeClass = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
                if (log.eventType === 'EVICTION') badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
                if (log.eventType === 'TRAFFIC_SPIKE') badgeClass = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
                if (log.eventType === 'COST_SAVING') badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                return (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border font-mono font-semibold ${badgeClass}`}>
                        {log.eventType}
                      </span>
                      <span className="font-medium text-slate-200 truncate max-w-xs">{log.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {new Date(log.timestamp * 1000).toLocaleTimeString()}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
