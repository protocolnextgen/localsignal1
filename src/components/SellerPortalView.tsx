import React, { useState, useEffect } from 'react';
import { CustomerDemand, SellerVideo, Business, Trend, SellerOffer, LocalityInfo } from '../types';
import { 
  Store, 
  CheckCircle2, 
  MapPin, 
  Send, 
  Video, 
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { OpportunityMapView } from './OpportunityMapView';
import { LOCALITIES } from '../data/seedData';

interface SellerPortalViewProps {
  demands: CustomerDemand[];
  videos: SellerVideo[];
  businesses: Business[];
  trends: Trend[];
  localities?: LocalityInfo[];
  selectedLocality?: string;
  setSelectedLocality?: (localityId: string) => void;
  onAddOffer: (demandId: string, offer: Omit<SellerOffer, 'id' | 'createdAt' | 'status'>) => void;
  onSelectTrend: (trend: Trend) => void;
  onOpenVideoModal: (video: SellerVideo) => void;
  initialSubTab?: 'demands' | 'videos' | 'opportunities';
  focusedTrendId?: string | null;
  onSubTabChange?: (subTab: 'demands' | 'videos' | 'opportunities') => void;
}

export const SellerPortalView: React.FC<SellerPortalViewProps> = ({
  demands,
  videos,
  businesses,
  trends,
  localities = LOCALITIES,
  selectedLocality: propSelectedLocality,
  setSelectedLocality: propSetSelectedLocality,
  onAddOffer,
  onSelectTrend,
  onOpenVideoModal,
  initialSubTab = 'demands',
  focusedTrendId,
  onSubTabChange,
}) => {
  const { t, language } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'demands' | 'videos' | 'opportunities'>(initialSubTab);

  const [internalLocality, setInternalLocality] = useState<string>(propSelectedLocality || 'kopargaon-all');
  const currentLocality = propSelectedLocality || internalLocality;
  const handleSetLocality = propSetSelectedLocality || setInternalLocality;

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Active responding state
  const [activeRespondingDemand, setActiveRespondingDemand] = useState<CustomerDemand | null>(null);
  const [responseMode, setResponseMode] = useState<'I_HAVE_IT' | 'I_CAN_SOURCE_IT'>('I_HAVE_IT');

  // Form states for responding seller
  const [offeredPrice, setOfferedPrice] = useState('₹1,450');
  const [availabilityDate, setAvailabilityDate] = useState('In Stock - Immediate Pickup');
  const [description, setDescription] = useState('Available in shop right now. Genuine leather finish with 6-month stitching warranty.');
  const [videoTitle, setVideoTitle] = useState('Product Walkthrough Clip');
  const [sellerName, setSellerName] = useState('Royal Step Footwear & Leather Works');
  const [sellerContact, setSellerContact] = useState('+91 98224 55XXX');

  const handleStartResponse = (demand: CustomerDemand, mode: 'I_HAVE_IT' | 'I_CAN_SOURCE_IT') => {
    setActiveRespondingDemand(demand);
    setResponseMode(mode);
    if (mode === 'I_HAVE_IT') {
      setOfferedPrice(demand.budget);
      setAvailabilityDate(language === 'mr' ? 'स्टॉकमध्ये उपलब्ध - दुकानात लगेच मिळेल' : 'In Stock - Immediate Pickup at Shop');
      setDescription(language === 'mr' ? 'हे उत्पादन आमच्या कोपरगाव दुकानात उपलब्ध आहे. खरेदीपूर्वी तपासून घेऊ शकता.' : `We have this exact item in stock at our Kopargaon shop! You can inspect or test before purchase.`);
    } else {
      setOfferedPrice(demand.budget);
      setAvailabilityDate(language === 'mr' ? '२ दिवसांत उपलब्ध होईल' : 'Available in 2 Days');
      setDescription(language === 'mr' ? 'आम्ही हे होलसेल वितरकाकडून ४८ तासांत मिळवून देऊ शकतो.' : `We can source this directly from our wholesale distributor within 48 hours. Genuine guarantee.`);
    }
  };

  const handleSendOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeRespondingDemand) return;

    onAddOffer(activeRespondingDemand.id, {
      demandId: activeRespondingDemand.id,
      businessId: 'biz-008',
      businessName: sellerName,
      responseType: responseMode,
      offeredPrice,
      expectedAvailabilityDate: availabilityDate,
      description,
      videoTitle: videoTitle || undefined,
      videoThumbnail: responseMode === 'I_HAVE_IT' ? '👞' : '📦',
      contact: sellerContact,
      locality: 'Town Market & Shivaji Chowk',
    });

    setActiveRespondingDemand(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner / Welcome */}
      <section className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
              <Store className="w-4 h-4" />
              <span>{language === 'mr' ? 'विक्रेता केंद्र' : 'Merchant & Business Hub'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {language === 'mr' ? 'स्थानिक विक्रेता पोर्टल — कोपरगाव' : 'Local Merchant Portal — Kopargaon'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              {language === 'mr'
                ? 'ग्राहकांच्या थेट मागण्यांना उत्तर द्या, उत्पादनांचे व्हिडिओ दाखवा आणि नवीन व्यावसायिक संधी मिळवा.'
                : 'Respond directly to customer product demands, manage short video reels, and discover high-demand local market opportunities before competitors.'}
            </p>
          </div>

          <div className="p-3 bg-neutral-800 rounded-xl border border-neutral-700/80 text-center shrink-0">
            <div className="text-2xl font-bold text-rose-400 tabular-nums">
              {demands.length}
            </div>
            <div className="text-[11px] text-neutral-400 font-medium">
              {language === 'mr' ? 'सक्रिय मागण्या' : 'Open Local Demands'}
            </div>
          </div>
        </div>

        {/* Seller Navigation Tabs */}
        <div className="pt-4 border-t border-neutral-800 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'demands', label: `${t('customerDemandsTitle')} (${demands.length})` },
            { id: 'videos', label: `${t('navMyVideos')} (${videos.length})` },
            { id: 'opportunities', label: t('navOpportunities') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                const newTab = tab.id as 'demands' | 'videos' | 'opportunities';
                setActiveSubTab(newTab);
                if (onSubTabChange) {
                  onSubTabChange(newTab);
                }
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* SUB-TAB 1: CUSTOMER DEMANDS FEED */}
      {activeSubTab === 'demands' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                {language === 'mr' ? 'कोपरगावमधील थेट ग्राहक मागण्या' : 'Live Local Customer Inquiries'}
              </h2>
              <p className="text-xs text-neutral-500">
                {language === 'mr'
                  ? 'ज्या ग्राहकांना हवी ती वस्तू जवळ सापडली नाही अशा मागण्या'
                  : 'Customers who could not find their exact requirements in Kopargaon shops'}
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              {language === 'mr' ? 'थेट जुळवणी' : 'Real-time matching'}
            </span>
          </div>

          <div className="space-y-4">
            {demands.map((demand) => (
              <div
                key={demand.id}
                className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs hover:border-neutral-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-neutral-100">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span className="font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-sm">
                        {demand.category}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        {demand.location}
                      </span>
                      <span>·</span>
                      <span className="text-neutral-400 font-mono text-[11px]">
                        {language === 'mr' ? 'ग्राहक:' : 'Posted by'} {demand.customerName}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-neutral-900">
                      {demand.productOrService}
                    </h3>

                    <div className="text-xs text-neutral-600 space-y-0.5">
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

                  <div className="flex flex-col sm:items-end gap-1 shrink-0 text-xs">
                    <div className="font-mono text-neutral-500">
                      {language === 'mr' ? 'ग्राहकाचे बजेट:' : 'Customer Budget:'} <strong className="text-base font-bold text-neutral-900">{demand.budget}</strong>
                    </div>
                    <div className="text-[11px] text-rose-600 font-medium">
                      {language === 'mr' ? 'कधीपर्यंत हवे:' : 'Needed by'} {demand.requiredByDate}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {demand.offers.length} {language === 'mr' ? 'प्रतिसाद दिले गेले' : 'offers submitted so far'}
                    </span>
                  </div>
                </div>

                {/* CRITICAL ACTIONS: [I HAVE IT] & [I CAN SOURCE IT] */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="text-xs text-neutral-500">
                    {language === 'mr' 
                      ? `${demand.customerName} यांच्या मागणीला प्रतिसाद द्या:` 
                      : `Can you fulfill this request for ${demand.customerName}?`}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartResponse(demand, 'I_HAVE_IT')}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t('sellerResponseIHaveIt')}</span>
                    </button>

                    <button
                      onClick={() => handleStartResponse(demand, 'I_CAN_SOURCE_IT')}
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t('sellerResponseICanSourceIt')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUB-TAB 2: MY VIDEOS */}
      {activeSubTab === 'videos' && (
        <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900">
              {t('navMyVideos')}
            </h2>
            <button className="px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-md cursor-pointer">
              {language === 'mr' ? '+ नवीन व्हिडिओ अपलोड करा' : '+ Upload Short Video'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {videos.slice(0, 4).map((vid) => (
              <div
                key={vid.id}
                onClick={() => onOpenVideoModal(vid)}
                className={`aspect-[9/14] rounded-xl overflow-hidden p-3 bg-gradient-to-br ${vid.videoColor} text-white flex flex-col justify-between cursor-pointer group shadow-xs`}
              >
                <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded-full font-mono self-start">
                  {vid.videoDuration}
                </span>
                <div className="text-center text-3xl">{vid.thumbnailUrl}</div>
                <div className="text-xs font-bold">{vid.productName}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SUB-TAB 3: OPPORTUNITIES (Hyperlocal Opportunity Map with Right-Side Inspection Panel) */}
      {activeSubTab === 'opportunities' && (
        <OpportunityMapView
          trends={trends}
          businesses={businesses}
          localities={localities}
          selectedLocality={currentLocality}
          setSelectedLocality={handleSetLocality}
          onSelectTrend={onSelectTrend}
          focusedTrendId={focusedTrendId}
        />
      )}

      {/* MODAL: SELLER OFFER RESPONSE MODAL */}
      {activeRespondingDemand && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200 my-auto">
            {/* Header */}
            <div className={`px-6 py-4 text-white flex items-center justify-between ${
              responseMode === 'I_HAVE_IT' ? 'bg-emerald-900' : 'bg-blue-900'
            }`}>
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-white" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {responseMode === 'I_HAVE_IT' 
                    ? (language === 'mr' ? 'ऑफर: माझ्याकडे आहे' : 'Offer: I Have It in Stock')
                    : (language === 'mr' ? 'ऑफर: मी मिळवून देतो' : 'Offer: I Can Source It (1-2 Days)')}
                </span>
              </div>
              <button
                onClick={() => setActiveRespondingDemand(null)}
                className="text-white hover:text-neutral-300 p-1 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            {/* Target Demand Recap */}
            <div className="p-4 bg-neutral-50 border-b border-neutral-200 text-xs">
              <span className="text-neutral-400 block text-[10px] uppercase font-bold">
                {language === 'mr' ? 'ग्राहकाच्या मागणीला प्रतिसाद देत आहात:' : 'Responding to Customer Request:'}
              </span>
              <div className="font-bold text-neutral-900 text-sm mt-0.5">
                {activeRespondingDemand.productOrService}
              </div>
              <div className="text-neutral-600 mt-0.5">
                {t('detailsLabel')}: {activeRespondingDemand.specifications} · {t('budgetLabel')}: {activeRespondingDemand.budget}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSendOfferSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 text-[11px] block">
                    {t('offeredPriceLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(e.target.value)}
                    placeholder="e.g. ₹1,450"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 font-bold text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 text-[11px] block">
                    {t('availabilityDateLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={availabilityDate}
                    onChange={(e) => setAvailabilityDate(e.target.value)}
                    placeholder="e.g. In Stock Today / 2 Days"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-neutral-800 text-[11px] block">
                  {t('yourNoteLabel')}
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none"
                />
              </div>

              {/* Video Title Attachment */}
              <div className="space-y-1">
                <label className="font-bold text-neutral-800 text-[11px] block flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-rose-600" />
                  <span>{language === 'mr' ? 'उत्पादनाचा व्हिडिओ जोडा (ऐच्छिक)' : 'Attach Product / Service Video Reel'}</span>
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="e.g. Product Demo: Derby Formal Size 9"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 text-[11px] block">
                    {language === 'mr' ? 'दुकानाचे नाव' : 'Business Name'}
                  </label>
                  <input
                    type="text"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 text-[11px] block">
                    {language === 'mr' ? 'फोन / व्हॉट्सॲप' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="text"
                    value={sellerContact}
                    onChange={(e) => setSellerContact(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveRespondingDemand(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  {t('cancelBtn')}
                </button>

                <button
                  type="submit"
                  className={`px-5 py-2.5 text-xs font-bold text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                    responseMode === 'I_HAVE_IT'
                      ? 'bg-emerald-700 hover:bg-emerald-800'
                      : 'bg-blue-700 hover:bg-blue-800'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('sendOfferBtn')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
