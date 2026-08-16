import React, { useState } from 'react';
import {
  Server,
  Zap,
  DollarSign,
  Play,
  Pause,
  RotateCcw,
  Flame,
  Activity,
  Award,
  Database,
  Cpu,
  Layers,
  Send,
  AlertTriangle
} from 'lucide-react';
import { SystemMetrics, SystemHealth } from '../types';

interface HeaderProps {
  metrics: SystemMetrics | null;
  health: SystemHealth | null;
  onControlTraffic: (action: 'START' | 'PAUSE' | 'RESET' | 'SET_MODE', mode?: 'NORMAL' | 'HIGH' | 'SPIKE') => void;
  onSingleRequest: () => void;
  onOpenDemo: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  metrics,
  health,
  onControlTraffic,
  onSingleRequest,
  onOpenDemo,
  onReset
}) => {
  const [requestSending, setRequestSending] = useState(false);

  const handleSingleReq = async () => {
    setRequestSending(true);
    try {
      await onSingleRequest();
    } finally {
      setTimeout(() => setRequestSending(false), 300);
    }
  };

  const isSimRunning = metrics?.trafficSimulator?.isRunning || false;
  const currentMode = metrics?.trafficSimulator?.mode || 'NORMAL';
  const isSpike = metrics?.isSpikeDetected || false;
  const savings = metrics?.estimatedDatabaseCostSavings || 0.0;
  const avoidedRequests = metrics?.databaseRequestsAvoided || 0;
  const hitRate = metrics?.cacheHitRate || 0.0;

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-2.5">
      <div className="max-w-[1600px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-3">
        {/* Left: Branding & Subsystem Health */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <Zap className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                  PREDICTIVE CLOUD-COST CACHING ENGINE
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30 uppercase tracking-wide">
                    Hackathon Prototype
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                Predict demand &bull; Optimize cache &bull; Reduce database load &bull; Save cloud cost
              </p>
            </div>
          </div>

          {/* Subsystem Health Pills */}
          <div className="hidden 2xl:flex items-center gap-1.5 pl-3 border-l border-slate-800 text-[11px]">
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <Server className="w-3 h-3 text-cyan-400" />
              <span>Gateway: <strong className="text-emerald-400">ONLINE</strong></span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
              <Layers className="w-3 h-3 text-blue-400" />
              <span>Redis: <strong className="text-emerald-400">ONLINE</strong></span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
              <Database className="w-3 h-3 text-indigo-400" />
              <span>Database: <strong className="text-emerald-400">ONLINE</strong></span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-slate-800/80 border border-slate-700 text-slate-300">
              <Cpu className="w-3 h-3 text-purple-400" />
              <span>ML Engine: <strong className="text-emerald-400">ONLINE</strong></span>
            </div>
          </div>
        </div>

        {/* Center / Right: Primary Cost Anchor KPI & Simulator Controls */}
        <div className="flex flex-wrap items-center justify-end gap-3 w-full xl:w-auto">
          {/* Traffic Spike Banner Indicator */}
          {isSpike && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold animate-pulse shadow-lg shadow-amber-500/20">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>TRAFFIC SPIKE DETECTED</span>
            </div>
          )}

          {/* Primary Hero KPI Pill: ESTIMATED DATABASE COST SAVINGS ($) */}
          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/40 shadow-md shadow-emerald-950/40">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400/90 flex items-center gap-1">
                <span>ESTIMATED DB SAVINGS</span>
                <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">LIVE</span>
              </div>
              <div className="text-base font-extrabold font-mono text-emerald-400 leading-none">
                ${savings.toFixed(4)} <span className="text-xs font-normal text-slate-400">USD</span>
              </div>
            </div>
            <div className="hidden md:block pl-2.5 border-l border-slate-700/60 text-right">
              <div className="text-[10px] text-slate-400">Avoided DB Queries</div>
              <div className="text-xs font-bold text-slate-200 font-mono">
                {avoidedRequests.toLocaleString()} <span className="text-[10px] text-cyan-400 font-normal">({hitRate}%)</span>
              </div>
            </div>
          </div>

          {/* Quick Request Trigger */}
          <button
            onClick={handleSingleReq}
            disabled={requestSending}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 hover:text-white border border-blue-500/40 text-xs font-medium transition-all active:scale-95 disabled:opacity-50"
            title="Dispatch a single product request through the Smart Cache Middleware"
          >
            <Send className={`w-3.5 h-3.5 ${requestSending ? 'animate-spin' : ''}`} />
            <span>Generate Request</span>
          </button>

          {/* Traffic Simulator Controls */}
          <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => onControlTraffic(isSimRunning ? 'PAUSE' : 'START', currentMode)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                isSimRunning
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
            >
              {isSimRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimRunning ? 'Pause' : 'Start'} Sim</span>
            </button>

            {/* Mode Selector */}
            <div className="flex items-center gap-0.5 bg-slate-900/80 p-0.5 rounded-lg border border-slate-700/60 text-[11px]">
              <button
                onClick={() => onControlTraffic('SET_MODE', 'NORMAL')}
                className={`px-2 py-0.5 rounded font-medium transition-all ${
                  currentMode === 'NORMAL'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => onControlTraffic('SET_MODE', 'HIGH')}
                className={`px-2 py-0.5 rounded font-medium transition-all ${
                  currentMode === 'HIGH'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                High
              </button>
              <button
                onClick={() => onControlTraffic('SET_MODE', 'SPIKE')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded font-medium transition-all ${
                  currentMode === 'SPIKE'
                    ? 'bg-rose-600 text-white shadow-sm font-bold'
                    : 'text-rose-400 hover:text-rose-300'
                }`}
              >
                <Flame className="w-3 h-3" />
                Spike
              </button>
            </div>

            <button
              onClick={onReset}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-700/50 transition-colors"
              title="Reset System & Clear Simulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* DEMO MODE Button */}
          <button
            onClick={onOpenDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-500/25 border border-purple-400/30 transition-all hover:scale-105 active:scale-95"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>JUDGE DEMO MODE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
