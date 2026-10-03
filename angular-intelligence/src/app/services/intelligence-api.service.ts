import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Trend, Signal, Business, LocalityInfo, EvidenceSource } from '../models/intelligence.models';

@Injectable({
  providedIn: 'root'
})
export class IntelligenceApiService {
  private readonly baseUrl = '/api';

  constructor() {}

  getLocalities(): Observable<{ localities: LocalityInfo[]; defaultLocality: string }> {
    return from(fetch(`${this.baseUrl}/localities`).then(r => r.json()));
  }

  getTrends(locality?: string, category?: string): Observable<{ trends: Trend[] }> {
    const params = new URLSearchParams();
    if (locality) params.set('locality', locality);
    if (category) params.set('category', category);
    return from(fetch(`${this.baseUrl}/trends?${params.toString()}`).then(r => r.json()));
  }

  getSignals(locality?: string, category?: string, topic?: string): Observable<{ signals: Signal[] }> {
    const params = new URLSearchParams();
    if (locality) params.set('locality', locality);
    if (category) params.set('category', category);
    if (topic) params.set('topic', topic);
    return from(fetch(`${this.baseUrl}/signals?${params.toString()}`).then(r => r.json()));
  }

  getBusinesses(locality?: string, category?: string): Observable<{ businesses: Business[] }> {
    const params = new URLSearchParams();
    if (locality) params.set('locality', locality);
    if (category) params.set('category', category);
    return from(fetch(`${this.baseUrl}/businesses?${params.toString()}`).then(r => r.json()));
  }

  getEvidence(trendId: string): Observable<{ evidence: EvidenceSource[] }> {
    return from(fetch(`${this.baseUrl}/evidence/${trendId}`).then(r => r.json()));
  }

  parseQuery(text: string): Observable<any> {
    return from(fetch(`${this.baseUrl}/gemini/parse-query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    }).then(r => r.json()));
  }

  summarizeEvidence(trendId: string, topic: string, evidenceItems: any[]): Observable<any> {
    return from(fetch(`${this.baseUrl}/gemini/summarize-evidence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trend_id: trendId, topic, evidence_items: evidenceItems })
    }).then(r => r.json()));
  }
}
