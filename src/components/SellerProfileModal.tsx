import React from 'react';
import { Business, SellerVideo, SellerProduct } from '../types';
import { 
  X, 
  MapPin, 
  Phone, 
  Store, 
  ShieldCheck, 
  Clock, 
  Star, 
  CheckCircle, 
  Play, 
  Package, 
  Layers 
} from 'lucide-react';

interface SellerProfileModalProps {
  business: Business;
  videos: SellerVideo[];
  onClose: () => void;
  onSelectVideo: (video: SellerVideo) => void;
  onContactSeller: (business: Business) => void;
}

export const SellerProfileModal: React.FC<SellerProfileModalProps> = ({
  business,
  videos,
  onClose,
  onSelectVideo,
  onContactSeller,
}) => {
  const sellerVideos = videos.filter(v => v.businessId === business.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Local Merchant Profile
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-sm cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Business Hero */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <span>{business.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                {business.locality}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
              {business.name}
            </h2>

            <p className="text-xs text-neutral-500 font-mono">
              {business.location}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Merchant in Kopargaon
              </span>

              <span className="text-neutral-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                {business.updatedTime || 'Active today'}
              </span>

              {business.rating && (
                <span className="text-neutral-700 flex items-center gap-1 font-bold">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {business.rating} Local Rating
                </span>
              )}
            </div>
          </div>

          {/* About Merchant */}
          {business.about && (
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-1">
              <span className="font-bold text-neutral-800 text-[11px] uppercase tracking-wider block">
                About this local business:
              </span>
              <p className="text-neutral-700 leading-relaxed">
                "{business.about}"
              </p>
            </div>
          )}

          {/* Short Videos from this Merchant */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                Product Reels from {business.name}
              </span>
              <span className="text-neutral-400 font-mono">
                {sellerVideos.length} reels
              </span>
            </div>

            {sellerVideos.length === 0 ? (
              <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200 text-neutral-400 text-center">
                No short product videos uploaded yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {sellerVideos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => {
                      onClose();
                      onSelectVideo(vid);
                    }}
                    className={`aspect-[9/14] rounded-lg overflow-hidden relative p-3 flex flex-col justify-between text-white cursor-pointer bg-gradient-to-br ${vid.videoColor} group hover:scale-[1.02] transition-transform shadow-sm`}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="bg-black/40 px-1.5 py-0.5 rounded-full font-mono">
                        {vid.videoDuration}
                      </span>
                      <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40">
                        <Play className="w-2.5 h-2.5 fill-white" />
                      </span>
                    </div>

                    <div className="text-center text-3xl my-auto drop-shadow-sm">
                      {vid.thumbnailUrl}
                    </div>

                    <div className="space-y-0.5 z-10">
                      <div className="font-bold text-xs leading-tight line-clamp-2">
                        {vid.productName}
                      </div>
                      <div className="text-rose-300 font-extrabold text-xs">
                        {vid.price}
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product & Services Catalog */}
          <div className="space-y-2">
            <span className="font-bold text-neutral-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-neutral-500" />
              Verified Services & Catalog
            </span>
            <div className="flex flex-wrap gap-1.5">
              {business.services.map((svc) => (
                <span
                  key={svc}
                  className="px-2.5 py-1 bg-neutral-100 border border-neutral-200/80 rounded-md text-neutral-800 font-medium"
                >
                  ✓ {svc}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-neutral-500 font-mono">
            Direct Phone: <span className="font-semibold text-neutral-800">{business.contact}</span>
          </div>

          <button
            onClick={() => onContactSeller(business)}
            className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call / Enquire Merchant</span>
          </button>
        </div>
      </div>
    </div>
  );
};
