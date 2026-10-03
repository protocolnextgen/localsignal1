import React from 'react';
import { 
  ShoppingBag, 
  Store, 
  ArrowRight, 
  CheckCircle2, 
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';
import { AppExperienceMode } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface RoleSelectionScreenProps {
  onSelectRole: (role: AppExperienceMode) => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  onSelectRole,
}) => {
  const { t, tObj, language } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-neutral-50/70 py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Language Selection Header on Entry Screen */}
        <div className="flex justify-center mb-6">
          <LanguageToggle />
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kopargaon Local Commerce & Demand Signal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900">
            {t('roleSelectionTitle')}
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto font-medium">
            {t('roleSelectionSubtitle')}
          </p>
        </div>

        {/* Two Large Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {/* CARD 1 — CUSTOMER */}
          <div
            onClick={() => onSelectRole('customer')}
            className="bg-white rounded-2xl border-2 border-neutral-200 hover:border-rose-500 hover:shadow-xl transition-all duration-200 p-7 sm:p-8 flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-5">
              {/* Icon & Label */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-xs">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-rose-600 bg-rose-50/80 px-2.5 py-1 rounded-md border border-rose-100">
                  {language === 'mr' ? 'ग्राहक' : 'Consumer'}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight group-hover:text-rose-600 transition-colors">
                  {t('cardCustomerTitle')}
                </h3>
                <p className="text-sm font-semibold text-neutral-800 mt-2 leading-snug">
                  {t('cardCustomerDesc')}
                </p>
              </div>

              {/* Supporting Points */}
              <ul className="space-y-2.5 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
                {tObj.cardCustomerPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <div className="pt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRole('customer');
                }}
                className="w-full py-3.5 px-5 bg-neutral-900 group-hover:bg-rose-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <span>{t('cardCustomerBtn')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* CARD 2 — SELLER / BUSINESS */}
          <div
            onClick={() => onSelectRole('seller')}
            className="bg-white rounded-2xl border-2 border-neutral-200 hover:border-emerald-600 hover:shadow-xl transition-all duration-200 p-7 sm:p-8 flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-5">
              {/* Icon & Label */}
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-xs">
                  <Store className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-md border border-emerald-100">
                  {language === 'mr' ? 'विक्रेता' : 'Merchant'}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                  {t('cardSellerTitle')}
                </h3>
                <p className="text-sm font-semibold text-neutral-800 mt-2 leading-snug">
                  {t('cardSellerDesc')}
                </p>
              </div>

              {/* Supporting Points */}
              <ul className="space-y-2.5 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
                {tObj.cardSellerPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <div className="pt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRole('seller');
                }}
                className="w-full py-3.5 px-5 bg-neutral-900 group-hover:bg-emerald-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <span>{t('cardSellerBtn')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Information Bar */}
      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 text-xs text-neutral-600 font-medium shadow-2xs">
          <ArrowRightLeft className="w-3.5 h-3.5 text-neutral-400" />
          <span>{t('roleSwitchFooterNote')}</span>
        </div>
      </div>
    </div>
  );
};
