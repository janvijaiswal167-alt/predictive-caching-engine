"""
Automated Comprehensive Test Suite for Predictive Cloud-Cost Caching Engine Backend.
"""
import sys
import os
import asyncio

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import db_instance
from cache_engine import cache_instance
from analytics_engine import analytics_instance
from cost_engine import cost_instance
from smart_middleware import middleware_instance
from traffic_simulator import simulator_instance

async def run_tests():
    print("=================================================================")
    print(">> RUNNING BACKEND INTEGRATION TEST SUITE")
    print("=================================================================\n")
    
    # Test 1: Catalog Size
    prod_count = db_instance.get_product_count()
    assert prod_count >= 20, f"Expected at least 20 products, got {prod_count}"
    print(f"[PASS] Test 1: Product database initialized with {prod_count} catalog items.")

    # Reset system to clean slate
    middleware_instance.reset_all()

    # Test 2: First request -> Cache Miss
    res1 = await middleware_instance.handle_product_request("prod-101")
    assert res1["status"] == "CACHE MISS", f"Expected CACHE MISS, got {res1['status']}"
    assert res1["source"] == "Product Database", f"Expected Database source, got {res1['source']}"
    assert res1["latencyMs"] >= 20.0, f"Expected realistic DB query latency, got {res1['latencyMs']} ms"
    print(f"[PASS] Test 2: First request yielded CACHE MISS with realistic DB latency ({res1['latencyMs']} ms).")

    # Test 3: Second request -> Cache Hit
    res2 = await middleware_instance.handle_product_request("prod-101")
    assert res2["status"] == "CACHE HIT", f"Expected CACHE HIT, got {res2['status']}"
    assert res2["source"] == "Redis Cache", f"Expected Redis Cache source, got {res2['source']}"
    assert res2["latencyMs"] < 15.0, f"Expected fast cache latency, got {res2['latencyMs']} ms"
    print(f"[PASS] Test 3: Second request yielded CACHE HIT in {res2['latencyMs']} ms (Avoided DB fetch!).")

    # Test 4: Cost calculation & database requests avoided
    metrics = cost_instance.calculate_metrics()
    assert metrics["databaseRequestsAvoided"] == 1, f"Expected 1 avoided request, got {metrics['databaseRequestsAvoided']}"
    assert metrics["estimatedDatabaseCostSavings"] > 0, "Cost savings should be positive"
    expected_savings = 1 * cost_instance.settings.cost_per_db_query
    assert abs(metrics["estimatedDatabaseCostSavings"] - expected_savings) < 1e-6
    print(f"[PASS] Test 4: Cost savings calculation verified: ${metrics['estimatedDatabaseCostSavings']:.4f} USD.")

    # Test 5: Dynamic TTL & Classification promotion on burst requests
    for _ in range(10):
        await middleware_instance.handle_product_request("prod-101")
    pred = analytics_instance.compute_demand_prediction("prod-101")
    assert pred["classification"] in ["HOT", "WARM"], f"Expected HOT or WARM, got {pred['classification']}"
    assert pred["recommendedTTL"] >= 600, f"Expected boosted TTL, got {pred['recommendedTTL']}"
    print(f"[PASS] Test 5: Dynamic TTL increased to {pred['recommendedTTL']}s and classification is {pred['classification']}.")

    # Test 6: Capacity warning & Intelligent Eviction
    # Max capacity is set to 12. Let's push 15 unique cold products
    for i in range(1, 15):
        cold_id = f"prod-7{i:02d}"
        if cold_id in db_instance.products:
            await middleware_instance.handle_product_request(cold_id)
            
    mem_stats = cache_instance.get_memory_stats()
    assert cache_instance.total_evictions >= 1, "Expected at least 1 eviction when exceeding capacity"
    print(f"[PASS] Test 6: Intelligent Eviction triggered. Total evictions: {cache_instance.total_evictions}.")

    # Test 7: Traffic Simulator
    simulator_instance.start("HIGH")
    await asyncio.sleep(0.5)
    simulator_instance.pause()
    assert cost_instance.total_requests > 15, "Simulator should have generated requests"
    print(f"[PASS] Test 7: Traffic simulator generated requests (Total: {cost_instance.total_requests}).")

    # Test 8: System Reset
    middleware_instance.reset_all()
    assert cost_instance.total_requests == 0
    assert len(cache_instance.storage) == 0
    print("[PASS] Test 8: Full system reset successfully restored clean baseline state.")

    print("\n=================================================================")
    print("[SUCCESS] ALL 8 BACKEND INTEGRATION TESTS PASSED PERFECTLY!")
    print("=================================================================\n")

if __name__ == "__main__":
    asyncio.run(run_tests())
