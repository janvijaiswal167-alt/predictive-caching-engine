"""
Analytics Engine & Traffic Analyzer for Predictive Cloud-Cost Caching Engine.
Performs:
- Real-time Popularity Analysis
- Frequency Calculation
- Hit/Miss Analysis
- Recency Analysis
- Traffic Spike Detection
- Machine Learning Demand Scoring & Classification
"""
import time
import math
from typing import Dict, List, Any, Optional

class AnalyticsEngine:
    def __init__(self):
        # Sliding window of request events for traffic rate & spike detection
        # Each event: {"timestamp": float, "productId": str, "isHit": bool, "latencyMs": float}
        self.request_window: List[Dict[str, Any]] = []
        self.window_duration_sec = 60.0 # 60-second sliding analytics window
        
        # Product-level aggregate stats
        # productId -> {"totalRequests": int, "cacheHits": int, "cacheMisses": int, "timestamps": List[float], "lastAccessed": float}
        self.product_aggregates: Dict[str, Dict[str, Any]] = {}
        
        # Traffic spike state
        self.is_spike_detected = False
        self.spike_start_time = 0.0
        self.spike_threshold_rps = 35.0 # RPS threshold to flag a traffic burst/spike

    def record_event(self, product_id: str, is_hit: bool, latency_ms: float, category: str = "General") -> Dict[str, Any]:
        now = time.time()
        
        # 1. Add to sliding request window
        self.request_window.append({
            "timestamp": now,
            "productId": product_id,
            "isHit": is_hit,
            "latencyMs": latency_ms,
            "category": category
        })
        
        # 2. Prune request window older than window_duration_sec
        cutoff = now - self.window_duration_sec
        self.request_window = [e for e in self.request_window if e["timestamp"] >= cutoff]
        
        # 3. Update product-specific stats
        if product_id not in self.product_aggregates:
            self.product_aggregates[product_id] = {
                "productId": product_id,
                "category": category,
                "totalRequests": 0,
                "cacheHits": 0,
                "cacheMisses": 0,
                "timestamps": [],
                "lastAccessed": now,
                "popularityScore": 50.0,
                "classification": "WARM",
                "trafficAcceleration": 1.0
            }
            
        stats = self.product_aggregates[product_id]
        stats["totalRequests"] += 1
        if is_hit:
            stats["cacheHits"] += 1
        else:
            stats["cacheMisses"] += 1
        stats["timestamps"].append(now)
        stats["lastAccessed"] = now
        
        # Prune product timestamps
        stats["timestamps"] = [t for t in stats["timestamps"] if t >= cutoff]
        
        # 4. Check for traffic spike
        rps = self.calculate_current_rps()
        if rps >= self.spike_threshold_rps:
            if not self.is_spike_detected:
                self.is_spike_detected = True
                self.spike_start_time = now
        else:
            if self.is_spike_detected and (now - self.spike_start_time > 8.0):
                self.is_spike_detected = False

        # 5. Compute real-time popularity & classification for this product
        prediction = self.compute_demand_prediction(product_id, stats)
        stats["popularityScore"] = prediction["popularityScore"]
        stats["classification"] = prediction["classification"]
        stats["recommendedTTL"] = prediction["recommendedTTL"]
        stats["priorityScore"] = prediction["priorityScore"]
        stats["decisionReason"] = prediction["reason"]

        return prediction

    def calculate_current_rps(self) -> float:
        now = time.time()
        cutoff_5s = now - 5.0
        recent_events = [e for e in self.request_window if e["timestamp"] >= cutoff_5s]
        if not recent_events:
            return 0.0
        duration = max(1.0, now - recent_events[0]["timestamp"])
        return round(len(recent_events) / duration, 1)

    def compute_demand_prediction(self, product_id: str, stats: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Deterministic AI/ML Demand Scoring and Priority Score.
        Combines:
        - Request Frequency in last 60s (Weight: 35%)
        - Access Recency (Weight: 20%)
        - Cache Hit Rate (Weight: 20%)
        - Total Request Volume (Weight: 15%)
        - Traffic Acceleration / Burst Spike multiplier (Weight: 10%)
        """
        now = time.time()
        if stats is None:
            if product_id in self.product_aggregates:
                stats = self.product_aggregates[product_id]
            else:
                stats = {
                    "totalRequests": 0,
                    "cacheHits": 0,
                    "cacheMisses": 0,
                    "timestamps": [],
                    "lastAccessed": now - 300
                }

        recent_count = len(stats.get("timestamps", []))
        total_count = stats.get("totalRequests", 0)
        hits = stats.get("cacheHits", 0)
        hit_rate = (hits / total_count) if total_count > 0 else 0.0
        time_since_last_access = max(0.0, now - stats.get("lastAccessed", now))
        
        # 1. Frequency Score component (0 - 35 pts)
        freq_score = min(35.0, recent_count * 2.5)
        
        # 2. Recency Score component (0 - 20 pts): decays exponentially over 60s
        recency_factor = math.exp(-time_since_last_access / 45.0)
        recency_score = 20.0 * recency_factor
        
        # 3. Hit Rate component (0 - 20 pts)
        hit_rate_score = 20.0 * hit_rate
        
        # 4. Total Volume component (0 - 15 pts)
        volume_score = min(15.0, math.log1p(total_count) * 3.0)
        
        # 5. Acceleration / Spike boost (0 - 10 pts)
        spike_boost = 10.0 if self.is_spike_detected else 0.0
        
        # Composite Popularity Score (0.0 to 100.0)
        raw_score = freq_score + recency_score + hit_rate_score + volume_score + spike_boost
        popularity_score = round(max(5.0, min(100.0, raw_score)), 1)
        
        # Priority Score computation for Cache Management
        # Incorporates popularity + cache value
        priority_score = round(max(5.0, min(100.0, popularity_score * 0.9 + hit_rate * 10)), 1)
        
        # Deterministic Classification: HOT / WARM / COLD
        # and Dynamic TTL (HOT: 1800s / 30m, WARM: 600s / 10m, COLD: 120s / 2m)
        if priority_score >= 68.0 or recent_count >= 7 or (self.is_spike_detected and recent_count >= 5):
            classification = "HOT"
            recommended_ttl = 1800 # 30 minutes
            reason = "High request frequency and predicted burst demand."
        elif priority_score >= 35.0 or recent_count >= 2:
            classification = "WARM"
            recommended_ttl = 600  # 10 minutes
            reason = "Moderate steady request volume and consistent access."
        else:
            classification = "COLD"
            recommended_ttl = 120  # 2 minutes
            reason = "Low request frequency, dormant recency. Eviction candidate."
            
        return {
            "productId": product_id,
            "popularityScore": popularity_score,
            "priorityScore": priority_score,
            "classification": classification,
            "recommendedTTL": recommended_ttl,
            "reason": reason,
            "recentRequests60s": recent_count,
            "totalRequests": total_count,
            "hitRate": round(hit_rate * 100, 1),
            "timeSinceLastAccessSec": round(time_since_last_access, 1),
            "isSpikeDetected": self.is_spike_detected,
            "featureContributions": {
                "frequency": round(freq_score, 1),
                "recency": round(recency_score, 1),
                "hitRate": round(hit_rate_score, 1),
                "volume": round(volume_score, 1),
                "spikeBoost": round(spike_boost, 1)
            }
        }

    def get_traffic_summary(self) -> Dict[str, Any]:
        now = time.time()
        cutoff = now - self.window_duration_sec
        active_events = [e for e in self.request_window if e["timestamp"] >= cutoff]
        
        total_window_requests = len(active_events)
        window_hits = sum(1 for e in active_events if e["isHit"])
        window_misses = total_window_requests - window_hits
        window_hit_rate = (window_hits / total_window_requests * 100.0) if total_window_requests > 0 else 0.0
        current_rps = self.calculate_current_rps()
        
        # Category breakdown
        cat_counts: Dict[str, int] = {}
        for e in active_events:
            cat = e.get("category", "General")
            cat_counts[cat] = cat_counts.get(cat, 0) + 1
            
        # Top hot products vs cold products
        sorted_prods = sorted(
            self.product_aggregates.values(),
            key=lambda p: p.get("popularityScore", 0),
            reverse=True
        )
        
        hot_products = [p["productId"] for p in sorted_prods if p.get("classification") == "HOT"][:6]
        cold_products = [p["productId"] for p in sorted_prods if p.get("classification") == "COLD"][:6]
        
        # Generate 10 time bucket points for real-time traffic chart
        time_series = []
        bucket_size = 6.0 # 6 seconds per bucket over 60 seconds
        for i in range(10):
            b_start = cutoff + (i * bucket_size)
            b_end = b_start + bucket_size
            b_events = [e for e in active_events if b_start <= e["timestamp"] < b_end]
            b_hits = sum(1 for e in b_events if e["isHit"])
            b_misses = len(b_events) - b_hits
            
            # Format time label as seconds ago
            sec_ago = int(now - b_end)
            time_series.append({
                "time": f"-{sec_ago}s",
                "requests": len(b_events),
                "hits": b_hits,
                "misses": b_misses,
                "hitRate": round((b_hits / len(b_events) * 100), 1) if len(b_events) > 0 else 0
            })

        return {
            "currentRps": current_rps,
            "windowTotalRequests": total_window_requests,
            "windowHits": window_hits,
            "windowMisses": window_misses,
            "windowHitRate": round(window_hit_rate, 1),
            "isSpikeDetected": self.is_spike_detected,
            "categoryBreakdown": cat_counts,
            "hotProducts": hot_products,
            "coldProducts": cold_products,
            "timeSeries": time_series
        }

    def reset(self):
        self.request_window.clear()
        self.product_aggregates.clear()
        self.is_spike_detected = False
        self.spike_start_time = 0.0

# Singleton instance
analytics_instance = AnalyticsEngine()
