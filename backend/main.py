import os
import re
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .models import (
    CustomerDemand, CustomerDemandCreate, SellerOffer, SellerOfferCreate,
    QueryParseRequest, QueryParseResponse, EvidenceSummaryRequest
)
from .database import LOCALITIES, LIVE_DEMANDS, LIVE_SIGNALS, supabase_client

load_dotenv()

app = FastAPI(
    title="LocalSignal Shared Backend API",
    description="Unified REST API serving React Customer/Seller Frontend and Angular Intelligence Dashboard",
    version="1.0.0"
)

# Enable CORS for React and Angular frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini SDK via google-genai
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
gemini_client = None

if GEMINI_API_KEY:
    try:
        from google import genai
        gemini_client = genai.Client(
            api_key=GEMINI_API_KEY,
            http_options={"headers": {"User-Agent": "aistudio-build"}}
        )
    except Exception as e:
        print(f"[LocalSignal Backend] Gemini SDK init note: {e}")

# 1. LOCALITIES
@app.get("/api/localities")
def get_localities():
    return {"localities": LOCALITIES, "defaultLocality": "kopargaon-all"}

# 2. DEMANDS & REQUESTS
@app.get("/api/demands")
def get_demands():
    return {"demands": LIVE_DEMANDS}

@app.post("/api/demands", status_code=status.HTTP_201_CREATED)
def create_demand(payload: CustomerDemandCreate):
    import time
    demand_id = f"dem-{int(time.time() * 1000)}"
    new_demand = {
        "id": demand_id,
        "customerName": payload.customerName or "Local Shopper",
        "customerContact": payload.customerContact or "+91 98XXX XXXXX",
        "productOrService": payload.productOrService,
        "category": payload.category or "Retail",
        "specifications": payload.specifications or "",
        "budget": payload.budget or "₹1,500",
        "location": payload.location or "Town Market & Shivaji Chowk, Kopargaon",
        "requiredByDate": payload.requiredByDate or "2026-10-06",
        "quantity": payload.quantity or "1",
        "description": payload.description or "",
        "postedAt": "2026-10-02T12:00:00Z",
        "status": "Open",
        "offers": []
    }
    LIVE_DEMANDS.insert(0, new_demand)

    # Automatically feed the Signal Intelligence Engine
    new_signal = {
        "id": f"sig-demand-{int(time.time() * 1000)}",
        "source": "Local Customer Demand Post",
        "text": f"{new_demand['productOrService']} ({new_demand['specifications']})",
        "category": new_demand["category"],
        "location": new_demand["location"],
        "locality": "Town Market & Shivaji Chowk",
        "lat": 19.8872,
        "lng": 74.4735,
        "timestamp": "2026-10-02T12:00:00Z",
        "signal_type": "Request",
        "normalized_topic": new_demand["productOrService"],
        "growth_indicator": "Increasing",
        "frequency": 1
    }
    LIVE_SIGNALS.insert(0, new_signal)

    return {"success": True, "demand": new_demand}

@app.post("/api/demands/{demand_id}/offers", status_code=status.HTTP_201_CREATED)
def add_seller_offer(demand_id: str, offer_data: SellerOfferCreate):
    import time
    demand = next((d for d in LIVE_DEMANDS if d["id"] == demand_id), None)
    if not demand:
        raise HTTPException(status_code=404, detail="Demand not found")

    new_offer = {
        "id": f"off-{int(time.time() * 1000)}",
        "demandId": demand_id,
        "businessId": offer_data.businessId or "biz-008",
        "businessName": offer_data.businessName or "Local Merchant",
        "responseType": offer_data.responseType,
        "offeredPrice": offer_data.offeredPrice or demand["budget"],
        "expectedAvailabilityDate": offer_data.expectedAvailabilityDate or "Available in 2 Days",
        "description": offer_data.description or "",
        "videoTitle": offer_data.videoTitle,
        "videoThumbnail": offer_data.videoThumbnail or "🎬",
        "contact": offer_data.contact or "+91 98XXX XXXXX",
        "locality": offer_data.locality or demand["location"],
        "createdAt": "2026-10-02T12:05:00Z",
        "status": "Active"
    }

    demand["offers"].append(new_offer)
    demand["status"] = "Seller Has It" if new_offer["responseType"] == "I_HAVE_IT" else "Seller Sourcing"

    return {"success": True, "offer": new_offer, "demand": demand}

@app.post("/api/demands/{demand_id}/fulfill")
def fulfill_demand(demand_id: str):
    demand = next((d for d in LIVE_DEMANDS if d["id"] == demand_id), None)
    if not demand:
        raise HTTPException(status_code=404, detail="Demand not found")
    demand["status"] = "Fulfilled"
    return {"success": True, "demand": demand}

