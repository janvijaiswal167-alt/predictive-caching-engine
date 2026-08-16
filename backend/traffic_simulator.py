"""
Traffic Simulator for Predictive Cloud-Cost Caching Engine.
Generates authentic traffic patterns through the Smart Cache Middleware.
Supports:
- NORMAL TRAFFIC (~6-10 req/s)
- HIGH TRAFFIC (~25-35 req/s)
- TRAFFIC SPIKE (~75-95 req/s)
- Single Request Dispatcher
"""
import time
import random
import asyncio
from typing import Dict, Any, Optional

from database import db_instance
from smart_middleware import middleware_instance

class TrafficSimulator:
    def __init__(self):
        self.is_running = False
        self.mode = "NORMAL" # "NORMAL", "HIGH", "SPIKE"
        self.task: Optional[asyncio.Task] = None
        self.target_interval_sec = 0.15 # Delay between requests (adjusted by mode)
        
        # Product distribution tiers for realistic traffic generation
        self.flagship_ids = ["prod-101", "prod-102", "prod-201", "prod-301", "prod-501"]
        self.popular_ids = ["prod-103", "prod-204", "prod-302", "prod-401", "prod-503", "prod-601"]
        self.niche_ids = ["prod-104", "prod-202", "prod-303", "prod-402", "prod-603"]
        self.cold_ids = ["prod-701", "prod-702", "prod-703", "prod-704", "prod-705", "prod-706", "prod-707", "prod-708", "prod-709", "prod-710", "prod-711", "prod-712", "prod-713", "prod-714"]

    def _select_product_for_mode(self) -> str:
        r = random.random()
        if self.mode == "SPIKE":
            # 85% concentration on top 2 flagship products
            if r < 0.85:
                return random.choice(["prod-101", "prod-501"])
            elif r < 0.95:
                return random.choice(self.flagship_ids)
            else:
                return random.choice(self.popular_ids)
        elif self.mode == "HIGH":
            # 60% flagship, 30% popular, 10% niche
            if r < 0.60:
                return random.choice(self.flagship_ids)
            elif r < 0.90:
                return random.choice(self.popular_ids)
            else:
                return random.choice(self.niche_ids)
        else: # NORMAL
            # 45% flagship, 35% popular, 15% niche, 5% cold
            if r < 0.45:
                return random.choice(self.flagship_ids)
            elif r < 0.80:
                return random.choice(self.popular_ids)
            elif r < 0.95:
                return random.choice(self.niche_ids)
            else:
                return random.choice(self.cold_ids)

    async def _simulation_loop(self):
        while self.is_running:
            try:
                prod_id = self._select_product_for_mode()
                # Run through Smart Cache Middleware
                await middleware_instance.handle_product_request(prod_id)
                
                # Determine interval by mode
                if self.mode == "SPIKE":
                    interval = random.uniform(0.010, 0.025) # ~60-80 req/s
                elif self.mode == "HIGH":
                    interval = random.uniform(0.035, 0.065) # ~20-30 req/s
                else: # NORMAL
                    interval = random.uniform(0.100, 0.180) # ~6-10 req/s
                    
                await asyncio.sleep(interval)
            except asyncio.CancelledError:
                break
            except Exception as e:
                print(f"[Traffic Simulator] Error: {e}")
                await asyncio.sleep(0.5)

    def start(self, mode: str = "NORMAL"):
        self.mode = mode.upper()
        if not self.is_running:
            self.is_running = True
            self.task = asyncio.create_task(self._simulation_loop())

    def pause(self):
        self.is_running = False
        if self.task and not self.task.done():
            self.task.cancel()
            self.task = None

    def set_mode(self, mode: str):
        self.mode = mode.upper()

    def reset(self):
        self.pause()
        self.mode = "NORMAL"

    async def trigger_single_request(self, product_id: Optional[str] = None) -> Dict[str, Any]:
        """Dispatches a single realistic product request through the middleware."""
        if not product_id:
            product_id = random.choice(self.flagship_ids + self.popular_ids)
        return await middleware_instance.handle_product_request(product_id)

    async def fill_cache_capacity(self) -> List[Dict[str, Any]]:
        """Sends unique cold products in rapid succession to fill cache capacity and demonstrate eviction."""
        results = []
        for prod_id in self.cold_ids[:10]:
            res = await middleware_instance.handle_product_request(prod_id)
            results.append(res)
            await asyncio.sleep(0.01)
        return results

    def get_status(self) -> Dict[str, Any]:
        return {
            "isRunning": self.is_running,
            "mode": self.mode,
            "targetIntervalSec": self.target_interval_sec
        }

# Singleton instance
simulator_instance = TrafficSimulator()
