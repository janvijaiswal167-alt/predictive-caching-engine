import React, { useState } from 'react';
import {
  ScrollText,
  Search,
  Filter,
  RefreshCw,
  Code,
  Zap,
  Trash2,
  Clock,
  Flame,
  DollarSign,
  AlertTriangle,
  Layers,
  Database
} from 'lucide-react';
import { ActivityLog } from '../types';

interface ActivityLogsViewProps {
  logs: ActivityLog[];
  onRefresh: () => void;
}

export const ActivityLogsView: React.FC<ActivityLogsViewProps> = ({ logs, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [inspectLog, setInspectLog] = useState<ActivityLog | null>(null);

  const filterOptions = [
    'ALL',
    'CACHE_HIT',
    'CACHE_MISS',
    'DATA_STORED',
    'TTL_UPDATED',
    'EVICTION',
    'TRAFFIC_SPIKE',
    'COST_SAVING',
    'CAPACITY_WARNING'
  ];

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filterType === 'ALL' || log.eventType === filterType;
    const matchesSearch =
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Filter Controls */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-cyan-400" />
              Real-Time System Activity & Audit Trail
            </h2>
            <p className="text-xs text-slate-400">
              Chronological log feed emitted directly from the Smart Cache Middleware pipeline
            </p>
          </div>

          <button
            onClick={onRefresh}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Logs</span>
          </button>
        </div>

        {/* Search & Filter Tabs */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search event logs by title, message, or metadata..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {filterOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setFilterType(opt)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  filterType === opt
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logs Feed Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden p-4 space-y-2">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-16 text-xs text-slate-500">
            No activity logs match your current filter criteria.
          </div>
        ) : (
          filteredLogs.map(log => {
            let badgeClass = 'bg-slate-800 text-slate-300 border-slate-700';
            let IconComponent = Zap;

            if (log.eventType === 'CACHE_HIT') {
              badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
              IconComponent = Zap;
            } else if (log.eventType === 'CACHE_MISS') {
              badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
              IconComponent = Database;
            } else if (log.eventType === 'DATA_STORED') {
              badgeClass = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
              IconComponent = Layers;
            } else if (log.eventType === 'TTL_UPDATED') {
              badgeClass = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
              IconComponent = Clock;
            } else if (log.eventType === 'EVICTION') {
              badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
              IconComponent = Trash2;
            } else if (log.eventType === 'TRAFFIC_SPIKE') {
              badgeClass = 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold';
              IconComponent = Flame;
            } else if (log.eventType === 'COST_SAVING') {
              badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
              IconComponent = DollarSign;
            } else if (log.eventType === 'CAPACITY_WARNING') {
              badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
              IconComponent = AlertTriangle;
            }

            return (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl border ${badgeClass} shrink-0 mt-0.5`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-md border font-mono font-bold ${badgeClass}`}>
                        {log.eventType}
                      </span>
                      <h4 className="text-xs font-bold text-slate-100">{log.title}</h4>
                    </div>
                    <p className="text-xs text-slate-300">{log.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-slate-400">
                    {new Date(log.timestamp * 1000).toLocaleTimeString()}
                  </span>
                  <button
                    onClick={() => setInspectLog(log)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Inspect metadata JSON"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* JSON Metadata Inspection Modal */}
      {inspectLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                Event Metadata Inspector
              </h3>
              <button
                onClick={() => setInspectLog(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                &times;
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-100">{inspectLog.title}</div>
              <div className="text-[11px] font-mono text-slate-400">
                Timestamp: {new Date(inspectLog.timestamp * 1000).toISOString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 overflow-x-auto">
              <pre className="text-xs font-mono text-cyan-300">
                {JSON.stringify(inspectLog.metadata, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setInspectLog(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
