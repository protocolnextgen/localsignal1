import React from 'react';
import { Trend, Signal, Business } from '../types';
import { 
  TrendingUp, 
  MapPin, 
  ArrowRight, 
  Cpu, 
  AlertCircle, 
  Map, 
  ShieldCheck, 
  FileText, 
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SellerOpportunitiesViewProps {
  trends: Trend[];
  signals: Signal[];
  businesses: Business[];
  onSelectTrend: (trend: Trend) => void;
  onOpenIntelligence: (initialSubTab?: 'overview' | 'map' | 'evidence' | 'signals' | 'ai-parser') => void;
}

export const SellerOpportunitiesView: React.FC<SellerOpportunitiesViewProps> = ({
  trends,
  onSelectTrend,
  onOpenIntelligence,
}) => {
  const { t, language } = useLanguage();

  // Emerging signals (trends where strength is high or medium)
  const emergingSignals = trends.filter(t => !t.is_spike && t.status !== 'Declining');

  // Opportunity gaps (trends where supply is limited or partial)
  const opportunityGaps = trends.filter(t => t.opportunity_gap === 'High' || t.opportunity_gap === 'Medium');

  return (
    <div className="space-y-8 font-sans">
      {/* 1. WELCOME / HERO BANNER */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600">
            <TrendingUp className="w-4 h-4" />
            <span>{language === 'mr' ? 'व्यावसायिक संधी · कोपरगाव' : 'Commercial Opportunities · Kopargaon'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            {t('navOpportunities')}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {language === 'mr'
              ? 'ग्राहकांची वाढती मागणी आणि दुकानांमधील तुटवडा ओळखा. कोपरगावमधील ग्राहक काय शोधत आहेत आणि काय उपलब्ध नाही याचे विश्लेषण.'
              : 'Discover verified consumer demand gaps and emerging local product trends. Our analytics engine continuously cross-references customer inquiries with discoverable shop inventory in Kopargaon.'}
          </p>
        </div>

        {/* Primary CTA: View Intelligence */}
        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => onOpenIntelligence('overview')}
            className="px-5 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>{language === 'mr' ? 'तांत्रिक विश्लेषण (Intelligence)' : 'View Intelligence'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 2. EMERGING LOCAL SIGNALS */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>{language === 'mr' ? 'स्थानिक मागणी वाढत आहे' : 'Emerging Local Signals'}</span>
              <span className="text-xs font-normal text-neutral-400">
                {language === 'mr' ? '(Emerging Local Signals)' : ''}
              </span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {language === 'mr'
                ? 'विविध स्थानिक स्रोतांमधून ग्राहकांचा शोध आणि विचारणा वाढत असल्याचे दिसते.'
                : 'Multiple independent channels indicate that local search and inquiry volume is accelerating.'}
            </p>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            {emergingSignals.length} {language === 'mr' ? 'सक्रिय कल आढळले' : 'Active Signals Detected'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergingSignals.map((trend) => (
            <div
              key={trend.id}
              onClick={() => onSelectTrend(trend)}
              className="p-5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded-sm">
                    {trend.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                    trend.trend_strength === 'High' ? 'text-blue-700 bg-blue-50 border border-blue-200' : 'text-neutral-700 bg-neutral-100'
                  }`}>
                    {language === 'mr' ? 'मागणी वेग: ' : ''}{trend.trend_strength} {language === 'mr' ? 'वेगाने' : 'Momentum'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 group-hover:text-rose-600 transition-colors leading-snug">
                  {trend.topic}
                </h3>

                <p className="text-xs text-neutral-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="truncate">{trend.locality}</span>
                </p>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {trend.summary}
                </p>
              </div>

              {/* Metrics pill */}
              <div className="pt-3 border-t border-neutral-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span>{language === 'mr' ? 'नोंदवलेले शोध:' : 'Logged Searches:'}</span>
                  <span className="font-bold text-neutral-900">{trend.metrics.recorded_searches}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span>{language === 'mr' ? 'वाढ:' : 'Growth Rate:'}</span>
                  <span className="font-bold text-emerald-700">+{trend.metrics.growth_percentage}%</span>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-semibold text-rose-600 group-hover:underline">
                  <span>{language === 'mr' ? 'पुरावे व तपशील पहा' : 'Inspect Evidence'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OPPORTUNITY GAPS (Section 10) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              <span>{language === 'mr' ? 'मागणी जास्त, उपलब्धता कमी' : 'Opportunity Gaps'}</span>
              <span className="text-xs font-normal text-neutral-400">
                {language === 'mr' ? '(Opportunity Gap)' : ''}
              </span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              {language === 'mr'
                ? 'ग्राहकांची मागणी खूप जास्त आहे, पण कोपरगावमधील दुकानांमध्ये हा माल सहज उपलब्ध नाही.'
                : 'Consumer demand appears strong while suitable discoverable local supply appears limited.'}
            </p>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            {language === 'mr' ? 'नवीन व्यवसायाची संधी' : 'Unmet Local Commercial Potential'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunityGaps.map((trend) => (
            <div
              key={trend.id}
              className="p-6 bg-white border border-rose-100 rounded-2xl shadow-xs space-y-4 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 uppercase tracking-wider">
                    <AlertCircle className="w-3 h-3 text-rose-600" />
                    <span>
                      {language === 'mr' 
                        ? (trend.opportunity_gap === 'High' ? 'मोठी संधी (जास्त तफावत)' : 'वाढती संधी')
                        : (trend.opportunity_gap === 'High' ? 'High Opportunity Gap' : 'Emerging Gap')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mt-1">
                    {trend.topic}
                  </h3>
                  <p className="text-xs text-neutral-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span>{trend.locality}</span>
                  </p>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl text-center shrink-0">
                  <div className="text-base font-extrabold text-rose-600">
                    {trend.supply_details.discoverable_count}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-medium">
                    {language === 'mr' ? 'उपलब्ध दुकाने' : 'Local Shops'}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl text-xs space-y-1 text-neutral-700">
                <strong className="text-neutral-900 block font-semibold">
                  {language === 'mr' ? 'स्थानिक स्टॉक स्थिती:' : 'Supply Audit Finding:'}
                </strong>
                <p className="leading-relaxed text-[11px] italic">
                  "{trend.supply_details.statement}"
                </p>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-xs space-y-1 text-emerald-950">
                <strong className="block font-semibold text-emerald-900">
                  {language === 'mr' ? 'दुकानदारांसाठी शिफारस:' : 'Recommended Business Action:'}
                </strong>
                <p className="leading-relaxed text-[11px] text-emerald-800">
                  {trend.suggested_action}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onSelectTrend(trend)}
                  className="px-4 py-2 text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>{language === 'mr' ? 'तपशील पहा' : 'Inspect Trend Detail'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenIntelligence('map')}
                  className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Map className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'नकाशावर पहा' : 'View on Opportunity Map'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DIRECT ACCESS TO INTELLIGENCE SUITE MODULES */}
      <section className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>LocalSignal Intelligence Suite</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Deep analytical tools powered by Angular & FastAPI for market research and supply audit.
            </p>
          </div>
          <button
            onClick={() => onOpenIntelligence('overview')}
            className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Full Suite</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            onClick={() => onOpenIntelligence('map')}
            className="p-3.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl transition-all cursor-pointer space-y-1 shadow-xs group"
          >
            <Map className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-neutral-900 mt-1">Opportunity Map</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Geographic supply zones & radius heatmap</div>
            {language === 'mr' && (
              <div className="text-[10px] text-neutral-400">नकाशावर स्थानिक मागणी व पुरवठा</div>
            )}
          </div>

          <div
            onClick={() => onOpenIntelligence('evidence')}
            className="p-3.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl transition-all cursor-pointer space-y-1 shadow-xs group"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-neutral-900 mt-1">Evidence Engine</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Multi-source corroboration check</div>
            {language === 'mr' && (
              <div className="text-[10px] text-neutral-400">विविध स्रोतांतून पडताळणी</div>
            )}
          </div>

          <div
            onClick={() => onOpenIntelligence('signals')}
            className="p-3.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl transition-all cursor-pointer space-y-1 shadow-xs group"
          >
            <FileText className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-neutral-900 mt-1">Signal Records</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Logged search & discussion records</div>
            {language === 'mr' && (
              <div className="text-[10px] text-neutral-400">स्थानिक शोध व संदेश नोंदी</div>
            )}
          </div>

          <div
            onClick={() => onOpenIntelligence('ai-parser')}
            className="p-3.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl transition-all cursor-pointer space-y-1 shadow-xs group"
          >
            <Sparkles className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-xs text-neutral-900 mt-1">AI Query Parser</div>
            <div className="text-[11px] text-neutral-500 leading-tight">Local language NLP parsing & attributes</div>
            {language === 'mr' && (
              <div className="text-[10px] text-neutral-400">मराठी व इंग्रजी भाषा समजणारे मॉडेल</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
