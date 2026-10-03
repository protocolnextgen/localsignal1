import React from 'react';
import { Trend, Signal, Business } from '../types';
import { evaluateTrendScoring } from '../services/scoringEngine';
import { 
  ArrowLeft, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  Search, 
  MessageSquare, 
  FileText, 
  Star, 
  Layers, 
  CheckCircle, 
  ArrowUpRight, 
  Activity, 
  FileBarChart,
  Map,
  Compass
} from 'lucide-react';

interface TrendDetailViewProps {
  trend: Trend;
  signals: Signal[];
  businesses: Business[];
  onBack: () => void;
  onExploreEvidence: () => void;
  onViewMap: () => void;
  onOpenOpportunityCard: () => void;
}

export const TrendDetailView: React.FC<TrendDetailViewProps> = ({
  trend,
  signals,
  businesses,
  onBack,
  onExploreEvidence,
  onViewMap,
  onOpenOpportunityCard,
}) => {
  const scoring = evaluateTrendScoring(trend);
  const relevantSignals = signals.filter(
    s => s.normalized_topic.toLowerCase() === trend.topic.toLowerCase() ||
         trend.topic.toLowerCase().includes(s.normalized_topic.toLowerCase())
  );

  const localBusinesses = businesses.filter(b => b.locality === trend.locality);

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onViewMap}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-50 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Map className="w-3.5 h-3.5 text-neutral-500" />
            <span>View on Map</span>
          </button>
          <button
            onClick={onOpenOpportunityCard}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <FileBarChart className="w-3.5 h-3.5" />
            <span>Generate Opportunity Card</span>
          </button>
        </div>
      </div>

      {/* Main Detail Header Card */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              <span>{trend.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-neutral-400" />
                {trend.locality}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-neutral-400">Status: {trend.status}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              {trend.topic} — Emerging Local Signal
            </h1>

            <p className="text-sm text-neutral-600 mt-2 max-w-3xl leading-relaxed">
              {trend.summary}
            </p>
          </div>

          {/* Triad Score Pill Container */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
            <div className="flex items-center justify-between gap-6 text-xs">
              <span className="text-neutral-500">Trend Strength</span>
              <span className="font-bold text-neutral-900">{trend.trend_strength}</span>
            </div>
            <div className="flex items-center justify-between gap-6 text-xs">
              <span className="text-neutral-500">Convergence</span>
              <span className="font-bold text-emerald-700">{trend.convergence}</span>
            </div>
            <div className="flex items-center justify-between gap-6 text-xs">
              <span className="text-neutral-500">Opportunity Gap</span>
              <span className={`font-bold ${
                trend.opportunity_gap === 'High' ? 'text-rose-700' :
                trend.opportunity_gap === 'Low-confidence' ? 'text-amber-700' : 'text-neutral-700'
              }`}>
                {trend.opportunity_gap}
              </span>
            </div>
          </div>
        </div>

        {/* 6 Core Signal Verification Dimensions (Section 5) */}
        <div className="pt-6 border-t border-neutral-200/80">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
              Signal Verification Matrix
            </h2>
            <span className="text-[11px] text-neutral-400 font-mono">
              Independent corroboration
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Search */}
            <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200/70">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                <Search className="w-3.5 h-3.5 text-neutral-400" />
                <span>Search Signal</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
                {trend.signals.search}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1 tabular-nums">
                {trend.metrics.recorded_searches} recorded
              </div>
            </div>

            {/* Discussion */}
            <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200/70">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
                <span>Discussion</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                {trend.signals.discussion}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1 tabular-nums">
                {trend.metrics.discussion_mentions} mentions
              </div>
            </div>

            {/* Requests */}
            <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200/70">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                <span>Customer Inquiries</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                {trend.signals.requests}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1 tabular-nums">
                {trend.metrics.direct_requests} direct logs
              </div>
            </div>

            {/* Reviews */}
            <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200/70">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                <Star className="w-3.5 h-3.5 text-neutral-400" />
                <span>Review Feedback</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-neutral-600" />
                {trend.signals.reviews}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1 tabular-nums">
                {trend.metrics.related_reviews} reviews
              </div>
            </div>

            {/* Geographic concentration */}
            <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200/70">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                <Compass className="w-3.5 h-3.5 text-neutral-400" />
                <span>Spatial Density</span>
              </div>
              <div className="text-sm font-bold text-neutral-900">
                {trend.geographic_concentration}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">
                Transit corridor
              </div>
            </div>

            {/* Source Diversity */}
            <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200/70">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                <Layers className="w-3.5 h-3.5 text-neutral-400" />
                <span>Source Diversity</span>
              </div>
              <div className="text-sm font-bold text-emerald-700">
                {trend.source_diversity}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">
                4 channels
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Velocity Chart & Local Supply Check */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Recent Change / Velocity Simulation */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900 tracking-tight">
                Recent 30-Day Signal Growth
              </h2>
              <p className="text-xs text-neutral-500">
                Weekly aggregated pilot query velocity in selected area
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
              +{trend.metrics.growth_percentage}% velocity
            </div>
          </div>

          {/* Simple Visual Velocity Chart */}
          <div className="pt-4 space-y-3">
            {[
              { week: 'Week 1 (Baseline)', count: Math.round(trend.metrics.recorded_searches * 0.15), pct: 15 },
              { week: 'Week 2', count: Math.round(trend.metrics.recorded_searches * 0.22), pct: 25 },
              { week: 'Week 3', count: Math.round(trend.metrics.recorded_searches * 0.38), pct: 45 },
              { week: 'Week 4 (Current)', count: Math.round(trend.metrics.recorded_searches * 0.65), pct: 90 },
            ].map((bar, i) => (
              <div key={bar.week} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600 font-medium">{bar.week}</span>
                  <span className="text-neutral-900 font-mono tabular-nums">{bar.count} signals</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      i === 3 ? 'bg-neutral-900' : 'bg-neutral-400'
                    }`}
                    style={{ width: `${bar.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Window: 30 days pilot observation</span>
            <span className="font-semibold text-neutral-700">Sustained positive slope</span>
          </div>
        </div>

        {/* Right Column: Local Supply Check (Section 17) */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900 tracking-tight">
                Discoverable Local Supply Check
              </h2>
              <p className="text-xs text-neutral-500">
                Audited local businesses & service directories
              </p>
            </div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${
              trend.discoverable_supply === 'Limited' ? 'text-rose-700 bg-rose-50 border border-rose-200' :
              trend.discoverable_supply === 'Strong' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' :
              'text-amber-700 bg-amber-50 border border-amber-200'
            }`}>
              {trend.discoverable_supply} Supply
            </span>
          </div>

          <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200/80 text-xs text-neutral-700 space-y-2">
            <div className="font-semibold text-neutral-900">Official Data Audit Statement:</div>
            <p className="italic text-neutral-800 leading-relaxed">
              "{trend.supply_details.statement}"
            </p>
            <div className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-200">
              * LocalSignal strictly states availability as discoverable in verified pilot records; unlisted private facilities may exist.
            </div>
          </div>

          {/* Existing Discoverable Businesses in this sector */}
          <div>
            <div className="text-xs font-semibold text-neutral-600 mb-2">
              Audited Sector Businesses in {trend.locality}:
            </div>

            {localBusinesses.length === 0 ? (
              <div className="p-3 bg-neutral-50 border border-neutral-200/60 rounded-md text-xs text-neutral-500 text-center">
                Zero matching commercial establishments discoverable in this sector radius.
              </div>
            ) : (
              <div className="space-y-2">
                {localBusinesses.map((b) => (
                  <div key={b.id} className="p-2.5 bg-white border border-neutral-200 rounded-md text-xs flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-neutral-900">{b.name}</div>
                      <div className="text-neutral-500 text-[11px]">{b.location}</div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-sm ${
                        b.availability_status === 'Active' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                      }`}>
                        {b.availability_status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Action & Business Investigation Recommendation (Section 21) */}
      <div className="bg-neutral-900 text-white rounded-lg p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
              Evidence-Based Business Investigation Lead
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">
            Feasibility Evaluation Only
          </span>
        </div>

        <div className="space-y-2 max-w-3xl">
          <h3 className="text-xl font-bold tracking-tight text-white">
            Suggested Action:
          </h3>
          <p className="text-base text-neutral-200 leading-relaxed">
            "{trend.suggested_action}"
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="max-w-xl">
            <strong>Honest Framing Notice:</strong> LocalSignal detects converging signals indicating an unmet demand pocket. This is an exploration opportunity, not a guaranteed commercial outcome or financial projection.
          </p>

          <button
            onClick={onExploreEvidence}
            className="px-4 py-2 text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-md transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
          >
            <span>Inspect Evidence Engine</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sample Underlying Signal Records for this Topic */}
      <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              Sample Underlying Signal Records
            </h2>
            <p className="text-xs text-neutral-500">
              Raw observations clustered into this topic
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {relevantSignals.length} recorded examples
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Observed Text / Inquiry</th>
                <th className="py-2.5 px-3">Source Channel</th>
                <th className="py-2.5 px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {relevantSignals.map((sig) => (
                <tr key={sig.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-neutral-800">
                    {sig.signal_type}
                  </td>
                  <td className="py-2.5 px-3 text-neutral-900 font-medium">
                    "{sig.text}"
                  </td>
                  <td className="py-2.5 px-3 text-neutral-500">
                    {sig.source}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-neutral-400 tabular-nums">
                    {new Date(sig.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
