import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Play,
  ArrowRight,
  RotateCcw,
  Zap,
  DollarSign,
  Layers,
  Database,
  Flame,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';
import { DemoStepResult, SystemMetrics } from '../types';

interface DemoModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshMetrics: () => void;
}

const DEMO_STEPS = [
  { step: 1, title: 'Open Dashboard Baseline', desc: 'Initialize dashboard and verify pristine baseline telemetry state.' },
  { step: 2, title: 'Generate Uncached Request', desc: 'Request OnePlus 12 (prod-104) expecting CACHE MISS.' },
  { step: 3, title: 'Database Fetch & Query Latency', desc: 'Simulated cloud database roundtrip queries catalog with ~35ms latency.' },
  { step: 4, title: 'Store Product in Redis', desc: 'Product payload is placed into Redis cache with dynamic TTL.' },
  { step: 5, title: 'Repeat Same Request', desc: 'Request OnePlus 12 again expecting immediate CACHE HIT in <2ms.' },
  { step: 6, title: 'Increment Avoided DB Queries', desc: 'Database Requests Avoided counter increments by +1.' },
  { step: 7, title: 'Calculate Database Cost Savings ($)', desc: 'Estimated Database Cost Savings ($) dynamically increases by $0.0045.' },
  { step: 8, title: 'Activate High Traffic Mode', desc: 'Traffic throughput accelerates to ~30 requests per second.' },
  { step: 9, title: 'Concentrated Flagship Demand', desc: 'Repeated requests target iPhone 16 Pro Max (prod-101).' },
  { step: 10, title: 'Classify as HOT Tier', desc: 'Priority score surpasses 75, escalating product to HOT classification.' },
  { step: 11, title: 'Dynamic TTL Extension', desc: 'TTL expands from default to 1800s (30 minutes) to avoid evicting high demand item.' },
  { step: 12, title: 'Trigger Traffic Spike', desc: 'Traffic surges to ~85 req/s with 85% concentration on top flagships.' },
  { step: 13, title: 'Broadcast TRAFFIC SPIKE DETECTED', desc: 'System-wide Traffic Spike banner and notification are activated.' },
  { step: 14, title: 'Fill Cache Key Capacity', desc: 'Rapidly dispatch multiple cold accessory items to stress memory.' },
  { step: 15, title: 'Broadcast CACHE CAPACITY WARNING', desc: 'Cache utilization crosses >80% threshold, triggering capacity alert.' },
  { step: 16, title: 'Activate Intelligent Eviction Engine', desc: 'Eviction Engine analyzes priority scores across all cached keys.' },
  { step: 17, title: 'Prune Cold Lowest-Priority Items', desc: 'Cold accessories are evicted first, preserving HOT flagship items.' },
  { step: 18, title: 'Reclaim Cache Memory', desc: 'Cache utilization drops back down safely below danger threshold.' },
  { step: 19, title: 'Continuous Cache Hit Queries', desc: 'Subsequent traffic hits Redis, continuously avoiding database loads.' },
  { step: 20, title: 'Final Verification & Cumulative Savings', desc: 'Review overall cloud database cost reduction and verified ROI metrics.' }
];

export const DemoModeModal: React.FC<DemoModeModalProps> = ({
  isOpen,
  onClose,
  onRefreshMetrics
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, DemoStepResult>>({});
  const [executing, setExecuting] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);

  if (!isOpen) return null;

  const currentStep = DEMO_STEPS[currentStepIndex];

  const runStep = async (stepNum: number): Promise<DemoStepResult> => {
    const res = await api.runDemoStep(stepNum);
    setCompletedSteps(prev => ({ ...prev, [stepNum]: res }));
    onRefreshMetrics();
    return res;
  };

  const handleExecuteCurrentStep = async () => {
    setExecuting(true);
    try {
      await runStep(currentStep.step);
      if (currentStepIndex < DEMO_STEPS.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      }
    } finally {
      setExecuting(false);
    }
  };

  const handleAutoRunAll = async () => {
    setAutoPlaying(true);
    try {
      for (let i = currentStepIndex; i < DEMO_STEPS.length; i++) {
        setCurrentStepIndex(i);
        await runStep(DEMO_STEPS[i].step);
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    } finally {
      setAutoPlaying(false);
    }
  };

  const handleResetDemo = async () => {
    await api.resetSystem();
    setCompletedSteps({});
    setCurrentStepIndex(0);
    onRefreshMetrics();
  };

  const latestResult = completedSteps[currentStep.step] || completedSteps[currentStep.step - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  VCET Hackathon &bull; 20-Step Live Verification Walkthrough
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold border border-purple-500/40">
                  JUDGE DEMO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                End-to-end automated sequence validating Cache Miss &rarr; Hit &rarr; Dynamic TTL &rarr; Spike &rarr; Eviction &rarr; Cost Savings ($)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Modal Body: Split Layout */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Step List Navigation (Left Sidebar) */}
          <div className="md:col-span-5 bg-slate-950/50 border-r border-slate-800/80 p-4 overflow-y-auto max-h-[500px] space-y-1.5 font-mono text-xs">
            {DEMO_STEPS.map((s, idx) => {
              const isCompleted = completedSteps[s.step] !== undefined;
              const isCurrent = currentStepIndex === idx;

              return (
                <button
                  key={s.step}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between ${
                    isCurrent
                      ? 'bg-blue-600/30 text-blue-200 border border-blue-500/50 font-bold'
                      : isCompleted
                      ? 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/60'
                      : 'text-slate-500 hover:text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                        isCompleted
                          ? 'bg-emerald-500 text-slate-950'
                          : isCurrent
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted ? '✓' : s.step}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </div>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Step Execution & Live Feedback (Right Panel) */}
          <div className="md:col-span-7 p-6 overflow-y-auto max-h-[500px] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Step Title & Description Card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-cyan-300 font-mono font-bold">
                    STEP {currentStep.step} OF 20
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {completedSteps[currentStep.step] ? 'Status: EXECUTED & VERIFIED' : 'Status: READY'}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-white">{currentStep.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{currentStep.desc}</p>
              </div>

              {/* Execution Feedback & Verified Result Box */}
              {latestResult && (
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Live Verification Assertion</span>
                  </div>
                  <div className="text-xs text-slate-200 font-medium">
                    {latestResult.explanation}
                  </div>

                  {/* Key Metrics Snapshot */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-500/20 text-center font-mono">
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Avoided Queries</div>
                      <div className="text-xs font-bold text-cyan-400">
                        {latestResult.currentMetrics.databaseRequestsAvoided}
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Hit Rate</div>
                      <div className="text-xs font-bold text-emerald-400">
                        {latestResult.currentMetrics.cacheHitRate}%
                      </div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Cost Savings</div>
                      <div className="text-xs font-bold text-emerald-300">
                        ${latestResult.currentMetrics.estimatedDatabaseCostSavings.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={handleResetDemo}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo State</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAutoRunAll}
                  disabled={autoPlaying || executing}
                  className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{autoPlaying ? 'Auto-Running...' : 'Auto-Run All 20 Steps'}</span>
                </button>

                <button
                  onClick={handleExecuteCurrentStep}
                  disabled={executing || autoPlaying}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{executing ? 'Executing...' : `Execute Step ${currentStep.step}`}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
