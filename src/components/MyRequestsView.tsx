import React, { useState } from 'react';
import { CustomerDemand, SellerOffer, DemandStatus } from '../types';
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Store, 
  Play, 
  Phone, 
  MessageCircle, 
  Calendar
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MyRequestsViewProps {
  demands: CustomerDemand[];
  onOpenPostDemand: () => void;
  onAcceptOffer: (demandId: string, offer: SellerOffer) => void;
  onMarkFulfilled: (demandId: string) => void;
  onContactOfferSeller: (offer: SellerOffer) => void;
}

export const MyRequestsView: React.FC<MyRequestsViewProps> = ({
  demands,
  onOpenPostDemand,
  onAcceptOffer,
  onMarkFulfilled,
  onContactOfferSeller,
}) => {
  const { t, language } = useLanguage();
  const [selectedOfferForVideo, setSelectedOfferForVideo] = useState<SellerOffer | null>(null);

  const getStatusBadge = (status: DemandStatus) => {
    switch (status) {
      case 'Offer Received':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
            {language === 'mr' ? 'प्रतिसाद मिळाले' : 'Offers Received'}
          </span>
        );
      case 'Seller Has It':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {language === 'mr' ? 'माझ्याकडे उपलब्ध आहे' : 'Seller Has It in Stock'}
          </span>
        );
      case 'Seller Sourcing':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            {language === 'mr' ? 'मी मिळवून देऊ शकतो' : 'Seller Sourcing (1-2 Days)'}
          </span>
        );
      case 'Fulfilled':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {t('statusFulfilled')}
          </span>
        );
      case 'Matching':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
            {language === 'mr' ? 'विक्रेत्यांशी जुळवत आहे' : 'Matching Local Sellers'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-200">
            {t('statusOpen')}
          </span>
        );
    }
  };

  const timelineSteps = language === 'mr' ? [
    { key: 'posted', label: 'मागणी नोंदवली' },
    { key: 'matching', label: 'दुकानदार शोधत आहे' },
    { key: 'sourcing', label: 'उपलब्ध / मिळवून देणार' },
    { key: 'offer', label: 'प्रतिसाद प्राप्त' },
    { key: 'fulfilled', label: 'पूर्ण झाले' }
  ] : [
    { key: 'posted', label: 'Request Posted' },
    { key: 'matching', label: 'Matching Sellers' },
    { key: 'sourcing', label: 'Seller Has It / Sourcing' },
    { key: 'offer', label: 'Offer Received' },
    { key: 'fulfilled', label: 'Fulfilled' }
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <span>{language === 'mr' ? 'स्थानिक ग्राहक सेवा' : 'Customer Request Hub'}</span>
            <span>·</span>
            <span>{language === 'mr' ? 'कोपरगाव' : 'Kopargaon'}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">
            {t('navRequests')}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            {language === 'mr' 
              ? 'स्थिती तपासा, दुकानदारांचे प्रतिसाद पहा आणि थेट संपर्क साधा.'
              : 'Track status, review seller offers, watch product videos, and contact local merchants.'}
          </p>
        </div>

        <button
          onClick={onOpenPostDemand}
          className="px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('postDemandBtn')}</span>
        </button>
      </section>

      {/* Requests List */}
      <div className="space-y-6">
        {demands.length === 0 ? (
          <div className="p-12 bg-white border border-neutral-200 rounded-2xl text-center space-y-4">
            <Store className="w-10 h-10 text-neutral-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-neutral-900">
                {language === 'mr' ? 'तुम्ही अद्याप कोणतीही मागणी नोंदवलेली नाही' : "You haven't posted any demands yet"}
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                {language === 'mr'
                  ? 'कोपरगावमध्ये हवे ते सापडत नाहीये? मागणी नोंदवा आणि जवळचे दुकानदार संपर्क करतील.'
                  : "Looking for a specific item in Kopargaon that isn't available? Post a request and nearby merchants will respond."}
              </p>
            </div>
            <button
              onClick={onOpenPostDemand}
              className="px-5 py-2.5 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              {language === 'mr' ? 'पहिली मागणी नोंदवा' : 'Post Your First Demand'}
            </button>
          </div>
        ) : (
          demands.map((demand) => (
            <div
              key={demand.id}
              className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs space-y-6"
            >
              {/* Demand Top Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-neutral-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span className="font-semibold text-neutral-700">{demand.category}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      {demand.location}
                    </span>
                    <span>·</span>
                    <span className="font-mono text-neutral-400">
                      {language === 'mr' ? 'तारीख' : 'Posted'}: {new Date(demand.postedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-neutral-900">
                    {demand.productOrService}
                  </h2>

                  <div className="text-xs text-neutral-600 pt-1 space-y-0.5">
                    <div>
                      <strong>{t('detailsLabel')}:</strong> {demand.specifications}
                    </div>
                    {demand.description && (
                      <div className="text-neutral-500 italic">
                        "{demand.description}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  {getStatusBadge(demand.status)}
                  <div className="text-xs font-mono text-neutral-500">
                    {t('budgetLabel')}: <span className="font-bold text-neutral-900">{demand.budget}</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{language === 'mr' ? 'हवे आहे:' : 'Needed by'} {demand.requiredByDate}</span>
                  </div>
                </div>
              </div>

              {/* Visual Lifecycle Timeline */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  {language === 'mr' ? 'मागणीची सद्यस्थिती:' : 'Request Progress Timeline:'}
                </span>
                <div className="flex items-center justify-between text-xs overflow-x-auto pb-1">
                  {timelineSteps.map((step, idx) => {
                    const isPassed = 
                      demand.status === 'Fulfilled' ||
                      (step.key === 'posted') ||
                      (step.key === 'matching' && demand.status !== 'Open') ||
                      (step.key === 'sourcing' && (demand.status === 'Seller Has It' || demand.status === 'Seller Sourcing' || demand.status === 'Offer Received')) ||
                      (step.key === 'offer' && (demand.status === 'Offer Received' || demand.offers.length > 0));

                    const isCurrent = 
                      (step.key === 'posted' && demand.status === 'Open') ||
                      (step.key === 'matching' && demand.status === 'Matching') ||
                      (step.key === 'sourcing' && (demand.status === 'Seller Has It' || demand.status === 'Seller Sourcing')) ||
                      (step.key === 'offer' && demand.status === 'Offer Received');

                    return (
                      <div key={step.key} className="flex items-center gap-2 shrink-0">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium ${
                          isCurrent
                            ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200'
                            : isPassed
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'text-neutral-400 bg-neutral-50'
                        }`}>
                          {isPassed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300"></span>
                          )}
                          <span>{step.label}</span>
                        </div>
                        {idx < timelineSteps.length - 1 && (
                          <div className="w-4 h-0.5 bg-neutral-200 hidden sm:block"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SELLER OFFERS RECEIVED SECTION */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-rose-600" />
                    <span>{language === 'mr' ? 'स्थानिक दुकानदारांचे प्रतिसाद' : 'Responses from Local Sellers'} ({demand.offers.length})</span>
                  </span>

                  {demand.status !== 'Fulfilled' && demand.offers.length > 0 && (
                    <button
                      onClick={() => onMarkFulfilled(demand.id)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer"
                    >
                      ✓ {t('markFulfilled')}
                    </button>
                  )}
                </div>

                {demand.offers.length === 0 ? (
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs text-neutral-500 flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>
                      {t('noOffersYet')}
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {demand.offers.map((offer) => (
                      <div
                        key={offer.id}
                        className={`p-4 rounded-xl border transition-all space-y-3 ${
                          offer.responseType === 'I_HAVE_IT'
                            ? 'bg-emerald-50/20 border-emerald-300'
                            : 'bg-blue-50/20 border-blue-300'
                        }`}
                      >
                        {/* Offer Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-1 ${
                              offer.responseType === 'I_HAVE_IT'
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-blue-100 text-blue-900'
                            }`}>
                              {offer.responseType === 'I_HAVE_IT' 
                                ? (language === 'mr' ? '✓ माझ्याकडे उपलब्ध आहे' : '✓ I HAVE IT IN STOCK')
                                : (language === 'mr' ? '⚡ मी मिळवून देऊ शकतो' : '⚡ I CAN SOURCE IT')}
                            </span>
                            <h4 className="text-sm font-bold text-neutral-900">
                              {offer.businessName}
                            </h4>
                            <div className="text-[11px] text-neutral-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-neutral-400" />
                              <span>{offer.locality}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-base font-extrabold text-neutral-900 block">
                              {offer.offeredPrice}
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-white px-1.5 py-0.5 rounded-xs border border-emerald-200">
                              {offer.expectedAvailabilityDate}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-neutral-700 leading-relaxed bg-white/80 p-2.5 rounded-lg border border-neutral-200/60">
                          "{offer.description}"
                        </p>

                        {/* Optional Video Response */}
                        {offer.videoTitle && (
                          <div
                            onClick={() => setSelectedOfferForVideo(offer)}
                            className="p-2.5 bg-neutral-900 text-white rounded-lg flex items-center justify-between text-xs cursor-pointer hover:bg-neutral-800 transition-colors shadow-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{offer.videoThumbnail || '🎬'}</span>
                              <div>
                                <div className="font-bold text-xs">{offer.videoTitle}</div>
                                <div className="text-[10px] text-neutral-400">
                                  {language === 'mr' ? 'व्हिडिओ पाहण्यासाठी क्लिक करा' : 'Click to watch seller product clip'}
                                </div>
                              </div>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                              <Play className="w-3.5 h-3.5 fill-white" />
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                          <button
                            onClick={() => onContactOfferSeller(offer)}
                            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{t('contactSeller')}</span>
                          </button>

                          <button
                            onClick={() => onContactOfferSeller(offer)}
                            className="px-2.5 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-lg font-medium flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Phone className="w-3 h-3 text-neutral-500" />
                            <span>{t('callSeller')}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Video preview modal for seller offer */}
      {selectedOfferForVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-neutral-950 text-white rounded-2xl max-w-sm w-full overflow-hidden p-6 space-y-4 border border-neutral-800 shadow-2xl text-center">
            <div className="flex justify-between items-center text-xs text-neutral-400">
              <span>{selectedOfferForVideo.businessName}</span>
              <button
                onClick={() => setSelectedOfferForVideo(null)}
                className="text-white hover:text-rose-400 p-1 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[9/14] bg-neutral-900 rounded-xl p-4 flex flex-col justify-between items-center border border-neutral-800">
              <span className="text-xs bg-rose-600 px-2 py-0.5 rounded-full font-bold">
                {language === 'mr' ? 'दुकानदार व्हिडिओ' : 'SELLER PRODUCT CLIP'}
              </span>
              <div className="text-5xl my-auto animate-bounce">
                {selectedOfferForVideo.videoThumbnail || '👞'}
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm text-white">
                  {selectedOfferForVideo.videoTitle}
                </div>
                <div className="text-xs text-rose-300 font-semibold">
                  {language === 'mr' ? 'किंमत:' : 'Price:'} {selectedOfferForVideo.offeredPrice}
                </div>
                <div className="text-[11px] text-neutral-400">
                  {selectedOfferForVideo.expectedAvailabilityDate}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onContactOfferSeller(selectedOfferForVideo);
                setSelectedOfferForVideo(null);
              }}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('contactSeller')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

