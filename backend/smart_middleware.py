"""
Smart Cache Middleware for Predictive Cloud-Cost Caching Engine.
Contains EXACTLY:
1. Request Tracking
2. Cache Decision Engine
3. Dynamic TTL Manager
4. Eviction Engine
5. Metrics Collector
Plus Real-Time Activity Logger.
"""
import time
import asyncio
from typing import Dict, List, Any, Optional

from database import db_instance
from cache_engine import cache_instance
from analytics_engine import analytics_instance
from cost_engine import cost_instance

class ActivityLog:
    def __init__(self, event_type: str, title: str, description: str, metadata: Dict[str, Any]):
        self.id = f"log-{int(time.time() * 1000)}-{id(self) % 1000}"
        self.timestamp = time.time()
        self.event_type = event_type # 'CACHE_HIT', 'CACHE_MISS', 'DATA_STORED', 'TTL_UPDATED', 'EVICTION', 'TRAFFIC_SPIKE', 'COST_SAVING', 'CAPACITY_WARNING'
        self.title = title
        self.description = description
        self.metadata = metadata

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "timestamp": self.timestamp,
            "eventType": self.event_type,
            "title": self.title,
            "description": self.description,
            "metadata": self.metadata
        }

class SmartCacheMiddleware:
    def __init__(self):
        self.request_counter = 1000
        self.activity_logs: List[Dict[str, Any]] = []
        self.max_logs = 100
        
        # Recent request tracking buffer
        self.request_history: List[Dict[str, Any]] = []
        self.max_history = 100

    def _add_log(self, event_type: str, title: str, description: str, metadata: Dict[str, Any]):
        log_entry = ActivityLog(event_type, title, description, metadata).to_dict()
        self.activity_logs.insert(0, log_entry)
        if len(self.activity_logs) > self.max_logs:
            self.activity_logs.pop()

    def get_logs(self, limit: int = 50, event_type: Optional[str] = None) -> List[Dict[str, Any]]:
        if event_type and event_type != "ALL":
            return [l for l in self.activity_logs if l["eventType"] == event_type][:limit]
        return self.activity_logs[:limit]

    def get_request_history(self, limit: int = 50) -> List[Dict[str, Any]]:
        return self.request_history[:limit]

    async def handle_product_request(self, product_id: str) -> Dict[str, Any]:
        """
        EXACT REQUEST FLOW:
        USER REQUESTS PRODUCT -> SMART CACHE MIDDLEWARE -> CHECK REDIS CACHE
        IF HIT:
           REDIS -> RETURN CACHED DATA -> RECORD METRICS
        IF MISS:
           REDIS -> CACHE MISS -> PRODUCT DATABASE -> FETCH PRODUCT -> STORE IN REDIS -> RETURN -> RECORD METRICS
        BOTH:
           ANALYTICS -> DYNAMIC TTL -> KEEP/UPDATE/EVICT -> COST ENGINE -> ADMIN DASHBOARD
        """
        start_time = time.time()
        self.request_counter += 1
        request_id = f"REQ-#{self.request_counter}"
        cache_key = f"product:{product_id}"

        # 1. Check Redis Cache
        cached_data = cache_instance.get(cache_key)
        is_hit = cached_data is not None
        
        product_data = None
        source = "Redis Cache"
        
        if is_hit:
            # === CACHE HIT PATH ===
            product_data = cached_data
            # Simulate lightning-fast in-memory read (1.0 - 2.5 ms)
            await asyncio.sleep(0.0015)
            latency_ms = round((time.time() - start_time) * 1000, 2)
            
            # Record hit log
            self._add_log(
                event_type="CACHE_HIT",
                title=f"Cache Hit: {product_data.get('name', product_id)}",
                description=f"Served directly from Redis memory in {latency_ms} ms. Database query avoided.",
                metadata={
                    "requestId": request_id,
                    "productId": product_id,
                    "latencyMs": latency_ms,
                    "source": "Redis"
                }
            )
            
            # Record cost savings event
            savings_amt = cost_instance.settings.cost_per_db_query
            self._add_log(
                event_type="COST_SAVING",
                title=f"Cost Saved: ${savings_amt:.4f}",
                description=f"Database request avoided on {product_data.get('name', product_id)}. Saved ${savings_amt:.4f}.",
                metadata={"productId": product_id, "amountSaved": savings_amt}
            )
        else:
            # === CACHE MISS PATH ===
            source = "Product Database"
            # Fetch from product database (simulates 35ms cloud DB latency)
            product_data = await db_instance.fetch_product_by_id(product_id, simulate_delay=True)
            if not product_data:
                raise ValueError(f"Product {product_id} not found in database catalog")
                
            latency_ms = round((time.time() - start_time) * 1000, 2)
            
            self._add_log(
                event_type="CACHE_MISS",
                title=f"Cache Miss: {product_data['name']}",
                description=f"Key not in cache. Queried Product Database with {latency_ms} ms latency.",
                metadata={
                    "requestId": request_id,
                    "productId": product_id,
                    "latencyMs": latency_ms,
                    "source": "Database"
                }
            )

        # 2. Record in Analytics Engine (Traffic Analyzer & Demand Scorer)
        prediction = analytics_instance.record_event(
            product_id=product_id,
            is_hit=is_hit,
            latency_ms=latency_ms,
            category=product_data.get("category", "General")
        )

        # 3. Dynamic TTL Manager Evaluation
        allocated_ttl = prediction["recommendedTTL"]
        classification = prediction["classification"]
        priority_score = prediction["priorityScore"]
        decision_reason = prediction["reason"]
        
        # Check if entry is already cached to evaluate TTL update
        existing_entry = cache_instance.get_entry(cache_key)
        
        if existing_entry:
            old_ttl = existing_entry.ttl_seconds
            if old_ttl != allocated_ttl:
                cache_instance.update_ttl(cache_key, allocated_ttl)
                cache_instance.update_score_and_class(cache_key, priority_score, classification)
                self._add_log(
                    event_type="TTL_UPDATED",
                    title=f"Dynamic TTL Updated: {product_data['name']}",
                    description=f"TTL adjusted from {old_ttl}s to {allocated_ttl}s ({classification}). Reason: {decision_reason}",
                    metadata={
                        "productId": product_id,
                        "previousTtl": old_ttl,
                        "newTtl": allocated_ttl,
                        "classification": classification,
                        "reason": decision_reason
                    }
                )
        else:
            # Check capacity before storing new product in cache
            mem_stats = cache_instance.get_memory_stats()
            if mem_stats["isCapacityWarning"] or mem_stats["itemCount"] >= cost_instance.settings.max_cache_capacity:
                self._add_log(
                    event_type="CAPACITY_WARNING",
                    title="Cache Capacity Warning (>80%)",
                    description=f"Cache capacity reached ({mem_stats['itemCount']}/{cost_instance.settings.max_cache_capacity} items). Activating Eviction Engine.",
                    metadata=mem_stats
                )
                # Trigger intelligent eviction of lowest priority items
                self.run_intelligent_eviction(items_to_evict=1)

            # Store product in Redis
            cache_instance.set(
                key=cache_key,
                product_id=product_id,
                data=product_data,
                ttl_seconds=allocated_ttl,
                data_size_bytes=product_data.get("dataSize", 2048),
                priority_score=priority_score,
                classification=classification
            )
            
            self._add_log(
                event_type="DATA_STORED",
                title=f"Data Stored in Redis: {product_data['name']}",
                description=f"Cached with TTL: {allocated_ttl}s, Classification: {classification}, Priority Score: {priority_score}.",
                metadata={
                    "productId": product_id,
                    "ttl": allocated_ttl,
                    "classification": classification,
                    "priorityScore": priority_score
                }
            )

        # 4. Check for Traffic Spike Detection Log
        if prediction.get("isSpikeDetected") and analytics_instance.is_spike_detected:
            # Avoid duplicate spam logs
            if time.time() - analytics_instance.spike_start_time < 1.0:
                self._add_log(
                    event_type="TRAFFIC_SPIKE",
                    title="TRAFFIC SPIKE DETECTED",
                    description="High request burst detected across flagship items! Escalating caching priority and boosting dynamic TTL.",
                    metadata={"rps": analytics_instance.calculate_current_rps()}
                )

        # 5. Record in Cost & Metrics Engine
        cost_instance.record_request(is_hit=is_hit, latency_ms=latency_ms)

        # 6. Append to Request History Buffer
        req_record = {
            "requestId": request_id,
            "productId": product_id,
            "productName": product_data.get("name", product_id),
            "category": product_data.get("category", "General"),
            "status": "CACHE HIT" if is_hit else "CACHE MISS",
            "isHit": is_hit,
            "source": source,
            "latencyMs": latency_ms,
            "timestamp": time.time(),
            "priorityScore": priority_score,
            "classification": classification,
            "allocatedTtl": allocated_ttl
        }
        self.request_history.insert(0, req_record)
        if len(self.request_history) > self.max_history:
            self.request_history.pop()

        return {
            "requestId": request_id,
            "productId": product_id,
            "product": product_data,
            "status": "CACHE HIT" if is_hit else "CACHE MISS",
            "isHit": is_hit,
            "source": source,
            "latencyMs": latency_ms,
            "priorityScore": priority_score,
            "classification": classification,
            "allocatedTtl": allocated_ttl,
            "decisionReason": decision_reason,
            "metrics": cost_instance.calculate_metrics(
                active_cached_keys=len(cache_instance.storage),
                memory_used_bytes=sum(e.data_size_bytes for e in cache_instance.storage.values())
            )
        }

    def run_intelligent_eviction(self, items_to_evict: int = 1) -> List[Dict[str, Any]]:
        """
        EVICTION ENGINE:
        Identifies lowest priority/score and COLD products, then removes them from Redis.
        """
        all_entries = cache_instance.get_all_entries()
        if not all_entries:
            return []

        # Sort ascending by priority score, access count, and recency
        sorted_entries = sorted(
            all_entries,
            key=lambda e: (
                0 if e["classification"] == "COLD" else (1 if e["classification"] == "WARM" else 2),
                e["priorityScore"],
                e["accessCount"],
                e["lastAccessed"]
            )
        )

        evicted = []
        for entry in sorted_entries[:items_to_evict]:
            key = entry["key"]
            prod_id = entry["productId"]
            cache_instance.delete(key)
            cache_instance.total_evictions += 1
            cost_instance.record_eviction()
            
            prod_info = db_instance.products.get(prod_id, {})
            prod_name = prod_info.get("name", prod_id)
            
            eviction_record = {
                "productId": prod_id,
                "productName": prod_name,
                "priorityScore": entry["priorityScore"],
                "classification": entry["classification"],
                "reason": "LOW_PRIORITY_COLD_EVICTION",
                "freedBytes": entry["dataSizeBytes"],
                "timestamp": time.time()
            }
            evicted.append(eviction_record)

            self._add_log(
                event_type="EVICTION",
                title=f"Intelligent Eviction: {prod_name}",
                description=f"Evicted from cache due to low priority score ({entry['priorityScore']}) and {entry['classification']} status to free up memory.",
                metadata=eviction_record
            )

        return evicted

    def recalculate_all_priorities(self) -> List[Dict[str, Any]]:
        """
        Recalculates priority scores and classifications for all cached items.
        """
        results = []
        for key, entry in list(cache_instance.storage.items()):
            pred = analytics_instance.compute_demand_prediction(entry.product_id)
            entry.priority_score = pred["priorityScore"]
            entry.classification = pred["classification"]
            entry.update_ttl(pred["recommendedTTL"])
            results.append({
                "productId": entry.product_id,
                "priorityScore": pred["priorityScore"],
                "classification": pred["classification"],
                "newTtl": pred["recommendedTTL"],
                "reason": pred["reason"]
            })
        return results

    def reset_all(self):
        cache_instance.clear()
        analytics_instance.reset()
        cost_instance.reset()
        db_instance.reset_catalog()
        self.request_counter = 1000
        self.activity_logs.clear()
        self.request_history.clear()
        
        self._add_log(
            event_type="SYSTEM",
            title="System Reset Completed",
            description="All cache keys, request logs, metrics, and traffic states have been reset to initial baseline state.",
            metadata={"status": "CLEAN_BASELINE"}
        )

# Singleton instance
middleware_instance = SmartCacheMiddleware()
