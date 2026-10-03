import React from 'react';
import { SellerVideo } from '../types';
import { PlusCircle, Eye, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SellerVideosViewProps {
  videos: SellerVideo[];
  onOpenAddVideo: () => void;
  onSelectVideo: (video: SellerVideo) => void;
}

export const SellerVideosView: React.FC<SellerVideosViewProps> = ({
  videos,
  onOpenAddVideo,
  onSelectVideo,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <section className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <span>{language === 'mr' ? 'व्हिडिओ व्यवस्थापन' : 'Video Commerce Management'}</span>
            <span>·</span>
            <span>Royal Step Footwear</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 mt-1">
            {t('navMyVideos')}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
            {language === 'mr'
              ? 'कोपरगावमधील ग्राहकांना तुमच्या उत्पादनांचे १५-३० सेकंदांचे थेट व्हिडिओ दिसतात.'
              : 'Short demonstration clips broadcast to buyers on the Customer Local Discover feed in Kopargaon.'}
          </p>
        </div>

        <button
          onClick={onOpenAddVideo}
          className="px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{language === 'mr' ? '+ व्हिडिओ जोडा' : '+ Add Product Video Reel'}</span>
        </button>
      </section>

      {/* Notice */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          <strong>{language === 'mr' ? 'थेट ग्राहकांना दिसणारे:' : 'Live in Local Feed:'}</strong>{' '}
          {language === 'mr' 
            ? 'येथे अपलोड केलेले सर्व व्हिडिओ कोपरगावमधील ग्राहकांना थेट दिसतात.'
            : 'All reels uploaded here are immediately playable by local customers shopping in Kopargaon.'}
        </span>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {videos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => onSelectVideo(vid)}
            className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className={`aspect-[9/14] bg-gradient-to-br ${vid.videoColor} p-3 flex flex-col justify-between text-white relative select-none`}>
              <div className="flex justify-between items-center text-[10px]">
                <span className="bg-black/40 px-2 py-0.5 rounded-full font-mono">
                  {vid.videoDuration}
                </span>
                <span className="bg-rose-600 px-1.5 py-0.5 rounded-full font-bold">
                  {language === 'mr' ? 'सक्रिय' : 'ACTIVE'}
                </span>
              </div>

              <div className="text-4xl text-center my-auto group-hover:scale-110 transition-transform">
                {vid.thumbnailUrl}
              </div>

              <div className="space-y-0.5 z-10">
                <div className="font-bold text-xs leading-snug line-clamp-2">
                  {vid.productName}
                </div>
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="font-extrabold text-rose-300">{vid.price}</span>
                  <span className="text-[10px] text-neutral-300 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{vid.viewsCount} {language === 'mr' ? 'पाहिले' : 'views'}</span>
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div className="p-3 bg-white space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span className="truncate">{vid.locality}</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs">
                  {vid.availability === 'In Stock' 
                    ? t('availInStock') 
                    : vid.availability === 'Available Today' 
                    ? t('availToday') 
                    : vid.availability}
                </span>
              </div>
              <p className="text-neutral-600 text-[11px] line-clamp-2 italic">
                "{vid.description}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
