import os
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

# Check for Supabase connection credentials
SUPABASE_URL = os.getenv("SUPABASE_URL") or os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY") or os.getenv("VITE_SUPABASE_ANON_KEY")

supabase_client = None

if SUPABASE_URL and SUPABASE_KEY:
    try:
        from supabase import create_client, Client
        supabase_client: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("[LocalSignal Backend] Connected to Supabase PostgreSQL database.")
    except Exception as e:
        print(f"[LocalSignal Backend] Supabase initialization failed, using persistent in-memory repository: {e}")
        supabase_client = None
else:
    print("[LocalSignal Backend] Running in decoupled REST mode with embedded PostgreSQL-compatible schema.")

# Kopargaon Reference Localities
LOCALITIES = [
    {
        "id": "kopargaon-all",
        "name": "All Kopargaon",
        "area": "Kopargaon Taluka",
        "lat": 19.8872,
        "lng": 74.4735,
        "radiusMeters": 4500,
        "description": "Entire Kopargaon municipal boundary and connecting arterial corridors."
    },
    {
        "id": "highway-junction",
        "name": "Shirdi-Kopargaon Highway Junction (SH-10)",
        "area": "South Arterial Corridor",
        "lat": 19.8795,
        "lng": 74.4680,
        "radiusMeters": 1200,
        "description": "High transit volume between Kopargaon and Shirdi pilgrimage route."
    },
    {
        "id": "town-market",
        "name": "Town Market & Shivaji Chowk",
        "area": "Central Commercial District",
        "lat": 19.8872,
        "lng": 74.4735,
        "radiusMeters": 900,
        "description": "Primary pedestrian shopping district, retail stalls, and daily services."
    },
    {
        "id": "station-road",
        "name": "Station Road & Goods Shed Area",
        "area": "Railway Transit Belt",
        "lat": 19.8920,
        "lng": 74.4780,
        "radiusMeters": 1100,
        "description": "Kopargaon Central Railway link, passenger commute stalls, and warehouses."
    },
    {
        "id": "tilak-nagar",
        "name": "Tilak Nagar & Subhash Road",
        "area": "Residential / Mixed Commerce",
        "lat": 19.8830,
        "lng": 74.4770,
        "radiusMeters": 850,
        "description": "Dense residential neighborhood with middle-income families and schools."
    },
    {
        "id": "bet-kopargaon",
        "name": "Bet Kopargaon (Godavari Riverside)",
        "area": "North Riverfront & Agricultural Edge",
        "lat": 19.8950,
        "lng": 74.4820,
        "radiusMeters": 1300,
        "description": "Northern bank of Godavari River with farming communities and shrines."
    }
]

# Baseline in-memory storage for persistent state
LIVE_DEMANDS: List[Dict[str, Any]] = [
    {
        "id": "dem-001",
        "customerName": "Rahul Kadam",
        "customerContact": "+91 98221 44550",
        "productOrService": "Black Formal Oxford Shoes",
        "category": "Retail",
        "specifications": "Size 9 UK, Genuine Leather or High-grade PU, Lace-up, for College Formal Function",
        "budget": "₹1,500",
        "location": "Town Market & Shivaji Chowk, Kopargaon",
        "requiredByDate": "2026-10-06",
        "quantity": "1 pair",
        "description": "Need clean formal shoes for college placement week. Checked 2 shops but size 9 was sold out.",
        "postedAt": "2026-10-01T10:15:00Z",
        "status": "Seller Has It",
        "offers": [
            {
                "id": "off-001",
                "demandId": "dem-001",
                "businessId": "biz-008",
                "businessName": "Balaji Footwear & Leather",
                "responseType": "I_HAVE_IT",
                "offeredPrice": "₹1,350",
                "expectedAvailabilityDate": "In Stock (Ready for Pickup)",
                "description": "Bata and Action formal black shoes available in size 9 right now at Shivaji Chowk shop.",
                "videoTitle": "Formal Shoe Stock Walkthrough",
                "videoThumbnail": "👞",
                "contact": "+91 98221 55667",
                "locality": "Town Market & Shivaji Chowk",
                "createdAt": "2026-10-01T11:45:00Z",
                "status": "Active"
            }
        ]
    }
]

LIVE_SIGNALS: List[Dict[str, Any]] = [
    {
        "id": "sig-ev-001",
        "source": "Google Search / Local Queries",
        "text": "EV charging near me",
        "category": "Transport",
        "location": "Shirdi-Kopargaon Highway Junction",
        "locality": "Shirdi-Kopargaon Highway Junction (SH-10)",
        "lat": 19.8795,
        "lng": 74.4680,
        "timestamp": "2026-09-28T08:14:00Z",
        "signal_type": "Search",
        "normalized_topic": "EV Charging",
        "growth_indicator": "Increasing",
        "frequency": 142
    },
    {
        "id": "sig-food-001",
        "source": "Railway Passenger Query Logs",
        "text": "Healthy morning breakfast station",
        "category": "Food",
        "location": "Station Road & Goods Shed Area",
        "locality": "Station Road & Goods Shed Area",
        "lat": 19.8920,
        "lng": 74.4780,
        "timestamp": "2026-09-24T06:45:00Z",
        "signal_type": "Search",
        "normalized_topic": "Healthy Breakfast & Millet Snacks",
        "growth_indicator": "Increasing",
        "frequency": 96
    }
]
