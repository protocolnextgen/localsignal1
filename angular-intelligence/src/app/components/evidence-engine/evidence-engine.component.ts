import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trend, EvidenceSource } from '../../models/intelligence.models';

@Component({
  selector: 'app-evidence-engine',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 font-sans">
      <!-- Evidence Header -->
      <div class="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-rose-600">Verification & Multi-Source Synthesis</span>
          <h2 class="text-xl font-extrabold text-neutral-900 mt-0.5">Evidence Engine: {{ selectedTrend?.topic }}</h2>
          <p class="text-xs text-neutral-500 mt-1">Cross-referencing search frequencies, physical merchant visits, customer requests, and community discussions.</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Convergence: {{ selectedTrend?.convergence }}
          </span>
          <span class="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
            Gap: {{ selectedTrend?.opportunity_gap }}
          </span>
        </div>
      </div>

      <!-- Evidence Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div *ngFor="let item of evidenceList" 
             class="bg-white border border-neutral-200 rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-neutral-800">{{ item.source_type }}</span>
              <span class="font-mono text-[11px] text-neutral-400">{{ item.signal_count }} data points</span>
            </div>
            <p class="text-xs text-neutral-600 mt-2 italic leading-relaxed">"{{ item.note }}"</p>
          </div>
          <div class="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
            <span class="text-neutral-400">Direction:</span>
            <span class="font-bold text-rose-600">{{ item.direction }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class EvidenceEngineComponent {
  @Input() selectedTrend: Trend | null = null;
  @Input() evidenceList: EvidenceSource[] = [];
  @Output() viewMapClicked = new EventEmitter<void>();
}
