import React, { useState } from 'react';
import { Trend } from '../types';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  MapPin, 
  AlertCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  TrendingUp, 
  FileText 
} from 'lucide-react';

interface OpportunityCardModalProps {
  trend: Trend;
  onClose: () => void;
}

export const OpportunityCardModal: React.FC<OpportunityCardModalProps> = ({
  trend,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const copyCardText = () => {
    const text = `LOCAL OPPORTUNITY BRIEF
Topic: ${trend.topic}
Area: ${trend.locality}
Trend Strength: ${trend.trend_strength.toUpperCase()}
Signal Convergence: ${trend.convergence.toUpperCase()}
Opportunity Gap: ${trend.opportunity_gap.toUpperCase()}

Evidence:
• Search: ${trend.signals.search} (+${trend.metrics.growth_percentage}% velocity)
• Discussion: ${trend.signals.discussion}
• Requests: ${trend.signals.requests}
• Local Supply: ${trend.discoverable_supply} ("${trend.supply_details.statement}")

Suggested Action:
${trend.suggested_action}

[Sample / Illustrative Data Notice: Synthetic demo figures for Kopargaon pilot. Investigation opportunity only; commercial outcome not guaranteed.]`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border border-neutral-300 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Card Header Bar */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Local Opportunity Card
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-1 rounded-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Main Identifier */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
              {trend.category} Sector
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
              {trend.topic}
            </h2>
            <p className="text-xs text-neutral-500 flex items-center gap-1.5 pt-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>{trend.locality}</span>
            </p>
          </div>

          {/* Triad Key Indicators */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-neutral-50 rounded-lg border border-neutral-200 text-center">
            <div>
              <span className="text-[11px] text-neutral-500 block uppercase tracking-wider">
                Trend Strength
              </span>
              <span className="text-base font-extrabold text-neutral-900">
                {trend.trend_strength.toUpperCase()}
              </span>
            </div>
            <div className="border-x border-neutral-200">
              <span className="text-[11px] text-neutral-500 block uppercase tracking-wider">
                Convergence
              </span>
              <span className="text-base font-extrabold text-emerald-700">
                {trend.convergence.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-neutral-500 block uppercase tracking-wider">
                Opportunity Gap
              </span>
              <span className="text-base font-extrabold text-rose-700">
                {trend.opportunity_gap.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Evidence Checklist */}
          <div className="space-y-2 text-xs">
            <span className="font-bold text-neutral-700 uppercase tracking-wider text-[11px]">
              Converging Telemetry Evidence:
            </span>
            <div className="grid grid-cols-2 gap-2 text-neutral-800">
              <div className="p-2 bg-neutral-50 border border-neutral-100 rounded-md">
                Search queries: <strong className="text-rose-600">↑ {trend.signals.search}</strong>
              </div>
              <div className="p-2 bg-neutral-50 border border-neutral-100 rounded-md">
                Discussion: <strong className="text-emerald-700">↑ {trend.signals.discussion}</strong>
              </div>
              <div className="p-2 bg-neutral-50 border border-neutral-100 rounded-md">
                Inquiries: <strong className="text-emerald-700">✓ {trend.signals.requests}</strong>
              </div>
              <div className="p-2 bg-neutral-50 border border-neutral-100 rounded-md">
                Local Supply: <strong className="text-rose-600">{trend.discoverable_supply}</strong>
              </div>
            </div>
          </div>

          {/* Suggested Action */}
          <div className="p-4 bg-neutral-900 text-white rounded-lg space-y-1">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Recommended Investigation:
            </span>
            <p className="text-xs text-neutral-200 font-medium leading-relaxed">
              "{trend.suggested_action}"
            </p>
          </div>

          {/* Required Caveat (Section 8, 32, 34) */}
          <div className="text-[11px] text-neutral-500 bg-amber-50/80 p-3 rounded-md border border-amber-200/80 space-y-1">
            <div className="font-semibold text-amber-950 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Sample / Illustrative Data Notice</span>
            </div>
            <p className="text-amber-900 leading-tight">
              All figures are synthetic prototype records for Kopargaon. A detected opportunity gap indicates demand worth investigating; it does not constitute a guaranteed commercial return or prediction of business success.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={copyCardText}
            className="px-3.5 py-2 text-xs font-semibold text-neutral-900 bg-white border border-neutral-300 hover:bg-neutral-100 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Opportunity Brief'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors cursor-pointer"
          >
            Close Card
          </button>
        </div>
      </div>
    </div>
  );
};
