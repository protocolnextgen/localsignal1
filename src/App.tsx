/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Trend, 
  LocalityInfo, 
  Signal, 
  Business, 
  EvidenceSource, 
  SellerVideo, 
  CustomerDemand, 
  SellerOffer,
  AppExperienceMode 
} from './types';
import { 
  INITIAL_TRENDS, 
  INITIAL_SIGNALS, 
  INITIAL_BUSINESSES, 
  LOCALITIES, 
  INITIAL_EVIDENCE, 
  INITIAL_VIDEOS, 
  INITIAL_DEMANDS 
} from './data/seedData';
import { Navbar } from './components/Navbar';
import { RoleSelectionModal } from './components/RoleSelectionModal';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { CustomerHomeView } from './components/CustomerHomeView';
import { VideoFeedView } from './components/VideoFeedView';
import { SearchView } from './components/SearchView';
import { MyRequestsView } from './components/MyRequestsView';
import { CustomerProfileView } from './components/CustomerProfileView';
import { SellerDashboardView } from './components/SellerDashboardView';
import { SellerPortalView } from './components/SellerPortalView';
import { SellerVideosView } from './components/SellerVideosView';
import { SellerBusinessProfileView } from './components/SellerBusinessProfileView';
import { SellerOpportunitiesView } from './components/SellerOpportunitiesView';
import { IntelligenceSuiteView } from './components/IntelligenceSuiteView';
import { TrendDetailView } from './components/TrendDetailView';
import { SellerProductModal } from './components/SellerProductModal';
import { SellerProfileModal } from './components/SellerProfileModal';
import { PostDemandModal } from './components/PostDemandModal';
import { AddProductVideoModal } from './components/AddProductVideoModal';
import { OpportunityCardModal } from './components/OpportunityCardModal';
import { WalkthroughModal } from './components/WalkthroughModal';
import { LimitationsModal } from './components/LimitationsModal';

