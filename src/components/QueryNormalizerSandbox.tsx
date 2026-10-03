import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, CornerDownLeft, RefreshCw, Send } from 'lucide-react';

export const QueryNormalizerSandbox: React.FC = () => {
  const [inputText, setInputText] = useState('Bhai black shoes college ke liye 1500 tak');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>({
    category: 'Retail',
    normalized_topic: 'Shoes & Footwear',
    intent: 'Purchase Inquiry',
    attributes: {
      item_or_service: 'Shoes',
      attributes: {
        Color: 'Black',
        Purpose: 'College / Daily Wear',
        Budget: '≤ ₹1,500'
      }
    },
    hyperlocal_context: 'Kopargaon Locality',
    explanation: 'Collegiate footwear demand with clear price ceiling and color preference.'
  });
  const [engineUsed, setEngineUsed] = useState<string>('gemini-3.8-flash');

  const presets = [
    {
      title: 'Spec Example: College Footwear',
      query: 'Bhai black shoes college ke liye 1500 tak'
    },
    {
      title: 'EV Urgent Highway Inquiry',
      query: 'Where can I charge my EV near Kopargaon highway? Battery is low'
    },
    {
      title: 'Healthy Breakfast Commute',
      query: 'need hygienic sprouts or millet breakfast near railway station 7am'
    },
    {
      title: 'Sports Equipment Request',
      query: 'Yonex badminton racket restringing and mavis 350 shuttlecocks nearby'
    },
    {
      title: 'AC Maintenance In Shop',
      query: 'Commercial split AC servicing and gas refill for bazaar showroom'
    }
  ];

  const handleParse = async (queryToRun?: string) => {
    const textToRun = queryToRun || inputText;
    if (!textToRun.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/gemini/parse-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToRun })
      });
      const data = await res.json();
      if (data.success && data.parsed) {
        setResult(data.parsed);
        setEngineUsed(data.engine || 'NLP Processor');
      }
    } catch (err) {
      console.error('Error parsing query:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-white border border-neutral-200 rounded-lg p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-neutral-600" />
            <span>AI NLP Support Layer</span>
            <span aria-hidden="true">·</span>
            <span>Section 11 Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Query Parser & Topic Extraction Sandbox
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            AI operates strictly as a text-understanding and normalization engine. It converts colloquial, bilingual, or unstructured customer inquiries into standardized topics and extracted consumer constraints without making hallucinated purchase forecasts.
          </p>
        </div>

        {/* Preset Queries */}
        <div className="mt-6 pt-5 border-t border-neutral-200/80">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2.5">
            Test Bench Pre-fills (from specification):
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.title}
                onClick={() => {
                  setInputText(p.query);
                  handleParse(p.query);
                }}
                className="px-3 py-1.5 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md transition-colors cursor-pointer text-left"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Input & Output Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Raw Input */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              Raw Input Stream
            </h2>
            <span className="text-xs font-mono text-neutral-400">
              Unstructured Text
            </span>
          </div>

          <div className="space-y-3">
            <label className="text-xs text-neutral-600 font-medium block">
              Enter customer search query, chat transcript, or merchant note:
            </label>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g., Bhai black shoes college ke liye 1500 tak"
              className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed resize-none font-mono"
            />

            <button
              onClick={() => handleParse()}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing with NLP Engine...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Run NLP Topic Extraction</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-200/80 rounded-md text-xs text-neutral-600 space-y-2">
            <div className="font-semibold text-neutral-800">Normalization Rules:</div>
            <ul className="list-disc list-inside text-neutral-600 space-y-1">
              <li>"Need EV charger" → Normalizes to: <strong>EV Charging</strong></li>
              <li>"Where can I charge my EV?" → Normalizes to: <strong>EV Charging</strong></li>
              <li>"Charging station near me" → Normalizes to: <strong>EV Charging</strong></li>
              <li>Extracts budget constraints, color, intent, and location attributes</li>
            </ul>
          </div>
        </div>

        {/* Right: Structured Output */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900 tracking-tight flex items-center gap-1.5">
              <span>Structured Topic Entity</span>
              <span className="text-xs font-normal text-neutral-500">
                ({engineUsed})
              </span>
            </h2>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
              Validated
            </span>
          </div>

          {result ? (
            <div className="space-y-4 text-xs">
              {/* Highlight Triad */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-neutral-50 rounded-md border border-neutral-200">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Normalized Topic:</span>
                  <span className="text-sm font-bold text-neutral-900">{result.normalized_topic}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Category:</span>
                  <span className="text-sm font-semibold text-neutral-800">{result.category}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Inferred Intent:</span>
                  <span className="font-semibold text-neutral-700">{result.intent}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Context:</span>
                  <span className="font-semibold text-neutral-700">{result.hyperlocal_context || 'Kopargaon Locality'}</span>
                </div>
              </div>

              {/* Extracted Key Attributes */}
              <div>
                <span className="text-neutral-500 font-bold uppercase tracking-wider text-[11px] block mb-2">
                  Extracted Attribute Dictionary:
                </span>
                <div className="space-y-1.5">
                  {result.attributes?.attributes && Object.keys(result.attributes.attributes).length > 0 ? (
                    Object.entries(result.attributes.attributes).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between p-2 bg-neutral-50 rounded-md border border-neutral-200/60 font-mono">
                        <span className="text-neutral-500 font-semibold">{key}:</span>
                        <span className="font-bold text-neutral-900">{String(val)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-neutral-400 italic">No special numerical attributes parsed</div>
                  )}
                </div>
              </div>

              {/* Opportunity Explanation */}
              <div className="p-3.5 bg-neutral-900 text-neutral-200 rounded-md space-y-1">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Human-Readable Opportunity Summary:
                </span>
                <p className="text-xs leading-relaxed text-white">
                  "{result.explanation}"
                </p>
              </div>

              {/* Raw JSON View */}
              <details className="pt-2 text-neutral-500">
                <summary className="cursor-pointer text-[11px] font-mono hover:text-neutral-800">
                  View Raw Parsed JSON Payload
                </summary>
                <pre className="mt-2 p-3 bg-neutral-900 text-emerald-400 rounded-md text-[11px] overflow-x-auto font-mono">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-neutral-400">
              Run the parser to extract entities.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
