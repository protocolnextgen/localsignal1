import React, { useState } from 'react';
import { SellerVideo, Category, LocalityInfo } from '../types';
import { 
  Play, 
  Pause, 
  MapPin, 
  Store, 
  Phone, 
  MessageCircle, 
  ShieldCheck, 
  Eye, 
  Sparkles,
  Volume2,
  VolumeX,
  PlusCircle,
  Filter
} from 'lucide-react';

interface VideoFeedViewProps {
  videos: SellerVideo[];
  localities: LocalityInfo[];
  selectedLocality: string;
  setSelectedLocality: (id: string) => void;
  onSelectVideo: (video: SellerVideo) => void;
  onContactSeller: (video: SellerVideo) => void;
  onOpenPostDemand: () => void;
}

export const VideoFeedView: React.FC<VideoFeedViewProps> = ({
  videos,
  localities,
  selectedLocality,
  setSelectedLocality,
  onSelectVideo,
  onContactSeller,
  onOpenPostDemand,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [muted, setMuted] = useState(true);

  const categories: Array<Category | 'All'> = ['All', 'Retail', 'Food', 'Services', 'Transport'];

  const filteredVideos = videos.filter((vid) => {
    const matchesCategory = selectedCategory === 'All' || vid.category === selectedCategory;
    const matchesLocality = 
      selectedLocality === 'kopargaon-all' || 
      vid.locality.toLowerCase().includes(
        localities.find(l => l.id === selectedLocality)?.name.toLowerCase() || ''
      );
    return matchesCategory && matchesLocality;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Filter Bar */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <span>Visual Local Commerce</span>
              <span>·</span>
              <span>Kopargaon Merchant Reels</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">
              Local Discover Feed
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Watch verified short product demonstrations from nearby shops. Click any video to open the seller counter.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenPostDemand}
              className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Can't find a product? Post Demand</span>
            </button>

            <button
              onClick={() => setMuted(!muted)}
              className="p-2 text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
              title={muted ? 'Unmute demo audio' : 'Mute demo audio'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-rose-600" />}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Locality Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="bg-neutral-100 border border-neutral-300 rounded-md px-2.5 py-1 text-xs font-medium text-neutral-800 cursor-pointer focus:outline-none"
            >
              {localities.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Video Feed Cards Grid */}
      {filteredVideos.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center space-y-3">
          <Store className="w-8 h-8 text-neutral-400 mx-auto" />
          <h3 className="text-base font-semibold text-neutral-900">No local videos found</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try switching the category or locality filter, or post a demand for local shops to supply.
          </p>
          <button
            onClick={onOpenPostDemand}
            className="px-4 py-2 text-xs font-bold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
          >
            Post a Customer Demand
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-xs hover:shadow-lg hover:border-neutral-300 transition-all flex flex-col justify-between cursor-pointer group"
            >
              {/* Vertical Video Aspect Box */}
              <div className={`aspect-[9/14] bg-gradient-to-br ${video.videoColor} p-4 relative flex flex-col justify-between text-white overflow-hidden select-none`}>
                {/* Header */}
                <div className="flex items-center justify-between text-xs z-10">
                  <span className="bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded-full font-mono text-[11px]">
                    {video.videoDuration}
                  </span>
                  <span className="bg-rose-600 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">
                    Seller Reel
                  </span>
                </div>

                {/* Center Visual & Play Trigger */}
                <div className="my-auto text-center space-y-2 z-10">
                  <div className="text-5xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                    {video.thumbnailUrl}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/25 group-hover:bg-white/40 flex items-center justify-center mx-auto backdrop-blur-xs transition-colors shadow-md">
                    <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
                  </div>
                  <span className="text-[11px] text-neutral-200 font-medium block">
                    Click to Open Seller Counter
                  </span>
                </div>

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none"></div>

                {/* Bottom Overlay Info */}
                <div className="z-10 space-y-1">
                  <div className="text-[11px] text-neutral-300 font-semibold flex items-center gap-1">
                    <Store className="w-3 h-3 text-neutral-400" />
                    <span className="truncate">{video.businessName}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                    {video.productName}
                  </h3>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-base font-extrabold text-rose-300">{video.price}</span>
                    <span className="text-[11px] text-neutral-300">{video.distance}</span>
                  </div>
                </div>
              </div>

              {/* Card Meta & Action Bar */}
              <div className="p-4 bg-white space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span className="flex items-center gap-1 truncate max-w-[140px]">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{video.locality}</span>
                  </span>
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm text-[11px]">
                    {video.availability}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 line-clamp-2 italic">
                  "{video.description}"
                </p>

                <div className="pt-2 border-t border-neutral-100 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVideo(video);
                    }}
                    className="flex-1 py-2 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Product</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onContactSeller(video);
                    }}
                    className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    title="Quick Enquire"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
