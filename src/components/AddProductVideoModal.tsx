import React, { useState } from 'react';
import { SellerVideo, Category } from '../types';
import { X, Video, Play, PlusCircle, CheckCircle2 } from 'lucide-react';

interface AddProductVideoModalProps {
  onClose: () => void;
  onAddVideo: (newVideo: SellerVideo) => void;
}

export const AddProductVideoModal: React.FC<AddProductVideoModalProps> = ({
  onClose,
  onAddVideo,
}) => {
  const [productName, setProductName] = useState('');
  const [businessName, setBusinessName] = useState('Royal Step Footwear & Leather Works');
  const [category, setCategory] = useState<Category>('Retail');
  const [price, setPrice] = useState('₹1,450');
  const [locality, setLocality] = useState('Town Market & Shivaji Chowk');
  const [distance, setDistance] = useState('0.5 km away');
  const [availability, setAvailability] = useState<'In Stock' | 'Available Today' | 'Limited Stock' | 'Can Source (1-2 Days)'>('In Stock');
  const [thumbnailIcon, setThumbnailIcon] = useState('👞');
  const [description, setDescription] = useState('');
  const [contactPhone, setContactPhone] = useState('+91 98224 55XXX');

  const icons = ['👞', '👟', '🏸', '🥗', '⚡', '❄️', '📱', '🔧', '📦', '🏏'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    const newVideo: SellerVideo = {
      id: `vid-${Date.now()}`,
      businessId: 'biz-008',
      businessName,
      productName,
      category,
      price,
      locality,
      distance,
      availability,
      thumbnailUrl: thumbnailIcon,
      videoColor: 'from-neutral-900 to-rose-950',
      videoDuration: '0:30',
      description: description || 'New product showcase uploaded from Kopargaon counter.',
      contactPhone,
      viewsCount: 1,
    };

    onAddVideo(newVideo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Add Seller Product Video Reel
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-sm cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs">
          <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-neutral-600 text-[11px] leading-relaxed">
            Your short video reel will immediately appear on the <strong>Customer Local Feed / Discover</strong> for buyers searching in Kopargaon.
          </div>

          <div className="space-y-1">
            <label className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] block">
              Product or Service Title *
            </label>
            <input
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Leather Oxford Shoes / Cricket Grip Restringing..."
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 font-semibold text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] block">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none cursor-pointer"
              >
                <option value="Retail">Retail & Goods</option>
                <option value="Food">Food & Dining</option>
                <option value="Services">Services & Repair</option>
                <option value="Transport">Transport & Mobility</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] block">
                Customer Price *
              </label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. ₹1,450"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] block">
                Stock Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as any)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none cursor-pointer"
              >
                <option value="In Stock">In Stock (Immediate Pickup)</option>
                <option value="Available Today">Available Today</option>
                <option value="Limited Stock">Limited Stock</option>
                <option value="Can Source (1-2 Days)">Can Source (1-2 Days)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] block">
                Shop Locality
              </label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Select Video Icon / Visual Theme */}
          <div className="space-y-1">
            <label className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] block">
              Product Visual Icon
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {icons.map((ic) => (
                <button
                  type="button"
                  key={ic}
                  onClick={() => setThumbnailIcon(ic)}
                  className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border cursor-pointer transition-all ${
                    thumbnailIcon === ic
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                      : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-bold text-neutral-800 uppercase tracking-wider text-[11px] block">
              Product Reel Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Highlight quality, sizes, pickup details, and warranty..."
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none"
            />
          </div>

          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Reel to Local Feed</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
