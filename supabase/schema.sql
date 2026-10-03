-- LocalSignal Supabase / PostgreSQL Database Schema
-- Provides unified data storage for React Customer/Seller Frontend and Angular Intelligence Dashboard

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. LOCALITIES TABLE
CREATE TABLE IF NOT EXISTS localities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    area TEXT NOT NULL,
    lat NUMERIC(9,6) NOT NULL,
    lng NUMERIC(9,6) NOT NULL,
    radius_meters INTEGER NOT NULL,
    description TEXT
);

-- 2. TRENDS TABLE (Emerging Local Demand Trends)
CREATE TABLE IF NOT EXISTS trends (
    id TEXT PRIMARY KEY,
    topic TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Food', 'Retail', 'Services', 'Transport', 'Education')),
    locality TEXT NOT NULL,
    lat NUMERIC(9,6) NOT NULL,
    lng NUMERIC(9,6) NOT NULL,
    trend_strength TEXT NOT NULL CHECK (trend_strength IN ('Low', 'Medium', 'High')),
    convergence TEXT NOT NULL CHECK (convergence IN ('Weak', 'Moderate', 'Strong')),
    opportunity_gap TEXT NOT NULL CHECK (opportunity_gap IN ('Low', 'Medium', 'High', 'Low-confidence')),
    status TEXT NOT NULL DEFAULT 'Emerging',
    detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    recent_growth TEXT NOT NULL CHECK (recent_growth IN ('Low', 'Moderate', 'High')),
    source_diversity TEXT NOT NULL CHECK (source_diversity IN ('Single', 'Moderate', 'Multiple')),
    geographic_concentration TEXT NOT NULL CHECK (geographic_concentration IN ('Dispersed', 'Medium', 'High')),
    discoverable_supply TEXT NOT NULL CHECK (discoverable_supply IN ('Limited', 'Partial', 'Strong')),
    signals JSONB NOT NULL DEFAULT '{"search": "Increasing", "discussion": "Increasing", "requests": "Present", "reviews": "Present"}',
    metrics JSONB NOT NULL DEFAULT '{}',
    suggested_action TEXT NOT NULL,
    summary TEXT NOT NULL,
    supply_details JSONB NOT NULL DEFAULT '{"discoverable_count": 0, "statement": ""}',
    is_spike BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SIGNALS TABLE (Multi-source raw demand signals)
CREATE TABLE IF NOT EXISTS signals (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,
    text TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Food', 'Retail', 'Services', 'Transport', 'Education')),
    location TEXT NOT NULL,
    locality TEXT NOT NULL,
    lat NUMERIC(9,6) NOT NULL,
    lng NUMERIC(9,6) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    signal_type TEXT NOT NULL CHECK (signal_type IN ('Search', 'Discussion', 'Request', 'Review')),
    normalized_topic TEXT NOT NULL,
    growth_indicator TEXT DEFAULT 'Increasing',
    frequency INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BUSINESSES TABLE (Verified Local Merchants)
CREATE TABLE IF NOT EXISTS businesses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Food', 'Retail', 'Services', 'Transport', 'Education')),
    location TEXT NOT NULL,
    locality TEXT NOT NULL,
    lat NUMERIC(9,6) NOT NULL,
    lng NUMERIC(9,6) NOT NULL,
    contact TEXT NOT NULL,
    services TEXT[] DEFAULT '{}',
    availability_status TEXT NOT NULL DEFAULT 'Active',
    about TEXT,
    rating NUMERIC(2,1) DEFAULT 4.5,
    updated_time TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SELLER VIDEOS TABLE (Local Video Reels)
CREATE TABLE IF NOT EXISTS seller_videos (
    id TEXT PRIMARY KEY,
    business_id TEXT REFERENCES businesses(id) ON DELETE CASCADE,
    business_name TEXT NOT NULL,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Food', 'Retail', 'Services', 'Transport', 'Education')),
    price TEXT NOT NULL,
    locality TEXT NOT NULL,
    distance TEXT NOT NULL,
    availability TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    video_color TEXT NOT NULL,
    video_duration TEXT NOT NULL,
    description TEXT,
    contact_phone TEXT NOT NULL,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CUSTOMER DEMANDS TABLE (Consumer requests)
CREATE TABLE IF NOT EXISTS customer_demands (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_contact TEXT NOT NULL,
    product_or_service TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Food', 'Retail', 'Services', 'Transport', 'Education')),
    specifications TEXT,
    budget TEXT NOT NULL,
    location TEXT NOT NULL,
    required_by_date DATE NOT NULL,
    quantity TEXT DEFAULT '1',
    description TEXT,
    posted_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'Open',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SELLER OFFERS TABLE (Responses to customer demands)
CREATE TABLE IF NOT EXISTS seller_offers (
    id TEXT PRIMARY KEY,
    demand_id TEXT REFERENCES customer_demands(id) ON DELETE CASCADE,
    business_id TEXT NOT NULL,
    business_name TEXT NOT NULL,
    response_type TEXT NOT NULL CHECK (response_type IN ('I_HAVE_IT', 'I_CAN_SOURCE_IT')),
    offered_price TEXT NOT NULL,
    expected_availability_date TEXT NOT NULL,
    description TEXT,
    video_title TEXT,
    video_thumbnail TEXT,
    contact TEXT NOT NULL,
    locality TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'Active'
);

-- 8. EVIDENCE SOURCES TABLE (Evidence engine records)
CREATE TABLE IF NOT EXISTS evidence_sources (
    id TEXT PRIMARY KEY,
    trend_id TEXT REFERENCES trends(id) ON DELETE CASCADE,
    source_type TEXT NOT NULL,
    signal_count INTEGER NOT NULL,
    direction TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR HYPERLOCAL QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_trends_locality ON trends(locality);
CREATE INDEX IF NOT EXISTS idx_trends_category ON trends(category);
CREATE INDEX IF NOT EXISTS idx_signals_locality ON signals(locality);
CREATE INDEX IF NOT EXISTS idx_signals_topic ON signals(normalized_topic);
CREATE INDEX IF NOT EXISTS idx_videos_category ON seller_videos(category);
CREATE INDEX IF NOT EXISTS idx_demands_status ON customer_demands(status);
CREATE INDEX IF NOT EXISTS idx_evidence_trend ON evidence_sources(trend_id);
