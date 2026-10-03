import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Trend, Business, LocalityInfo } from '../../models/intelligence.models';

@Component({
  selector: 'app-opportunity-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
      <!-- Left Map Container -->
      <div class="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-4 shadow-xs flex flex-col">
        <div class="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div>
            <h3 class="text-sm font-bold text-neutral-900">Kopargaon Spatial Opportunity Heatmap</h3>
            <p class="text-xs text-neutral-500">Live multi-source demand zones vs discoverable local vendor supply</p>
          </div>
          <div class="flex items-center gap-2 text-[11px]">
            <span class="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm">
              <span class="w-2 h-2 rounded-full bg-rose-600"></span> Red Zone (High Gap)
            </span>
            <span class="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span> Yellow (Emerging)
            </span>
            <span class="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Green (Sufficient Supply)
            </span>
          </div>
        </div>

        <div #mapContainer class="w-full h-[450px] rounded-xl overflow-hidden mt-3 relative border border-neutral-200"></div>
      </div>

      <!-- Right Inspection Panel -->
      <div class="lg:col-span-4 bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-rose-600">Spatial Inspector</span>
          <h4 class="text-base font-extrabold text-neutral-900 mt-1">{{ activeLocality?.name || 'Selected Locality' }}</h4>
          <p class="text-xs text-neutral-500 mt-0.5">{{ activeLocality?.description }}</p>

          <div class="mt-4 pt-3 border-t border-neutral-100 space-y-3">
            <div class="text-xs font-bold text-neutral-800">Emerging Signals in Zone:</div>
            <div *ngIf="matchedTrends.length === 0" class="text-xs text-neutral-400 italic">
              No strong demand gap detected in this zone. Supply is balanced.
            </div>
            <div *ngFor="let t of matchedTrends" 
                 (click)="onSelectTrend(t)"
                 class="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200/80 cursor-pointer transition-colors">
              <div class="flex items-center justify-between text-[11px]">
                <span class="font-bold text-neutral-800">{{ t.category }}</span>
                <span class="font-bold text-rose-600">{{ t.trend_strength }} Demand</span>
              </div>
              <div class="text-xs font-bold text-neutral-900 mt-1">{{ t.topic }}</div>
              <div class="text-[11px] text-neutral-500 mt-1">{{ t.suggested_action }}</div>
            </div>
          </div>
        </div>

        <div class="pt-4 mt-4 border-t border-neutral-100 text-xs text-neutral-400">
          Click any map zone pin to inspect localized demand divergence.
        </div>
      </div>
    </div>
  `
})
export class OpportunityMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainerRef!: ElementRef<HTMLDivElement>;

  @Input() trends: Trend[] = [];
  @Input() businesses: Business[] = [];
  @Input() localities: LocalityInfo[] = [];
  @Input() selectedLocality: string = 'kopargaon-all';
  @Output() trendSelected = new EventEmitter<Trend>();
  @Output() localityChanged = new EventEmitter<string>();

  private map: L.Map | null = null;
  activeLocality: LocalityInfo | null = null;

  get matchedTrends(): Trend[] {
    if (!this.activeLocality || this.activeLocality.id === 'kopargaon-all') {
      return this.trends.filter(t => t.opportunity_gap === 'High');
    }
    return this.trends.filter(t => t.locality === this.activeLocality?.name);
  }

  ngOnInit() {
    this.activeLocality = this.localities.find(l => l.id === this.selectedLocality) || this.localities[0] || null;
  }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    if (!this.mapContainerRef?.nativeElement) return;

    this.map = L.map(this.mapContainerRef.nativeElement, {
      center: [19.8872, 74.4735],
      zoom: 14,
      zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    this.renderZones();
  }

  renderZones() {
    if (!this.map) return;

    this.localities.filter(l => l.id !== 'kopargaon-all').forEach(loc => {
      const relevantTrend = this.trends.find(t => t.locality === loc.name);

      let color = '#10b981';
      if (relevantTrend) {
        if (relevantTrend.opportunity_gap === 'High' && !relevantTrend.is_spike) {
          color = '#e11d48';
        } else if (relevantTrend.opportunity_gap === 'Medium') {
          color = '#d97706';
        }
      }

      const circle = L.circle([loc.lat, loc.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.15,
        radius: loc.radiusMeters * 0.45,
        weight: 2
      }).addTo(this.map!);

      circle.on('click', () => {
        this.activeLocality = loc;
        this.localityChanged.emit(loc.id);
      });
    });
  }

  onSelectTrend(trend: Trend) {
    this.trendSelected.emit(trend);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
