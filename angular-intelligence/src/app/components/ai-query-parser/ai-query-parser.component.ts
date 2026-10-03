import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IntelligenceApiService } from '../../services/intelligence-api.service';

@Component({
  selector: 'app-ai-query-parser',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 font-sans">
      <div class="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs">
        <span class="text-xs font-bold uppercase tracking-wider text-rose-600">Gemini & NLP Engine</span>
        <h2 class="text-xl font-extrabold text-neutral-900 mt-0.5">AI Query Parser & Normalization Sandbox</h2>
        <p class="text-xs text-neutral-500 mt-1">Converts unstructured colloquial Hinglish customer searches into normalized product concepts and structured attributes without hallucinations.</p>
      </div>

      <div class="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <label class="text-xs font-bold text-neutral-700 block mb-1">Test Colloquial Input Query:</label>
          <div class="flex gap-2">
            <input 
              type="text" 
              [(ngModel)]="inputText" 
              placeholder="e.g. Bhai black shoes college ke liye 1500 tak"
              class="flex-1 text-sm bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-neutral-900"
            />
            <button 
              (click)="parseQuery()" 
              [disabled]="isLoading"
              class="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50">
              {{ isLoading ? 'Parsing...' : 'Normalize Query' }}
            </button>
          </div>
        </div>

        <!-- Output Schema Box -->
        <div *ngIf="parsedResult" class="p-4 bg-neutral-900 text-neutral-100 rounded-xl font-mono text-xs overflow-x-auto">
          <div class="text-[11px] text-rose-400 font-bold mb-2">// Structured Entity Output (Engine: {{ engineUsed }})</div>
          <pre>{{ parsedResult | json }}</pre>
        </div>
      </div>
    </div>
  `
})
export class AiQueryParserComponent {
  inputText = 'Bhai black shoes college ke liye 1500 tak';
  parsedResult: any = null;
  engineUsed = 'gemini-3.8-flash';
  isLoading = false;

  constructor(private api: IntelligenceApiService) {}

  parseQuery() {
    if (!this.inputText.trim()) return;
    this.isLoading = true;
    this.api.parseQuery(this.inputText).subscribe({
      next: (res) => {
        this.parsedResult = res.parsed;
        this.engineUsed = res.engine || 'gemini-3.8-flash';
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
