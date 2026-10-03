import React, { useState } from 'react';
import { SellerVideo, LocalityInfo, Category, Trend, Business } from '../types';
import { 
  Search, 
  MapPin, 
  Play, 
  ArrowRight, 
  TrendingUp, 
  Store, 
  ChevronRight, 
  ShieldCheck, 
  PlusCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface TrendingTopicItem {
  id: string;
  topic: string;
  topicMr: string;
  category: Category;
  locality: string;
  inquiries: string;
  inquiriesMr: string;
  badge: string;
  badgeMr: string;
  badgeColor: string;
  icon: string;
  searchFilter: string;
  trendId: string;
  summary: string;
  summaryMr: string;
}

interface CustomerHomeViewProps {
  videos: SellerVideo[];
  localities: LocalityInfo[];
  selectedLocality: string;
  setSelectedLocality: (id: string) => void;
  onSearch: (query: string) => void;
  onSelectVideo: (video: SellerVideo) => void;
  onNavigateToTab?: (tab: string) => void;
  onContactSeller?: (item: any) => void;
  trends?: Trend[];
  businesses?: Business[];
  onSelectTrend?: (trend: Trend) => void;
  onOpenPostDemand?: (prefillQuery?: string) => void;
}

export const CustomerHomeView: React.FC<CustomerHomeViewProps> = ({
  videos,
  localities,
  selectedLocality,
  setSelectedLocality,
  onSearch,
  onSelectVideo,
  onNavigateToTab,
  trends = [],
  businesses = [],
  onSelectTrend,
  onOpenPostDemand,
}) => {
  const { t, language } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories: Array<{ id: Category | 'All'; labelEn: string; labelMr: string }> = [
    { id: 'All', labelEn: 'All', labelMr: 'सर्व' },
    { id: 'Retail', labelEn: 'Retail', labelMr: 'किरकोळ' },
    { id: 'Food', labelEn: 'Food', labelMr: 'अन्न' },
    { id: 'Services', labelEn: 'Services', labelMr: 'सेवा' },
    { id: 'Transport', labelEn: 'Transport', labelMr: 'वाहतूक' },
  ];

  // Curated Trending in Kopargaon topics
  const trendingTopics: TrendingTopicItem[] = [
    {
      id: 'trend-phone-covers',
      topic: 'Phone Covers & Tough Armor Cases',
      topicMr: 'मोबाईल कव्हर्स आणि स्क्रीन गार्ड',
      category: 'Retail',
      locality: 'Town Market & Shivaji Chowk',
      inquiries: '190+ inquiries',
      inquiriesMr: '१९०+ चौकशी',
      badge: 'High Attention',
      badgeMr: 'जास्त मागणी',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
      icon: '📱',
      searchFilter: 'phone cover',
      trendId: 'trend-phone-covers',
      summary: 'High inquiry activity for rugged drop-tested armor cases and camera ring covers for 5G smartphones.',
      summaryMr: '५जी स्मार्टफोनसाठी मजबूत कव्हर्स आणि लेन्स गार्डसाठी वाढती मागणी.',
    },
    {
      id: 'trend-sports-gear',
      topic: 'Badminton Rackets & Restringing',
      topicMr: 'बॅडमिंटन रॅकेट्स आणि वायर रिस्ट्रिंगिंग',
      category: 'Retail',
      locality: 'Town Market & Shivaji Chowk',
      inquiries: '154 inquiries',
      inquiriesMr: '१५४ चौकशी',
      badge: 'Popular',
      badgeMr: 'लोकप्रिय',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      icon: '🏸',
      searchFilter: 'badminton racket',
      trendId: 'trend-sports-equipment',
      summary: 'Consistent queries for tournament nylon shuttlecocks, grip wrap, and electronic racquet restringing.',
      summaryMr: 'टूर्नामेंट शटलकॉक आणि रॅकेट रिस्ट्रिंगिंगसाठी सतत विचारणा.',
    },
    {
      id: 'trend-ev-acc',
      topic: 'EV Charging & 15A Adapters',
      topicMr: 'ईव्ही चार्जिंग आणि १५ए अडॅप्टर्स',
      category: 'Transport',
      locality: 'SH-10 Highway Junction',
      inquiries: '217 searches',
      inquiriesMr: '२१७ शोध',
      badge: 'Surging',
      badgeMr: 'वाढती गरज',
      badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
      icon: '⚡',
      searchFilter: 'EV charging',
      trendId: 'trend-ev-charging',
      summary: 'Surging highway traveler inquiries; discoverable commercial fast-charging supply is limited.',
      summaryMr: 'महामार्गावरील प्रवाशांकडून ईव्ही चार्जिंग पॉईंट्सची वारंवार विचारणा.',
    },
    {
      id: 'trend-college-footwear',
      topic: 'College Footwear',
      topicMr: 'कॉलेज फॉर्मल शूज',
      category: 'Retail',
      locality: 'Town Market & Shivaji Chowk',
      inquiries: 'Local inquiries',
      inquiriesMr: 'स्थानिक विचारणा',
      badge: 'Rising',
      badgeMr: 'वाढता कल',
      badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
      icon: '👞',
      searchFilter: 'black formal shoes under ₹1500',
      trendId: 'trend-college-footwear',
      summary: 'Seasonal queries for student black formal derby and loafer shoes under ₹1500 for campus wear.',
      summaryMr: '१५०० रुपयांच्या आत काळे फॉर्मल शूज आणि लोफर्सची वाढती मागणी.',
    },
    {
      id: 'trend-ac-service',
      topic: 'AC Servicing & Gas Refill',
      topicMr: 'एसी सर्व्हिसिंग आणि गॅस रिफिल',
      category: 'Services',
      locality: 'Town Market',
      inquiries: 'Service inquiries',
      inquiriesMr: 'सेवा मागणी',
      badge: 'Growing',
      badgeMr: 'हंगामी मागणी',
      badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
      icon: '❄️',
      searchFilter: 'split AC servicing',
      trendId: 'trend-ac-repair',
      summary: 'Pre-summer household demand for split AC jet washing and cooling gas level checks.',
      summaryMr: 'उन्हाळ्यापूर्वी स्प्लिट एसी जेट वॉशिंग आणि गॅस लेव्हल तपासण्यासाठी स्थानिक मागणी.',
    },
    {
      id: 'trend-healthy-food',
      topic: 'Wholesome Millet Breakfast',
      topicMr: 'पौष्टिक मिलेट नाश्ता व मोड आलेली कडधान्ये',
      category: 'Food',
      locality: 'Station Road & Goods Shed',
      inquiries: '218 searches',
      inquiriesMr: '२१८ शोध',
      badge: 'Daily Need',
      badgeMr: 'दैनंदिन गरज',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      icon: '🥗',
      searchFilter: 'healthy breakfast',
      trendId: 'trend-healthy-breakfast',
      summary: 'Frequent commuter queries for clean morning millet thali and diabetic-friendly sprout packs near railway terminal.',
      summaryMr: 'रेल्वे स्टेशन परिसरातील प्रवाशांकडून सकाळच्या स्वच्छ मिलेट नाश्त्याची मागणी.',
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleOpenTrendItem = (item: TrendingTopicItem) => {
    const foundTrend = trends.find(t => t.id === item.trendId || t.topic.toLowerCase().includes(item.topic.toLowerCase()));
    if (foundTrend && onSelectTrend) {
      onSelectTrend(foundTrend);
    } else {
      onSearch(item.searchFilter);
    }
  };

  // Filter video reels by category and selected locality
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
    <div className="space-y-8 font-sans">
      {/* ======================================================== */}
      {/* 1. TRENDING IN KOPARGAON HERO (Sections 4, 5, 6)         */}
      {/* ======================================================== */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            {/* Locality Selector Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-700 border border-neutral-200/80">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>{t('browsingIn')}</span>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="bg-transparent text-neutral-900 font-bold focus:outline-none cursor-pointer"
              >
                {localities.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              {t('trendingTitle')}
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-medium">
              {t('trendingSubtitle')}
            </p>
          </div>

          {/* Simple Trending Explanation (Section 6) */}
          <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/90 text-xs text-neutral-600 max-w-md flex items-start gap-2.5">
            <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              {t('trendingDisclaimer')}
            </p>
          </div>
        </div>

        {/* Trending Topic Cards Grid */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900">
              {t('trendingProductsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {trendingTopics.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenTrendItem(item)}
                className="p-3.5 bg-white border border-neutral-200 hover:border-rose-400 hover:shadow-md rounded-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {language === 'mr' ? item.badgeMr : item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-neutral-900 group-hover:text-rose-600 transition-colors leading-snug line-clamp-2">
                      {language === 'mr' ? item.topicMr : item.topic}
                    </h3>
                  </div>

                  <p className="text-[11px] text-neutral-500 line-clamp-2 leading-tight">
                    {language === 'mr' ? item.summaryMr : item.summary}
                  </p>
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400 font-mono text-[10px]">
                    {language === 'mr' ? item.inquiriesMr : item.inquiries}
                  </span>
                  <div className="flex items-center text-rose-600 font-semibold group-hover:underline">
                    <span>{language === 'mr' ? 'पाहा' : 'View'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. LOCAL SELLER REELS (Section 4 & 5)                    */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
              <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                {t('sellerReelsTitle')}
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {t('sellerReelsSubtitle')}
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {language === 'mr' ? cat.labelMr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        {filteredVideos.length === 0 ? (
          <div className="p-8 bg-white border border-neutral-200 rounded-xl text-center text-xs text-neutral-500">
            {language === 'mr' ? 'या वर्गात सध्या व्हिडिओ उपलब्ध नाहीत.' : 'No seller video reels in this category for the selected locality yet.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => onSelectVideo(video)}
                className="group rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-xs hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between cursor-pointer"
              >
                {/* 9:14 Vertical Video Thumbnail */}
                <div className={`aspect-[9/14] bg-gradient-to-br ${video.videoColor} p-3 relative flex flex-col justify-between text-white overflow-hidden`}>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between z-10 text-[10px]">
                    <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full font-mono">
                      {video.videoDuration}
                    </span>
                    <span className="bg-rose-600 px-1.5 py-0.5 rounded-full font-bold">
                      REEL
                    </span>
                  </div>

                  {/* Centered Emoji Product Icon + Play Button */}
                  <div className="my-auto text-center space-y-1 z-10">
                    <div className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                      {video.thumbnailUrl}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/40 flex items-center justify-center mx-auto backdrop-blur-xs transition-colors shadow-xs">
                      <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none"></div>

                  {/* Bottom Video Text */}
                  <div className="z-10 space-y-0.5">
                    <span className="text-[10px] text-neutral-300 font-medium truncate block">
                      {video.businessName}
                    </span>
                    <div className="text-xs font-bold leading-tight line-clamp-2 text-white">
                      {video.productName}
                    </div>
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="font-extrabold text-rose-300">{video.price}</span>
                      <span className="text-neutral-300 text-[10px]">{video.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Card Meta Footer */}
                <div className="p-3 bg-white space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500">
                    <span className="truncate max-w-[100px]">{video.locality}</span>
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                      {video.availability === 'In Stock' 
                        ? t('availInStock') 
                        : video.availability === 'Available Today' 
                        ? t('availToday') 
                        : video.availability}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVideo(video);
                      }}
                      className="text-xs font-bold text-neutral-900 group-hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t('watchReel')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <span className="text-[11px] text-neutral-400 font-mono">
                      {video.viewsCount} {language === 'mr' ? 'पाहिले' : 'views'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 3. "काही विशिष्ट वस्तू हवी आहे?" SEARCH SECTION (Section 4) */}
      {/* ======================================================== */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 uppercase tracking-wider">
              <Search className="w-3.5 h-3.5 text-rose-600" />
              <span>{language === 'mr' ? 'स्थानिक शोध' : 'Local Search'}</span>
            </div>
            <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">
              {t('searchSectionTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600">
              {t('searchSectionSubtitle')}
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="w-full md:w-96 shrink-0">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center shadow-xs rounded-xl overflow-hidden bg-neutral-50 border border-neutral-300 focus-within:border-neutral-900 focus-within:bg-white transition-all">
              <Search className="w-4 h-4 absolute left-3.5 text-neutral-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-24 py-2.5 text-xs sm:text-sm text-neutral-900 bg-transparent focus:outline-none placeholder:text-neutral-400 font-medium"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {t('searchBtn')}
              </button>
            </form>

            {/* Quick Suggestions */}
            <div className="flex items-center gap-1.5 pt-2 text-[11px] text-neutral-500 overflow-x-auto whitespace-nowrap">
              <span className="text-neutral-400">{language === 'mr' ? 'उदा:' : 'Quick:'}</span>
              <button
                onClick={() => {
                  const q = language === 'mr' ? '1500 रुपयांच्या आत काळे फॉर्मल शूज' : 'black formal shoes under ₹1500';
                  setSearchInput(q);
                  onSearch(q);
                }}
                className="text-neutral-700 hover:text-rose-600 underline decoration-neutral-300 cursor-pointer"
              >
                {language === 'mr' ? 'काळे शूज (₹१५०० आत)' : 'Shoes under ₹1500'}
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  const q = language === 'mr' ? 'बॅडमिंटन रॅकेट' : 'badminton racket';
                  setSearchInput(q);
                  onSearch(q);
                }}
                className="text-neutral-700 hover:text-rose-600 underline decoration-neutral-300 cursor-pointer"
              >
                {language === 'mr' ? 'बॅडमिंटन रॅकेट' : 'Badminton'}
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  const q = language === 'mr' ? 'ईव्ही चार्जिंग' : 'EV charging';
                  setSearchInput(q);
                  onSearch(q);
                }}
                className="text-neutral-700 hover:text-rose-600 underline decoration-neutral-300 cursor-pointer"
              >
                {language === 'mr' ? 'ईव्ही चार्जिंग' : 'EV charging'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. "हवे ते सापडत नाहीये?" DEMAND REQUEST (Section 4)      */}
      {/* ======================================================== */}
      <section className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700">
            <Store className="w-4 h-4 text-rose-600" />
            <span>{language === 'mr' ? 'स्थानिक दुकानदार थेट मदत करतील' : 'Local Merchant Network'}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight">
            {t('cantFindTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
            {t('cantFindSubtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          {onOpenPostDemand && (
            <button
              onClick={() => onOpenPostDemand()}
              className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('postDemandBtn')}</span>
            </button>
          )}
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('requests')}
              className="w-full sm:w-auto px-4 py-3 text-xs font-bold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>{t('navRequests')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. VERIFIED PHYSICAL MERCHANTS IN KOPARGAON              */}
      {/* ======================================================== */}
      {businesses.length > 0 && (
        <section className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'mr' ? 'कोपरगावमधील प्रमाणित स्थानिक दुकाने' : 'Verified Local Counters & Merchants in Kopargaon'}</span>
            </h3>
            <span className="text-[11px] text-neutral-400 font-mono">
              {language === 'mr' ? 'थेट खरेदी उपलब्ध' : 'Physical Shops'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {businesses.slice(0, 3).map((biz) => (
              <div
                key={biz.id}
                className="p-3.5 bg-white border border-neutral-200 rounded-xl flex items-start gap-3 shadow-xs"
              >
                <div className="p-2 bg-neutral-100 text-neutral-700 rounded-lg text-lg">
                  🏪
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {biz.name}
                    </h4>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs font-medium">
                      {t('verifiedLocalMerchant')}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span>{biz.locality}</span>
                  </p>
                  <p className="text-[10px] text-neutral-400 truncate">
                    {biz.services.join(' · ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