export default function App() {
  // ROLE STATE: 'customer' | 'seller' | null (Starts on Role Selection screen)
  const [userRole, setUserRole] = useState<AppExperienceMode | null>(() => {
    return (sessionStorage.getItem('localsignal_role') as AppExperienceMode) || null;
  });
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);

  // Tab state based on active role
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Core Data Collections
  const [trends, setTrends] = useState<Trend[]>(INITIAL_TRENDS);
  const [signals, setSignals] = useState<Signal[]>(INITIAL_SIGNALS);
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [localities] = useState<LocalityInfo[]>(LOCALITIES);
  const [videos, setVideos] = useState<SellerVideo[]>(INITIAL_VIDEOS);
  const [demands, setDemands] = useState<CustomerDemand[]>(INITIAL_DEMANDS);
  const [savedVideos, setSavedVideos] = useState<SellerVideo[]>([INITIAL_VIDEOS[0]]);
  const [evidenceList, setEvidenceList] = useState<EvidenceSource[]>(INITIAL_EVIDENCE);

  // Filters & Selected Items
  const [selectedLocality, setSelectedLocality] = useState<string>('kopargaon-all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTrend, setSelectedTrend] = useState<Trend>(INITIAL_TRENDS[0]);

  // Seller Intelligence View State (Accessed via SELLER -> Opportunities -> View Intelligence)
  const [sellerIntelView, setSellerIntelView] = useState<boolean>(false);
  const [intelActiveSubTab, setIntelActiveSubTab] = useState<'overview' | 'map' | 'evidence' | 'signals' | 'ai-parser'>('overview');

  // Modal Visibility States
  const [selectedVideoModal, setSelectedVideoModal] = useState<SellerVideo | null>(null);
  const [selectedSellerProfile, setSelectedSellerProfile] = useState<Business | null>(null);
  const [isPostDemandOpen, setIsPostDemandOpen] = useState<boolean>(false);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState<boolean>(false);
  const [demandPrefill, setDemandPrefill] = useState<string>('');
  const [isOpportunityCardOpen, setIsOpportunityCardOpen] = useState<boolean>(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState<boolean>(false);
  const [isLimitationsOpen, setIsLimitationsOpen] = useState<boolean>(false);

  // Responding seller state
  const [activeRespondingDemand, setActiveRespondingDemand] = useState<CustomerDemand | null>(null);

  // Load API data on mount / locality switch
  useEffect(() => {
    async function loadData() {
      try {
        const [trendsRes, signalsRes, bizRes, videosRes, demandsRes] = await Promise.all([
          fetch(`/api/trends?locality=${selectedLocality}&category=${selectedCategory}`).then(r => r.json()).catch(() => null),
          fetch(`/api/signals?locality=${selectedLocality}&category=${selectedCategory}`).then(r => r.json()).catch(() => null),
          fetch(`/api/businesses?locality=${selectedLocality}&category=${selectedCategory}`).then(r => r.json()).catch(() => null),
          fetch(`/api/videos?locality=${selectedLocality}&category=${selectedCategory}`).then(r => r.json()).catch(() => null),
          fetch(`/api/demands`).then(r => r.json()).catch(() => null),
        ]);

        if (trendsRes?.trends) setTrends(trendsRes.trends);
        if (signalsRes?.signals) setSignals(signalsRes.signals);
        if (bizRes?.businesses) setBusinesses(bizRes.businesses);
        if (videosRes?.videos) setVideos(videosRes.videos);
        if (demandsRes?.demands) setDemands(demandsRes.demands);
      } catch (err) {
        console.warn('Backend API connection using local state:', err);
      }
    }

    loadData();
  }, [selectedLocality, selectedCategory]);

  // Load evidence for selected trend
  useEffect(() => {
    async function loadEvidence() {
      try {
        const res = await fetch(`/api/evidence/${selectedTrend.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.evidence?.length > 0) {
            setEvidenceList(data.evidence);
            return;
          }
        }
      } catch {
        // Fallback
      }
      const localFiltered = INITIAL_EVIDENCE.filter(e => e.trend_id === selectedTrend.id);
      setEvidenceList(localFiltered.length > 0 ? localFiltered : INITIAL_EVIDENCE);
    }

    loadEvidence();
  }, [selectedTrend]);

  // Search trigger from Home or other views
  const handleInitiateSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentTab('search');
  };

  // Open Demand modal with optional query prefill
  const handleOpenPostDemand = (prefill?: string) => {
    setDemandPrefill(prefill || '');
    setIsPostDemandOpen(true);
  };

  // Submit new customer demand
  const handleCreateDemand = async (newDemandData: Omit<CustomerDemand, 'id' | 'postedAt' | 'status' | 'offers'>) => {
    try {
      const res = await fetch('/api/demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDemandData),
      });
      const data = await res.json();
      if (data?.demand) {
        setDemands(prev => [data.demand, ...prev]);
        setCurrentTab('requests');
        return;
      }
    } catch {
      // Local fallback
    }

    const localDemand: CustomerDemand = {
      ...newDemandData,
      id: `dem-${Date.now()}`,
      postedAt: new Date().toISOString(),
      status: 'Open',
      offers: []
    };
    setDemands(prev => [localDemand, ...prev]);
    setCurrentTab('requests');
  };

  // Seller adds new video reel (Section 12)
  const handleAddVideo = (newVideo: SellerVideo) => {
    setVideos(prev => [newVideo, ...prev]);
  };

  // Seller submits offer to a demand
  const handleAddOffer = async (demandId: string, offerData: Omit<SellerOffer, 'id' | 'createdAt' | 'status'>) => {
    try {
      const res = await fetch(`/api/demands/${demandId}/offers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offerData),
      });
      const data = await res.json();
      if (data?.demand) {
        setDemands(prev => prev.map(d => d.id === demandId ? data.demand : d));
        return;
      }
    } catch {
      // Local fallback
    }

    const newOffer: SellerOffer = {
      ...offerData,
      id: `off-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Active'
    };

    setDemands(prev => prev.map(d => {
      if (d.id === demandId) {
        return {
          ...d,
          status: newOffer.responseType === 'I_HAVE_IT' ? 'Seller Has It' : 'Seller Sourcing',
          offers: [...d.offers, newOffer]
        };
      }
      return d;
    }));
  };

  // Mark demand fulfilled
  const handleMarkDemandFulfilled = async (demandId: string) => {
    try {
      await fetch(`/api/demands/${demandId}/fulfill`, { method: 'POST' });
    } catch {
      // Ignore
    }
    setDemands(prev => prev.map(d => d.id === demandId ? { ...d, status: 'Fulfilled' } : d));
  };

  // Contact seller
  const handleContactSeller = (item: any) => {
    const phone = item.contactPhone || item.contact || '+91 98224 55XXX';
    const name = item.businessName || item.name || 'Local Seller';
    const subject = item.productName || item.productOrService || 'Product Inquiry';
    
    const message = `Hello ${name}, I saw your listing for "${subject}" on LocalSignal Kopargaon. Is it available for inspection/pickup?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Video click handler: Opens Seller/Product Interface (Section 4)
  const handleSelectVideo = (video: SellerVideo) => {
    setSelectedVideoModal(video);
  };

  // Open full Seller Profile
  const handleOpenSellerProfile = (businessId: string) => {
    const biz = businesses.find(b => b.id === businessId) || businesses[0];
    setSelectedVideoModal(null);
    setSelectedSellerProfile(biz);
  };

  // Trend detail selection
  const handleSelectTrend = (trend: Trend) => {
    setSelectedTrend(trend);
    setCurrentTab('detail');
  };

  // Role switcher handler
  const handleSelectRole = (role: AppExperienceMode) => {
    setUserRole(role);
    try {
      sessionStorage.setItem('localsignal_role', role);
    } catch {
      // ignore
    }
    if (role === 'customer') setCurrentTab('home');
    else if (role === 'seller') setCurrentTab('dashboard');
    setIsRoleModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100/50 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Role-Based Top Navigation Bar (Section 2 & 8) */}
      <Navbar
        userRole={userRole}
        setUserRole={handleSelectRole}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedLocality={selectedLocality}
        setSelectedLocality={setSelectedLocality}
        onStartWalkthrough={() => setIsWalkthroughOpen(true)}
        onOpenLimitations={() => setIsLimitationsOpen(true)}
        onOpenPostDemand={() => handleOpenPostDemand()}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        activeRequestsCount={demands.filter(d => d.status !== 'Fulfilled').length}
        openDemandsCount={demands.length}
      />

      {/* Main Viewport or Role Selection Screen */}
      {!userRole ? (
        <RoleSelectionScreen onSelectRole={handleSelectRole} />
      ) : (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ============================================================ */}
        {/* CUSTOMER EXPERIENCE VIEWS (Section 2, 3, 5, 6, 7) */}
        {/* ============================================================ */}
        {userRole === 'customer' && (
          <>
            {currentTab === 'home' && (
              <CustomerHomeView
                videos={videos}
                trends={trends}
                businesses={businesses}
                localities={localities}
                selectedLocality={selectedLocality}
                setSelectedLocality={setSelectedLocality}
                onSearch={handleInitiateSearch}
                onSelectVideo={handleSelectVideo}
                onSelectTrend={handleSelectTrend}
                onOpenPostDemand={handleOpenPostDemand}
                onNavigateToTab={(tab) => setCurrentTab(tab)}
                onContactSeller={handleContactSeller}
              />
            )}

            {currentTab === 'discover' && (
              <VideoFeedView
                videos={videos}
                localities={localities}
                selectedLocality={selectedLocality}
                setSelectedLocality={setSelectedLocality}
                onSelectVideo={handleSelectVideo}
                onContactSeller={handleContactSeller}
                onOpenPostDemand={() => handleOpenPostDemand()}
              />
            )}

            {currentTab === 'search' && (
              <SearchView
                videos={videos}
                businesses={businesses}
                trends={trends}
                initialQuery={searchQuery}
                onSelectVideo={handleSelectVideo}
                onSelectTrend={handleSelectTrend}
                onOpenPostDemand={handleOpenPostDemand}
                onContactSeller={handleContactSeller}
              />
            )}

            {currentTab === 'requests' && (
              <MyRequestsView
                demands={demands}
                onOpenPostDemand={() => handleOpenPostDemand()}
                onAcceptOffer={() => {}}
                onMarkFulfilled={handleMarkDemandFulfilled}
                onContactOfferSeller={handleContactSeller}
              />
            )}

            {currentTab === 'customer-profile' && (
              <CustomerProfileView
                demands={demands}
                savedVideos={savedVideos}
                onSelectVideo={handleSelectVideo}
                onOpenPostDemand={() => handleOpenPostDemand()}
                onSwitchToSeller={() => handleSelectRole('seller')}
              />
            )}
          </>
        )}

        {/* ============================================================ */}
        {/* SELLER / BUSINESS EXPERIENCE VIEWS (Section 8, 9, 10, 11, 12, 13) */}
        {/* ============================================================ */}
        {userRole === 'seller' && (
          <>
            {currentTab === 'dashboard' && (
              <SellerDashboardView
                demands={demands}
                videos={videos}
                businesses={businesses}
                trends={trends}
                onNavigateTab={(tab) => setCurrentTab(tab)}
                onStartResponse={(demand, mode) => {
                  setActiveRespondingDemand(demand);
                  setCurrentTab('demands');
                }}
                onOpenAddVideo={() => setIsAddVideoOpen(true)}
                onSelectTrend={handleSelectTrend}
              />
            )}

            {currentTab === 'demands' && (
              <SellerPortalView
                demands={demands}
                videos={videos}
                businesses={businesses}
                trends={trends}
                localities={localities}
                selectedLocality={selectedLocality}
                setSelectedLocality={setSelectedLocality}
                onAddOffer={handleAddOffer}
                onSelectTrend={handleSelectTrend}
                onOpenVideoModal={handleSelectVideo}
                initialSubTab="demands"
                onSubTabChange={(subTab) => {
                  if (subTab === 'demands') setCurrentTab('demands');
                  else if (subTab === 'videos') setCurrentTab('videos');
                  else if (subTab === 'opportunities') setCurrentTab('opportunities');
                }}
              />
            )}

            {currentTab === 'videos' && (
              <SellerVideosView
                videos={videos}
                onOpenAddVideo={() => setIsAddVideoOpen(true)}
                onSelectVideo={handleSelectVideo}
              />
            )}

            {currentTab === 'opportunities' && (
              <SellerPortalView
                demands={demands}
                videos={videos}
                businesses={businesses}
                trends={trends}
                localities={localities}
                selectedLocality={selectedLocality}
                setSelectedLocality={setSelectedLocality}
                onAddOffer={handleAddOffer}
                onSelectTrend={handleSelectTrend}
                onOpenVideoModal={handleSelectVideo}
                initialSubTab="opportunities"
                focusedTrendId={selectedTrend?.id}
                onSubTabChange={(subTab) => {
                  if (subTab === 'demands') setCurrentTab('demands');
                  else if (subTab === 'videos') setCurrentTab('videos');
                  else if (subTab === 'opportunities') setCurrentTab('opportunities');
                }}
              />
            )}

            {currentTab === 'seller-profile' && (
              <SellerBusinessProfileView
                business={businesses[0]}
                videos={videos}
                onSwitchToCustomer={() => handleSelectRole('customer')}
                onOpenAddVideo={() => setIsAddVideoOpen(true)}
              />
            )}
          </>
        )}

        {/* ============================================================ */}
        {/* LOCALSIGNAL INTELLIGENCE EXPERIENCE VIEWS (Section 6 & 32) */}
        {/* ============================================================ */}
        {userRole === 'intelligence' && (
          <IntelligenceSuiteView
            trends={trends}
            localities={localities}
            selectedLocality={selectedLocality}
            setSelectedLocality={setSelectedLocality}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTrend={selectedTrend}
            onSelectTrend={handleSelectTrend}
            signals={signals}
            businesses={businesses}
            evidenceList={evidenceList}
            onOpenLimitations={() => setIsLimitationsOpen(true)}
            activeSubTab={
              currentTab === 'intel-map' ? 'map' :
              currentTab === 'intel-evidence' ? 'evidence' :
              currentTab === 'intel-signals' ? 'signals' :
              currentTab === 'intel-parser' ? 'ai-parser' :
              'overview'
            }
            onSubTabChange={(tabId) => {
              setCurrentTab(
                tabId === 'map' ? 'intel-map' :
                tabId === 'evidence' ? 'intel-evidence' :
                tabId === 'signals' ? 'intel-signals' :
                tabId === 'ai-parser' ? 'intel-parser' :
                'intel-overview'
              );
            }}
          />
        )}

        {/* SHARED SUB-VIEW: TREND DETAIL */}
        {currentTab === 'detail' && (
          <TrendDetailView
            trend={selectedTrend}
            signals={signals}
            businesses={businesses}
            onBack={() => {
              if (userRole === 'customer') setCurrentTab('home');
              else if (userRole === 'seller') setCurrentTab('opportunities');
              else setCurrentTab('intel-overview');
            }}
            onExploreEvidence={() => {
              if (userRole === 'intelligence') setCurrentTab('intel-evidence');
              else if (userRole === 'seller') setCurrentTab('opportunities');
              else setCurrentTab('home');
            }}
            onViewMap={() => {
              if (selectedTrend) {
                const matchLoc = localities.find(l => l.name === selectedTrend.locality);
                if (matchLoc) {
                  setSelectedLocality(matchLoc.id);
                }
              }
              if (userRole === 'intelligence') {
                setCurrentTab('intel-map');
              } else if (userRole === 'seller') {
                setCurrentTab('opportunities');
                setTimeout(() => {
                  const mapEl = document.getElementById('opportunity-map-section');
                  if (mapEl) {
                    mapEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 150);
              } else {
                setCurrentTab('home');
              }
            }}
            onOpenOpportunityCard={() => setIsOpportunityCardOpen(true)}
          />
        )}
      </main>
      )}

      {/* MODAL 0: ROLE SELECTION ONBOARDING (Section 1) */}
      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        currentRole={userRole}
        onSelectRole={handleSelectRole}
        onClose={() => setIsRoleModalOpen(false)}
      />

      {/* MODAL 1: SELLER / PRODUCT INTERFACE (Section 4) */}
      {selectedVideoModal && (
        <SellerProductModal
          video={selectedVideoModal}
          sellerBusiness={businesses.find(b => b.id === selectedVideoModal.businessId)}
          onClose={() => setSelectedVideoModal(null)}
          onOpenSellerProfile={handleOpenSellerProfile}
          onContactSeller={handleContactSeller}
        />
      )}

      {/* MODAL 2: SELLER PROFILE MODAL */}
      {selectedSellerProfile && (
        <SellerProfileModal
          business={selectedSellerProfile}
          videos={videos}
          onClose={() => setSelectedSellerProfile(null)}
          onSelectVideo={handleSelectVideo}
          onContactSeller={handleContactSeller}
        />
      )}

      {/* MODAL 3: POST CUSTOMER DEMAND (Section 6) */}
      {isPostDemandOpen && (
        <PostDemandModal
          prefillQuery={demandPrefill}
          onClose={() => setIsPostDemandOpen(false)}
          onSubmitDemand={handleCreateDemand}
        />
      )}

      {/* MODAL 4: SELLER UPLOAD VIDEO REEL (Section 12) */}
      {isAddVideoOpen && (
        <AddProductVideoModal
          onClose={() => setIsAddVideoOpen(false)}
          onAddVideo={handleAddVideo}
        />
      )}

      {/* MODAL 5: OPPORTUNITY CARD / BRIEF */}
      {isOpportunityCardOpen && (
        <OpportunityCardModal
          trend={selectedTrend}
          onClose={() => setIsOpportunityCardOpen(false)}
        />
      )}

      {/* MODAL 6: 60-SECOND GUIDED DEMO (Section 40: 3-Part connected demo) */}
      {isWalkthroughOpen && (
        <WalkthroughModal
          onClose={() => setIsWalkthroughOpen(false)}
          onSetRole={(role) => setUserRole(role)}
          onSetTab={(tab) => setCurrentTab(tab)}
          onSearch={(query) => handleInitiateSearch(query)}
          onSelectVideoById={(id) => {
            const v = videos.find(item => item.id === id) || videos[0];
            setSelectedVideoModal(v);
          }}
          onSelectTrendById={(id) => {
            const t = trends.find(item => item.id === id) || trends[0];
            setSelectedTrend(t);
          }}
          onOpenPostDemand={(prefill) => handleOpenPostDemand(prefill)}
        />
      )}

      {/* MODAL 7: METHODOLOGY & LIMITATIONS */}
      {isLimitationsOpen && (
        <LimitationsModal onClose={() => setIsLimitationsOpen(false)} />
      )}

      {/* Minimal Footer */}
      {userRole && (
        <footer className="bg-white border-t border-neutral-200 mt-auto py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-900">LocalSignal</span>
              <span>·</span>
              <span>Local Commerce Discovery & Demand Intelligence Engine</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleSelectRole(userRole === 'customer' ? 'seller' : 'customer')}
                className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors cursor-pointer"
              >
                {userRole === 'customer' ? 'Switch to Seller' : 'Switch to Customer'}
              </button>
              <span>·</span>
              <button
                onClick={() => setIsLimitationsOpen(true)}
                className="hover:text-neutral-900 transition-colors cursor-pointer"
              >
                Methodology & Limitations
              </button>
              <span>·</span>
              <span>Kopargaon Pilot Edition</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
