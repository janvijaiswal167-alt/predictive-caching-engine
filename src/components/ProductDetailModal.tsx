import React, { useState } from 'react';
import {
  X,
  Zap,
  Layers,
  Database,
  Clock,
  Send,
  DollarSign,
  TrendingUp,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { Product, CacheEntry } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  cachedEntry?: CacheEntry;
  onClose: () => void;
  onRequestProduct: (productId: string) => Promise<any>;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  cachedEntry,
  onClose,
  onRequestProduct
}) => {
  const [requestLoading, setRequestLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState<any>(null);

  if (!product) return null;

  const isCached = cachedEntry !== undefined;

  const handleTestRequest = async () => {
    setRequestLoading(true);
    try {
      const res = await onRequestProduct(product.id);
      setLastResponse(res);
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl space-y-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono">
                  {product.category}
                </span>
                <span className="text-xs font-mono text-slate-400">ID: {product.id}</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">{product.name}</h2>
              <div className="text-sm font-bold font-mono text-emerald-400">
                ${product.price.toFixed(2)} USD
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-2xl border border-slate-800">
          {product.description}
        </p>

        {/* Specifications & Cache Intelligence Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          {/* Cache Status & Classification */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <div className="text-slate-400 font-semibold uppercase text-[10px] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Smart Cache Status
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Cache State:</span>
              {isCached ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  REDIS IN-MEMORY
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[10px]">
                  PRODUCT DATABASE
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Classification:</span>
              <span className="text-white font-bold">{product.dynamicClassification ?? 'WARM'}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Priority Score:</span>
              <span className="text-amber-400 font-bold">{product.dynamicPriorityScore ?? 50.0} / 100</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Active / Remaining TTL:</span>
              <span className="text-cyan-400 font-bold">
                {isCached ? `${cachedEntry.remainingTtlSeconds}s remaining` : `${product.recommendedTTL || 600}s recommended`}
              </span>
            </div>
          </div>

          {/* Database Specs & Hardware Specs */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
            <div className="text-slate-400 font-semibold uppercase text-[10px] flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" />
              Storage & Retrieval Profile
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Data Memory Size:</span>
              <span className="text-slate-200">{product.dataSize} bytes</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Unit DB Retrieval Cost:</span>
              <span className="text-emerald-400 font-bold">${product.databaseRetrievalCost} USD</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Requests:</span>
              <span className="text-slate-200">{product.totalRequests || product.requestFrequency}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Catalog Stock:</span>
              <span className="text-slate-200">{product.stock} units</span>
            </div>
          </div>
        </div>

        {/* Live Test Request Result Display */}
        {lastResponse && (
          <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Live Middleware Result: {lastResponse.status}
              </span>
              <span className="text-slate-400">Latency: {lastResponse.latencyMs} ms</span>
            </div>
            <div className="text-[11px] text-slate-300">
              Source: <strong className="text-white">{lastResponse.source}</strong> &bull; Priority: {lastResponse.priorityScore} &bull; TTL: {lastResponse.allocatedTtl}s
            </div>
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleTestRequest}
            disabled={requestLoading}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className={`w-3.5 h-3.5 ${requestLoading ? 'animate-spin' : ''}`} />
            <span>{requestLoading ? 'Requesting...' : 'Send Live Request'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
