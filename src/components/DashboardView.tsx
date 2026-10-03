import React from 'react';
import { Trend, LocalityInfo, Category } from '../types';
import { TrendingUp, ArrowUpRight, Zap, CheckCircle2, AlertTriangle, ShieldCheck, MapPin, Eye } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface DashboardViewProps {
  trends: Trend[];
  localities: LocalityInfo[];
  selectedLocality: string;
  setSelectedLocality: (localityId: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onSelectTrend: (trend: Trend) => void;
  onViewMap: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  trends,
  localities,
  selectedLocality,
  setSelectedLocality,
  selectedCategory,
  setSelectedCategory,
  onSelectTrend,
  onViewMap,
}) => {
  const { language } = useLanguage();
  const categories: Array<Category | 'All'> = ['All', 'Transport', 'Food', 'Retail', 'Services', 'Education'];

  // Identify high-priority opportunity alerts
  const highPriorityAlerts = trends.filter(t => t.opportunity_gap === 'High' && !t.is_spike);

  const getStrengthBadge = (strength: string) => {
    switch (strength) {
      case 'High':
        return <span className="font-semibold text-rose-700">High</span>;
      case 'Medium':
        return <span className="font-semibold text-amber-700">Medium</span>;
      default:
        return <span className="font-medium text-neutral-600">Low</span>;
    }
  };

  const getConvergenceBadge = (conv: string) => {
    switch (conv) {
      case 'Strong':
        return <span className="font-semibold text-emerald-700">Strong</span>;
      case 'Moderate':
        return <span className="font-semibold text-blue-700">Moderate</span>;
      default:
        return <span className="font-medium text-neutral-500">Weak</span>;
    }
  };

  const getGapBadge = (gap: string) => {
    switch (gap) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            HIGH GAP
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            MEDIUM GAP
          </span>
        );
      case 'Low-confidence':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-sm border border-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
            LOW CONFIDENCE
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 bg-neutral-50 px-2 py-0.5 rounded-sm border border-neutral-200">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
            LOW GAP
          </span>
        );
    }
  };

  const currentLocalityObj = localities.find(l => l.id === selectedLocality) || localities[0];

  return (
    <div className="space-y-8">
      {/* Hero / Strategic Header */}
      <section className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <span>Evidence-Driven Local Intelligence</span>
              <span aria-hidden="true">·</span>
              <span>Kopargaon Pilot Area</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
              Detect local demand before it becomes obvious.
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              LocalSignal combines hyperlocal searches, customer inquiries, community discussions, and reviews. When independent signals converge and local supply is limited, evidence-based business opportunities are uncovered.
            </p>
          </div>

          {/* Quick Stats Summary */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200/80 shrink-0 text-center">
            <div>
              <div className="text-xl font-bold text-neutral-900 tabular-nums">5</div>
              <div className="text-xs text-neutral-500 font-medium">Sectors Analyzed</div>
            </div>
            <div className="border-x border-neutral-200 px-3">
              <div className="text-xl font-bold text-rose-600 tabular-nums">2</div>
              <div className="text-xs text-neutral-500 font-medium">High Gaps</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-700 tabular-nums">4</div>
              <div className="text-xs text-neutral-500 font-medium">Signal Sources</div>
            </div>
          </div>
        </div>

        {/* Locality & Category Control Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Locality dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider shrink-0">
              Target Area:
            </span>
            <div className="relative">
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs sm:text-sm font-medium rounded-md px-3 py-1.5 pr-8 focus:ring-1 focus:ring-neutral-900 focus:outline-none cursor-pointer"
              >
                {localities.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-xs text-neutral-400 hidden sm:inline">
              ({currentLocalityObj.area})
            </span>
          </div>

          {/* Category Filter Buttons (Segmented Controls) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mr-1 hidden sm:inline">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunity Alerts Section (High Priority Gaps) */}
      {highPriorityAlerts.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></div>
              <h2 className="text-base font-bold text-neutral-900 tracking-tight">
                Opportunity Alerts
              </h2>
              <span className="text-xs text-neutral-500">
                · High demand with limited discoverable local supply
              </span>
            </div>
            <span className="text-xs text-neutral-400 font-mono">
              Actionable Insights
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highPriorityAlerts.map((trend) => (
              <div
                key={`alert-${trend.id}`}
                onClick={() => onSelectTrend(trend)}
                className="bg-white border-l-4 border-l-rose-600 border border-neutral-200 rounded-r-lg p-5 shadow-xs hover:border-neutral-400 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-rose-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      LOCAL OPPORTUNITY ALERT
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-rose-600 transition-colors">
                      {trend.topic}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      {trend.locality}
                    </p>
                  </div>
                  {getGapBadge(trend.opportunity_gap)}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 py-2 px-3 bg-neutral-50 rounded-md border border-neutral-100 text-xs text-neutral-600 font-medium">
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Trend Strength</span>
                    <span className="font-semibold text-neutral-900">{trend.trend_strength}</span>
                    {language === 'mr' && (
                      <span className="text-[10px] text-neutral-500 block leading-tight mt-0.5">मागणी किती वेगाने वाढत आहे</span>
                    )}
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Convergence</span>
                    <span className="font-semibold text-emerald-700">{trend.convergence}</span>
                    {language === 'mr' && (
                      <span className="text-[10px] text-neutral-500 block leading-tight mt-0.5">वेगवेगळ्या स्रोतांमधून समान मागणी</span>
                    )}
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Local Supply</span>
                    <span className="font-semibold text-rose-700">{trend.discoverable_supply}</span>
                    {language === 'mr' && (
                      <span className="text-[10px] text-neutral-500 block leading-tight mt-0.5">उपलब्ध स्थानिक पुरवठा</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 text-xs text-neutral-600 space-y-1">
                  <div className="font-medium text-neutral-800">Why this exists:</div>
                  <ul className="list-disc list-inside text-neutral-600 space-y-0.5">
                    <li>Search queries increased (+{trend.metrics.growth_percentage}% velocity)</li>
                    <li>Direct merchant inquiries & customer requests recorded</li>
                    <li>{trend.supply_details.statement}</li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="font-medium text-neutral-900">
                    Next step: <span className="text-neutral-600 font-normal">Investigate local feasibility</span>
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-neutral-900 group-hover:translate-x-0.5 transition-transform">
                    Inspect Evidence <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Emerging Signals Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
              Emerging Signals
            </h2>
            <p className="text-xs text-neutral-500">
              Cross-validated local demand clusters for {currentLocalityObj.name}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              High Opportunity
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Medium
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
              Saturated / Low
            </span>
          </div>
        </div>

        {trends.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-lg p-12 text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="text-base font-semibold text-neutral-800">No signals found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              No emerging signals match the selected category & locality filter during this pilot window.
            </p>
            <button
              onClick={() => {
                setSelectedLocality('kopargaon-all');
                setSelectedCategory('All');
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trends.map((trend) => (
              <div
                key={trend.id}
                onClick={() => onSelectTrend(trend)}
                className={`bg-white border rounded-lg p-5 shadow-xs hover:border-neutral-400 transition-all cursor-pointer flex flex-col justify-between group ${
                  trend.is_spike ? 'border-dashed border-amber-300 bg-amber-50/20' : 'border-neutral-200'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      {trend.category}
                    </span>
                    {getGapBadge(trend.opportunity_gap)}
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-rose-600 transition-colors mt-1.5">
                    {trend.topic}
                  </h3>

                  <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span className="truncate">{trend.locality}</span>
                  </p>

                  {/* Core Metrics Grid */}
                  <div className="mt-4 pt-3 border-t border-neutral-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Trend Strength</span>
                      {getStrengthBadge(trend.trend_strength)}
                      {language === 'mr' && (
                        <span className="text-[10px] text-neutral-400 block leading-tight">मागणी किती वेगाने वाढते</span>
                      )}
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Convergence</span>
                      {getConvergenceBadge(trend.convergence)}
                      {language === 'mr' && (
                        <span className="text-[10px] text-neutral-400 block leading-tight">वेगवेगळ्या स्रोतांमधून</span>
                      )}
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Status</span>
                      <span className="font-medium text-neutral-800">{trend.status}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Discoverable Supply</span>
                      <span className={`font-semibold ${
                        trend.discoverable_supply === 'Limited' ? 'text-rose-700' :
                        trend.discoverable_supply === 'Strong' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {trend.discoverable_supply}
                      </span>
                      {language === 'mr' && (
                        <span className="text-[10px] text-neutral-400 block leading-tight">स्थानिक उपलब्धता</span>
                      )}
                    </div>
                  </div>

                  {/* Signal Breakdown Icons */}
                  <div className="mt-4 py-2 px-2.5 bg-neutral-50 rounded-md border border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
                    <span className="flex items-center gap-1 font-medium">
                      Search: <span className="font-semibold text-neutral-900">{trend.signals.search}</span>
                    </span>
                    <span aria-hidden="true" className="text-neutral-300">·</span>
                    <span className="flex items-center gap-1 font-medium">
                      Discussion: <span className="font-semibold text-neutral-900">{trend.signals.discussion}</span>
                    </span>
                    <span aria-hidden="true" className="text-neutral-300">·</span>
                    <span className="flex items-center gap-1 font-medium">
                      Inquiries: <span className="font-semibold text-neutral-900">{trend.signals.requests}</span>
                    </span>
                  </div>

                  {trend.is_spike && (
                    <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-sm text-[11px] text-amber-900 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>
                        <strong>Anomaly Protection:</strong> Single-day search spike without multi-source convergence.
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-mono tabular-nums">
                    {trend.metrics.recorded_searches} searches · {trend.metrics.direct_requests} inquiries
                  </span>
                  <span className="font-semibold text-neutral-900 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    View Detail <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Opportunity Map Preview Section */}
      <section className="bg-white border border-neutral-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              Spatial Opportunity Map Preview
            </h2>
            <p className="text-xs text-neutral-500">
              Interactive geographic concentration of signals vs discoverable local business supply
            </p>
          </div>
          <button
            onClick={onViewMap}
            className="px-3.5 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors flex items-center gap-1.5 self-start cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Open Full Interactive Map
          </button>
        </div>

        {/* Map Preview Teaser Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-md bg-rose-50 border border-rose-200/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              Red Zone: High Opportunity Gap
            </div>
            <p className="text-xs text-rose-800 leading-relaxed">
              <strong>SH-10 Highway Junction:</strong> Strong multi-source EV charging interest + limited discoverable fast charging infrastructure.
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-amber-50 border border-amber-200/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Yellow Zone: Emerging Signal
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Town Market:</strong> Sports equipment demand developing. Partial supply exists in general stationery shops.
            </p>
          </div>

          <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              Green Zone: Saturated Supply
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              <strong>Shivaji Chowk:</strong> High AC & motor repair demand, but 8 discoverable local technicians already operate here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
