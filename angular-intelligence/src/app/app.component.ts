import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OpportunityMapComponent } from './components/opportunity-map/opportunity-map.component';
import { EvidenceEngineComponent } from './components/evidence-engine/evidence-engine.component';
import { SignalRecordsComponent } from './components/signal-records/signal-records.component';
import { AiQueryParserComponent } from './components/ai-query-parser/ai-query-parser.component';
import { MethodologyComponent } from './components/methodology/methodology.component';
import { IntelligenceApiService } from './services/intelligence-api.service';
import { Trend, Signal, Business, LocalityInfo, EvidenceSource } from './models/intelligence.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DashboardComponent,
    OpportunityMapComponent,
    EvidenceEngineComponent,
    SignalRecordsComponent,
    AiQueryParserComponent,
    MethodologyComponent
  ],
  template: `
    <div class="min-h-screen bg-neutral-50 text-neutral-900 font-sans p-4 sm:p-6 lg:p-8 space-y-6">
      <!-- Angular Sub-Navigation -->
      <header class="bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
              Angular Intelligence Dashboard
            </span>
            <span class="text-xs text-neutral-400">· Shared FastAPI Backend</span>
          </div>
          <h1 class="text-xl font-extrabold text-neutral-900 mt-1">LocalSignal Market Intelligence Portal</h1>
        </div>

        <nav class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button 
            *ngFor="let tab of tabs" 
            (click)="activeTab = tab.id"
            [ngClass]="activeTab === tab.id ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap">
            {{ tab.label }}
          </button>
        </nav>
      </header>

      <!-- Viewport Rendering -->
      <main>
        <app-dashboard 
          *ngIf="activeTab === 'overview'"
          [trends]="trends" 
          [localities]="localities"
          [selectedLocality]="selectedLocality"
          (trendSelected)="onTrendSelected($event)"
          (localityChanged)="onLocalityChanged($event)">
        </app-dashboard>

        <app-opportunity-map 
          *ngIf="activeTab === 'map'"
          [trends]="trends"
          [businesses]="businesses"
          [localities]="localities"
          [selectedLocality]="selectedLocality"
          (trendSelected)="onTrendSelected($event)"
          (localityChanged)="onLocalityChanged($event)">
        </app-opportunity-map>

        <app-evidence-engine 
          *ngIf="activeTab === 'evidence'"
          [selectedTrend]="selectedTrend"
          [evidenceList]="evidenceList"
          (viewMapClicked)="activeTab = 'map'">
        </app-evidence-engine>

        <app-signal-records 
          *ngIf="activeTab === 'signals'"
          [signals]="signals">
        </app-signal-records>

        <app-ai-query-parser 
          *ngIf="activeTab === 'ai-parser'">
        </app-ai-query-parser>

        <app-methodology 
          *ngIf="activeTab === 'methodology'">
        </app-methodology>
      </main>
    </div>
  `
})
export class AppComponent implements OnInit {
  activeTab: 'overview' | 'map' | 'evidence' | 'signals' | 'ai-parser' | 'methodology' = 'overview';
  
  tabs = [
    { id: 'overview', label: 'Market Overview' },
    { id: 'map', label: 'Opportunity Map' },
    { id: 'evidence', label: 'Evidence Engine' },
    { id: 'signals', label: 'Signal Records' },
    { id: 'ai-parser', label: 'AI Query Parser' },
    { id: 'methodology', label: 'Methodology' }
  ];

  trends: Trend[] = [];
  signals: Signal[] = [];
  businesses: Business[] = [];
  localities: LocalityInfo[] = [];
  evidenceList: EvidenceSource[] = [];
  selectedTrend: Trend | null = null;
  selectedLocality: string = 'kopargaon-all';

  constructor(private api: IntelligenceApiService) {}

  ngOnInit() {
    this.api.getLocalities().subscribe(res => {
      if (res?.localities) this.localities = res.localities;
    });

    this.api.getTrends().subscribe(res => {
      if (res?.trends) {
        this.trends = res.trends;
        if (res.trends.length > 0) {
          this.selectedTrend = res.trends[0];
          this.loadEvidence(res.trends[0].id);
        }
      }
    });

    this.api.getSignals().subscribe(res => {
      if (res?.signals) this.signals = res.signals;
    });

    this.api.getBusinesses().subscribe(res => {
      if (res?.businesses) this.businesses = res.businesses;
    });
  }

  loadEvidence(trendId: string) {
    this.api.getEvidence(trendId).subscribe(res => {
      if (res?.evidence) this.evidenceList = res.evidence;
    });
  }

  onTrendSelected(trend: Trend) {
    this.selectedTrend = trend;
    this.loadEvidence(trend.id);
    this.activeTab = 'evidence';
  }

  onLocalityChanged(locId: string) {
    this.selectedLocality = locId;
  }
}
