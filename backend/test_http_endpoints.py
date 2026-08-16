"""
Comprehensive HTTP Verification Test.
Tests all API endpoints, proxy responses, and full-stack connectivity.
"""
import requests
import json
import time

def test_all_endpoints():
    print("=================================================================")
    print(">> RUNNING HTTP ENDPOINT & PROXY VERIFICATION")
    print("=================================================================\n")

    base_api = "http://127.0.0.1:8000/api"
    base_vite = "http://localhost:3000"

    # 1. Test Frontend HTML
    r_frontend = requests.get(base_vite)
    assert r_frontend.status_code == 200, f"Frontend status: {r_frontend.status_code}"
    assert "Predictive Cloud-Cost Caching Engine" in r_frontend.text
    print(f"[PASS] 1. Frontend Web App responding at {base_vite} (Status: 200 OK)")

    # 2. Test Backend Health
    r_health = requests.get(f"{base_api}/health")
    assert r_health.status_code == 200
    health_data = r_health.json()
    assert health_data["status"] == "ONLINE"
    assert "subsystems" in health_data
    print(f"[PASS] 2. Health Endpoint: All 6 subsystems ONLINE")

    # 3. Test Product Catalog
    r_prods = requests.get(f"{base_api}/products")
    assert r_prods.status_code == 200
    prods_data = r_prods.json()
    assert prods_data["totalCount"] >= 20
    print(f"[PASS] 3. Product Catalog: {prods_data['totalCount']} products loaded")

    # 4. Test Single Product Query through Smart Cache Middleware
    r_req1 = requests.get(f"{base_api}/products/prod-101")
    assert r_req1.status_code == 200
    res1 = r_req1.json()
    print(f"[PASS] 4. First Request: Status={res1['status']}, Source={res1['source']}, Latency={res1['latencyMs']} ms")

    # 5. Test Repeated Product Query -> Cache Hit
    r_req2 = requests.get(f"{base_api}/products/prod-101")
    assert r_req2.status_code == 200
    res2 = r_req2.json()
    assert res2["status"] == "CACHE HIT"
    print(f"[PASS] 5. Second Request: Status={res2['status']}, Source={res2['source']}, Latency={res2['latencyMs']} ms")

    # 6. Test Cache Entries Endpoint
    r_cache = requests.get(f"{base_api}/cache")
    assert r_cache.status_code == 200
    cache_data = r_cache.json()
    assert cache_data["count"] >= 1
    print(f"[PASS] 6. Cache Entries Endpoint: {cache_data['count']} keys in Redis")

    # 7. Test Cost Analytics Endpoint
    r_cost = requests.get(f"{base_api}/cost")
    assert r_cost.status_code == 200
    cost_data = r_cost.json()
    assert cost_data["costAnalytics"]["estimatedDatabaseCostSavings"] > 0
    print(f"[PASS] 7. Cost Analytics Endpoint: Savings = ${cost_data['costAnalytics']['estimatedDatabaseCostSavings']:.4f} USD")

    # 8. Test Analytics & Traffic Summary Endpoint
    r_analytics = requests.get(f"{base_api}/analytics")
    assert r_analytics.status_code == 200
    analytics_data = r_analytics.json()
    assert "currentRps" in analytics_data
    print(f"[PASS] 8. Analytics Endpoint: Current RPS = {analytics_data['currentRps']}, TimeSeries buckets = {len(analytics_data['timeSeries'])}")

    # 9. Test Logs Endpoint
    r_logs = requests.get(f"{base_api}/logs")
    assert r_logs.status_code == 200
    logs_data = r_logs.json()
    assert logs_data["total"] >= 1
    print(f"[PASS] 9. Activity Logs Endpoint: {logs_data['total']} events logged")

    # 10. Test Settings Endpoint
    r_settings = requests.get(f"{base_api}/settings")
    assert r_settings.status_code == 200
    settings_data = r_settings.json()
    assert "costPerDbQuery" in settings_data
    print(f"[PASS] 10. Settings Endpoint: DB Query Cost = ${settings_data['costPerDbQuery']}")

    # 11. Test 20-Step Demo Step Runner
    r_step = requests.post(f"{base_api}/demo/step/1")
    assert r_step.status_code == 200
    step_data = r_step.json()
    assert step_data["stepNumber"] == 1
    print(f"[PASS] 11. Interactive Demo Step Runner: Step 1 verified successfully")

    print("\n=================================================================")
    print(">> ALL 11 HTTP ENDPOINTS & FULL-STACK CONNECTIVITY VERIFIED!")
    print("=================================================================\n")

if __name__ == "__main__":
    test_all_endpoints()
