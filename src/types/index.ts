export type NavigationTab = 
  | 'dashboard' 
  | 'cache' 
  | 'traffic' 
  | 'prediction' 
  | 'cost' 
  | 'logs' 
  | 'settings';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  popularity: number;
  requestFrequency: number;
  lastAccessed: number;
  dataSize: number;
  databaseRetrievalCost: number;
  description: string;
  imageUrl: string;
  specs: Record<string, string>;
  isCached?: boolean;
  cachedEntry?: CacheEntry;
  dynamicClassification?: 'HOT' | 'WARM' | 'COLD';
  dynamicPopularityScore?: number;
  dynamicPriorityScore?: number;
  recommendedTTL?: number;
  decisionReason?: string;
  recentRequests60s?: number;
  totalRequests?: number;
  hitRate?: number;
}

export interface CacheEntry {
  key: string;
  productId: string;
  data: Product;
  createdAt: number;
  lastAccessed: number;
  ttlSeconds: number;
  remainingTtlSeconds: number;
  expiresAt: number;
  dataSizeBytes: number;
  accessCount: number;
  priorityScore: number;
  classification: 'HOT' | 'WARM' | 'COLD';
  isExpired: boolean;
}

export interface MemoryStats {
  usedBytes: number;
  maxMemoryBytes: number;
  usedMemoryKb: number;
  maxMemoryKb: number;
  usedPercentage: number;
  itemCount: number;
  maxCapacityItems: number;
  capacityItemPercentage: number;
  isCapacityWarning: boolean;
  totalEvictions: number;
}

export interface TrafficSimulatorStatus {
  isRunning: boolean;
  mode: 'NORMAL' | 'HIGH' | 'SPIKE';
  targetIntervalSec: number;
}

export interface SystemMetrics {
  totalRequests: number;
  cacheHits: number;
  cacheMisses: number;
  cacheHitRate: number;
  cacheMissRate: number;
  databaseRequestsAvoided: number;
  databaseLoadReductionPercent: number;
  averageResponseTimeMs: number;
  avgHitLatencyMs: number;
  avgMissLatencyMs: number;
  totalEvictions: number;
  activeCachedKeys: number;
  memoryUsedBytes: number;
  costPerDbQuery: number;
  costPerCacheLookup: number;
  estimatedDatabaseCostNoCache: number;
  estimatedDatabaseCostActual: number;
  estimatedDatabaseCostSavings: number;
  estimatedCacheInfrastructureCost: number;
  netEstimatedSavings: number;
  roiMultiplier: number;
  isCostEstimated: boolean;
  memoryStats: MemoryStats;
  trafficSimulator: TrafficSimulatorStatus;
  isSpikeDetected: boolean;
}

export interface TrafficTimeSeriesPoint {
  time: string;
  requests: number;
  hits: number;
  misses: number;
  hitRate: number;
}

export interface TrafficSummary {
  currentRps: number;
  windowTotalRequests: number;
  windowHits: number;
  windowMisses: number;
  windowHitRate: number;
  isSpikeDetected: boolean;
  categoryBreakdown: Record<string, number>;
  hotProducts: string[];
  coldProducts: string[];
  timeSeries: TrafficTimeSeriesPoint[];
}

export interface ActivityLog {
  id: string;
  timestamp: number;
  eventType: 
    | 'CACHE_HIT' 
    | 'CACHE_MISS' 
    | 'DATA_STORED' 
    | 'TTL_UPDATED' 
    | 'EVICTION' 
    | 'TRAFFIC_SPIKE' 
    | 'COST_SAVING' 
    | 'CAPACITY_WARNING'
    | 'SYSTEM';
  title: string;
  description: string;
  metadata: Record<string, any>;
}

export interface RequestRecord {
  requestId: string;
  productId: string;
  productName: string;
  category: string;
  status: 'CACHE HIT' | 'CACHE MISS';
  isHit: boolean;
  source: string;
  latencyMs: number;
  timestamp: number;
  priorityScore: number;
  classification: 'HOT' | 'WARM' | 'COLD';
  allocatedTtl: number;
}

export interface SubsystemHealth {
  name: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  type: string;
}

export interface SystemHealth {
  status: string;
  timestamp: number;
  subsystems: {
    apiGateway: SubsystemHealth;
    smartCacheMiddleware: SubsystemHealth;
    redisCache: SubsystemHealth;
    productDatabase: SubsystemHealth;
    analyticsEngine: SubsystemHealth;
    costAndMetricsEngine: SubsystemHealth;
  };
}

export interface EngineSettings {
  costPerDbQuery: number;
  costPerCacheLookup: number;
  hotTtlSeconds: number;
  warmTtlSeconds: number;
  coldTtlSeconds: number;
  maxCacheCapacity: number;
}

export interface DemoStepResult {
  stepNumber: number;
  explanation: string;
  result: any;
  currentMetrics: SystemMetrics;
}

// --- Legacy Interfaces for full backward compatibility ---
export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'es' | 'fr';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  features: string[];
  gradient: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
  impact: string;
  techStack: string[];
  liveDemoUrl?: string;
  caseStudy: {
    challenge: string;
    solution: string;
    results: string[];
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  review: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
}

export interface CareerPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

