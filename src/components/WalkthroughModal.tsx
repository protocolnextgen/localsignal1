import React, { useState } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  CheckCircle2, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Store,
  Search,
  PlusCircle,
  Video,
  Activity,
  Cpu,
  Map
} from 'lucide-react';
import { Trend, SellerVideo, AppExperienceMode } from '../types';

interface WalkthroughModalProps {
  onClose: () => void;
  onSetRole: (role: AppExperienceMode) => void;
  onSetTab: (tab: string) => void;
  onSearch: (query: string) => void;
  onSelectVideoById: (videoId: string) => void;
  onSelectTrendById: (trendId: string) => void;
  onOpenPostDemand?: (prefill?: string) => void;
}

export const WalkthroughModal: React.FC<WalkthroughModalProps> = ({
  onClose,
  onSetRole,
  onSetTab,
  onSearch,
  onSelectVideoById,
  onSelectTrendById,
  onOpenPostDemand,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    // ==========================================
    // PART A — DISCOVERY (Steps 1 to 4)
    // ==========================================
    {
      step: 1,
      part: 'PART A — DISCOVERY',
      phaseBadge: 'Customer Experience',
      title: 'Customer Home & Trending in Kopargaon',
      subtitle: 'Browse local attention before searching',
      detail: 'The customer opens LocalSignal in Kopargaon. Instead of an intimidating analytics dashboard, they discover what is currently getting local attention (Phone Covers, Sports Gear, EV Accessories, etc.) and browse vertical video reels from nearby neighborhood shops.',
      actionLabel: 'Browse Local Reels',
      action: () => {
        onSetRole('customer');
        onSetTab('home');
        setCurrentStep(2);
      }
    },
    {
      step: 2,
      part: 'PART A — DISCOVERY',
      phaseBadge: 'Seller Product Reel',
      title: 'Local Seller Short-Video Reel',
      subtitle: 'Watch in-stock product reel and counter details',
      detail: 'Customer taps "Handcrafted Formal Derby Shoes" (₹1,450) from Metro Footwear in Town Market. The reel showcases real in-stock inventory with distance, live price, and direct WhatsApp enquiry.',
      actionLabel: 'Search for Specific Item',
      action: () => {
        onSetRole('customer');
        onSelectVideoById('vid-001');
        setCurrentStep(3);
      }
    },
    {
      step: 3,
      part: 'PART A — DISCOVERY',
      phaseBadge: 'Natural Language Search',
      title: 'Search: "black formal shoes under ₹1500"',
      subtitle: 'AI/NLP understands colloquial user requirements',
      detail: 'Customer searches "Bhai black shoes college ke liye 1500 tak". The AI parser extracts: Category: Shoes & Footwear, Color: Black, Budget: ≤ ₹1,500, Context: Kopargaon. When exact niche specifications are unavailable, a contextual "Request this product" CTA appears.',
      actionLabel: 'Broadcast Demand Request',
      action: () => {
        onSetRole('customer');
        onSearch('black formal shoes under ₹1500');
        onSetTab('search');
        setCurrentStep(4);
      }
    },
    {
      step: 4,
      part: 'PART A — DISCOVERY',
      phaseBadge: 'Unmet Demand Route',
      title: 'Customer Posts Demand Request',
      subtitle: 'Broadcast to verified neighborhood merchants',
      detail: 'Customer submits a demand request: Black Formal Oxford Shoes (Size 9, Budget ₹1,500, Required within 48 hours). The demand appears in "My Requests" and immediately alerts nearby sellers. Now, switch to the Seller perspective!',
      actionLabel: 'Switch to Seller Mode (Part B)',
      action: () => {
        onSetRole('seller');
        onSetTab('demands');
        setCurrentStep(5);
      }
    },

    // ==========================================
    // PART B — RESPONSE (Steps 5 to 7)
    // ==========================================
    {
      step: 5,
      part: 'PART B — SELLER RESPONSE',
      phaseBadge: 'Merchant Portal',
      title: 'Seller Sees New Customer Demand',
      subtitle: 'Local shops view active neighborhood requests',
      detail: 'The merchant opens their console and sees the new demand: "Black Formal Shoes for College Interview" in Town Market. Local merchants can capture demand even if the exact size isn\'t on display.',
      actionLabel: 'Respond [I HAVE IT] or [I CAN SOURCE IT]',
      action: () => {
        onSetRole('seller');
        onSetTab('demands');
        setCurrentStep(6);
      }
    },
    {
      step: 6,
      part: 'PART B — SELLER RESPONSE',
      phaseBadge: 'Fulfillment & Sourcing',
      title: 'Merchant Submits Offer & Video',
      subtitle: 'Sourcing in 24–48 hours with transparent price',
      detail: 'Seller clicks [I CAN SOURCE IT], attaches a quick product clip, offers ₹1,450 with 24-hour pickup guarantee. Customer receives the offer, reviews seller counter, and contacts via WhatsApp.',
      actionLabel: 'Customer Matches Offer',
      action: () => {
        onSetRole('customer');
        onSetTab('requests');
        setCurrentStep(7);
      }
    },
    {
      step: 7,
      part: 'PART B — SELLER RESPONSE',
      phaseBadge: 'Demand Closed & Fed into Intelligence',
      title: 'Request Marked "Matched / Fulfilled"',
      subtitle: 'Customer & seller activity feeds the signal engine',
      detail: 'The customer accepts the offer and marks the request "Matched". Notice the key innovation: Customer searches, repeated queries, unmet requests, and merchant availability automatically feed into the LocalSignal Intelligence layer!',
      actionLabel: 'Open Intelligence Console (Part C)',
      action: () => {
        onSetRole('intelligence');
        onSetTab('intel-overview');
        onSelectTrendById('trend-ev-charging');
        setCurrentStep(8);
      }
    },

    // ==========================================
    // PART C — INTELLIGENCE (Steps 8 to 11)
    // ==========================================
    {
      step: 8,
      part: 'PART C — LOCALSIGNAL INTELLIGENCE',
      phaseBadge: 'Signal Fusion',
      title: 'Emerging Local Signal: EV Fast Charging',
      subtitle: 'Detect the signal before it becomes obvious',
      detail: 'In Kopargaon, LocalSignal detects an early emerging signal: EV Charging at SH-10 Highway Junction. Metrics show Trend Strength = High, Signal Convergence = Strong, and Opportunity Gap = High.',
      actionLabel: 'Inspect Evidence Engine',
      action: () => {
        onSetRole('intelligence');
        onSetTab('intel-evidence');
        onSelectTrendById('trend-ev-charging');
        setCurrentStep(9);
      }
    },
    {
      step: 9,
      part: 'PART C — LOCALSIGNAL INTELLIGENCE',
      phaseBadge: 'Evidence Verification',
      title: 'Evidence Engine: 6 Converging Dimensions',
      subtitle: 'Why this signal exists across independent channels',
      detail: 'Signal Convergence verifies that multiple independent channels agree: Search Signal ↑ (217 searches in pilot window), Discussions ↑ (48 mentions), Inquiries ↑ (26 direct requests), Reviews ↑ (14 EV traveler notes), Geographic concentration: High, Growth: +165%.',
      actionLabel: 'Open Opportunity Map',
      action: () => {
        onSetRole('intelligence');
        onSetTab('intel-map');
        onSelectTrendById('trend-ev-charging');
        setCurrentStep(10);
      }
    },
    {
      step: 10,
      part: 'PART C — LOCALSIGNAL INTELLIGENCE',
      phaseBadge: 'Geospatial Overlay',
      title: 'Interactive Opportunity Map & Supply Check',
      subtitle: 'Red circle = High Opportunity Gap (Demand ahead of supply)',
      detail: 'The interactive map displays the red hotspot at SH-10 Highway Junction. Inspecting the locality checks discoverable local supply: "Suitable local fast charging supply is not currently discoverable in available data; only domestic 15A slow sockets exist."',
      actionLabel: 'View Business Action & Summary',
      action: () => {
        onSetRole('intelligence');
        onSetTab('intel-overview');
        onSelectTrendById('trend-ev-charging');
        setCurrentStep(11);
      }
    },
    {
      step: 11,
      part: 'PART C — LOCALSIGNAL INTELLIGENCE',
      phaseBadge: 'Business Action',
      title: 'Evidence-Based Business Opportunity',
      subtitle: '"Investigate 30kW EV Fast Charging at Highway Junction"',
      detail: 'LocalSignal delivers an actionable investigation thesis for local entrepreneurs, petrol pump operators, and merchants: high verified demand, strong signal convergence, and limited discoverable supply. Full loop complete!',
      actionLabel: 'Complete Demo & Explore Freely',
      action: () => {
        onClose();
      }
    }
  ];

  const currentStepData = steps[currentStep - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-white border border-neutral-300 rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400">
                {currentStepData.part}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs text-neutral-300 font-mono">
                Step {currentStep} of {steps.length}
              </span>
            </div>
            <div className="text-xs text-neutral-400">
              Kopargaon Pilot · End-to-End Walkthrough
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-neutral-200 w-full">
          <div
            className="h-full bg-rose-600 transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="space-y-1">
            <span className="inline-block text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-sm uppercase tracking-wider">
              {currentStepData.phaseBadge}
            </span>
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              {currentStepData.title}
            </h2>
            <p className="text-xs font-medium text-neutral-500">
              {currentStepData.subtitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
            {currentStepData.detail}
          </p>

          <div className="p-3 bg-neutral-900 text-neutral-200 rounded-lg text-xs font-mono flex items-center justify-between">
            <span className="text-neutral-400">Current Scope:</span>
            <strong className="text-white">Kopargaon Pilot Ecosystem</strong>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="px-3.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 disabled:opacity-30 cursor-pointer flex items-center gap-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <button
            onClick={currentStepData.action}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>{currentStepData.actionLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
