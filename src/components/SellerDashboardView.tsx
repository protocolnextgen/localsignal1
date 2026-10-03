import React from 'react';
import { CustomerDemand, SellerVideo, Business, Trend } from '../types';
import { 
  Store, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Video
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SellerDashboardViewProps {
  demands: CustomerDemand[];
  videos: SellerVideo[];
  businesses: Business[];
  trends: Trend[];
  onNavigateTab: (tab: string) => void;
  onStartResponse: (demand: CustomerDemand, mode: 'I_HAVE_IT' | 'I_CAN_SOURCE_IT') => void;
  onOpenAddVideo: () => void;
  onSelectTrend: (trend: Trend) => void;
}

export const SellerDashboardView: React.FC<SellerDashboardViewProps> = ({
  demands,
  videos,
  businesses,
  trends,
  onNavigateTab,
  onStartResponse,
  onOpenAddVideo,
  onSelectTrend,
}) => {
  const { t, language } = useLanguage();
  const topDemand = demands[0];

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Banner */}
      <section className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 text-white rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
            <Store className="w-4 h-4" />
            <span>{language === 'mr' ? 'दुकानदार नियंत्रण केंद्र' : 'Merchant Business Console'}</span>
            <span>·</span>
            <span>{language === 'mr' ? 'कोपरगाव' : 'Kopargaon'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {language === 'mr' ? 'स्वागत आहे, रॉयल स्टेप फुटवेअर' : 'Welcome, Royal Step Footwear'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {language === 'mr'
              ? 'कोपरगावमधील ग्राहकांच्या थेट मागण्या तपासा, उत्पादनांचे व्हिडिओ अपलोड करा आणि नवीन स्थानिक संधी ओळखा.'
              : 'Monitor real-time customer requests from Kopargaon buyers, manage your short video showcase, and discover validated demand gaps.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenAddVideo}
            className="px-4 py-2.5 text-xs font-bold text-neutral-900 bg-white hover:bg-neutral-100 rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-2"
          >
            <Video className="w-4 h-4 text-rose-600" />
            <span>{language === 'mr' ? '+ व्हिडिओ जोडा' : '+ Add Product Reel'}</span>
          </button>
        </div>
      </section>

      {/* 3 CORE DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: CUSTOMER DEMANDS / ग्राहकांच्या मागण्या */}
        <div 
          onClick={() => onNavigateTab('demands')}
          className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl p-5 shadow-xs cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              {t('customerDemandsTitle')}
            </span>
            <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs font-bold">
              {demands.length}
            </span>
          </div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-2 tabular-nums">
            {demands.length} {language === 'mr' ? 'मागण्या' : 'Requests'}
          </div>
          <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1 group-hover:text-rose-600 transition-colors">
            <span>{language === 'mr' ? 'स्टॉकमध्ये आहे किंवा मिळवून देऊ शकता' : 'Respond with stock or sourcing'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: MY VIDEOS / माझे व्हिडिओ */}
        <div 
          onClick={() => onNavigateTab('videos')}
          className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl p-5 shadow-xs cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              {t('navMyVideos')}
            </span>
            <Video className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="text-2xl font-extrabold text-neutral-900 mt-2 tabular-nums">
            {videos.length} {language === 'mr' ? 'सक्रिय' : 'Active'}
          </div>
          <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1 group-hover:text-neutral-900 transition-colors">
            <span>{language === 'mr' ? 'ग्राहकांना थेट दिसणारे व्हिडिओ' : 'Live on customer discover'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: OPPORTUNITIES / व्यवसायाच्या संधी */}
        <div 
          onClick={() => onNavigateTab('opportunities')}
          className="bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl p-5 shadow-xs cursor-pointer group transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              {t('navOpportunities')}
            </span>
            <TrendingUp className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-extrabold text-rose-600 mt-2 tabular-nums">
            2 {language === 'mr' ? 'संधी' : 'High Gaps'}
          </div>
          <div className="text-xs text-neutral-500 mt-1 flex items-center gap-1 group-hover:text-rose-600 transition-colors">
            <span>{language === 'mr' ? 'मागणी जास्त, उपलब्धता कमी' : 'View demand & supply gaps'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* FEATURED DEMAND ACTION CARD */}
      {topDemand && (
        <section className="bg-white border-2 border-rose-100 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
            <div>
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded-sm">
                {language === 'mr' ? 'कोपरगावमधील तातडीची ग्राहक मागणी' : 'Urgent Buyer Demand in Kopargaon'}
              </span>
              <h2 className="text-lg font-bold text-neutral-900 mt-1">
                {topDemand.productOrService}
              </h2>
            </div>
            <div className="text-xs font-mono text-neutral-500">
              {language === 'mr' ? 'ग्राहकाचे बजेट:' : 'Customer Budget:'} <strong className="text-base text-neutral-900 font-extrabold">{topDemand.budget}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-neutral-400 block text-[11px]">{t('detailsLabel')}:</span>
              <span className="font-semibold text-neutral-800">{topDemand.specifications}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[11px]">{t('locationLabel')}:</span>
              <span className="font-semibold text-neutral-800">{topDemand.location}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[11px]">{t('neededByLabel')}:</span>
              <span className="font-semibold text-rose-600">{topDemand.requiredByDate}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-600 italic bg-neutral-50 p-3 rounded-lg border border-neutral-200/60">
            "{topDemand.description}"
          </p>

          {/* Core Response Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-neutral-500 font-medium">
              {language === 'mr' ? 'तुमच्या दुकानात हे उपलब्ध आहे का?' : 'Can your shop fulfill this customer request?'}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onStartResponse(topDemand, 'I_HAVE_IT')}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t('sellerResponseIHaveIt')}</span>
              </button>

              <button
                onClick={() => onStartResponse(topDemand, 'I_CAN_SOURCE_IT')}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('sellerResponseICanSourceIt')}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* RELEVANT LOCAL OPPORTUNITIES TEASER */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              {language === 'mr' ? 'स्थानिक मागणी वाढत आहे' : 'Emerging Demand & Supply Gaps'}
            </h2>
            <p className="text-xs text-neutral-500">
              {language === 'mr' 
                ? 'मागणी जास्त, उपलब्ध स्थानिक पुरवठा कमी' 
                : 'Where customer inquiries are rising faster than discoverable local supply'}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('opportunities')}
            className="text-xs font-bold text-neutral-700 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'mr' ? 'संधी पहा' : 'View Opportunities'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trends.slice(0, 2).map((trendItem) => (
            <div
              key={trendItem.id}
              onClick={() => onSelectTrend(trendItem)}
              className="p-4 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200 transition-all cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-500 uppercase tracking-wider text-[11px]">
                    {trendItem.category}
                  </span>
                  <div className="text-right">
                    <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-sm border border-rose-200 text-[10px] block">
                      {language === 'mr' ? 'मागणी जास्त, उपलब्धता कमी' : `${trendItem.opportunity_gap} GAP`}
                    </span>
                    <span className="text-[9px] text-neutral-400 font-mono">Opportunity Gap</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-neutral-900 mt-1">
                  {trendItem.topic}
                </h3>
                <div className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span>{trendItem.locality}</span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-1 bg-white p-2.5 rounded-lg border border-neutral-200/70 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">
                      {language === 'mr' ? 'मागणी वेग' : 'Momentum'}
                    </span>
                    <strong className="text-neutral-900">{trendItem.trend_strength}</strong>
                    {language === 'mr' && (
                      <span className="text-[9px] text-neutral-400 block">मागणी किती वेगाने वाढते</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">
                      {language === 'mr' ? 'पुरावा' : 'Evidence'}
                    </span>
                    <strong className="text-emerald-700">{trendItem.convergence}</strong>
                    {language === 'mr' && (
                      <span className="text-[9px] text-neutral-400 block">विविध स्रोतांतून</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block">
                      {language === 'mr' ? 'स्थानिक स्टॉक' : 'Local Supply'}
                    </span>
                    <strong className="text-rose-600">{trendItem.discoverable_supply}</strong>
                    {language === 'mr' && (
                      <span className="text-[9px] text-neutral-400 block">उपलब्धता कमी</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-xs text-neutral-500 pt-1 flex items-center justify-between">
                <span>{trendItem.metrics.recorded_searches} {language === 'mr' ? 'स्थानिक शोध' : 'demand signals'}</span>
                <span className="font-bold text-neutral-900 flex items-center gap-1">
                  {language === 'mr' ? 'तपशील पाहा' : 'Inspect Opportunity'} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
