import React, { useEffect, useRef, useState } from 'react';
import { Trend, Business, LocalityInfo } from '../types';
import L from 'leaflet';
import { 
  MapPin, 
  ArrowUpRight, 
  Navigation,
  Building2,
  AlertCircle,
  Info,
  CheckCircle2,
  TrendingUp,
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface OpportunityMapViewProps {
  trends: Trend[];
  businesses: Business[];
  localities: LocalityInfo[];
  selectedLocality: string;
  setSelectedLocality: (localityId: string) => void;
  onSelectTrend: (trend: Trend) => void;
  focusedTrendId?: string | null;
}

export const OpportunityMapView: React.FC<OpportunityMapViewProps> = ({
  trends,
  businesses,
  localities,
  selectedLocality,
  setSelectedLocality,
  onSelectTrend,
  focusedTrendId,
}) => {
  const { language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeLocality, setActiveLocality] = useState<LocalityInfo>(() => {
    return localities.find(l => l.id === selectedLocality) || localities[0];
  });

  const [selectedTrendInPanel, setSelectedTrendInPanel] = useState<string | null>(focusedTrendId || 'trend-ev-charging');

  // Sync active locality when prop changes
  useEffect(() => {
    const loc = localities.find(l => l.id === selectedLocality) || localities[0];
    setActiveLocality(loc);
    if (leafletMapRef.current && loc) {
      leafletMapRef.current.flyTo(
        [loc.lat, loc.lng], 
        loc.id === 'kopargaon-all' ? 14 : 15.5, 
        { duration: 1.0 }
      );
      setTimeout(() => {
        leafletMapRef.current?.invalidateSize();
      }, 300);
    }
  }, [selectedLocality, localities]);

  // Sync focused trend when prop changes
  useEffect(() => {
    if (focusedTrendId) {
      setSelectedTrendInPanel(focusedTrendId);
      const targetTrend = trends.find(t => t.id === focusedTrendId);
      if (targetTrend && leafletMapRef.current) {
        leafletMapRef.current.flyTo([targetTrend.lat, targetTrend.lng], 16, { duration: 1.0 });
      }
    }
  }, [focusedTrendId, trends]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [19.8872, 74.4735],
        zoom: 14,
        zoomControl: true,
      });

      // Real interactive OpenStreetMap basemap (no API key required)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 19,
        className: 'osm-localsignal-tiles',
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      leafletMapRef.current = map;
      markersLayerRef.current = markersGroup;

      const timer = setTimeout(() => {
        map.invalidateSize();
      }, 300);

      const handleResize = () => {
        map.invalidateSize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
        map.remove();
        leafletMapRef.current = null;
      };
    }
  }, []);

  // Update Markers and Zones
  useEffect(() => {
    if (!leafletMapRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // Zone configs matching current LocalSignal dataset
    const zoneConfigs = [
      {
        id: 'trend-ev-charging',
        localityId: 'highway-junction',
        topic: 'EV Charging',
        lat: 19.8795,
        lng: 74.4680,
        radius: 560,
        color: '#e11d48', // Red
        fillColor: '#f43f5e',
        initials: 'EV',
        gapText: 'High Opportunity Gap',
        type: 'red',
      },
      {
        id: 'trend-healthy-breakfast',
        localityId: 'station-road',
        topic: 'Healthy Breakfast & Millet Snacks',
        lat: 19.8920,
        lng: 74.4780,
        radius: 520,
        color: '#e11d48', // Red
        fillColor: '#f43f5e',
        initials: 'H',
        gapText: 'High Opportunity Gap',
        type: 'red',
      },
      {
        id: 'trend-sports-equipment',
        localityId: 'town-market',
        topic: 'Sports Equipment & Badminton Gear',
        lat: 19.8865,
        lng: 74.4725,
        radius: 470,
        color: '#d97706', // Yellow / Amber
        fillColor: '#fbbf24',
        initials: 'SP',
        gapText: 'Emerging Signal',
        type: 'yellow',
      },
      {
        id: 'trend-ac-repair',
        localityId: 'town-market',
        topic: 'Commercial AC & Inverter Repair',
        lat: 19.8890,
        lng: 74.4750,
        radius: 430,
        color: '#059669', // Green
        fillColor: '#34d399',
        initials: 'AC',
        gapText: 'Strong Supply',
        type: 'green',
      },
      {
        id: 'trend-tilak-supply',
        localityId: 'tilak-nagar',
        topic: 'Phone Covers & Mixed Retail',
        lat: 19.8830,
        lng: 74.4770,
        radius: 440,
        color: '#d97706', // Yellow
        fillColor: '#fbbf24',
        initials: 'KP',
        gapText: 'Emerging Signal',
        type: 'yellow',
      },
      {
        id: 'trend-bet-supply',
        localityId: 'bet-kopargaon',
        topic: 'Riverside Produce & General Supply',
        lat: 19.8950,
        lng: 74.4820,
        radius: 510,
        color: '#059669', // Green
        fillColor: '#34d399',
        initials: 'KP',
        gapText: 'Strong Supply',
        type: 'green',
      },
    ];

    zoneConfigs.forEach((zone) => {
      const isSelected = selectedTrendInPanel === zone.id;
      const matchingTrend = trends.find(t => t.id === zone.id);
      const locName = localities.find(l => l.id === zone.localityId)?.name || 'Kopargaon';

      // Draw Circular Zone with subtle transparency
      const circle = L.circle([zone.lat, zone.lng], {
        color: zone.color,
        fillColor: zone.fillColor,
        fillOpacity: isSelected ? 0.38 : 0.20,
        radius: zone.radius,
        weight: isSelected ? 3 : 1.8,
      }).addTo(markersLayerRef.current!);

      circle.on('click', () => {
        setSelectedLocality(zone.localityId);
        const loc = localities.find(l => l.id === zone.localityId);
        if (loc) setActiveLocality(loc);
        setSelectedTrendInPanel(zone.id);
        const elem = document.getElementById(`signal-card-${zone.id}`);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });

      // Custom Circular Pin Marker
      const iconHtml = `
        <div style="
          background-color: ${zone.color};
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 800;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 4px 10px rgba(0,0,0,0.35);
          border: 2.5px solid white;
          cursor: pointer;
          transform: ${isSelected ? 'scale(1.22)' : 'scale(1)'};
          transition: transform 0.2s ease;
        ">
          ${zone.initials}
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'localsignal-map-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([zone.lat, zone.lng], { icon: customIcon })
        .addTo(markersLayerRef.current!);

      // Detail popup matching Requirement 9:
      // Topic name, Locality, Opportunity Gap status, Demand volume / searches, Discoverable shop count, Recommended action
      const demandCount = matchingTrend ? matchingTrend.metrics.recorded_searches : 'N/A';
      const shopCount = matchingTrend ? matchingTrend.supply_details.discoverable_count : 0;
      const actionText = matchingTrend ? matchingTrend.suggested_action : 'Investigate local retailer expansion.';

      const popupContent = `
        <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 250px; max-width: 290px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 5px;">
            <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: ${zone.color}; letter-spacing: 0.5px;">
              ${zone.gapText}
            </span>
            <span style="font-size: 10px; font-weight: 700; color: #525252; background: #f5f5f5; padding: 2px 6px; border-radius: 4px;">
              ${demandCount} inquiries
            </span>
          </div>

          <div style="font-size: 14px; font-weight: 800; color: #171717; line-height: 1.25; margin-bottom: 3px;">
            ${zone.topic}
          </div>

          <div style="font-size: 11px; color: #737373; margin-bottom: 8px; display: flex; align-items: center; gap: 3px;">
            <span>📍 ${locName}</span>
          </div>

          <div style="background: #fafafa; border: 1px solid #e5e5e5; border-radius: 6px; padding: 6px 8px; font-size: 11px; margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
              <span style="color: #737373;">Discoverable shops:</span>
              <strong style="color: #171717;">${shopCount} ${shopCount === 1 ? 'shop' : 'shops'}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #737373;">Opportunity status:</span>
              <strong style="color: ${zone.color};">${zone.gapText}</strong>
            </div>
          </div>

          <div style="font-size: 10.5px; line-height: 1.35; color: #404040; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 6px 8px;">
            <strong style="color: #166534; display: block; margin-bottom: 2px;">Recommended Action:</strong>
            ${actionText}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 300 });

      marker.on('click', () => {
        setSelectedLocality(zone.localityId);
        const loc = localities.find(l => l.id === zone.localityId);
        if (loc) setActiveLocality(loc);
        setSelectedTrendInPanel(zone.id);
        const elem = document.getElementById(`signal-card-${zone.id}`);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });

  }, [trends, localities, selectedTrendInPanel, setSelectedLocality]);

  // Filter signals and businesses for active locality
  const activeLocalityTrends = trends.filter(
    t => activeLocality.id === 'kopargaon-all' || t.locality === activeLocality.name
  );
  const activeLocalityBusinesses = businesses.filter(
    b => activeLocality.id === 'kopargaon-all' || b.locality === activeLocality.name
  );

  const selectedTrendObj = trends.find(t => t.id === selectedTrendInPanel) || activeLocalityTrends[0] || trends[0];

  return (
    <section id="opportunity-map-section" className="space-y-6 font-sans">
      {/* 1. SECTION HEADING & LEGEND (Recreating the OLD Layout) */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left: Heading + Small Label + Description */}
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-rose-600">
              <span>GEOSPATIAL DEMAND INTELLIGENCE · KOPARGAON LOCALITY MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              HYPERLOCAL OPPORTUNITY MAP
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
              Color-coded spatial synthesis of emerging consumer inquiries and discoverable commercial supply.
            </p>
          </div>

          {/* Right: Legend */}
          <div className="flex flex-wrap items-center gap-2 text-xs bg-neutral-50 p-3 rounded-xl border border-neutral-200/90 shrink-0">
            <span className="font-bold text-neutral-700 mr-1 text-[11px] uppercase tracking-wider">
              {language === 'mr' ? 'सूची:' : 'Legend:'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 font-semibold border border-rose-200 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
              <span>🔴 Red: High Opportunity Gap</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-semibold border border-amber-200 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>🟡 Yellow: Emerging Signal</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>🟢 Green: Strong Supply</span>
            </span>
          </div>
        </div>

        {/* 2. LOCALITY FILTER ROW */}
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {localities.map((loc) => {
            const isActive = activeLocality.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => {
                  setSelectedLocality(loc.id);
                  setActiveLocality(loc);
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-xs font-bold'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200/60'
                }`}
              >
                {loc.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MAP + INSPECTING LOCALITY PANEL SPLIT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: REAL INTERACTIVE MAP */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-xs relative h-[520px] lg:h-[640px]">
          <div ref={mapContainerRef} className="w-full h-full z-0" />

          {/* Floating Coordinates & Reset Controls */}
          <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-neutral-200 text-[11px] font-mono text-neutral-600 shadow-xs flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-rose-600" />
            <span>Kopargaon Center (19.8872°N, 74.4735°E) · SH-10 Corridor</span>
          </div>

          <div className="absolute top-3 right-3 z-[400]">
            <button
              onClick={() => {
                setSelectedLocality('kopargaon-all');
                const allLoc = localities.find(l => l.id === 'kopargaon-all');
                if (allLoc) setActiveLocality(allLoc);
                if (leafletMapRef.current) {
                  leafletMapRef.current.flyTo([19.8872, 74.4735], 14, { duration: 1.0 });
                }
              }}
              className="bg-white/95 hover:bg-white text-neutral-700 font-semibold px-3 py-1.5 rounded-lg border border-neutral-200 shadow-xs text-xs flex items-center gap-1.5 cursor-pointer backdrop-blur-xs transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5 text-neutral-500" />
              <span>{language === 'mr' ? 'सर्व कोपरगाव दाखवा' : 'Reset View'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT: INSPECTING LOCALITY & SELECTED OPPORTUNITY PANEL */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-4 max-h-[640px] overflow-y-auto">
          {/* Header */}
          <div className="pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>INSPECTING LOCALITY</span>
            </div>
            <h3 className="text-xl font-extrabold text-neutral-900 mt-1">
              {activeLocality.name}
            </h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              {activeLocality.description}
            </p>
          </div>

          {/* Selected Opportunity Detail Card (Requirement 9) */}
          {selectedTrendObj && (
            <div className="p-4 bg-rose-50/40 border border-rose-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-sm">
                  SELECTED OPPORTUNITY
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                  selectedTrendObj.opportunity_gap === 'High' 
                    ? 'text-rose-700 bg-white border border-rose-200' 
                    : 'text-amber-700 bg-white border border-amber-200'
                }`}>
                  {selectedTrendObj.opportunity_gap} GAP
                </span>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 text-sm">
                  {selectedTrendObj.topic}
                </h4>
                <div className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span>{selectedTrendObj.locality}</span>
                </div>
              </div>

              {/* Demand volume & discoverable shops */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-lg border border-neutral-200/70 font-medium">
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase">Demand Volume</span>
                  <span className="font-extrabold text-neutral-900 text-sm">
                    {selectedTrendObj.metrics.recorded_searches}
                  </span>
                  <span className="text-[10px] text-neutral-500 block">inquiries logged</span>
                </div>
                <div>
                  <span className="text-neutral-400 text-[10px] block uppercase">Discoverable Shops</span>
                  <span className="font-extrabold text-rose-600 text-sm">
                    {selectedTrendObj.supply_details.discoverable_count}
                  </span>
                  <span className="text-[10px] text-neutral-500 block">in Kopargaon</span>
                </div>
              </div>

              {/* Recommended action */}
              <div className="p-2.5 bg-emerald-50 border border-emerald-200/80 rounded-lg text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Recommended Action
                </span>
                <p className="text-[11px] text-emerald-900 leading-snug">
                  {selectedTrendObj.suggested_action}
                </p>
              </div>

              <button
                onClick={() => onSelectTrend(selectedTrendObj)}
                className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Inspect Trend Detail</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Top Emerging Signals for Locality (Requirement 7) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px]">
                TOP EMERGING SIGNALS IN LOCALITY
              </span>
              <span className="text-neutral-500 font-mono text-xs">
                {activeLocalityTrends.length} detected
              </span>
            </div>

            {activeLocalityTrends.length === 0 ? (
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs text-neutral-500 text-center">
                No high-divergence opportunity gaps detected in this sector during the pilot window.
              </div>
            ) : (
              <div className="space-y-3">
                {activeLocalityTrends.map((trend) => {
                  const isHighlighted = selectedTrendInPanel === trend.id;
                  const isHighGap = trend.opportunity_gap === 'High';

                  return (
                    <div
                      key={trend.id}
                      id={`signal-card-${trend.id}`}
                      onClick={() => {
                        setSelectedTrendInPanel(trend.id);
                        if (leafletMapRef.current) {
                          leafletMapRef.current.flyTo([trend.lat, trend.lng], 16, { duration: 1.0 });
                        }
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                        isHighlighted
                          ? 'border-rose-500 bg-rose-50/20 ring-2 ring-rose-400/40 shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100/70 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-neutral-900 text-xs leading-snug">
                          {trend.topic}
                        </h4>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm whitespace-nowrap uppercase tracking-wider ${
                          isHighGap
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {trend.opportunity_gap} GAP
                        </span>
                      </div>

                      {/* Strength, Convergence, Supply */}
                      <div className="grid grid-cols-3 gap-1.5 text-[10px] text-neutral-600 bg-white p-2 rounded-lg border border-neutral-200/60 font-medium">
                        <div>
                          <span className="text-neutral-400 block text-[9px] uppercase">Strength</span>
                          <strong className="text-neutral-900">{trend.trend_strength}</strong>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[9px] uppercase">Convergence</span>
                          <strong className="text-emerald-700">{trend.convergence}</strong>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[9px] uppercase">Supply</span>
                          <strong className="text-rose-600">{trend.discoverable_supply}</strong>
                        </div>
                      </div>

                      {/* Evidence Statement */}
                      <p className="text-[11px] text-neutral-600 italic leading-relaxed line-clamp-2">
                        "{trend.supply_details.statement}"
                      </p>

                      {/* Footer & Inspect Button */}
                      <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {trend.metrics.recorded_searches} searches
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTrend(trend);
                          }}
                          className="font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer text-xs"
                        >
                          <span>Inspect →</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Discoverable Commercial Supply */}
          <div className="space-y-2.5 pt-3 border-t border-neutral-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-neutral-500" />
                <span>Discoverable Commercial Supply</span>
              </span>
              <span className="text-neutral-400 font-mono text-xs">
                {activeLocalityBusinesses.length} listed
              </span>
            </div>

            {activeLocalityBusinesses.length === 0 ? (
              <div className="p-3 bg-neutral-50 border border-neutral-200/70 rounded-xl text-xs text-neutral-500">
                Suitable local commercial supply is not currently discoverable in the available data.
              </div>
            ) : (
              <div className="space-y-2">
                {activeLocalityBusinesses.map((biz) => (
                  <div key={biz.id} className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">{biz.name}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">{biz.category}</span>
                    </div>
                    <div className="text-[11px] text-neutral-600">{biz.location}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sample Data Disclaimer Box (Requirement 12) */}
          <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-[10px] text-neutral-500 leading-snug flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
            <span>
              <strong>SAMPLE / ILLUSTRATIVE DATA:</strong> The map markers, search metrics, and opportunity zones use synthetic prototype data for this Kopargaon commercial market pilot. They demonstrate system logic and must not be interpreted as official municipal statistics or guaranteed business returns.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
