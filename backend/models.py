from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field

CategoryType = Literal['Food', 'Retail', 'Services', 'Transport', 'Education']
SignalType = Literal['Search', 'Discussion', 'Request', 'Review']
TrendStrengthLevel = Literal['Low', 'Medium', 'High']
ConvergenceLevel = Literal['Weak', 'Moderate', 'Strong']
OpportunityGapLevel = Literal['Low', 'Medium', 'High', 'Low-confidence']
DiscoverableSupplyLevel = Literal['Limited', 'Partial', 'Strong']
DemandStatusType = Literal[
    'Open', 'Matching', 'Seller Has It', 'Seller Sourcing', 
    'Offer Received', 'Customer Contacted', 'Fulfilled', 'Expired'
]

class LocalityInfo(BaseModel):
    id: str
    name: str
    area: str
    lat: float
    lng: float
    radiusMeters: int
    description: str

class SellerProduct(BaseModel):
    id: str
    businessId: str
    name: str
    category: CategoryType
    price: str
    availability: str
    description: str
    imageOrVideoThumbnail: Optional[str] = None
    videoDuration: Optional[str] = None

class SellerVideo(BaseModel):
    id: str
    businessId: str
    businessName: str
    productName: str
    category: CategoryType
    price: str
    locality: str
    distance: str
    availability: str
    thumbnailUrl: str
    videoColor: str
    videoDuration: str
    description: str
    contactPhone: str
    viewsCount: int = 0
    products: Optional[List[SellerProduct]] = None

class SellerOffer(BaseModel):
    id: str
    demandId: str
    businessId: str
    businessName: str
    responseType: Literal['I_HAVE_IT', 'I_CAN_SOURCE_IT']
    offeredPrice: str
    expectedAvailabilityDate: str
    description: str
    videoTitle: Optional[str] = None
    videoThumbnail: Optional[str] = None
    contact: str
    locality: str
    createdAt: str
    status: Literal['Active', 'Accepted', 'Declined'] = 'Active'

class CustomerDemand(BaseModel):
    id: str
    customerName: str
    customerContact: str
    productOrService: str
    category: CategoryType
    specifications: str = ''
    budget: str
    location: str
    requiredByDate: str
    quantity: str = '1'
    description: Optional[str] = None
    postedAt: str
    status: DemandStatusType = 'Open'
    offers: List[SellerOffer] = []

class CustomerDemandCreate(BaseModel):
    customerName: Optional[str] = 'Local Shopper'
    customerContact: Optional[str] = '+91 98XXX XXXXX'
    productOrService: str
    category: Optional[CategoryType] = 'Retail'
    specifications: Optional[str] = ''
    budget: Optional[str] = '₹1,500'
    location: Optional[str] = 'Town Market & Shivaji Chowk, Kopargaon'
    requiredByDate: Optional[str] = '2026-10-06'
    quantity: Optional[str] = '1'
    description: Optional[str] = ''

class SellerOfferCreate(BaseModel):
    businessId: Optional[str] = 'biz-008'
    businessName: Optional[str] = 'Local Merchant'
    responseType: Literal['I_HAVE_IT', 'I_CAN_SOURCE_IT'] = 'I_HAVE_IT'
    offeredPrice: Optional[str] = None
    expectedAvailabilityDate: Optional[str] = 'Available in 2 Days'
    description: Optional[str] = ''
    videoTitle: Optional[str] = None
    videoThumbnail: Optional[str] = '🎬'
    contact: Optional[str] = '+91 98XXX XXXXX'
    locality: Optional[str] = None

class Business(BaseModel):
    id: str
    name: str
    category: CategoryType
    location: str
    locality: str
    lat: float
    lng: float
    contact: str
    services: List[str] = []
    availability_status: Literal['Active', 'Limited', 'Inactive'] = 'Active'
    about: Optional[str] = None
    rating: Optional[float] = 4.5
    updatedTime: Optional[str] = None
    products: Optional[List[SellerProduct]] = None

class Signal(BaseModel):
    id: str
    source: str
    text: str
    category: CategoryType
    location: str
    locality: str
    lat: float
    lng: float
    timestamp: str
    signal_type: SignalType
    normalized_topic: str
    growth_indicator: Optional[Literal['Increasing', 'Stable', 'Decreasing']] = 'Increasing'
    frequency: Optional[int] = 1

class EvidenceSource(BaseModel):
    id: str
    trend_id: str
    source_type: str
    signal_count: int
    direction: str
    timestamp: str
    note: str

class Trend(BaseModel):
    id: str
    topic: str
    category: CategoryType
    locality: str
    lat: float
    lng: float
    trend_strength: TrendStrengthLevel
    convergence: ConvergenceLevel
    opportunity_gap: OpportunityGapLevel
    status: str
    detected_at: str
    recent_growth: Literal['High', 'Moderate', 'Low']
    source_diversity: Literal['Multiple', 'Moderate', 'Single']
    geographic_concentration: Literal['High', 'Medium', 'Dispersed']
    discoverable_supply: DiscoverableSupplyLevel
    signals: Dict[str, str]
    metrics: Dict[str, Any]
    suggested_action: str
    summary: str
    supply_details: Dict[str, Any]
    is_spike: Optional[bool] = False

class QueryParseRequest(BaseModel):
    text: str

class QueryParseResponse(BaseModel):
    success: bool
    parsed: Dict[str, Any]
    engine: str

class EvidenceSummaryRequest(BaseModel):
    trend_id: str
    topic: str
    evidence_items: List[Dict[str, Any]]
