import React from 'react';
import { ShoppingBag, Store, ArrowRight, ShieldCheck, Sparkles, X, Cpu } from 'lucide-react';
import { AppExperienceMode } from '../types';

interface RoleSelectionModalProps {
  isOpen: boolean;
  currentRole: AppExperienceMode | null;
  onSelectRole: (role: AppExperienceMode) => void;
  onClose?: () => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  currentRole,
  onSelectRole,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-neutral-200">
        {/* Header */}
        <div className="bg-neutral-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-rose-500 font-extrabold text-lg tracking-tight">LocalSignal</span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs text-neutral-300 font-medium">Kopargaon Ecosystem</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Switch Your LocalSignal Experience
            </h2>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1 rounded-sm cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4">
          <p className="text-xs text-neutral-500 text-center max-w-md mx-auto">
            Choose how you want to interact with LocalSignal. You can switch anytime.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Option 1: CUSTOMER */}
            <div
              onClick={() => onSelectRole('customer')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                currentRole === 'customer'
                  ? 'border-neutral-900 bg-neutral-50 shadow-md ring-2 ring-neutral-900/10'
                  : 'border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/50'
              }`}
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
                  🛍️
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-rose-600 transition-colors">
                    CUSTOMER
                  </h3>
                  <span className="text-[10px] font-semibold text-rose-600 block mt-0.5">
                    Browse & Request
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Discover local trending products, watch seller reels, search nearby shops, and post unmet demands.
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-bold text-neutral-900 group-hover:text-rose-600 transition-colors">
                <span>Continue as Customer</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Option 2: SELLER / BUSINESS */}
            <div
              onClick={() => onSelectRole('seller')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                currentRole === 'seller'
                  ? 'border-neutral-900 bg-neutral-50 shadow-md ring-2 ring-neutral-900/10'
                  : 'border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/50'
              }`}
            >
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
                  🏪
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                    SELLER / BUSINESS
                  </h3>
                  <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
                    Merchant Hub & Intelligence
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  Publish product reels, respond to customer requests, and discover market opportunity gaps.
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                <span>Continue as Seller</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200 text-center text-[11px] text-neutral-500">
          Switch between Customer and Seller anytime.
        </div>
      </div>
    </div>
  );
};
