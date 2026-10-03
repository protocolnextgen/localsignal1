import React, { useState } from 'react';
import { SellerVideo, SellerProduct, Business } from '../types';
import { 
  X, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Play, 
  Pause, 
  ShieldCheck, 
  Store, 
  ArrowUpRight, 
  Clock, 
  CheckCircle, 
  Share2,
  ChevronRight
} from 'lucide-react';

interface SellerProductModalProps {
  video: SellerVideo;
  sellerBusiness?: Business;
  onClose: () => void;
  onOpenSellerProfile: (businessId: string) => void;
  onContactSeller: (business: Business | SellerVideo) => void;
}

export const SellerProductModal: React.FC<SellerProductModalProps> = ({
  video,
  sellerBusiness,
  onClose,
  onOpenSellerProfile,
  onContactSeller,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'details' | 'more-items'>('details');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Top Bar */}
        <div className="bg-neutral-900 text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5" />
              Verified Local Seller
            </span>
            <span className="text-neutral-500">·</span>
            <span className="text-xs text-neutral-300">{video.locality}</span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-sm cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Vertical Product Video Player Simulation (md:col-span-5) */}
          <div className="md:col-span-5 bg-neutral-950 flex flex-col items-center justify-center p-4 relative min-h-[320px] md:min-h-[420px]">
            {/* Video Container Box */}
            <div className={`w-full max-w-[220px] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl relative bg-gradient-to-br ${video.videoColor} border border-neutral-700/60 flex flex-col justify-between p-3.5 text-white select-none`}>
              {/* Video Header Overlay */}
              <div className="flex items-center justify-between text-[11px] z-10">
                <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full font-mono text-[10px]">
                  {video.videoDuration}
                </span>
                <span className="bg-rose-600/90 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                  LOCAL REEL
                </span>
              </div>

              {/* Video Center Animation / Play State */}
              <div className="my-auto flex flex-col items-center justify-center text-center space-y-2 z-10">
                <div className="text-4xl filter drop-shadow-md">{video.thumbnailUrl}</div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-11 h-11 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-white text-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
                  )}
                </button>
                <div className="text-[11px] font-medium text-neutral-200">
                  {isPlaying ? 'Playing product reel...' : 'Paused'}
                </div>
              </div>

              {/* Video Bottom Overlay */}
              <div className="space-y-1 z-10">
                <div className="text-xs font-bold leading-tight drop-shadow-sm truncate">
                  {video.productName}
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-300">
                  <span className="font-semibold text-rose-300">{video.price}</span>
                  <span className="text-neutral-400">{video.distance}</span>
                </div>
                {/* Progress bar simulation */}
                <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mt-1">
                  <div className={`h-full bg-rose-500 rounded-full ${isPlaying ? 'w-2/3 animate-pulse' : 'w-1/3'}`}></div>
                </div>
              </div>

              {/* Background ambient lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
            </div>

            <div className="text-[11px] text-neutral-400 mt-2 text-center">
              Sample / Illustrative Seller Content
            </div>
          </div>

          {/* Right Column: Seller and Product Details (md:col-span-7) */}
          <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-5 bg-white">
            <div className="space-y-4">
              {/* Business Lockup */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-700">{video.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      {video.locality}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mt-0.5">
                    {video.businessName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Merchant
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      {video.distance}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenSellerProfile(video.businessId)}
                  className="px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  View Seller
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="text-xl font-bold text-neutral-900 leading-snug">
                    {video.productName}
                  </h2>
                  <span className="text-xl font-extrabold text-rose-600 shrink-0">
                    {video.price}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {video.availability} in Kopargaon shop
                </div>
              </div>

              {/* Description */}
              <div className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3.5 rounded-lg border border-neutral-200/80">
                <span className="font-bold text-neutral-800 block mb-1">Seller Notes:</span>
                "{video.description}"
              </div>

              {/* Additional Products from this seller */}
              {video.products && video.products.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-neutral-800 uppercase tracking-wider text-[11px] flex items-center justify-between">
                    <span>Other Available Products in Shop</span>
                    <span className="text-neutral-400 font-normal">({video.products.length} listed)</span>
                  </div>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {video.products.map((prod) => (
                      <div key={prod.id} className="p-2 bg-neutral-50 hover:bg-neutral-100 rounded-md border border-neutral-200/60 flex items-center justify-between text-xs transition-colors">
                        <div>
                          <div className="font-semibold text-neutral-900">{prod.name}</div>
                          <div className="text-[11px] text-neutral-500">{prod.availability}</div>
                        </div>
                        <span className="font-bold text-neutral-900">{prod.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={() => onContactSeller(video)}
                className="w-full sm:flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact / Enquire via WhatsApp</span>
              </button>

              <button
                onClick={() => onContactSeller(video)}
                className="w-full sm:w-auto py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-600" />
                <span>Call Shop</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
