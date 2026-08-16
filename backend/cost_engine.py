"""
Cost & Metrics Engine for Predictive Cloud-Cost Caching Engine.
Calculates:
- Database Requests Avoided
- Estimated Database Cost Savings ($)
- Estimated Database Cost (Without Caching)
- Actual Database Cost
- Cache Infrastructure Cost
- Net Estimated Savings ($)
- Database Load Reduction (%)
- Live Performance Metrics (Hit Rate, Miss Rate, Avg Latency)
"""
from typing import Dict, Any

class CostSettings:
    def __init__(
        self,
        cost_per_db_query: float = 0.0045,      # $0.0045 per cloud SQL/NoSQL query
        cost_per_cache_lookup: float = 0.00015, # $0.00015 per in-memory Redis read
        hot_ttl_seconds: int = 1800,           # 30 mins
        warm_ttl_seconds: int = 600,           # 10 mins
        cold_ttl_seconds: int = 120,           # 2 mins
        max_cache_capacity: int = 12           # Max cached items before auto-eviction
    ):
        self.cost_per_db_query = cost_per_db_query
        self.cost_per_cache_lookup = cost_per_cache_lookup
        self.hot_ttl_seconds = hot_ttl_seconds
        self.warm_ttl_seconds = warm_ttl_seconds
        self.cold_ttl_seconds = cold_ttl_seconds
        self.max_cache_capacity = max_cache_capacity

class CostAndMetricsEngine:
    def __init__(self):
        self.settings = CostSettings()
        
        # Cumulative counters
        self.total_requests = 0
        self.cache_hits = 0
        self.cache_misses = 0
        self.total_latency_ms = 0.0
        self.total_evictions = 0
        
        # Latency breakdown
        self.total_hit_latency_ms = 0.0
        self.total_miss_latency_ms = 0.0

    def record_request(self, is_hit: bool, latency_ms: float):
        self.total_requests += 1
        self.total_latency_ms += latency_ms
        if is_hit:
            self.cache_hits += 1
            self.total_hit_latency_ms += latency_ms
        else:
            self.cache_misses += 1
            self.total_miss_latency_ms += latency_ms

    def record_eviction(self):
        self.total_evictions += 1

    def calculate_metrics(self, active_cached_keys: int = 0, memory_used_bytes: int = 0) -> Dict[str, Any]:
        total = self.total_requests
        hits = self.cache_hits
        misses = self.cache_misses
        
        hit_rate = (hits / total * 100.0) if total > 0 else 0.0
        miss_rate = (misses / total * 100.0) if total > 0 else 0.0
        avg_latency = (self.total_latency_ms / total) if total > 0 else 0.0
        avg_hit_latency = (self.total_hit_latency_ms / hits) if hits > 0 else 0.0
        avg_miss_latency = (self.total_miss_latency_ms / misses) if misses > 0 else 0.0
        
        # Avoided DB queries = All Cache Hits
        db_requests_avoided = hits
        
        # Cost Calculations
        cost_no_cache = total * self.settings.cost_per_db_query
        actual_db_cost = misses * self.settings.cost_per_db_query
        gross_db_savings = db_requests_avoided * self.settings.cost_per_db_query
        
        # Cache operational lookup cost + prorated memory
        cache_lookup_cost = total * self.settings.cost_per_cache_lookup
        cache_mem_cost = (active_cached_keys * 0.00002)
        total_cache_cost = cache_lookup_cost + cache_mem_cost
        
        net_savings = max(0.0, gross_db_savings - total_cache_cost)
        load_reduction_percent = (db_requests_avoided / total * 100.0) if total > 0 else 0.0
        
        # ROI Multiplier
        roi_multiplier = (gross_db_savings / total_cache_cost) if total_cache_cost > 0 else 0.0

        return {
            "totalRequests": total,
            "cacheHits": hits,
            "cacheMisses": misses,
            "cacheHitRate": round(hit_rate, 1),
            "cacheMissRate": round(miss_rate, 1),
            "databaseRequestsAvoided": db_requests_avoided,
            "databaseLoadReductionPercent": round(load_reduction_percent, 1),
            "averageResponseTimeMs": round(avg_latency, 1),
            "avgHitLatencyMs": round(avg_hit_latency, 1),
            "avgMissLatencyMs": round(avg_miss_latency, 1),
            "totalEvictions": self.total_evictions,
            "activeCachedKeys": active_cached_keys,
            "memoryUsedBytes": memory_used_bytes,
            
            # Financial & Cloud Cost Model (Labeled ESTIMATED)
            "costPerDbQuery": self.settings.cost_per_db_query,
            "costPerCacheLookup": self.settings.cost_per_cache_lookup,
            "estimatedDatabaseCostNoCache": round(cost_no_cache, 4),
            "estimatedDatabaseCostActual": round(actual_db_cost, 4),
            "estimatedDatabaseCostSavings": round(gross_db_savings, 4),
            "estimatedCacheInfrastructureCost": round(total_cache_cost, 4),
            "netEstimatedSavings": round(net_savings, 4),
            "roiMultiplier": round(roi_multiplier, 1),
            "isCostEstimated": True
        }

    def update_settings(self, new_settings: Dict[str, Any]):
        if "costPerDbQuery" in new_settings:
            self.settings.cost_per_db_query = float(new_settings["costPerDbQuery"])
        if "costPerCacheLookup" in new_settings:
            self.settings.cost_per_cache_lookup = float(new_settings["costPerCacheLookup"])
        if "hotTtlSeconds" in new_settings:
            self.settings.hot_ttl_seconds = int(new_settings["hotTtlSeconds"])
        if "warmTtlSeconds" in new_settings:
            self.settings.warm_ttl_seconds = int(new_settings["warmTtlSeconds"])
        if "coldTtlSeconds" in new_settings:
            self.settings.cold_ttl_seconds = int(new_settings["coldTtlSeconds"])
        if "maxCacheCapacity" in new_settings:
            self.settings.max_cache_capacity = int(new_settings["maxCacheCapacity"])

    def get_settings(self) -> Dict[str, Any]:
        return {
            "costPerDbQuery": self.settings.cost_per_db_query,
            "costPerCacheLookup": self.settings.cost_per_cache_lookup,
            "hotTtlSeconds": self.settings.hot_ttl_seconds,
            "warmTtlSeconds": self.settings.warm_ttl_seconds,
            "coldTtlSeconds": self.settings.cold_ttl_seconds,
            "maxCacheCapacity": self.settings.max_cache_capacity
        }

    def reset(self):
        self.total_requests = 0
        self.cache_hits = 0
        self.cache_misses = 0
        self.total_latency_ms = 0.0
        self.total_hit_latency_ms = 0.0
        self.total_miss_latency_ms = 0.0
        self.total_evictions = 0

# Singleton instance
cost_instance = CostAndMetricsEngine()
