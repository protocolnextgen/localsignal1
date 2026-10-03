import React, { useState } from 'react';
import { CustomerDemand, Category } from '../types';
import { X, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface PostDemandModalProps {
  prefillQuery?: string;
  onClose: () => void;
  onSubmitDemand: (newDemand: Omit<CustomerDemand, 'id' | 'postedAt' | 'status' | 'offers'>) => void;
}

export const PostDemandModal: React.FC<PostDemandModalProps> = ({
  prefillQuery = '',
  onClose,
  onSubmitDemand,
}) => {
  const { t, language } = useLanguage();
  const [productOrService, setProductOrService] = useState(prefillQuery || '');
  const [category, setCategory] = useState<Category>('Retail');
  const [specifications, setSpecifications] = useState('');
  const [budget, setBudget] = useState('₹1,500');
  const [location, setLocation] = useState('Town Market & Shivaji Chowk, Kopargaon');
  const [requiredByDate, setRequiredByDate] = useState('2026-10-06');
  const [quantity, setQuantity] = useState('1');
  const [customerName] = useState('Rahul M.');
  const [customerContact] = useState('+91 98221 44XXX');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productOrService.trim()) return;

    onSubmitDemand({
      customerName,
      customerContact,
      productOrService,
      category,
      specifications,
      budget,
      location,
      requiredByDate,
      quantity,
      description: specifications,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span className="text-sm font-bold text-white">
              {t('demandFormTitle')}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-neutral-600 leading-relaxed text-xs">
            {t('demandFormSubtitle')}
          </div>

          {/* 1. What do you need? / तुम्हाला काय हवे आहे? */}
          <div className="space-y-1">
            <label className="font-bold text-neutral-800 text-xs block">
              {t('whatDoYouNeed')} *
            </label>
            <input
              type="text"
              required
              value={productOrService}
              onChange={(e) => setProductOrService(e.target.value)}
              placeholder={t('whatDoYouNeedPlaceholder')}
              className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 font-medium text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          {/* 2. Details / थोडक्यात माहिती */}
          <div className="space-y-1">
            <label className="font-bold text-neutral-800 text-xs block">
              {t('detailsLabel')}
            </label>
            <textarea
              rows={2}
              value={specifications}
              onChange={(e) => setSpecifications(e.target.value)}
              placeholder={t('detailsPlaceholder')}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 3. Budget / बजेट */}
            <div className="space-y-1">
              <label className="font-bold text-neutral-800 text-xs block">
                {t('budgetLabel')}
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder={t('budgetPlaceholder')}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900 font-semibold"
              />
            </div>

            {/* 5. Quantity / किती हवे? */}
            <div className="space-y-1">
              <label className="font-bold text-neutral-800 text-xs block">
                {t('quantityLabel')}
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder={t('quantityPlaceholder')}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 4. Location / ठिकाण */}
            <div className="space-y-1">
              <label className="font-bold text-neutral-800 text-xs block">
                {t('locationLabel')}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            {/* 6. Needed by / कधीपर्यंत हवे? */}
            <div className="space-y-1">
              <label className="font-bold text-neutral-800 text-xs block">
                {t('neededByLabel')}
              </label>
              <input
                type="date"
                value={requiredByDate}
                onChange={(e) => setRequiredByDate(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
            >
              {t('cancelBtn')}
            </button>

            {/* Button: “मागणी पाठवा” */}
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'मागणी पाठवा' : t('sendDemandBtn')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
