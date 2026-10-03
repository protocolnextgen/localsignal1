import React, { useState } from 'react';
import { Trend, LocalityInfo, Signal, Business, EvidenceSource } from '../types';
import { DashboardView } from './DashboardView';
import { EvidenceExplorerView } from './EvidenceExplorerView';
import { OpportunityMapView } from './OpportunityMapView';
import { DataSignalView } from './DataSignalView';
import { QueryNormalizerSandbox } from './QueryNormalizerSandbox';
import { 
  BarChart3, 
  Map, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Info,
  Layers,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface IntelligenceSuiteViewProps {
  trends: Trend[];
  localities: LocalityInfo[];
  selectedLocality: string;
  setSelectedLocality: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedTrend: Trend;
  onSelectTrend: (trend: Trend) => void;
  signals: Signal[];
  businesses: Business[];
  evidenceList: EvidenceSource[];
  onOpenLimitations: () => void;
  activeSubTab?: 'overview' | 'map' | 'evidence' | 'signals' | 'ai-parser';
  onSubTabChange?: (tab: string) => void;
  onBackToOpportunities?: () => void;
}

export const IntelligenceSuiteView: React.FC<IntelligenceSuiteViewProps> = ({
  trends,
  localities,
  selectedLocality,
  setSelectedLocality,
  selectedCategory,
  setSelectedCategory,
  selectedTrend,
  onSelectTrend,
  signals,
  businesses,
  evidenceList,
  onOpenLimitations,
  activeSubTab,
  onSubTabChange,
  onBackToOpportunities,
}) => {
  const [internalSubTab, setInternalSubTab] = useState<'overview' | 'map' | 'evidence' | 'signals' | 'ai-parser'>('overview');

  const subTab = activeSubTab || internalSubTab;
  const handleTabClick = (tabId: 'overview' | 'map' | 'evidence' | 'signals' | 'ai-parser') => {
    setInternalSubTab(tabId);
    if (onSubTabChange) onSubTabChange(tabId);
  };

  return (
    <div className="space-y-6">
      {/* Return to Seller Opportunities Breadcrumb */}
      {onBackToOpportunities && (
        <div className="flex items-center justify-between pb-1">
          <button
            onClick={onBackToOpportunities}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-300 hover:bg-neutral-50 px-3.5 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-500" />
            <span>Back to Opportunities</span>
          </button>
          <span className="text-xs text-neutral-400 font-mono">
            LocalSignal Intelligence Platform
          </span>
        </div>
      )}

      {/* Intelligence Suite Sub-Navigation Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-neutral-900 text-white rounded-lg">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                Hyperlocal Intelligence Engine
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                Angular Intelligence Frontend
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                FastAPI + Supabase
              </span>
            </div>
            <div className="text-base font-extrabold text-neutral-900">
              Demand Signal Fusion & Supply Verification
            </div>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'overview', label: 'Market Overview', icon: BarChart3 },
            { id: 'map', label: 'Opportunity Map', icon: Map },
            { id: 'evidence', label: 'Evidence Engine', icon: ShieldCheck },
            { id: 'signals', label: 'Signal Records', icon: FileText },
            { id: 'ai-parser', label: 'AI Query Parser', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  subTab === tab.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <button
            onClick={onOpenLimitations}
            className="px-2.5 py-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors border border-neutral-200 cursor-pointer flex items-center gap-1 shrink-0"
            title="System Limitations & Methodology Standards"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Methodology</span>
          </button>
        </div>
      </div>

      {/* Viewport Sub-Views */}
      <div>
        {subTab === 'overview' && (
          <DashboardView
            trends={trends}
            localities={localities}
            selectedLocality={selectedLocality}
            setSelectedLocality={setSelectedLocality}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectTrend={onSelectTrend}
            onViewMap={() => handleTabClick('map')}
          />
        )}

        {subTab === 'map' && (
          <OpportunityMapView
            trends={trends}
            businesses={businesses}
            localities={localities}
            selectedLocality={selectedLocality}
            setSelectedLocality={setSelectedLocality}
            onSelectTrend={onSelectTrend}
          />
        )}

        {subTab === 'evidence' && (
          <EvidenceExplorerView
            trends={trends}
            selectedTrend={selectedTrend}
            onSelectTrend={onSelectTrend}
            evidenceList={evidenceList}
            onViewMap={() => handleTabClick('map')}
          />
        )}

        {subTab === 'signals' && (
          <DataSignalView signals={signals} />
        )}

        {subTab === 'ai-parser' && (
          <QueryNormalizerSandbox />
        )}
      </div>
    </div>
  );
};
