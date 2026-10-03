import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trend, LocalityInfo } from '../../models/intelligence.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 font-sans">
      <!-- Locality and Metric Bar -->
      <div class="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-rose-600">LocalSignal Market Intelligence</span>
          <h2 class="text-xl font-extrabold text-neutral-900 mt-0.5">Kopargaon Demand Signal Overview</h2>
          <p class="text-xs text-neutral-500 mt-1">Multi-source signal convergence tracking cross-validated against discoverable local merchant inventory.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-neutral-500">Filter Locality:</span>
          <select 
            [value]="selectedLocality" 
            (change)="onLocalityChange($event)"
            class="text-xs font-semibold bg-neutral-100 border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer">
            <option *ngFor="let loc of localities" [value]="loc.id">{{ loc.name }}</option>
          </select>
        </div>
      </div>

      <!-- Opportunities Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let trend of trends" 
             (click)="selectTrend(trend)"
             class="bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl p-5 shadow-xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-neutral-600">{{ trend.category }}</span>
              <span [ngClass]="{
                'bg-rose-50 text-rose-700 border-rose-200': trend.opportunity_gap === 'High',
                'bg-amber-50 text-amber-700 border-amber-200': trend.opportunity_gap === 'Medium',
                'bg-emerald-50 text-emerald-700 border-emerald-200': trend.opportunity_gap === 'Low'
              }" class="px-2 py-0.5 rounded-full font-bold text-[10px] border">
                Gap: {{ trend.opportunity_gap }}
              </span>
            </div>
            <h3 class="text-base font-bold text-neutral-900 mt-2">{{ trend.topic }}</h3>
            <p class="text-xs text-neutral-500 mt-1 line-clamp-2">{{ trend.summary }}</p>
          </div>
          <div class="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span class="text-neutral-400 font-mono">{{ trend.locality }}</span>
            <span class="font-bold text-neutral-900">View Evidence →</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  @Input() trends: Trend[] = [];
  @Input() localities: LocalityInfo[] = [];
  @Input() selectedLocality: string = 'kopargaon-all';
  @Output() trendSelected = new EventEmitter<Trend>();
  @Output() localityChanged = new EventEmitter<string>();

  selectTrend(trend: Trend) {
    this.trendSelected.emit(trend);
  }

  onLocalityChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.localityChanged.emit(val);
  }
}
