-- LocalSignal Supabase Seed Data for Kopargaon Pilot
-- Inserts baseline localities, trends, signals, merchants, videos, and evidence

-- 1. LOCALITIES
INSERT INTO localities (id, name, area, lat, lng, radius_meters, description) VALUES
('kopargaon-all', 'All Kopargaon', 'Kopargaon Taluka', 19.8872, 74.4735, 4500, 'Entire Kopargaon municipal boundary and connecting arterial corridors.'),
('highway-junction', 'Shirdi-Kopargaon Highway Junction (SH-10)', 'South Arterial Corridor', 19.8795, 74.4680, 1200, 'High transit volume between Kopargaon and Shirdi pilgrimage route.'),
('town-market', 'Town Market & Shivaji Chowk', 'Central Commercial District', 19.8872, 74.4735, 900, 'Primary pedestrian shopping district, retail stalls, and daily services.'),
('station-road', 'Station Road & Goods Shed Area', 'Railway Transit Belt', 19.8920, 74.4780, 1100, 'Kopargaon Central Railway link, passenger commute stalls, and warehouses.'),
('tilak-nagar', 'Tilak Nagar & Subhash Road', 'Residential / Mixed Commerce', 19.8830, 74.4770, 850, 'Dense residential neighborhood with middle-income families and schools.'),
('bet-kopargaon', 'Bet Kopargaon (Godavari Riverside)', 'North Riverfront & Agricultural Edge', 19.8950, 74.4820, 1300, 'Northern bank of Godavari River with farming communities and shrines.')
ON CONFLICT (id) DO NOTHING;

