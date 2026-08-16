import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Database,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calculator,
  Percent
} from 'lucide-react';
import { SystemMetrics } from '../types';

interface CostMetricsViewProps {
  metrics: SystemMetrics | null;
}

export const CostMetricsView: React.FC<CostMetricsViewProps> = ({ metrics }) => {
  const savings = metrics?.estimatedDatabaseCostSavings || 0.0;
  const noCacheCost = metrics?.estimatedDatabaseCostNoCache || 0.0;
  const actualDbCost = metrics?.estimatedDatabaseCostActual || 0.0;
  const cacheCost = metrics?.estimatedCacheInfrastructureCost || 0.0;
  const netSavings = metrics?.netEstimatedSavings || 0.0;
  const avoidedQueries = metrics?.databaseRequestsAvoided || 0;
  const totalRequests = metrics?.totalRequests || 0;
  const loadReduction = metrics?.databaseLoadReductionPercent || 0.0;
  const dbUnitCost = metrics?.costPerDbQuery || 0.0045;
  const cacheUnitCost = metrics?.costPerCacheLookup || 0.00015;
  const roi = metrics?.roiMultiplier || 0.0;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Mathematical Economics Header Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <DollarSign className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">
                Cloud Database Cost & ROI Financial Model
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30 font-bold">
                ESTIMATED
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Deterministic mathematical cloud infrastructure billing reduction calculated from real query telemetry
            </p>
          </div>
        </div>
      </div>

      {/* 2. Mathematical Formula Presentation Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-blue-950/40 border-2 border-cyan-500/30 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Core Mathematical Formulation
          </span>
          <span className="text-[11px] font-mono text-slate-400">Zero Random / Hardcoded Numbers</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
          <div className="text-cyan-300 font-bold">
            {'Database Requests Avoided × Cost Per DB Request = Estimated Database Cost Savings'}
          </div>
          <div className="text-slate-400 text-[11px] pt-1">
            {`Current Calculation: ${avoidedQueries} queries × $${dbUnitCost} = `}
            <strong className="text-emerald-400 font-bold font-mono">${savings.toFixed(4)} USD</strong>
          </div>
        </div>
      </div>

      {/* 3. Financial Comparison Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cost Without Cache */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Traditional DB (No Cache)</span>
            <Database className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-400">
            ${noCacheCost.toFixed(4)} <span className="text-xs text-slate-400 font-normal">USD</span>
          </div>
          <p className="text-xs text-slate-400">
            Cost if all {totalRequests} requests hit the database directly at ${dbUnitCost}/query.
          </p>
        </div>

        {/* Actual Cloud Cost (With Smart Cache) */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Actual Cost (Smart Cache)</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-blue-400">
            ${(actualDbCost + cacheCost).toFixed(4)} <span className="text-xs text-slate-400 font-normal">USD</span>
          </div>
          <p className="text-xs text-slate-400">
            Combined DB miss cost (${actualDbCost.toFixed(4)}) + Redis cache lookup & memory cost (${cacheCost.toFixed(4)}).
          </p>
        </div>

        {/* Net Cloud Savings */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950/60 border-2 border-emerald-500/40 shadow-xl space-y-3">
          <div className="text-xs font-semibold text-emerald-400 flex items-center justify-between">
            <span>Net Financial Savings</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black font-mono text-emerald-400">
            ${netSavings.toFixed(4)} <span className="text-xs text-slate-300 font-normal">USD</span>
          </div>
          <p className="text-xs text-slate-300">
            Net reduction in cloud infrastructure spending after subtracting cache operational overhead.
          </p>
        </div>
      </div>

      {/* 4. Detailed Cost Parameters & Telemetry Table */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          Comprehensive Cost Accounting Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Financial & Operational Parameter</th>
                <th className="py-3 px-4">Formula / Source</th>
                <th className="py-3 px-4 text-right">Computed Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-100">Total User & API Requests ($N$)</td>
                <td className="py-2.5 px-4 text-slate-400">Live Request Tracker Buffer</td>
                <td className="py-2.5 px-4 text-right font-bold">{totalRequests} requests</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-100">Database Requests Avoided (Hits)</td>
                <td className="py-2.5 px-4 text-slate-400">All Redis Cache Hits</td>
                <td className="py-2.5 px-4 text-right font-bold text-emerald-400">{avoidedQueries} queries</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-100">Configured Unit Cost per DB Read (C_db)</td>
                <td className="py-2.5 px-4 text-slate-400">Cloud SQL/NoSQL Billing Rate</td>
                <td className="py-2.5 px-4 text-right text-cyan-300">${dbUnitCost} / query</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-100">Configured Unit Cost per Redis Read (C_cache)</td>
                <td className="py-2.5 px-4 text-slate-400">Managed In-Memory Read Rate</td>
                <td className="py-2.5 px-4 text-right text-blue-300">${cacheUnitCost} / read</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-100">Gross Database Cost Avoided</td>
                <td className="py-2.5 px-4 text-slate-400">Avoided Queries &times; Unit DB Cost</td>
                <td className="py-2.5 px-4 text-right font-bold text-emerald-400">${savings.toFixed(4)} USD</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-100">Database Server Load Reduction</td>
                <td className="py-2.5 px-4 text-slate-400">(Avoided Queries / Total Requests) &times; 100</td>
                <td className="py-2.5 px-4 text-right font-bold text-indigo-400">{loadReduction}%</td>
              </tr>
              <tr className="bg-emerald-950/20">
                <td className="py-3 px-4 font-bold text-emerald-300">Net Estimated Cloud Savings</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">Gross Savings - Total Cache Cost</td>
                <td className="py-3 px-4 text-right font-extrabold text-emerald-400 text-sm">${netSavings.toFixed(4)} USD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
