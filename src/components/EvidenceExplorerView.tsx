import React, { useState } from 'react';
import { Trend, EvidenceSource } from '../types';
import { evaluateTrendScoring } from '../services/scoringEngine';
import { 
  CheckCircle2, 
  HelpCircle, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  Search, 
  MessageSquare, 
  FileText, 
  Star, 
  Layers, 
  Activity,
  ArrowRight,
  Info
} from 'lucide-react';

interface EvidenceExplorerViewProps {
  trends: Trend[];
  selectedTrend: Trend;
  onSelectTrend: (trend: Trend) => void;
  evidenceList: EvidenceSource[];
  onViewMap?: () => void;
}

export const EvidenceExplorerView: React.FC<EvidenceExplorerViewProps> = ({
  trends,
  selectedTrend,
  onSelectTrend,
  evidenceList,
  onViewMap,
}) => {
  const [activeComparison, setActiveComparison] = useState<'real' | 'spike'>('real');

  const realTrend = trends.find(t => t.id === 'trend-ev-charging') || selectedTrend;
  const spikeTrend = trends.find(t => t.is_spike) || trends[trends.length - 1];

  const currentInspectedTrend = activeComparison === 'real' ? realTrend : spikeTrend;
  const scoring = evaluateTrendScoring(currentInspectedTrend);

  return (
    <div className="space-y-8">
      {/* Evidence Engine Header */}
      <section className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <span>Explainable Scoring Layer</span>
            <span aria-hidden="true">·</span>
            <span>Zero Black-Box Logic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Evidence Engine & Convergence Explorer
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            LocalSignal rejects opaque prediction models. Instead, we compute transparent multi-source convergence: when independent searches, community discussions, and direct merchant requests point to the same locality and local supply is limited, the evidence is corroborated.
          </p>
        </div>

        {/* Trend Switcher Bar */}
        <div className="mt-6 pt-5 border-t border-neutral-200/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mr-2">
            Inspecting Signal:
          </span>
          {trends.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTrend(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                selectedTrend.id === t.id
                  ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {t.topic} {t.is_spike && '(Spike Anomaly)'}
            </button>
          ))}
        </div>
      </section>

      {/* Primary Section: WHY THIS SIGNAL EXISTS (Section 6) */}
      <section className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              <span>WHY THIS SIGNAL EXISTS:</span>
              <span className="text-rose-600">{selectedTrend.topic}</span>
            </h2>
            <p className="text-xs text-neutral-500">
              Deterministic rule-based validation checks for {selectedTrend.locality}
            </p>
          </div>
          <span className="text-xs font-semibold text-neutral-700 font-mono">
            {scoring.convergence.level} Convergence
          </span>
        </div>

        {/* 6 Proof Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pillar 1 */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/70 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>1. Search Interest Increased</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              <strong>+{selectedTrend.metrics.growth_percentage}% growth</strong> across normalized query terms ("{selectedTrend.topic}") over the pilot baseline.
            </p>
            <div className="text-[11px] text-neutral-400 font-mono tabular-nums pt-1 border-t border-neutral-200/50">
              Count: {selectedTrend.metrics.recorded_searches} searches logged
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/70 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>2. Similar Inquiries Appeared</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Direct counter requests logged across local merchants, stalls, and auto workshops asking for {selectedTrend.topic}.
            </p>
            <div className="text-[11px] text-neutral-400 font-mono tabular-nums pt-1 border-t border-neutral-200/50">
              Count: {selectedTrend.metrics.direct_requests} merchant inquiry records
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/70 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>3. Public Discussions Increased</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Community message groups, commuter forums, and consumer review threads actively querying or lamenting absence of local facilities.
            </p>
            <div className="text-[11px] text-neutral-400 font-mono tabular-nums pt-1 border-t border-neutral-200/50">
              Count: {selectedTrend.metrics.discussion_mentions} public discussion entries
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/70 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>4. Geographically Concentrated</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Signals originate within a tight geospatial cluster ({selectedTrend.locality}) rather than random dispersed background noise.
            </p>
            <div className="text-[11px] text-neutral-400 font-mono tabular-nums pt-1 border-t border-neutral-200/50">
              Cluster: {selectedTrend.geographic_concentration} Spatial Density
            </div>
          </div>

          {/* Pillar 5 */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/70 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>5. Changes are Recent & Sustained</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Recorded within the active {selectedTrend.metrics.pilot_window_days}-day pilot observation window, proving current relevance.
            </p>
            <div className="text-[11px] text-neutral-400 font-mono tabular-nums pt-1 border-t border-neutral-200/50">
              Detected: {new Date(selectedTrend.detected_at).toLocaleDateString()}
            </div>
          </div>

          {/* Pillar 6 */}
          <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200/70 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>6. Multiple Source Types Support</span>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Corroborated across {selectedTrend.source_diversity.toLowerCase()} independent platforms (Search, Chat, Direct Merchant, Review).
            </p>
            <div className="text-[11px] text-neutral-400 font-mono tabular-nums pt-1 border-t border-neutral-200/50">
              Diversity: {selectedTrend.source_diversity} Independent Channels
            </div>
          </div>
        </div>

        {/* Deterministic Rules Architecture (Section 15) */}
        <div className="p-5 bg-neutral-900 text-white rounded-lg space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-300 uppercase tracking-wider">
              Transparent Scoring Logic Breakdown
            </span>
            <span className="text-neutral-400 font-mono">Deterministic Thresholds</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 bg-neutral-800/80 p-3.5 rounded-md">
              <div className="font-bold text-neutral-200">1. Trend Strength Formula:</div>
              <div className="text-neutral-400 font-mono text-[11px]">
                Inputs = Growth Velocity + Total Volume + Multi-Source Recency
              </div>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                Result for this signal: <strong className="text-white">{scoring.trend_strength.level}</strong>. {scoring.trend_strength.verdict}
              </p>
            </div>

            <div className="space-y-1.5 bg-neutral-800/80 p-3.5 rounded-md">
              <div className="font-bold text-neutral-200">2. Opportunity Gap Formula:</div>
              <div className="text-neutral-400 font-mono text-[11px]">
                Gap = Demand Strength ({selectedTrend.trend_strength}) − Discoverable Local Supply ({selectedTrend.discoverable_supply})
              </div>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                Result for this signal: <strong className="text-rose-400">{scoring.opportunity_gap.level}</strong>. {scoring.opportunity_gap.reasoning}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FALSE-POSITIVE PROTECTION SHOWCASE (Section 16) */}
      <section className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>False-Positive Anomaly Protection</span>
            </div>
            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
              Distinguishing Real Emerging Signals from Temporary Spikes
            </h2>
            <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
              A single search spike on a rainy day is NOT an automatic business opportunity. LocalSignal requires multi-source convergence before escalating a signal to high confidence.
            </p>
          </div>

          {/* Interactive Inspection Mode Switcher */}
          <div className="flex items-center p-1 bg-neutral-100 rounded-lg shrink-0">
            <button
              onClick={() => setActiveComparison('real')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeComparison === 'real'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              1. Real Sustained Signal (EV Charging)
            </button>
            <button
              onClick={() => setActiveComparison('spike')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeComparison === 'spike'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              2. Temporary Anomaly (Monsoon Spike)
            </button>
          </div>
        </div>

        {/* Side-by-side comparison matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Real Signal */}
          <div className={`p-5 rounded-lg border transition-all ${
            activeComparison === 'real' ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500' : 'border-neutral-200 bg-neutral-50/50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Real Emerging Signal
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">
                HIGH CONFIDENCE
              </span>
            </div>

            <h3 className="text-base font-bold text-neutral-900 mb-2">
              EV Charging — SH-10 Highway Junction
            </h3>

            <div className="space-y-2 text-xs text-neutral-700 mb-4">
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-500">Search Velocity:</span>
                <span className="font-semibold text-neutral-900">↑ Increasing (342 searches)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-500">Public Discussions:</span>
                <span className="font-semibold text-neutral-900">↑ Increasing (89 mentions)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-500">Merchant Inquiries:</span>
                <span className="font-semibold text-neutral-900">✓ Present (38 logs)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-500">Source Diversity:</span>
                <span className="font-semibold text-emerald-700">Multiple Independent Channels</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-500">Signal Convergence:</span>
                <span className="font-bold text-emerald-700">Strong</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-neutral-200 rounded-md text-xs text-neutral-600">
              <strong>Engine Verdict:</strong> Legitimate emerging local trend. Sits at the intersection of accelerating highway electric vehicle traffic and non-existent local charging infrastructure.
            </div>
          </div>

          {/* Card: Temporary Spike */}
          <div className={`p-5 rounded-lg border transition-all ${
            activeComparison === 'spike' ? 'border-amber-500 bg-amber-50/20 ring-1 ring-amber-500' : 'border-neutral-200 bg-neutral-50/50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Temporary Anomaly Flag
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-sm">
                LOW CONFIDENCE
              </span>
            </div>

            <h3 className="text-base font-bold text-neutral-900 mb-2">
              Flash Monsoon Umbrellas — Bet Kopargaon
            </h3>

            <div className="space-y-2 text-xs text-neutral-700 mb-4">
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-500">Search Velocity:</span>
                <span className="font-semibold text-amber-700">↑↑↑ Single-day spike (185 queries)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-500">Public Discussions:</span>
                <span className="font-semibold text-neutral-400">Zero sustained discussions</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-500">Merchant Inquiries:</span>
                <span className="font-semibold text-neutral-400">Negligible (2 logs)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-200/60">
                <span className="text-neutral-500">Source Diversity:</span>
                <span className="font-semibold text-amber-700">Single Source Only</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-neutral-500">Signal Convergence:</span>
                <span className="font-bold text-neutral-500">Weak</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-neutral-200 rounded-md text-xs text-neutral-600">
              <strong>Engine Verdict:</strong> Weather anomaly. Search query surge immediately faded once rain stopped. Correctly filtered out from high-priority business opportunity alerts!
            </div>
          </div>
        </div>
      </section>

      {/* Raw Evidence Sources Table */}
      <section className="bg-white border border-neutral-200 rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              Audit Trail: Raw Corroboration Logs
            </h2>
            <p className="text-xs text-neutral-500">
              Direct telemetry citations for {selectedTrend.topic}
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            {evidenceList.length} evidence records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-500 uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Evidence ID</th>
                <th className="py-2.5 px-3">Signal Type</th>
                <th className="py-2.5 px-3">Recorded Count</th>
                <th className="py-2.5 px-3">Direction</th>
                <th className="py-2.5 px-3">Observation Period</th>
                <th className="py-2.5 px-3">Telemetry Findings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {evidenceList.map((ev) => (
                <tr key={ev.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-neutral-500">
                    {ev.id}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-neutral-900">
                    {ev.source_type}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-neutral-800 tabular-nums">
                    {ev.signal_count}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-emerald-700">
                      {ev.direction}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-neutral-500">
                    {ev.timestamp}
                  </td>
                  <td className="py-2.5 px-3 text-neutral-700 max-w-md">
                    {ev.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
