import React from 'react';
import { X, ShieldAlert, AlertCircle, CheckCircle, Scale, Database, Lock } from 'lucide-react';

interface LimitationsModalProps {
  onClose: () => void;
}

export const LimitationsModal: React.FC<LimitationsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border border-neutral-300 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              System Limitations & Methodology Standards
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-neutral-700">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              Ethical & Realistic Framing Constitution
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              LocalSignal is positioned as an evidence-driven local opportunity discovery system. We explicitly reject the black-box hype common in commercial forecasting tools. Below are our documented operational limitations and claim constraints.
            </p>
          </div>

          {/* Grid of Limitations (Section 32) */}
          <div className="space-y-3">
            <div className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
              Documented System Limitations (Section 32):
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200 space-y-1">
                <span className="font-bold text-neutral-900 block">1. Data Availability</span>
                <p className="text-neutral-600 text-[11px] leading-tight">
                  Small localities or semi-rural wards may not generate adequate digital data. Offline field pilot interviews must supplement digital signals.
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200 space-y-1">
                <span className="font-bold text-neutral-900 block">2. Demographic Bias</span>
                <p className="text-neutral-600 text-[11px] leading-tight">
                  Online query volumes skew toward smartphone-enabled demographics and may under-represent elderly or non-digital residents.
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200 space-y-1">
                <span className="font-bold text-neutral-900 block">3. False Signals & Weather Spikes</span>
                <p className="text-neutral-600 text-[11px] leading-tight">
                  Isolated weather events (e.g. cloudburst) produce temporary query surges that our anomaly filter flags as low confidence.
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200 space-y-1">
                <span className="font-bold text-neutral-900 block">4. Privacy Protection</span>
                <p className="text-neutral-600 text-[11px] leading-tight">
                  No personal phone numbers, names, or private messages are harvested or exposed. All inquiries are anonymized into topic aggregates.
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200 space-y-1">
                <span className="font-bold text-neutral-900 block">5. Local Business Supply Gaps</span>
                <p className="text-neutral-600 text-[11px] leading-tight">
                  Informal local shops without digital listings may exist unrecorded. LocalSignal only audits discoverable public records.
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200 space-y-1">
                <span className="font-bold text-neutral-900 block">6. Opportunity ≠ Guaranteed Return</span>
                <p className="text-neutral-600 text-[11px] leading-tight">
                  A detected signal indicates a problem worth investigating. It does not predict guaranteed commercial solvency or profit.
                </p>
              </div>
            </div>
          </div>

          {/* Strict Terminology Rules (Section 34) */}
          <div className="p-4 bg-neutral-900 text-neutral-200 rounded-lg space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
              Mandatory Phrasing Rules (Section 34):
            </span>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">❌ Banned:</span>
                <span>"No local supplier exists."</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓ Enforced:</span>
                <span>"Suitable local supply is not currently discoverable in the available data."</span>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-neutral-800">
                <span className="text-rose-400 font-bold">❌ Banned:</span>
                <span>"217 buyers exist."</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓ Enforced:</span>
                <span>"217 searches were recorded during the selected pilot window."</span>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-neutral-800">
                <span className="text-rose-400 font-bold">❌ Banned:</span>
                <span>"AI predicts guaranteed business success."</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓ Enforced:</span>
                <span>"LocalSignal identifies evidence-based emerging signals worth investigating."</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors cursor-pointer"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