-- 2. TRENDS
INSERT INTO trends (
    id, topic, category, locality, lat, lng, 
    trend_strength, convergence, opportunity_gap, status, 
    recent_growth, source_diversity, geographic_concentration, discoverable_supply, 
    signals, metrics, suggested_action, summary, supply_details, is_spike
) VALUES
(
    'trend-ev-charging',
    'EV Charging',
    'Transport',
    'Shirdi-Kopargaon Highway Junction (SH-10)',
    19.8795, 74.4680,
    'High', 'Strong', 'High', 'Emerging',
    'High', 'Multiple', 'High', 'Limited',
    '{"search": "Increasing", "discussion": "Increasing", "requests": "Present", "reviews": "Present"}',
    '{"recorded_searches": 342, "discussion_mentions": 89, "direct_requests": 38, "related_reviews": 24, "pilot_window_days": 30, "growth_percentage": 165}',
    'Investigate feasibility of providing dedicated 30kW+ dual-gun fast EV charging points and cafe battery-swap services along the highway junction.',
    'Accelerating local EV-charging demand detected around SH-10 Highway Junction, while suitable local commercial charging options appear limited in the discoverable data.',
    '{"discoverable_count": 0, "statement": "Suitable local fast-charging supply is not currently discoverable in the available data. Only 1 informal domestic 15A socket plug was noted at a tyre puncture stall."}',
    false
),
(
    'trend-healthy-breakfast',
    'Healthy Breakfast & Millet Snacks',
    'Food',
    'Station Road & Goods Shed Area',
    19.8920, 74.4780,
    'High', 'Strong', 'High', 'Growing',
    'High', 'Multiple', 'High', 'Limited',
    '{"search": "Increasing", "discussion": "Increasing", "requests": "Present", "reviews": "Present"}',
    '{"recorded_searches": 218, "discussion_mentions": 64, "direct_requests": 29, "related_reviews": 17, "pilot_window_days": 30, "growth_percentage": 120}',
    'Investigate morning wholesome breakfast & packaged ragi/jowar millet snack kiosk near the railway terminal and commute hub.',
    'Surging interest in hygienic morning food options, high-fiber breakfast, and diabetic-friendly snacks among daily rail passengers and medical staff.',
    '{"discoverable_count": 1, "statement": "Suitable local healthy morning breakfast supply is not currently discoverable in the available data; existing establishments specialize predominantly in fried snacks (vada pav / samosa)."}',
    false
),
(
    'trend-sports-equipment',
    'Sports Equipment & Badminton Gear',
    'Retail',
    'Town Market & Shivaji Chowk',
    19.8872, 74.4735,
    'Medium', 'Moderate', 'Medium', 'Emerging',
    'Moderate', 'Moderate', 'Medium', 'Partial',
    '{"search": "Increasing", "discussion": "Stable", "requests": "Present", "reviews": "Low"}',
    '{"recorded_searches": 154, "discussion_mentions": 32, "direct_requests": 19, "related_reviews": 8, "pilot_window_days": 30, "growth_percentage": 75}',
    'Investigate adding a specialized racquet sports & fitness counter with restringing support to capture growing youth sports activity.',
    'Consistent rise in queries for tournament-grade shuttlecocks, grip tape, and youth cricket gear following newly opened local coaching ground.',
    '{"discoverable_count": 2, "statement": "Discoverable local shops sell basic recreational toys and plastic racquets, but competition grade sports gear is not currently discoverable in local inventory."}',
    false
),
(
    'trend-ac-repair',
    'Commercial AC & Inverter Repair',
    'Services',
    'Town Market & Shivaji Chowk',
    19.8860, 74.4720,
    'High', 'Strong', 'Low', 'Stable',
    'Moderate', 'Multiple', 'High', 'Strong',
    '{"search": "Increasing", "discussion": "Stable", "requests": "Present", "reviews": "Present"}',
    '{"recorded_searches": 295, "discussion_mentions": 72, "direct_requests": 41, "related_reviews": 35, "pilot_window_days": 30, "growth_percentage": 45}',
    'Monitor competitive pricing. Opportunity is low due to saturated existing local technician coverage.',
    'High demand for air conditioning servicing due to pre-summer maintenance, but local supply is already well established with multiple active service shops.',
    '{"discoverable_count": 8, "statement": "Existing discoverable supply is strong. 8 registered HVAC technicians and electric motor repair shops operate actively in this sector."}',
    false
),
(
    'trend-umbrella-spike',
    'Flash Monsoon Heavy Umbrellas',
    'Retail',
    'Bet Kopargaon (Godavari Riverside)',
    19.8950, 74.4820,
    'Low', 'Weak', 'Low-confidence', 'Detected',
    'Low', 'Single', 'Dispersed', 'Strong',
    '{"search": "Increasing", "discussion": "Low", "requests": "Low", "reviews": "Low"}',
    '{"recorded_searches": 185, "discussion_mentions": 4, "direct_requests": 2, "related_reviews": 1, "pilot_window_days": 30, "growth_percentage": 280}',
    'Hold capital. Single-day weather anomaly detected. Requires multi-source convergence before treating as sustainable business opportunity.',
    'Sudden single-day search surge triggered by a brief heavy downpour on river crossing. No sustained community discussion or shop requests recorded.',
    '{"discoverable_count": 5, "statement": "Local general grocers and stationery shops hold standard umbrella stock; anomaly does not reflect unmet structural demand."}',
    true
)
ON CONFLICT (id) DO NOTHING;

-- 3. EVIDENCE SOURCES
INSERT INTO evidence_sources (id, trend_id, source_type, signal_count, direction, note) VALUES
('ev-001', 'trend-ev-charging', 'Search', 342, 'Increasing', 'Searches for "EV fast charger Kopargaon", "charging station near Shirdi road" up 165% in 30 days.'),
('ev-002', 'trend-ev-charging', 'Discussion', 89, 'Increasing', 'Local WhatsApp traveler group and community forums discussing missing EV chargers on NH-160/SH-10 corridor.'),
('ev-003', 'trend-ev-charging', 'Request', 38, 'Present', '38 direct customer inquiries recorded at local petrol stations asking for 15A/DC fast charging plugs.'),
('ev-004', 'trend-ev-charging', 'Review', 24, 'Present', 'Reviews on nearby hotels along SH-10 noting lack of destination EV charging amenities.'),
('ev-005', 'trend-ev-charging', 'Geographic', 1, 'High', '79% of inquiries clustered within 800m of SH-10 Highway Junction bypass.'),
('ev-006', 'trend-ev-charging', 'Growth', 1, 'Increasing', 'Week-over-week acceleration (+32% vs prior 7-day period).')
ON CONFLICT (id) DO NOTHING;
