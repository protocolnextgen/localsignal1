import React from 'react';
import { 
  MapPin, 
  Store, 
  TrendingUp,
  User
} from 'lucide-react';
import { AppExperienceMode } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface NavbarProps {
  userRole: AppExperienceMode | null;
  setUserRole: (role: AppExperienceMode) => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedLocality: string;
  setSelectedLocality: (locality: string) => void;
  onStartWalkthrough?: () => void;
  onOpenLimitations?: () => void;
  onOpenPostDemand?: () => void;
  onOpenRoleModal?: () => void;
  activeRequestsCount?: number;
  openDemandsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  userRole,
  setUserRole,
  currentTab,
  setCurrentTab,
  selectedLocality,
  setSelectedLocality,
  activeRequestsCount = 0,
  openDemandsCount = 0,
}) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      {/* 3-Zone Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Zone 1: Wordmark + Role Tag + Locality */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              if (userRole === 'customer') setCurrentTab('home');
              else if (userRole === 'seller') setCurrentTab('dashboard');
              else setCurrentTab('intel-overview');
            }}
            className="text-left group cursor-pointer"
          >
            <span className="text-xl font-extrabold tracking-tight text-neutral-900 group-hover:text-rose-600 transition-colors">
              LocalSignal
            </span>
          </button>

          {/* Non-Clickable Role Status Indicator & Locality (Only shown after role selection) */}
          {userRole && (
            <>
              <div
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold select-none ${
                  userRole === 'customer'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span>
                  {userRole === 'customer' ? t('customerRole') : t('sellerRole')}
                </span>
              </div>

              <span className="text-neutral-300 hidden sm:inline" aria-hidden="true">|</span>

              {/* Quick Locality Selector */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-700 bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1.5 rounded-lg transition-colors">
                <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <select
                  value={selectedLocality}
                  onChange={(e) => setSelectedLocality(e.target.value)}
                  className="bg-transparent border-none text-xs font-semibold text-neutral-900 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="kopargaon-all">Kopargaon (All Sectors)</option>
                  <option value="highway-junction">SH-10 Highway Junction</option>
                  <option value="town-market">Town Market & Shivaji Chowk</option>
                  <option value="station-road">Station Road & Commute Hub</option>
                  <option value="tilak-nagar">Tilak Nagar & Subhash Rd</option>
                  <option value="bet-kopargaon">Bet Kopargaon (Riverside)</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Zone 2: Navigation Links (DYNAMIC BASED ON ACTIVE EXPERIENCE) + Language Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-sm font-semibold text-neutral-600">
            {userRole === 'customer' && (
              /* CUSTOMER NAVIGATION (Section 13) */
              <>
                <button
                  onClick={() => setCurrentTab('home')}
                  className={`transition-colors cursor-pointer py-1 ${
                    currentTab === 'home'
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  {t('navHome')}
                </button>

                <button
                  onClick={() => setCurrentTab('discover')}
                  className={`transition-colors cursor-pointer py-1 ${
                    currentTab === 'discover'
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  {t('navDiscover')}
                </button>

                <button
                  onClick={() => setCurrentTab('search')}
                  className={`transition-colors cursor-pointer py-1 ${
                    currentTab === 'search'
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  {t('navSearch')}
                </button>

                <button
                  onClick={() => setCurrentTab('requests')}
                  className={`transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                    currentTab === 'requests'
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  <span>{t('navRequests')}</span>
                  {activeRequestsCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                      {activeRequestsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentTab('customer-profile')}
                  className={`transition-colors cursor-pointer py-1 flex items-center gap-1 ${
                    currentTab === 'customer-profile'
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t('navProfile')}</span>
                </button>

                {/* One: Switch to Seller */}
                <button
                  onClick={() => {
                    setUserRole('seller');
                    setCurrentTab('dashboard');
                  }}
                  className="ml-1 px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                >
                  {t('switchToSeller')}
                </button>
              </>
            )}

            {userRole === 'seller' && (
              /* SELLER / BUSINESS NAVIGATION (Section 13) */
              <>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className={`transition-colors cursor-pointer py-1 ${
                    currentTab === 'dashboard'
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  {t('navDashboard')}
                </button>

                <button
                  onClick={() => setCurrentTab('demands')}
                  className={`transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                    currentTab === 'demands'
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  <span>{t('navDemands')}</span>
                  {openDemandsCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                      {openDemandsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentTab('videos')}
                  className={`transition-colors cursor-pointer py-1 ${
                    currentTab === 'videos'
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  {t('navMyVideos')}
                </button>

                <button
                  onClick={() => setCurrentTab('opportunities')}
                  className={`transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                    currentTab === 'opportunities' || currentTab === 'detail'
                      ? 'text-rose-700 font-bold border-b-2 border-rose-600'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
                  <span>{t('navOpportunities')}</span>
                </button>

                <button
                  onClick={() => setCurrentTab('seller-profile')}
                  className={`transition-colors cursor-pointer py-1 flex items-center gap-1 ${
                    currentTab === 'seller-profile'
                      ? 'text-neutral-900 font-bold border-b-2 border-neutral-900'
                      : 'hover:text-neutral-900'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>{t('navProfile')}</span>
                </button>

                {/* One: Switch to Customer */}
                <button
                  onClick={() => {
                    setUserRole('customer');
                    setCurrentTab('home');
                  }}
                  className="ml-1 px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
                >
                  {t('switchToCustomer')}
                </button>
              </>
            )}
          </nav>

          {/* One: Language Toggle (Visible in Header on All Screens) */}
          <LanguageToggle />
        </div>
      </div>

      {/* Mobile Nav Sub-Bar */}
      {userRole && (
        <div className="lg:hidden flex items-center justify-around px-2 py-2 border-t border-neutral-100 bg-neutral-50/90 text-xs font-medium text-neutral-600 overflow-x-auto gap-1">
          {userRole === 'customer' && (
            <>
              <button
                onClick={() => setCurrentTab('home')}
                className={`px-2 py-1 rounded-sm whitespace-nowrap ${currentTab === 'home' ? 'text-neutral-900 font-bold bg-white shadow-xs' : ''}`}
              >
                {t('navHome')}
              </button>
              <button
                onClick={() => setCurrentTab('discover')}
                className={`px-2 py-1 rounded-sm whitespace-nowrap ${currentTab === 'discover' ? 'text-neutral-900 font-bold bg-white shadow-xs' : ''}`}
              >
                {t('navDiscover')}
              </button>
              <button
                onClick={() => setCurrentTab('search')}
                className={`px-2 py-1 rounded-sm whitespace-nowrap ${currentTab === 'search' ? 'text-neutral-900 font-bold bg-white shadow-xs' : ''}`}
              >
                {t('navSearch')}
              </button>
              <button
                onClick={() => setCurrentTab('requests')}
                className={`px-2 py-1 rounded-sm whitespace-nowrap ${currentTab === 'requests' ? 'text-neutral-900 font-bold bg-white shadow-xs' : ''}`}
              >
                {t('navRequests')} ({activeRequestsCount})
              </button>
              <button
                onClick={() => setCurrentTab('customer-profile')}
                className={`px-2 py-1 rounded-sm whitespace-nowrap ${currentTab === 'customer-profile' ? 'text-neutral-900 font-bold bg-white shadow-xs' : ''}`}
              >
                {t('navProfile')}
              </button>
              <button
                onClick={() => {
                  setUserRole('seller');
                  setCurrentTab('dashboard');
                }}
                className="px-2 py-1 rounded-sm whitespace-nowrap text-rose-700 font-bold bg-rose-50 border border-rose-200"
              >
                {t('switchToSeller')}
              </button>
            </>
          )}

          {userRole === 'seller' && (
            <>
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`px-2 py-1 rounded-sm whitespace-nowrap ${currentTab === 'dashboard' ? 'text-neutral-900 font-bold bg-white shadow-xs' : ''}`}
              >
                {t('navDashboard')}
              </button>
              <button
                onClick={() => setCurrentTab('demands')}
                className={`px-2 py-1 rounded-sm whitespace-nowrap ${currentTab === 'demands' ? 'text-neutral-900 font-bold bg-white shadow-xs' : ''}`}
              >
                {t('navDemands')} ({openDemandsCount})
              </button>
              <button
                onClick={() => setCurrentTab('videos')}
                className={`px-2 py-1 rounded-sm whitespace-nowrap ${currentTab === 'videos' ? 'text-neutral-900 font-bold bg-white shadow-xs' : ''}`}
              >
                {t('navMyVideos')}
              </button>
              <button
                onClick={() => setCurrentTab('opportunities')}
                className={`px-2 py-1 rounded-sm whitespace-nowrap text-rose-700 font-bold ${currentTab === 'opportunities' || currentTab === 'detail' ? 'bg-white shadow-xs' : ''}`}
              >
                {t('navOpportunities')}
              </button>
              <button
                onClick={() => setCurrentTab('seller-profile')}
                className={`px-2 py-1 rounded-sm whitespace-nowrap ${currentTab === 'seller-profile' ? 'text-neutral-900 font-bold bg-white shadow-xs' : ''}`}
              >
                {t('navProfile')}
              </button>
              <button
                onClick={() => {
                  setUserRole('customer');
                  setCurrentTab('home');
                }}
                className="px-2 py-1 rounded-sm whitespace-nowrap text-blue-700 font-bold bg-blue-50 border border-blue-200"
              >
                {t('switchToCustomer')}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

