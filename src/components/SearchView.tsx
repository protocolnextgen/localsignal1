import React, { useState } from 'react';
import { SellerVideo, Business, Trend } from '../types';
import { 
  Search as SearchIcon, 
  MapPin, 
  Store, 
  Play, 
  ArrowRight, 
  PlusCircle, 
  CheckCircle, 
  AlertCircle,
  Phone,
  MessageCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SearchViewProps {
  videos: SellerVideo[];
  businesses: Business[];
  trends: Trend[];
  initialQuery?: string;
  onSelectVideo: (video: SellerVideo) => void;
  onSelectTrend: (trend: Trend) => void;
  onOpenPostDemand: (prefillQuery?: string) => void;
  onContactSeller: (item: any) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  videos,
  businesses,
  trends,
  initialQuery = '',
  onSelectVideo,
  onSelectTrend,
  onOpenPostDemand,
  onContactSeller,
}) => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState(
    initialQuery || (language === 'mr' ? '1500 रुपयांच्या आत काळे फॉर्मल शूज' : 'black formal shoes under ₹1500')
  );

  // Parse natural query parameters (Category, Topic, Maximum Budget) - Bilingual English / Marathi / Hinglish
  const parseQueryFilters = (rawQuery: string) => {
    const q = rawQuery.toLowerCase();
    
    // Extract budget limit: e.g. "under 1500", "under ₹1500", "<= 1500", "1500 tak", "1500 मध्ये", "1500 रुपयांच्या आत", "1500 पर्यंत"
    const budgetMatch = 
      q.match(/(?:under|below|upto|<=|budget|tak|मध्ये|आत|पर्यंत)\s*(?:₹|rs\.?|inr|रुपये|रुपयांच्या)?\s*(\d+)/i) ||
      q.match(/(\d+)\s*(?:₹|rs\.?|inr|रुपये|रुपयांच्या|रू)?\s*(?:च्या\s*आत|मध्ये|पर्यंत|tak|under|below)/i) ||
      q.match(/(?:₹|rs\.?|inr|रू)\s*(\d+)/i);
    const maxBudget = budgetMatch ? parseInt(budgetMatch[1], 10) : null;

    // Detect target category / domain keywords
    let targetCategory: string | null = null;
    let targetDomain: string | null = null;

    if (
      /\b(shoe|shoes|derby|footwear|oxford|loafers|boots|sandals|formal)\b/i.test(q) ||
      /(शूज|बूट|चप्पल|पादत्राणे|काळे|काळा|फॉर्मल|shoes|shoe)/i.test(q)
    ) {
      targetCategory = 'Retail';
      targetDomain = 'footwear';
    } else if (
      /\b(badminton|racquet|racket|shuttlecock|restringing|sports|cricket)\b/i.test(q) ||
      /(बॅडमिंटन|रॅकेट|शटलकॉक|क्रीडा)/i.test(q)
    ) {
      targetCategory = 'Retail';
      targetDomain = 'sports';
    } else if (
      /\b(phone|cover|covers|case|cases|tempered|mobile|screen guard)\b/i.test(q) ||
      /(फोन|मोबाईल|कव्हर|स्क्रीन गार्ड)/i.test(q)
    ) {
      targetCategory = 'Retail';
      targetDomain = 'mobile';
    } else if (
      /\b(ev|charging|charger|adapter|electric vehicle|socket|battery)\b/i.test(q) ||
      /(ईव्ही|चार्जिंग|बॅटरी)/i.test(q)
    ) {
      targetCategory = 'Transport';
      targetDomain = 'ev';
    } else if (
      /\b(ac|air conditioner|cooling|refrigeration|servicing|cleaning|jet pump)\b/i.test(q) ||
      /(एसी|सर्व्हिसिंग|दुरुस्ती|गॅस)/i.test(q)
    ) {
      targetCategory = 'Services';
      targetDomain = 'ac';
    } else if (
      /\b(breakfast|millet|thali|food|sprouts|snacks|meals|bhakri)\b/i.test(q) ||
      /(नाश्ता|मिलेट|कडधान्य|अन्न|जेवण)/i.test(q)
    ) {
      targetCategory = 'Food';
      targetDomain = 'food';
    }

    // Significant content tokens (filtering out stopwords & budget phrases)
    const stopWords = new Set([
      'under', 'below', 'upto', 'for', 'with', 'the', 'and', 'near', 'tak', 'liye', 'bhai', 
      'in', 'at', 'to', 'a', 'an', 'is', 'of', 'me', 'ke', 'ka', 'ki', '₹',
      'च्या', 'आत', 'मध्ये', 'पर्यंत', 'रुपये', 'रुपयांच्या', 'रुपया', 'मला', 'पाहिजे', 'पाहिजेत', 'हवे', 'आहे', 'sathi', 'pahije'
    ]);
    const contentTokens = q
      .replace(/[^\w\s₹\u0900-\u097F]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 1 && !stopWords.has(w) && !/^\d+$/.test(w));

    return { maxBudget, targetCategory, targetDomain, contentTokens };
  };

  const { maxBudget, targetCategory, targetDomain, contentTokens } = parseQueryFilters(query);

  const parseItemPrice = (priceStr: string): number | null => {
    const num = priceStr.replace(/[^\d]/g, '');
    return num ? parseInt(num, 10) : null;
  };

  const matchedVideos = videos.filter((v) => {
    if (!query.trim()) return true;

    // Strict Category Match: If a clear category or domain is specified in query, do not show items from other categories
    if (targetCategory && v.category !== targetCategory) {
      return false;
    }

    // Domain consistency check
    const videoText = `${v.productName} ${v.description} ${v.businessName} ${v.category} ${v.locality}`.toLowerCase();
    
    if (targetDomain === 'footwear') {
      const isFootwear = /\b(shoe|shoes|derby|footwear|loafers|oxford|leather)\b/i.test(videoText);
      if (!isFootwear) return false;
    } else if (targetDomain === 'ev') {
      const isEV = /\b(ev|charging|charger|socket|electric)\b/i.test(videoText);
      if (!isEV) return false;
    } else if (targetDomain === 'ac') {
      const isAC = /\b(ac|air condition|coil|cooling|servicing)\b/i.test(videoText);
      if (!isAC) return false;
    } else if (targetDomain === 'food') {
      const isFood = /\b(breakfast|millet|thali|sprouts|bhakri|food)\b/i.test(videoText);
      if (!isFood) return false;
    } else if (targetDomain === 'sports') {
      const isSports = /\b(badminton|racquet|racket|shuttlecock|restringing|sports)\b/i.test(videoText);
      if (!isSports) return false;
    }

    // Budget Limit check
    if (maxBudget !== null) {
      const itemPrice = parseItemPrice(v.price);
      if (itemPrice !== null && itemPrice > maxBudget) {
        return false;
      }
    }

    // Content tokens match
    if (contentTokens.length > 0) {
      const matchesAtLeastOne = contentTokens.some(token => videoText.includes(token));
      if (!matchesAtLeastOne) return false;
    }

    return true;
  });

  const matchedBusinesses = businesses.filter((b) => {
    if (!query.trim()) return true;
    if (targetCategory && b.category !== targetCategory) return false;
    const bizText = `${b.name} ${b.services.join(' ')} ${b.category} ${b.locality}`.toLowerCase();
    if (contentTokens.length > 0) {
      return contentTokens.some(token => bizText.includes(token));
    }
    return true;
  });

  // Check if there is an unmet demand or opportunity matching query
  const matchingTrend = trends.find((t) => {
    if (!query.trim()) return false;
    const trendText = `${t.topic} ${t.category} ${t.locality}`.toLowerCase();
    if (targetCategory && t.category !== targetCategory) return false;
    return contentTokens.some(term => trendText.includes(term));
  });

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <section className="bg-white border border-neutral-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            {language === 'mr' ? 'स्थानिक शोध' : 'Local Discovery Search'}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">
            {t('searchTitle')}
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            {t('searchSubtitle')}
          </p>
        </div>

        {/* Input */}
        <div className="relative flex items-center shadow-xs rounded-xl overflow-hidden bg-neutral-50 border border-neutral-300 focus-within:border-neutral-900 focus-within:bg-white transition-all">
          <SearchIcon className="w-5 h-5 absolute left-4 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-12 pr-4 py-3.5 text-sm font-medium text-neutral-900 bg-transparent focus:outline-none placeholder:text-neutral-400"
          />
        </div>

        {/* Pre-fill query chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-neutral-400 font-medium">{language === 'mr' ? 'उदा:' : 'Try searches:'}</span>
          {(language === 'mr' ? [
            '1500 रुपयांच्या आत काळे फॉर्मल शूज',
            'हायवेजवळ ईव्ही चार्जिंग',
            'सकाळचा पौष्टिक नाश्ता',
            'बॅडमिंटन रॅकेट रिस्ट्रिंगिंग',
            'स्प्लिट एसी सर्व्हिसिंग'
          ] : [
            'black formal shoes under ₹1500',
            'EV Charging near highway',
            'Healthy morning breakfast',
            'Yonex badminton racquet',
            'Split AC servicing'
          ]).map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              className={`px-2.5 py-1 rounded-full border text-xs cursor-pointer transition-colors ${
                query === chip
                  ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-neutral-200'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <div className="space-y-6">
        {/* If an emerging opportunity/gap exists for this search, show contextual callout */}
        {matchingTrend && matchingTrend.opportunity_gap === 'High' && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-950 font-bold block">
                  {language === 'mr' ? `${matchingTrend.topic} साठी जास्त स्थानिक मागणी` : `High Local Demand for ${matchingTrend.topic}`}
                </strong>
                <p className="text-rose-900 mt-0.5">
                  {matchingTrend.supply_details.statement} {language === 'mr' ? 'जवळच्या दुकानात न सापडल्यास थेट मागणी नोंदवा.' : 'If you cannot find a suitable shop or item, you can request it directly from nearby sellers.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenPostDemand(matchingTrend.topic)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold whitespace-nowrap cursor-pointer shadow-xs self-start sm:self-auto flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t('postDemandForThis')}</span>
            </button>
          </div>
        )}

        {/* Matched Products / Seller Videos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900 tracking-tight flex items-center gap-2">
              <span>{t('matchingProducts')}</span>
              <span className="text-xs text-neutral-500 font-normal font-mono">
                ({matchedVideos.length} {language === 'mr' ? 'वस्तू' : 'matching items'})
              </span>
            </h2>
          </div>

          {matchedVideos.length === 0 ? (
            <div className="p-8 bg-white border border-neutral-200 rounded-xl text-center space-y-4">
              <Store className="w-8 h-8 text-neutral-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-900">
                  {t('noResultsFound')} "{query}"
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto">
                  {t('noResultsDesc')}
                </p>
              </div>

              {/* POST DEMAND FALLBACK */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenPostDemand(query)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{t('postDemandForThis')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedVideos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => onSelectVideo(vid)}
                  className="p-4 bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl shadow-xs hover:shadow-sm transition-all cursor-pointer flex gap-4 group"
                >
                  {/* Left: Video thumbnail */}
                  <div className={`w-24 sm:w-28 aspect-[9/14] rounded-lg overflow-hidden bg-gradient-to-br ${vid.videoColor} p-2 flex flex-col justify-between text-white shrink-0 relative group-hover:scale-102 transition-transform`}>
                    <span className="text-[10px] bg-black/50 px-1.5 py-0.5 rounded-full font-mono self-start">
                      {vid.videoDuration}
                    </span>
                    <div className="text-2xl text-center my-auto filter drop-shadow-sm">
                      {vid.thumbnailUrl}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center mx-auto">
                      <Play className="w-3 h-3 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Right: Info & Actions */}
                  <div className="flex-1 flex flex-col justify-between py-1 text-xs space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-neutral-500">
                        <span className="font-semibold text-neutral-700 truncate max-w-[140px]">
                          {vid.businessName}
                        </span>
                        <span className="font-mono text-neutral-400">{vid.distance}</span>
                      </div>

                      <h3 className="text-sm font-bold text-neutral-900 group-hover:text-rose-600 transition-colors mt-0.5 leading-snug">
                        {vid.productName}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-base font-extrabold text-rose-600">
                          {vid.price}
                        </span>
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-xs text-[10px]">
                          {vid.availability === 'In Stock' 
                            ? t('availInStock') 
                            : vid.availability === 'Available Today' 
                            ? t('availToday') 
                            : vid.availability}
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-600 mt-1 line-clamp-2 italic">
                        "{vid.description}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-neutral-500 text-[11px] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-neutral-400" />
                        {vid.locality}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectVideo(vid);
                        }}
                        className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>{t('watchReel')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ALWAYS PRESENT "CAN'T FIND WHAT YOU NEED?" BANNER */}
        <section className="bg-neutral-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white">
              {t('cantFindTitle')}
            </h3>
            <p className="text-xs text-neutral-300">
              {t('cantFindSubtitle')}
            </p>
          </div>

          <button
            onClick={() => onOpenPostDemand(query)}
            className="px-5 py-2.5 text-xs font-bold text-neutral-900 bg-white hover:bg-neutral-100 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-rose-600" />
            <span>{t('postDemandBtn')}</span>
          </button>
        </section>
      </div>
    </div>
  );
};
