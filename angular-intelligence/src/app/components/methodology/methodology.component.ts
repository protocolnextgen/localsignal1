import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-methodology',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 font-sans">
      <div class="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs">
        <span class="text-xs font-bold uppercase tracking-wider text-rose-600">Methodology & Boundary Protection</span>
        <h2 class="text-xl font-extrabold text-neutral-900 mt-1">LocalSignal Operational Limitations & Safety Standards</h2>
        <p class="text-xs text-neutral-500 mt-1">Ground rules governing signal convergence, false-positive protection, and privacy boundaries.</p>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
            <h4 class="text-xs font-bold text-neutral-900">1. Minimum Convergence Requirement</h4>
            <p class="text-xs text-neutral-600">Single-source anomalies (such as single-day rain umbrella search spikes) are flagged as "Detected" or "Low-confidence" and never marked as High Opportunity without corroborating physical visits or direct merchant requests.</p>
          </div>

          <div class="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
            <h4 class="text-xs font-bold text-neutral-900">2. Real Supply Grounding</h4>
            <p class="text-xs text-neutral-600">All opportunity gaps require cross-referencing against verified local shops in Kopargaon. A product is only deemed an unmet gap if local stock is confirmed absent in registered inventories.</p>
          </div>

          <div class="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
            <h4 class="text-xs font-bold text-neutral-900">3. Privacy & PII Scrubbing</h4>
            <p class="text-xs text-neutral-600">Customer search histories and discussion logs are anonymized and aggregated. No individual phone numbers or personal identities appear in the public Intelligence layer.</p>
          </div>

          <div class="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
            <h4 class="text-xs font-bold text-neutral-900">4. LLM Role Restriction</h4>
            <p class="text-xs text-neutral-600">AI / Gemini is strictly utilized for language normalization, attribute extraction, and evidence summarization. It is strictly prohibited from generating unsubstantiated financial predictions.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MethodologyComponent {}
