# Predictive Cloud-Cost Caching Engine

> **Tagline**: *"Predict demand. Optimize cache. Reduce database load. Save cloud cost."*

---

## 🏆 Project Overview

The **Predictive Cloud-Cost Caching Engine** is a full-stack, AI/ML-powered cloud infrastructure optimization platform designed to maximize caching efficiency, avoid repetitive database queries, and achieve measurable, deterministic **Estimated Database Cost Savings ($)**.

### Core Value Pipeline

```
HIGH CACHE HIT RATE
        ↓
FEWER DATABASE REQUESTS
        ↓
DATABASE REQUESTS AVOIDED
        ↓
LOWER DATABASE LOAD
        ↓
ESTIMATED DATABASE COST SAVINGS ($)
```

The central visual and operational anchor of the platform is **`DATABASE COST SAVINGS ($)`**, dynamically calculated from live cache hit events.

---

## 🏛️ Exact System Architecture

```
USERS / CLIENT APPLICATIONS
             ↓
  REACT + VITE DASHBOARD
             ↓
FASTAPI APPLICATION SERVER / API GATEWAY
             ↓
   SMART CACHE MIDDLEWARE
  ┌──────────────────────────────────────────────┐
  │ 1. Request Tracking Buffer                   │
  │ 2. Deterministic Cache Decision Engine       │
  │ 3. Dynamic TTL Manager (HOT/WARM/COLD)       │
  │ 4. Intelligent Eviction Engine               │
  │ 5. Real-Time Metrics Collector               │
  └──────────────────────────────────────────────┘
             ↓
     CHECK REDIS CACHE
    /                 \
[CACHE HIT]       [CACHE MISS]
   /                     \
Return from Redis     Query Product Database (~35ms)
Record Metrics        Store Product in Redis with Dynamic TTL
                           \
                      Return Data & Record Metrics
             ↓
ANALYTICS & DEMAND ENGINE (Python ML)
             ↓
COST & METRICS ENGINE (Deterministic Math Model)
             ↓
ADMIN DASHBOARD (Recharts Live Visualization)
```

---

## 🧮 Mathematical Cloud Cost Model

All cost savings calculations are strictly deterministic and derived directly from live request records:

$$\text{Estimated DB Cost Savings } (\$) = \text{Database Requests Avoided} \times \text{Cost Per DB Query}$$

### Core Accounting Equations:
1. $\text{Database Requests Avoided} = \text{Total Cache Hits } (H)$
2. $\text{Cost without Caching} = \text{Total Requests } (N) \times C_{\text{db}}$
3. $\text{Actual Database Cost} = \text{Cache Misses } (M) \times C_{\text{db}}$
4. $\text{Redis Cache Cost} = (N \times C_{\text{cache}}) + (\text{Active Keys} \times C_{\text{mem}})$
5. $\text{Net Estimated Savings} = \max(0, \text{Cost without Caching} - (\text{Actual DB Cost} + \text{Redis Cache Cost}))$
6. $\text{Database Load Reduction } (\%) = \left(\frac{H}{N}\right) \times 100$

*Default Configurable Rates: $C_{\text{db}} = \$0.0045/\text{query}$, $C_{\text{cache}} = \$0.00015/\text{lookup}$.*

---

## 🧠 AI/ML Demand Prediction & Priority Scoring

Every catalog product receives an explainable Priority Score $(0 - 100)$ computed deterministically from 5 weighted features:

| Feature Component | Weight | Description |
| :--- | :---: | :--- |
| **1. Request Frequency** | **35%** | Recent queries in sliding 60s window |
| **2. Access Recency** | **20%** | Exponential time decay: $\exp(-\Delta t / 45\text{s})$ |
| **3. Cache Hit Rate** | **20%** | Proven cache avoidance efficacy |
| **4. Total Volume** | **15%** | Historical catalog prominence: $\log(1 + N_{\text{total}})$ |
| **5. Traffic Spike Boost** | **10%** | Multiplier triggered on sudden request surges |

