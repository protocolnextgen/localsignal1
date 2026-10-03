export type Category = 'Food' | 'Retail' | 'Services' | 'Transport' | 'Education';

export type AppExperienceMode = 'customer' | 'seller' | 'intelligence';

export type SignalType = 'Search' | 'Discussion' | 'Request' | 'Review';

export type TrendStrengthLevel = 'Low' | 'Medium' | 'High';
export type ConvergenceLevel = 'Weak' | 'Moderate' | 'Strong';
export type OpportunityGapLevel = 'Low' | 'Medium' | 'High' | 'Low-confidence';
export type DiscoverableSupplyLevel = 'Limited' | 'Partial' | 'Strong';

export type TrendStatus = 'Detected' | 'Emerging' | 'Growing' | 'Stable' | 'Declining' | 'Expired';

export interface User {
  id: string;
  name: string;
  role: 'Local Business' | 'Entrepreneur' | 'Market Researcher' | 'Customer';
  location: string;
}

export interface SellerProduct {
  id: string;
  businessId: string;
  name: string;
  category: Category;
  price: string;
  availability: 'In Stock' | 'Available Today' | 'Limited Stock' | 'Can Source (1-2 Days)' | 'On Order';
  description: string;
  imageOrVideoThumbnail?: string;
  videoDuration?: string;
}

export interface SellerVideo {
  id: string;
  businessId: string;
  businessName: string;
  productName: string;
  category: Category;
  price: string;
  locality: string;
  distance: string;
  availability: 'In Stock' | 'Available Today' | 'Limited Stock' | 'Can Source (1-2 Days)';
  thumbnailUrl: string;
  videoColor: string; // Background gradient or simulation accent
  videoDuration: string;
  description: string;
  contactPhone: string;
  viewsCount: number;
  products?: SellerProduct[];
}

export type DemandStatus = 
  | 'Open'
  | 'Matching'
  | 'Seller Has It'
  | 'Seller Sourcing'
  | 'Offer Received'
  | 'Customer Contacted'
  | 'Fulfilled'
  | 'Expired';

export interface SellerOffer {
  id: string;
  demandId: string;
  businessId: string;
  businessName: string;
  responseType: 'I_HAVE_IT' | 'I_CAN_SOURCE_IT';
  offeredPrice: string;
  expectedAvailabilityDate: string;
  description: string;
  videoTitle?: string;
  videoThumbnail?: string;
  contact: string;
  locality: string;
  createdAt: string;
  status: 'Active' | 'Accepted' | 'Declined';
}

export interface CustomerDemand {
  id: string;
  customerName: string;
  customerContact: string;
  productOrService: string;
  category: Category;
  specifications: string;
  budget: string;
  location: string;
  requiredByDate: string;
  quantity: string;
  description?: string;
  postedAt: string;
  status: DemandStatus;
  offers: SellerOffer[];
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
  about?: string;
  rating?: number;
  updatedTime?: string;
  products?: SellerProduct[];
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
  growth_indicator?: 'Increasing' | 'Stable' | 'Decreasing';
  frequency?: number;
}

export interface EvidenceSource {
  id: string;
  trend_id: string;
  source_type: SignalType | 'Geographic' | 'Growth';
  signal_count: number;
  direction: 'Increasing' | 'Present' | 'High' | 'Multiple' | 'Stable';
  timestamp: string;
  note: string;
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
  status: TrendStatus;
  detected_at: string;
  recent_growth: 'High' | 'Moderate' | 'Low';
  source_diversity: 'Multiple' | 'Moderate' | 'Single';
  geographic_concentration: 'High' | 'Medium' | 'Dispersed';
  discoverable_supply: DiscoverableSupplyLevel;
  signals: {
    search: 'Increasing' | 'Stable' | 'Low';
    discussion: 'Increasing' | 'Stable' | 'Low';
    requests: 'Present' | 'Emerging' | 'Low';
    reviews: 'Present' | 'Emerging' | 'Low';
  };
  metrics: {
    recorded_searches: number; // e.g. "recorded during selected pilot window"
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
    statement: string; // e.g., "Suitable local supply is not currently discoverable in the available data."
  };
  is_spike?: boolean; // For false-positive protection demo
}

export interface LocalityInfo {
  id: string;
  name: string;
  area: string;
  lat: number;
  lng: number;
  radiusMeters: number;
  description: string;
}
