import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signal } from '../../models/intelligence.models';

@Component({
  selector: 'app-signal-records',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 font-sans">
      <div class="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs">
        <span class="text-xs font-bold uppercase tracking-wider text-rose-600">Raw Data Streams</span>
        <h2 class="text-xl font-extrabold text-neutral-900 mt-0.5">Recorded Demand Signals in Kopargaon</h2>
        <p class="text-xs text-neutral-500 mt-1">Audit log of real customer search queries, merchant inquiries, customer requests, and community discussions.</p>
      </div>

      <div class="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider text-[10px]">
                <th class="py-3 px-4 font-bold">Source Stream</th>
                <th class="py-3 px-4 font-bold">Raw Observation</th>
                <th class="py-3 px-4 font-bold">Topic</th>
                <th class="py-3 px-4 font-bold">Locality</th>
                <th class="py-3 px-4 font-bold">Type</th>
                <th class="py-3 px-4 font-bold">Signal Count</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-100">
              <tr *ngFor="let s of signals" class="hover:bg-neutral-50 transition-colors">
                <td class="py-3 px-4 font-bold text-neutral-800">{{ s.source }}</td>
                <td class="py-3 px-4 text-neutral-600 italic">"{{ s.text }}"</td>
                <td class="py-3 px-4 font-semibold text-neutral-900">{{ s.normalized_topic }}</td>
                <td class="py-3 px-4 text-neutral-500">{{ s.locality }}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-700">
                    {{ s.signal_type }}
                  </span>
                </td>
                <td class="py-3 px-4 font-mono font-bold text-neutral-700">{{ s.frequency || 1 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class SignalRecordsComponent {
  @Input() signals: Signal[] = [];
}