### Dynamic Classification & TTL Policy:
- 🔥 **HOT TIER** (Score $\ge 75$): Allocated **1800s (30 mins)** TTL to shield against continuous database load.
- ⚡ **WARM TIER** (Score $40 - 74.9$): Allocated **600s (10 mins)** TTL with periodic re-evaluation.
- ❄️ **COLD TIER** (Score $< 40$): Allocated **120s (2 mins)** TTL; primary candidate for intelligent eviction under memory pressure.

---

## 🚀 Navigation & Dashboard Sections

The React admin dashboard features 7 functional views:

1. **Dashboard**: Executive overview, Primary Savings Hero card, Key Performance Indicators, 4 Recharts graphs, and live activity stream.
2. **Cache Management**: Interactive product intelligence table with `VIEW`, `CACHE`, `REMOVE`, `RECALCULATE`, and `UPDATE TTL` actions.
3. **Traffic Analyzer**: Real-time request rate throughput (RPS), Traffic Spike detection banner, and category breakdown.
4. **Prediction / Analytics**: Machine learning demand feature importance, HOT/WARM/COLD clustering, and scoring breakdown.
5. **Cost & Metrics**: Detailed cloud economics accounting, mathematical formula breakdown, and Net ROI multiplier.
6. **Activity Logs**: Real-time filterable audit trail for Hits, Misses, TTL updates, Evictions, Spikes, and Savings.
7. **System Settings**: Configurable sliders for DB query cost, Redis lookup cost, TTL tier durations, and cache capacity limits.

---

## ⚡ How to Run the Project

### 1. Start Backend Server (Python FastAPI)
```bash
python -m uvicorn backend.app:app --host 127.0.0.1 --port 8000
```
*API Swagger Documentation is available at `http://127.0.0.1:8000/docs`.*

### 2. Start Frontend Development Server (React + Vite)
```bash
npm run dev
```
*Open `http://localhost:3000` in your web browser.*

### 3. Run Automated Integration Tests
```bash
python backend/test_backend.py
```

---

## 🎬 20-Step Live Hackathon Judge Demo Sequence

Click the **"JUDGE DEMO MODE"** button in the top navigation or follow these steps:

1. **Open Dashboard** &rarr; Verify clean baseline state.
2. **Request Product A** (Uncached item) &rarr; `CACHE MISS` recorded with ~35ms DB latency.
3. **Database Fetch Occurs** &rarr; Product fetched from catalog database.
4. **Store in Redis** &rarr; Product cached with initial dynamic TTL.
5. **Request Product A Again** &rarr; Instantaneous `CACHE HIT` in <2ms (30x faster!).
6. **Database Requests Avoided Increases** &rarr; Avoided counter increments to +1.
7. **Estimated Database Cost Savings ($) Increases** &rarr; Savings increases by $+0.0045.
8. **Activate HIGH TRAFFIC** &rarr; Throughput accelerates to ~30 req/s.
9. **Request Frequency Surges** &rarr; Flagship products receive concentrated queries.
10. **Product Becomes HOT** &rarr; Priority score escalates above 75.
11. **TTL Increases Dynamically** &rarr; TTL expands to 1800s (30m).
12. **Activate TRAFFIC SPIKE** &rarr; Request surge hits ~85 req/s.
13. **TRAFFIC SPIKE DETECTED Banner** &rarr; System detects spike and escalates cache protection.
14. **Fill Cache Key Capacity** &rarr; Dispatch cold accessory items to stress memory.
15. **CACHE CAPACITY WARNING (>80%)** &rarr; Memory utilization crosses threshold.
16. **Intelligent Eviction Engine Runs** &rarr; Priority scores evaluated across all cached keys.
17. **Cold Products Evicted First** &rarr; Low-score dormant items pruned, protecting hot items.
18. **Cache Memory Decreases** &rarr; Memory utilization safely drops back below danger threshold.
19. **Continuous Cache Hits** &rarr; Subsequent traffic hits Redis, continuously avoiding database loads.
20. **DATABASE COST SAVINGS ($) Visibly Increases** &rarr; Cumulative cost savings achieved and verified.
