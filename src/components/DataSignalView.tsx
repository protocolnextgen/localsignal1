import React, { useState } from 'react';
import { Signal, SignalType, Category } from '../types';
import { Search, Filter, Layers, Download, CheckCircle, Clock } from 'lucide-react';

interface DataSignalViewProps {
  signals: Signal[];
}

export const DataSignalView: React.FC<DataSignalViewProps> = ({ signals }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inspectedSignal, setInspectedSignal] = useState<Signal | null>(null);

  const signalTypes: Array<SignalType | 'All'> = ['All', 'Search', 'Discussion', 'Request', 'Review'];
  const categories: Array<Category | 'All'> = ['All', 'Transport', 'Food', 'Retail', 'Services', 'Education'];

  const filteredSignals = signals.filter((sig) => {
    const matchesSearch = 
      sig.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sig.normalized_topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sig.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sig.locality.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'All' || sig.signal_type === selectedType;
    const matchesCategory = selectedCategory === 'All' || sig.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* View Header */}
      <section className="bg-white border border-neutral-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <span>Telemetry Transparency Layer</span>
              <span aria-hidden="true">·</span>
              <span>Raw Signal Records</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">
              Underlying Signal Inventory
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Inspection audit table of all raw searches, forum posts, counter inquiries, and reviews clustered by LocalSignal.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs bg-neutral-50 px-3 py-2 rounded-md border border-neutral-200 text-neutral-600 font-mono">
            <span>Total Records: <strong className="text-neutral-900">{signals.length}</strong></span>
            <span>·</span>
            <span>Filtered: <strong className="text-neutral-900">{filteredSignals.length}</strong></span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-6 pt-4 border-t border-neutral-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search raw inquiry text, source, or normalized topic..."
              className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-md text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {/* Type and Category Selectors */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-neutral-50 border border-neutral-300 rounded-md px-2.5 py-1.5 text-xs font-medium text-neutral-800 cursor-pointer focus:outline-none"
            >
              {signalTypes.map((t) => (
                <option key={t} value={t}>Type: {t}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-neutral-50 border border-neutral-300 rounded-md px-2.5 py-1.5 text-xs font-medium text-neutral-800 cursor-pointer focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>Category: {c}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Signal Table */}
      <div className="bg-white border border-neutral-200 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Signal ID</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Raw Observed Text / Inquiry</th>
                <th className="py-3 px-4 font-semibold">Normalized Topic</th>
                <th className="py-3 px-4 font-semibold">Locality</th>
                <th className="py-3 px-4 font-semibold">Source Channel</th>
                <th className="py-3 px-4 font-semibold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredSignals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-neutral-500">
                    No signals found matching the active search or filters.
                  </td>
                </tr>
              ) : (
                filteredSignals.map((sig) => (
                  <tr 
                    key={sig.id} 
                    onClick={() => setInspectedSignal(sig)}
                    className="hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 font-mono font-medium text-neutral-500 text-[11px]">
                      {sig.id}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block font-semibold px-2 py-0.5 rounded-xs text-[11px] ${
                        sig.signal_type === 'Search' ? 'bg-blue-50 text-blue-800' :
                        sig.signal_type === 'Discussion' ? 'bg-purple-50 text-purple-800' :
                        sig.signal_type === 'Request' ? 'bg-emerald-50 text-emerald-800' :
                        'bg-amber-50 text-amber-800'
                      }`}>
                        {sig.signal_type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-neutral-900 max-w-xs truncate">
                      "{sig.text}"
                    </td>
                    <td className="py-3 px-4 font-semibold text-neutral-800">
                      {sig.normalized_topic}
                    </td>
                    <td className="py-3 px-4 text-neutral-600 truncate max-w-[160px]">
                      {sig.locality}
                    </td>
                    <td className="py-3 px-4 text-neutral-500 text-[11px] truncate max-w-[140px]">
                      {sig.source}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-neutral-400 tabular-nums text-[11px]">
                      {new Date(sig.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signal Payload Inspection Modal */}
      {inspectedSignal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border border-neutral-300 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-neutral-500">{inspectedSignal.id}</span>
                <span className="text-xs px-2 py-0.5 rounded-sm bg-neutral-100 font-semibold">{inspectedSignal.signal_type}</span>
              </div>
              <button
                onClick={() => setInspectedSignal(null)}
                className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-neutral-400 block text-[11px]">Raw Text / Direct Observation:</span>
                <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200 text-neutral-900 font-medium text-sm mt-1">
                  "{inspectedSignal.text}"
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Normalized Topic:</span>
                  <span className="font-bold text-neutral-900">{inspectedSignal.normalized_topic}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Category:</span>
                  <span className="font-semibold text-neutral-800">{inspectedSignal.category}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Source Platform:</span>
                  <span className="text-neutral-700">{inspectedSignal.source}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Locality Area:</span>
                  <span className="text-neutral-700">{inspectedSignal.locality}</span>
                </div>
              </div>

              <div className="p-3 bg-neutral-900 text-neutral-200 rounded-md font-mono text-[11px] space-y-1">
                <div>Coordinates: {inspectedSignal.lat}, {inspectedSignal.lng}</div>
                <div>Recorded: {inspectedSignal.timestamp}</div>
                <div>Velocity: {inspectedSignal.growth_indicator || 'Normal'}</div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setInspectedSignal(null)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-md transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
