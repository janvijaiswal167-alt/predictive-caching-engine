import React, { useState } from 'react';
import {
  Layers,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  Zap,
  Clock,
  Eye,
  ArrowUpDown,
  HardDrive,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Send,
  Plus
} from 'lucide-react';
import { Product, CacheEntry, MemoryStats } from '../types';

interface CacheManagementViewProps {
  products: Product[];
  cacheEntries: CacheEntry[];
  memoryStats: MemoryStats | null;
  onCacheProduct: (productId: string, ttlSeconds?: number) => Promise<void>;
  onEvictProduct: (productId: string) => Promise<void>;
  onRecalculateAll: () => Promise<void>;
  onTriggerEviction: (count?: number) => Promise<void>;
  onUpdateTtl: (productId: string, newTtlSeconds: number) => Promise<void>;
  onRequestProduct: (productId: string) => Promise<void>;
  onSelectProductForDetail: (product: Product) => void;
}

export const CacheManagementView: React.FC<CacheManagementViewProps> = ({
  products,
  cacheEntries,
  memoryStats,
  onCacheProduct,
  onEvictProduct,
  onRecalculateAll,
  onTriggerEviction,
  onUpdateTtl,
  onRequestProduct,
  onSelectProductForDetail
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CACHED' | 'UNCACHED'>('ALL');
  const [selectedTtlModal, setSelectedTtlModal] = useState<{ productId: string; currentTtl: number; name: string } | null>(null);
  const [customTtlInput, setCustomTtlInput] = useState<number>(600);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const categories = ['ALL', ...Array.from(new Set(products.map(p => p.category)))];

  // Map of cached products
  const cachedMap = new Map(cacheEntries.map(e => [e.productId, e]));

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    const isCached = cachedMap.has(p.id);
    const matchesStatus = statusFilter === 'ALL' || (statusFilter === 'CACHED' && isCached) || (statusFilter === 'UNCACHED' && !isCached);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAction = async (actionName: string, fn: () => Promise<any>) => {
    setActionLoading(actionName);
    try {
      await fn();
    } finally {
      setActionLoading(null);
    }
  };

  const handleApplyCustomTtl = async () => {
    if (!selectedTtlModal) return;
    await handleAction(`ttl-${selectedTtlModal.productId}`, () =>
      onUpdateTtl(selectedTtlModal.productId, customTtlInput)
    );
    setSelectedTtlModal(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Controls Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              Redis Cache Management & Intelligence
            </h2>
            <p className="text-xs text-slate-400">
              Deterministic priority scoring and active TTL enforcement across catalog items
            </p>
          </div>

          {/* Bulk Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleAction('recalculate', onRecalculateAll)}
              disabled={actionLoading === 'recalculate'}
              className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${actionLoading === 'recalculate' ? 'animate-spin' : ''}`} />
              <span>Recalculate All Priorities</span>
            </button>

            <button
              onClick={() => handleAction('evict', () => onTriggerEviction(1))}
              disabled={actionLoading === 'evict' || cacheEntries.length === 0}
              className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Evict Lowest Score</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search product name or ID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              {categories.map(c => (
                <option key={c} value={c}>
                  Category: {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({products.length})
            </button>
            <button
              onClick={() => setStatusFilter('CACHED')}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === 'CACHED' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Cached ({cacheEntries.length})
            </button>
            <button
              onClick={() => setStatusFilter('UNCACHED')}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                statusFilter === 'UNCACHED' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              In DB ({products.length - cacheEntries.length})
            </button>
          </div>
        </div>
      </div>

      {/* Product Intelligence Table */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3 text-center">Requests</th>
                <th className="py-3.5 px-3 text-center">Hit Rate</th>
                <th className="py-3.5 px-3 text-center">Popularity</th>
                <th className="py-3.5 px-3 text-center">Priority Score</th>
                <th className="py-3.5 px-3 text-center">Classification</th>
                <th className="py-3.5 px-3 text-center">TTL / Remaining</th>
                <th className="py-3.5 px-3 text-center">Cache State</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-slate-500">
                    No products matched your search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(prod => {
                  const cached = cachedMap.get(prod.id);
                  const isCached = cached !== undefined;
                  const score = prod.dynamicPriorityScore ?? 50.0;
                  const classification = prod.dynamicClassification ?? 'WARM';

                  let classBadge = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
                  if (classification === 'HOT') classBadge = 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold';
                  if (classification === 'COLD') classBadge = 'bg-slate-700/50 text-slate-400 border-slate-600';

                  return (
                    <tr
                      key={prod.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isCached ? 'bg-blue-950/10' : ''
                      }`}
                    >
                      {/* Product Name & Image */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.imageUrl}
                            alt={prod.name}
                            className="w-9 h-9 rounded-lg object-cover border border-slate-700 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-100 flex items-center gap-1.5">
                              {prod.name}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">ID: {prod.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3 font-medium text-slate-300">{prod.category}</td>

                      {/* Request Frequency */}
                      <td className="py-3 px-3 text-center font-mono font-semibold text-slate-200">
                        {prod.totalRequests || prod.requestFrequency}
                      </td>

                      {/* Hit Rate */}
                      <td className="py-3 px-3 text-center font-mono text-emerald-400">
                        {prod.hitRate !== undefined ? `${prod.hitRate}%` : '—'}
                      </td>

                      {/* Popularity Score */}
                      <td className="py-3 px-3 text-center font-mono text-cyan-300">
                        {prod.dynamicPopularityScore ?? prod.popularity}
                      </td>

                      {/* Priority Score Gauge */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          {score}
                        </span>
                      </td>

                      {/* HOT / WARM / COLD Badge */}
                      <td className="py-3 px-3 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${classBadge}`}>
                          {classification}
                        </span>
                      </td>

                      {/* TTL / Remaining TTL */}
                      <td className="py-3 px-3 text-center font-mono text-[11px]">
                        {isCached ? (
                          <div>
                            <span className="text-emerald-400 font-bold">{cached.remainingTtlSeconds}s</span>
                            <span className="text-slate-500"> / {cached.ttlSeconds}s</span>
                          </div>
                        ) : (
                          <span className="text-slate-500">{prod.recommendedTTL || 600}s rec</span>
                        )}
                      </td>

                      {/* Cache Status Badge */}
                      <td className="py-3 px-3 text-center">
                        {isCached ? (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            REDIS
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                            DATABASE
                          </span>
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Detail */}
                          <button
                            onClick={() => onSelectProductForDetail(prod)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Inspect product detail & telemetry"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Request Trigger */}
                          <button
                            onClick={() => onRequestProduct(prod.id)}
                            className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 transition-colors"
                            title="Send request for this product"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>

                          {/* Cache / Evict Toggle */}
                          {isCached ? (
                            <button
                              onClick={() => handleAction(`evict-${prod.id}`, () => onEvictProduct(prod.id))}
                              disabled={actionLoading === `evict-${prod.id}`}
                              className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 transition-colors"
                              title="Evict from Redis"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAction(`cache-${prod.id}`, () => onCacheProduct(prod.id))}
                              disabled={actionLoading === `cache-${prod.id}`}
                              className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 transition-colors"
                              title="Store into Redis Cache"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Custom TTL Adjuster */}
                          {isCached && (
                            <button
                              onClick={() => {
                                setSelectedTtlModal({
                                  productId: prod.id,
                                  currentTtl: cached.ttlSeconds,
                                  name: prod.name
                                });
                                setCustomTtlInput(cached.ttlSeconds);
                              }}
                              className="p-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 transition-colors"
                              title="Adjust custom TTL"
                            >
                              <Clock className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic TTL Adjustment Modal */}
      {selectedTtlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                Update Dynamic TTL
              </h3>
              <button
                onClick={() => setSelectedTtlModal(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                &times;
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-200">{selectedTtlModal.name}</div>
              <div className="text-[11px] font-mono text-slate-400">ID: {selectedTtlModal.productId}</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
                <span>New Active TTL (seconds)</span>
                <span className="font-mono text-cyan-400 font-bold">
                  {customTtlInput}s ({Math.round(customTtlInput / 60)} mins)
                </span>
              </label>
              <input
                type="range"
                min={30}
                max={3600}
                step={30}
                value={customTtlInput}
                onChange={e => setCustomTtlInput(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>30s (Cold)</span>
                <span>600s (Warm)</span>
                <span>1800s (Hot)</span>
                <span>3600s (Max)</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedTtlModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustomTtl}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all"
              >
                Apply TTL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