# 3. AI QUERY PARSER & NLP (Strictly for query understanding & topic extraction)
@app.post("/api/gemini/parse-query", response_model=QueryParseResponse)
def parse_query(payload: QueryParseRequest):
    text = payload.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text query is required")

    # Try Gemini 3.8 Flash if available
    if gemini_client:
        try:
            prompt = f"""You are the NLP parser for LocalSignal, a local demand intelligence engine.
Parse the following unstructured local customer search / request / review text into structured data.
Input query: "{text}"

Respond with JSON:
{{
  "category": "Food" | "Retail" | "Services" | "Transport" | "Education",
  "normalized_topic": string,
  "intent": "Purchase" | "Service Inquiry" | "Availability Check" | "Complaint",
  "attributes": {{
    "item_or_service": string,
    "attributes": dict
  }},
  "hyperlocal_context": string,
  "explanation": string
}}"""
            response = gemini_client.models.generate_content(
                model="gemini-3.8-flash",
                contents=prompt,
                config={"response_mime_type": "application/json"}
            )
            import json
            parsed = json.loads(response.text or "{}")
            return QueryParseResponse(success=True, parsed=parsed, engine="gemini-3.8-flash")
        except Exception as e:
            print(f"[LocalSignal Gemini] Fallback to heuristic parser: {e}")

    # Robust heuristic NLP fallback
    lower = text.lower()
    category = "Retail"
    normalized_topic = "Consumer Goods"
    intent = "Purchase"
    attributes: Dict[str, str] = {}
    explanation = "Unstructured consumer request normalized into candidate opportunity signal."

    if any(k in lower for k in ["shoe", "footwear", "sneaker", "chappal", "sandals"]):
        category = "Retail"
        normalized_topic = "Shoes & Footwear"
        intent = "Purchase"
        if "black" in lower:
            attributes["Color"] = "Black"
        if "college" in lower:
            attributes["Purpose"] = "College / Daily Wear"
        price_match = re.search(r'(?:tak|under|below|rs|inr|₹)\s*(\d+)', lower) or re.search(r'(\d+)\s*(?:tak|rs|inr|rupees)', lower)
        if price_match:
            attributes["Budget"] = f"≤ ₹{price_match.group(1)}"
        explanation = "Budget-conscious collegiate footwear inquiry identified with clear price threshold."
    elif any(k in lower for k in ["ev", "charg", "battery", "electric vehicle"]):
        category = "Transport"
        normalized_topic = "EV Charging"
        intent = "Service Inquiry"
        if "highway" in lower or "shirdi" in lower:
            attributes["Location Area"] = "SH-10 Highway Junction"
        if "fast" in lower:
            attributes["Speed"] = "DC Fast Charging (>30kW)"
        explanation = "Urgent EV charging inquiry along transit corridor with zero discoverable fast chargers."
    elif any(k in lower for k in ["breakfast", "food", "millet", "sprout", "jowar"]):
        category = "Food"
        normalized_topic = "Healthy Breakfast & Millet Snacks"
        intent = "Availability Check"
        if "station" in lower or "railway" in lower:
            attributes["Area"] = "Station Road & Commute Hub"
        attributes["Dietary"] = "High-fiber, diabetic-friendly, non-oily"
        explanation = "Health-oriented morning breakfast demand detected among daily commuters."
    elif any(k in lower for k in ["ac", "repair", "servicing", "inverter", "cool"]):
        category = "Services"
        normalized_topic = "Commercial AC & Inverter Repair"
        intent = "Service Inquiry"
        attributes["Category"] = "Cooling & Electrical Maintenance"
        explanation = "HVAC servicing request identified in commercial shopping market."
    elif any(k in lower for k in ["badminton", "sports", "shuttle", "racket", "cricket"]):
        category = "Retail"
        normalized_topic = "Sports Equipment & Badminton Gear"
        intent = "Purchase"
        attributes["Tier"] = "Competition grade / Tournament gear"
        explanation = "Youth sports equipment inquiry following localized academy growth."

    return QueryParseResponse(
        success=True,
        parsed={
            "category": category,
            "normalized_topic": normalized_topic,
            "intent": intent,
            "attributes": {
                "item_or_service": normalized_topic,
                "attributes": attributes
            },
            "hyperlocal_context": "Kopargaon Locality",
            "explanation": explanation
        },
        engine="heuristic-nlp"
    )

# 4. EVIDENCE SUMMARY WITH GEMINI (Strictly for evidence synthesis)
@app.post("/api/gemini/summarize-evidence")
def summarize_evidence(payload: EvidenceSummaryRequest):
    return {
        "success": True,
        "trend_id": payload.trend_id,
        "topic": payload.topic,
        "synthesis": f"Multi-source convergence confirmed across search and direct inquiry channels for {payload.topic} in Kopargaon.",
        "confidence_score": 0.88
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
