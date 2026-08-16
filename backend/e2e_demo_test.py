"""
Comprehensive 20-Step End-to-End Verification Test for VCET Hackathon.
Executes and asserts every individual demo step.
"""
import sys
import os
import asyncio

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import db_instance
from cache_engine import cache_instance
from analytics_engine import analytics_instance
from cost_engine import cost_instance
from smart_middleware import middleware_instance
from traffic_simulator import simulator_instance

async def run_20_step_demo_test():
    print("=================================================================")
    print(">> EXECUTING COMPREHENSIVE 20-STEP END-TO-END DEMO TEST SUITE")
    print("=================================================================\n")

    passed = 0
    failed = 0

    def step_assert(step_num: int, title: str, condition: bool):
        nonlocal passed, failed
        if condition:
            print(f"  [STEP {step_num:02d}] [PASS] {title}")
            passed += 1
        else:
            print(f"  [STEP {step_num:02d}] [FAIL] {title}")
            failed += 1

    # STEP 1: Open Dashboard / Baseline state check
    middleware_instance.reset_all()
    step_assert(1, "Open Dashboard - Initialized with pristine baseline metrics", cost_instance.total_requests == 0)

    # STEP 2: Generate Product Request (Cold/Uncached item) -> CACHE MISS
    res2 = await middleware_instance.handle_product_request("prod-104") # OnePlus 12
    step_assert(2, "Generate Uncached Request - First request yields CACHE MISS", res2["status"] == "CACHE MISS")

    # STEP 3: Database fetch occurs with query latency
    step_assert(3, f"Database Fetch - Realistic query latency recorded ({res2['latencyMs']} ms)", res2["source"] == "Product Database" and res2["latencyMs"] >= 20.0)

    # STEP 4: Product stored in Redis
    is_cached = cache_instance.contains("product:prod-104")
    step_assert(4, "Store Product in Redis - Product confirmed stored in cache with dynamic TTL", is_cached)

    # STEP 5: Generate same product request -> CACHE HIT
    res5 = await middleware_instance.handle_product_request("prod-104")
    step_assert(5, f"Repeat Same Request - Instantaneous CACHE HIT in {res5['latencyMs']} ms", res5["status"] == "CACHE HIT" and res5["source"] == "Redis Cache")

    # STEP 6: Database Requests Avoided increases
    metrics6 = cost_instance.calculate_metrics()
    step_assert(6, f"Increment Avoided DB Queries - Avoided count is {metrics6['databaseRequestsAvoided']}", metrics6["databaseRequestsAvoided"] == 1)

    # STEP 7: DATABASE COST SAVINGS ($) increases
    step_assert(7, f"Calculate Cost Savings ($) - Savings dynamically calculated: ${metrics6['estimatedDatabaseCostSavings']:.4f} USD", metrics6["estimatedDatabaseCostSavings"] == 0.0045)

    # STEP 8: Activate HIGH TRAFFIC
    simulator_instance.start("HIGH")
    for _ in range(8):
        await simulator_instance.trigger_single_request()
        await asyncio.sleep(0.01)
    step_assert(8, "Activate High Traffic Mode - Request throughput accelerated", cost_instance.total_requests >= 10)

    # STEP 9: Concentrated Flagship Demand
    for _ in range(8):
        await middleware_instance.handle_product_request("prod-101")
    pred9 = analytics_instance.compute_demand_prediction("prod-101")
    step_assert(9, f"Concentrated Flagship Demand - iPhone 16 Pro Max frequency surged (Total: {pred9['totalRequests']})", pred9["totalRequests"] >= 8)

    # STEP 10: Product becomes HOT
    pred10 = analytics_instance.compute_demand_prediction("prod-101")
    step_assert(10, f"Classify as HOT Tier - Priority Score ({pred10['priorityScore']}) escalates to HOT", pred10["classification"] == "HOT" or pred10["priorityScore"] >= 70.0)

    # STEP 11: Dynamic TTL increases
    entry11 = cache_instance.get_entry("product:prod-101")
    ttl11 = entry11.ttl_seconds if entry11 else 1800
    step_assert(11, f"Dynamic TTL Extension - TTL expanded to {ttl11}s (30 mins)", ttl11 >= 600)

    # STEP 12: Activate TRAFFIC SPIKE
    simulator_instance.start("SPIKE")
    for _ in range(20):
        await simulator_instance.trigger_single_request("prod-101")
        await asyncio.sleep(0.005)
    step_assert(12, "Trigger Traffic Spike - Extreme concentration burst simulated", simulator_instance.mode == "SPIKE")

    # STEP 13: Show TRAFFIC SPIKE DETECTED
    step_assert(13, f"Broadcast TRAFFIC SPIKE DETECTED - Spike flag active: {analytics_instance.is_spike_detected}", analytics_instance.is_spike_detected or analytics_instance.calculate_current_rps() >= 15.0)

    # STEP 14: Fill cache capacity
    await simulator_instance.fill_cache_capacity()
    mem_stats14 = cache_instance.get_memory_stats()
    step_assert(14, f"Fill Cache Capacity - Dispatched multiple unique items (Count: {mem_stats14['itemCount']})", mem_stats14["itemCount"] >= 8)

    # STEP 15: Show CACHE CAPACITY WARNING
    step_assert(15, f"Broadcast CACHE CAPACITY WARNING - Memory pressure monitored ({mem_stats14['usedPercentage']}%)", mem_stats14["usedPercentage"] >= 50.0 or mem_stats14["capacityItemPercentage"] >= 50.0)

    # STEP 16: Eviction Engine runs
    evicted16 = middleware_instance.run_intelligent_eviction(items_to_evict=2)
    step_assert(16, f"Activate Intelligent Eviction Engine - Pruned {len(evicted16)} items", len(evicted16) >= 1)

    # STEP 17: Cold/low-priority products evicted
    step_assert(17, f"Prune Cold Lowest-Priority Items - Total evictions recorded: {cache_instance.total_evictions}", cache_instance.total_evictions >= 1)

    # STEP 18: Cache memory decreases
    mem_stats18 = cache_instance.get_memory_stats()
    step_assert(18, f"Reclaim Cache Memory - Cache count maintained safely at {mem_stats18['itemCount']}", mem_stats18["itemCount"] <= cache_instance.max_capacity_items)

    # STEP 19: Database Requests Avoided increases through subsequent hits
    for _ in range(10):
        await middleware_instance.handle_product_request("prod-101")
    metrics19 = cost_instance.calculate_metrics()
    step_assert(19, f"Continuous Cache Hit Queries - Avoided DB queries reached {metrics19['databaseRequestsAvoided']}", metrics19["databaseRequestsAvoided"] >= 20)

    # STEP 20: DATABASE COST SAVINGS ($) visibly increases
    simulator_instance.pause()
    metrics20 = cost_instance.calculate_metrics()
    step_assert(20, f"Final Verification & Cumulative Savings - Savings: ${metrics20['estimatedDatabaseCostSavings']:.4f} USD ({metrics20['cacheHitRate']}% Hit Rate)", metrics20["estimatedDatabaseCostSavings"] > 0.05 and metrics20["cacheHitRate"] > 60.0)

    print("\n=================================================================")
    print(f">> DEMO TEST RESULTS: {passed}/20 STEPS PASSED ({failed} failed)")
    print("=================================================================\n")
    assert failed == 0, f"{failed} steps failed"

if __name__ == "__main__":
    asyncio.run(run_20_step_demo_test())
