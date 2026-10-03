import React from 'react';
import { CustomerDemand, SellerVideo } from '../types';
import { Store, Bookmark, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface CustomerProfileViewProps {
  demands: CustomerDemand[];
  savedVideos: SellerVideo[];
  onSelectVideo: (video: SellerVideo) => void;
  onOpenPostDemand: () => void;
  onSwitchToSeller: () => void;
}

export const CustomerProfileView: React.FC<CustomerProfileViewProps> = ({
  demands,
  savedVideos,
  onSelectVideo,
  onSwitchToSeller,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Profile Header */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-3xl shrink-0 font-bold">
              🛍️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                  Aditya K.
                </h1>
                <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  {t('customerAccountLabel')}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{language === 'mr' ? 'कोपरगाव प्रभाग क्र. ४ · सक्रिय ग्राहक' : 'Kopargaon Municipal Ward 4 · Active Local Shopper'}</span>
              </p>
              <div className="text-xs text-neutral-500 font-mono mt-0.5">
                +91 98901 12XXX
              </div>
            </div>
          </div>

          {/* Active Role Status & Switcher */}
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-2 text-center sm:text-left shrink-0">
            <div className="text-xs font-bold text-neutral-800">
              {t('activeExperienceCustomer')}
            </div>
            <p className="text-[11px] text-neutral-500 max-w-xs">
              {t('switchRoleNoteCustomer')}
            </p>
            <button
              onClick={onSwitchToSeller}
              className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Store className="w-3.5 h-3.5" />
              <span>{t('switchToSeller')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Activity Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
          <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
            {language === 'mr' ? 'सक्रिय मागण्या' : 'Active Demands'}
          </span>
          <div className="text-2xl font-extrabold text-neutral-900 mt-1 tabular-nums">
            {demands.filter(d => d.status !== 'Fulfilled').length}
          </div>
          <span className="text-xs text-neutral-500 mt-0.5 block">
            {language === 'mr' ? 'स्थानिक दुकानदारांना पाठवले' : 'Broadcast to Kopargaon sellers'}
          </span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
          <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
            {t('offersReceived')}
          </span>
          <div className="text-2xl font-extrabold text-rose-600 mt-1 tabular-nums">
            {demands.reduce((acc, d) => acc + d.offers.length, 0)}
          </div>
          <span className="text-xs text-neutral-500 mt-0.5 block">
            {language === 'mr' ? 'दुकानदार प्रतिसाद व किंमत' : 'With product reels & pricing'}
          </span>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
          <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
            {language === 'mr' ? 'जतन केलेले व्हिडिओ' : 'Saved Local Products'}
          </span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1 tabular-nums">
            {savedVideos.length}
          </div>
          <span className="text-xs text-neutral-500 mt-0.5 block">
            {language === 'mr' ? 'भविष्यात पाहण्यासाठी' : 'For future inspection'}
          </span>
        </div>
      </div>

      {/* Saved Products / Reels */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-rose-600" />
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              {language === 'mr' ? 'जतन केलेली उत्पादने व व्हिडिओ' : 'Saved Local Products & Reels'}
            </h2>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            {savedVideos.length} {language === 'mr' ? 'वस्तू' : 'items'}
          </span>
        </div>

        {savedVideos.length === 0 ? (
          <div className="p-8 bg-neutral-50 rounded-xl border border-neutral-200/80 text-center space-y-2">
            <Bookmark className="w-8 h-8 text-neutral-400 mx-auto" />
            <div className="text-xs text-neutral-600 font-medium">
              {language === 'mr' ? 'कोणतीही जतन केलेली वस्तू नाही' : 'No saved items yet'}
            </div>
            <p className="text-[11px] text-neutral-400">
              {language === 'mr' 
                ? 'कोणत्याही व्हिडिओवर बुकमार्क चिन्हावर क्लिक करून तो येथे जतन करा.'
                : 'Click the bookmark icon on any seller video in Discover to save it here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {savedVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => onSelectVideo(vid)}
                className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{vid.thumbnailUrl}</div>
                  <div>
                    <div className="font-bold text-neutral-900 text-xs">{vid.productName}</div>
                    <div className="text-[11px] text-neutral-500">{vid.businessName} · {vid.locality}</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-rose-600">{vid.price}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
