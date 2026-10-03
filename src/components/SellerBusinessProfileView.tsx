import React from 'react';
import { Business, SellerVideo } from '../types';
import { ShieldCheck, MapPin, Star, ShoppingBag, Video } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SellerBusinessProfileViewProps {
  business: Business;
  videos: SellerVideo[];
  onSwitchToCustomer: () => void;
  onOpenAddVideo: () => void;
}

export const SellerBusinessProfileView: React.FC<SellerBusinessProfileViewProps> = ({
  business,
  videos,
  onSwitchToCustomer,
  onOpenAddVideo,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Business Header */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center text-3xl shrink-0 font-bold">
              🏪
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                  {business.name}
                </h1>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t('verifiedLocalMerchant')}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{business.location} · {business.locality}</span>
              </p>
              <div className="text-xs text-neutral-600 font-mono mt-0.5">
                {language === 'mr' ? 'संपर्क:' : 'Phone:'} {business.contact}
              </div>
            </div>
          </div>

          {/* Active Role Status & Switcher */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2 text-center sm:text-left shrink-0">
            <div className="text-xs font-bold text-neutral-800">
              {t('activeExperienceSeller')}
            </div>
            <p className="text-[11px] text-neutral-500 max-w-xs">
              {t('switchRoleNoteSeller')}
            </p>
            <button
              onClick={onSwitchToCustomer}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t('switchToCustomer')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Merchant Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
          <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
            {language === 'mr' ? 'अपलोड केलेले व्हिडिओ' : 'Published Video Reels'}
          </span>
          <div className="text-2xl font-extrabold text-neutral-900 mt-1 tabular-nums">
            {videos.length}
          </div>
          <span className="text-xs text-neutral-500 mt-0.5 block">
            {language === 'mr' ? 'कोपरगाव ग्राहकांना थेट दिसतात' : 'Live on Customer Local Feed'}
          </span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
          <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
            {language === 'mr' ? 'दुकान रेटिंग' : 'Store Rating'}
          </span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1 flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            <span>{business.rating || 4.8}</span>
          </div>
          <span className="text-xs text-neutral-500 mt-0.5 block">
            {language === 'mr' ? 'स्थानिक ग्राहकांचे मूल्यमापन' : 'Verified Kopargaon buyer score'}
          </span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
          <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
            {language === 'mr' ? 'स्थिती' : 'Response Status'}
          </span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">
            {language === 'mr' ? 'सक्रिय' : 'Active'}
          </div>
          <span className="text-xs text-neutral-500 mt-0.5 block">
            {language === 'mr' ? 'मागण्या स्वीकारण्यास तयार' : 'Accepting Demands in Town Market'}
          </span>
        </div>
      </div>

      {/* Store Description & Services */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-neutral-900 tracking-tight">
          {language === 'mr' ? 'दुकानाची माहिती' : 'Shop Description & Credentials'}
        </h2>
        <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-700 leading-relaxed italic">
          "{business.about}"
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider text-[11px] block">
            {language === 'mr' ? 'उपलब्ध सेवा व वर्गवारी' : 'Registered Categories & Services'}
          </span>
          <div className="flex flex-wrap gap-2">
            {business.services.map((svc) => (
              <span
                key={svc}
                className="px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-md text-xs font-semibold text-neutral-800"
              >
                ✓ {svc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onOpenAddVideo}
          className="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-2"
        >
          <Video className="w-4 h-4" />
          <span>{language === 'mr' ? '+ नवीन व्हिडिओ अपलोड करा' : 'Upload New Product Video Reel'}</span>
        </button>
      </div>
    </div>
  );
};
