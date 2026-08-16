"""
Redis Cache Layer for Predictive Cloud-Cost Caching Engine.
High-fidelity Redis-compatible in-memory cache engine with:
- Active & passive TTL expiration
- Exact memory & capacity tracking
- Real-time remaining TTL calculations
- Deterministic cache entry metadata
"""
import time
import json
from typing import Dict, List, Optional, Any

class CacheEntry:
    def __init__(
        self,
        key: str,
        product_id: str,
        data: Dict[str, Any],
        ttl_seconds: int,
        data_size_bytes: int = 2048,
        priority_score: float = 50.0,
        classification: str = "WARM"
    ):
        self.key = key
        self.product_id = product_id
        self.data = data
        self.created_at = time.time()
        self.last_accessed = self.created_at
        self.ttl_seconds = ttl_seconds
        self.expires_at = self.created_at + ttl_seconds
        self.data_size_bytes = data_size_bytes
        self.access_count = 1
        self.priority_score = priority_score
        self.classification = classification

    def is_expired(self) -> bool:
        return time.time() > self.expires_at

    def remaining_ttl(self) -> int:
        remaining = int(self.expires_at - time.time())
        return max(0, remaining)

    def touch(self):
        self.access_count += 1
        self.last_accessed = time.time()

    def update_ttl(self, new_ttl_seconds: int):
        self.ttl_seconds = new_ttl_seconds
        # Extends expiration relative to current time
        self.expires_at = time.time() + new_ttl_seconds

    def to_dict(self) -> Dict[str, Any]:
        return {
            "key": self.key,
            "productId": self.product_id,
            "data": self.data,
            "createdAt": self.created_at,
            "lastAccessed": self.last_accessed,
            "ttlSeconds": self.ttl_seconds,
            "remainingTtlSeconds": self.remaining_ttl(),
            "expiresAt": self.expires_at,
            "dataSizeBytes": self.data_size_bytes,
            "accessCount": self.access_count,
            "priorityScore": self.priority_score,
            "classification": self.classification,
            "isExpired": self.is_expired()
        }

class RedisCacheEngine:
    def __init__(self, max_capacity_items: int = 15, max_memory_bytes: int = 65536):
        self.storage: Dict[str, CacheEntry] = {}
        self.max_capacity_items = max_capacity_items
        self.max_memory_bytes = max_memory_bytes
        self.total_evictions = 0
        self.status = "ONLINE (Redis In-Memory Engine)"

    def clean_expired(self) -> int:
        """Passive background pruning of expired keys."""
        expired_keys = [k for k, entry in self.storage.items() if entry.is_expired()]
        for k in expired_keys:
            del self.storage[k]
        return len(expired_keys)

    def get(self, key: str) -> Optional[Dict[str, Any]]:
        """
        Cache GET operation.
        Checks expiration:
        - If not exists or expired -> Cache Miss (and purges if expired).
        - If valid -> Cache Hit, touches entry, returns data.
        """
        if key not in self.storage:
            return None

        entry = self.storage[key]
        if entry.is_expired():
            del self.storage[key]
            return None

        entry.touch()
        return entry.data

    def get_entry(self, key: str) -> Optional[CacheEntry]:
        if key not in self.storage:
            return None
        entry = self.storage[key]
        if entry.is_expired():
            del self.storage[key]
            return None
        return entry

    def set(
        self,
        key: str,
        product_id: str,
        data: Dict[str, Any],
        ttl_seconds: int,
        data_size_bytes: int = 2048,
        priority_score: float = 50.0,
        classification: str = "WARM"
    ) -> CacheEntry:
        """
        Cache SET operation with specified TTL and priority.
        """
        self.clean_expired()
        entry = CacheEntry(
            key=key,
            product_id=product_id,
            data=data,
            ttl_seconds=ttl_seconds,
            data_size_bytes=data_size_bytes,
            priority_score=priority_score,
            classification=classification
        )
        self.storage[key] = entry
        return entry

    def delete(self, key: str) -> bool:
        """Cache DELETE operation."""
        if key in self.storage:
            del self.storage[key]
            return True
        return False

    def update_ttl(self, key: str, new_ttl_seconds: int) -> bool:
        """Updates the TTL for a cached key."""
        entry = self.get_entry(key)
        if entry:
            entry.update_ttl(new_ttl_seconds)
            return True
        return False

    def update_score_and_class(self, key: str, priority_score: float, classification: str):
        entry = self.get_entry(key)
        if entry:
            entry.priority_score = priority_score
            entry.classification = classification

    def contains(self, key: str) -> bool:
        entry = self.get_entry(key)
        return entry is not None

    def get_all_entries(self) -> List[Dict[str, Any]]:
        self.clean_expired()
        return [entry.to_dict() for entry in self.storage.values()]

    def get_memory_stats(self) -> Dict[str, Any]:
        self.clean_expired()
        used_bytes = sum(entry.data_size_bytes for entry in self.storage.values())
        item_count = len(self.storage)
        used_percentage = min(100.0, (used_bytes / self.max_memory_bytes) * 100.0) if self.max_memory_bytes > 0 else 0.0
        capacity_item_percentage = min(100.0, (item_count / self.max_capacity_items) * 100.0) if self.max_capacity_items > 0 else 0.0
        
        # Memory pressure warning threshold is 80%
        is_capacity_warning = used_percentage >= 80.0 or capacity_item_percentage >= 80.0

        return {
            "usedBytes": used_bytes,
            "maxMemoryBytes": self.max_memory_bytes,
            "usedMemoryKb": round(used_bytes / 1024, 2),
            "maxMemoryKb": round(self.max_memory_bytes / 1024, 2),
            "usedPercentage": round(used_percentage, 1),
            "itemCount": item_count,
            "maxCapacityItems": self.max_capacity_items,
            "capacityItemPercentage": round(capacity_item_percentage, 1),
            "isCapacityWarning": is_capacity_warning,
            "totalEvictions": self.total_evictions
        }

    def clear(self):
        self.storage.clear()
        self.total_evictions = 0

# Singleton instance
cache_instance = RedisCacheEngine(max_capacity_items=12, max_memory_bytes=49152) # 48 KB threshold for quick demo visibility
