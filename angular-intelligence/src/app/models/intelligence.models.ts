export type Category = 'Food' | 'Retail' | 'Services' | 'Transport' | 'Education';
export type SignalType = 'Search' | 'Discussion' | 'Request' | 'Review';
export type TrendStrengthLevel = 'Low' | 'Medium' | 'High';
export type ConvergenceLevel = 'Weak' | 'Moderate' | 'Strong';
export type OpportunityGapLevel = 'Low' | 'Medium' | 'High' | 'Low-confidence';
export type DiscoverableSupplyLevel = 'Limited' | 'Partial' | 'Strong';

export interface LocalityInfo {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  description: string;
}

export interface Trend {
  id: string;
  topic: string;
  category: Category;
  locality: string;
  lat: number;
  lng: number;
  trend_strength: TrendStrengthLevel;
  convergence: ConvergenceLevel;
  opportunity_gap: OpportunityGapLevel;
  status: string;
  detected_at: string;
  recent_growth: 'High' | 'Moderate' | 'Low';
  source_diversity: 'Multiple' | 'Moderate' | 'Single';
  geographic_concentration: 'High' | 'Medium' | 'Dispersed';
  discoverable_supply: DiscoverableSupplyLevel;
  signals: {
    search: string;
    discussion: string;
    requests: string;
    reviews: string;
  };
  metrics: {
    recorded_searches: number;
    discussion_mentions: number;
    direct_requests: number;
    related_reviews: number;
    pilot_window_days: number;
    growth_percentage: number;
  };
  suggested_action: string;
  summary: string;
  supply_details: {
    discoverable_count: number;
    statement: string;
  };
  is_spike?: boolean;
}

export interface Signal {
  id: string;
  source: string;
  text: string;
  category: Category;
  location: string;
  locality: string;
  lat: number;
  lng: number;
  timestamp: string;
  signal_type: SignalType;
  normalized_topic: string;
  growth_indicator?: string;
  frequency?: number;
}

export interface EvidenceSource {
  id: string;
  trend_id: string;
  source_type: string;
  signal_count: number;
  direction: string;
  timestamp: string;
  note: string;
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  location: string;
  locality: string;
  lat: number;
  lng: number;
  contact: string;
  services: string[];
  availability_status: 'Active' | 'Limited' | 'Inactive';
  rating?: number;
}
