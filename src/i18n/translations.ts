export type Language = 'en' | 'mr';

export interface Translations {
  // App branding
  appName: string;
  tagline: string;
  
  // Navigation & Role Badges
  customerRole: string;
  sellerRole: string;
  navHome: string;
  navDiscover: string;
  navSearch: string;
  navRequests: string;
  navProfile: string;
  navDashboard: string;
  navDemands: string;
  navMyVideos: string;
  navOpportunities: string;
  switchToSeller: string;
  switchToCustomer: string;
  
  // Role Selection Screen
  roleSelectionTitle: string;
  roleSelectionSubtitle: string;
  cardCustomerTitle: string;
  cardCustomerDesc: string;
  cardCustomerPoints: string[];
  cardCustomerBtn: string;
  cardSellerTitle: string;
  cardSellerDesc: string;
  cardSellerPoints: string[];
  cardSellerBtn: string;
  roleSwitchFooterNote: string;

  // Customer Home
  trendingTitle: string;
  trendingSubtitle: string;
  trendingDisclaimer: string;
  trendingProductsTitle: string;
  sellerReelsTitle: string;
  sellerReelsSubtitle: string;
  searchSectionTitle: string;
  searchSectionSubtitle: string;
  searchPlaceholder: string;
  searchBtn: string;
  cantFindTitle: string;
  cantFindSubtitle: string;
  postDemandBtn: string;
  browsingIn: string;
  allCategories: string;
  
  // Search View
  searchTitle: string;
  searchSubtitle: string;
  matchingProducts: string;
  noResultsFound: string;
  noResultsDesc: string;
  postDemandForThis: string;
  filterByBudget: string;
  contactSeller: string;
  viewDetails: string;
  watchReel: string;
  
  // Demand Request Form
  demandFormTitle: string;
  demandFormSubtitle: string;
  whatDoYouNeed: string;
  whatDoYouNeedPlaceholder: string;
  detailsLabel: string;
  detailsPlaceholder: string;
  budgetLabel: string;
  budgetPlaceholder: string;
  locationLabel: string;
  quantityLabel: string;
  quantityPlaceholder: string;
  neededByLabel: string;
  categoryLabel: string;
  sendDemandBtn: string;
  cancelBtn: string;
  demandSuccess: string;
  demandSuccessDesc: string;

  // Request Statuses
  statusOpen: string;
  statusMatched: string;
  statusFulfilled: string;
  statusExpired: string;
  
  // Seller Responses & Availability
  sellerResponseIHaveIt: string;
  sellerResponseICanSourceIt: string;
  availToday: string;
  availInStock: string;
  availLimitedStock: string;
  availExpected: string;
  offersReceived: string;
  noOffersYet: string;
  callSeller: string;
  chatWhatsApp: string;
  markFulfilled: string;
  
  // Seller Dashboard & Views
  sellerDashboardTitle: string;
  sellerDashboardSubtitle: string;
  customerDemandsTitle: string;
  emergingDemandTitle: string;
  emergingDemandSub: string;
  opportunityGapTitle: string;
  opportunityGapSub: string;
  respondToDemand: string;
  sendOfferBtn: string;
  offeredPriceLabel: string;
  availabilityDateLabel: string;
  yourNoteLabel: string;
  activeDemandsCount: string;
  unansweredDemands: string;
  
  // Intelligence terms (simple marathi sub-labels)
  trendStrengthSub: string;
  signalConvergenceSub: string;
  
  // Profile
  profileTitle: string;
  customerAccountLabel: string;
  sellerAccountLabel: string;
  activeExperienceCustomer: string;
  activeExperienceSeller: string;
  switchRoleNoteCustomer: string;
  switchRoleNoteSeller: string;
  
  // General UI
  close: string;
  back: string;
  verifiedLocalMerchant: string;
  allSectors: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'LocalSignal',
    tagline: 'Hyperlocal Commerce & Demand Engine',
    
    customerRole: '🛍️ Customer',
    sellerRole: '🏪 Seller',
    navHome: 'Home',
    navDiscover: 'Discover',
    navSearch: 'Search',
    navRequests: 'My Requests',
    navProfile: 'Profile',
    navDashboard: 'Dashboard',
    navDemands: 'Demands',
    navMyVideos: 'My Videos',
    navOpportunities: 'Opportunities',
    switchToSeller: 'Switch to Seller',
    switchToCustomer: 'Switch to Customer',
    
    roleSelectionTitle: 'How do you want to continue?',
    roleSelectionSubtitle: 'Choose how you want to use LocalSignal.',
    cardCustomerTitle: 'CUSTOMER',
    cardCustomerDesc: 'Discover what’s trending and find what you need nearby.',
    cardCustomerPoints: [
      'Browse local trending products/services',
      'Watch local seller Reels',
      'Search nearby products/services',
      'Post a demand when you cannot find something',
    ],
    cardCustomerBtn: 'CONTINUE AS CUSTOMER →',
    cardSellerTitle: 'SELLER / BUSINESS',
    cardSellerDesc: 'Discover local demand and grow your business.',
    cardSellerPoints: [
      'See customer demands',
      'Respond to requests',
      'Upload product Reels',
      'Discover emerging local opportunities',
      'Check demand and supply gaps',
    ],
    cardSellerBtn: 'CONTINUE AS SELLER →',
    roleSwitchFooterNote: 'Switch between Customer and Seller anytime.',

    trendingTitle: 'What’s trending in Kopargaon?',
    trendingSubtitle: 'See what local people are searching and asking for.',
    trendingDisclaimer: 'Trending means local attention and inquiry activity, not confirmed purchase intent.',
    trendingProductsTitle: 'Trending Products & Services',
    sellerReelsTitle: 'Local Seller Reels',
    sellerReelsSubtitle: 'Watch 15-30s product showcases from verified Kopargaon merchants.',
    searchSectionTitle: 'Looking for something specific?',
    searchSectionSubtitle: 'Search local shops, inventory items, or services nearby.',
    searchPlaceholder: 'Search nearby products or services...',
    searchBtn: 'Search',
    cantFindTitle: 'Can’t find what you need?',
    cantFindSubtitle: 'Post a request. Verified Kopargaon merchants will check stock or source it for you.',
    postDemandBtn: 'Post Demand',
    browsingIn: 'Browsing in:',
    allCategories: 'All',

    searchTitle: 'Local Product & Video Search',
    searchSubtitle: 'Find verified merchandise and video reels from nearby Kopargaon merchants.',
    matchingProducts: 'Matching Products & Reels',
    noResultsFound: 'No exact matches found nearby',
    noResultsDesc: 'Local merchants might not have cataloged this item online yet. You can post a demand request directly!',
    postDemandForThis: 'Post Demand for this Item',
    filterByBudget: 'Budget filter applied',
    contactSeller: 'Contact Seller',
    viewDetails: 'View Details',
    watchReel: 'Watch Video',

    demandFormTitle: 'Post a Demand Request',
    demandFormSubtitle: 'Tell local merchants what you are looking for. They will check stock and respond directly.',
    whatDoYouNeed: 'What do you need?',
    whatDoYouNeedPlaceholder: 'e.g. Black formal shoes under ₹1500, AC gas refill, etc.',
    detailsLabel: 'Details / Specifications',
    detailsPlaceholder: 'Size, model, color preference or details...',
    budgetLabel: 'Budget (₹)',
    budgetPlaceholder: 'e.g. ₹1,500',
    locationLabel: 'Your Location / Ward',
    quantityLabel: 'Quantity',
    quantityPlaceholder: 'e.g. 1 pair, 2 units',
    neededByLabel: 'Needed by date',
    categoryLabel: 'Category',
    sendDemandBtn: 'Send Request',
    cancelBtn: 'Cancel',
    demandSuccess: 'Demand Posted Successfully!',
    demandSuccessDesc: 'Local merchants in Kopargaon have been notified and will respond if available.',

    statusOpen: 'Open',
    statusMatched: 'Matched',
    statusFulfilled: 'Fulfilled',
    statusExpired: 'Expired',

    sellerResponseIHaveIt: 'I HAVE IT',
    sellerResponseICanSourceIt: 'I CAN SOURCE IT',
    availToday: 'Available Today',
    availInStock: 'In Stock',
    availLimitedStock: 'Limited Stock',
    availExpected: 'Expected in 2-3 Days',
    offersReceived: 'Offers Received',
    noOffersYet: 'Waiting for local seller responses...',
    callSeller: 'Call',
    chatWhatsApp: 'WhatsApp',
    markFulfilled: 'Mark as Received',

    sellerDashboardTitle: 'Seller Hub & Demands',
    sellerDashboardSubtitle: 'Track customer inquiry signals, respond to local product requests, and grow your shop.',
    customerDemandsTitle: 'Customer Demands',
    emergingDemandTitle: 'Emerging Local Demand',
    emergingDemandSub: 'Local demand is rising',
    opportunityGapTitle: 'Opportunity Gap',
    opportunityGapSub: 'High demand, limited local supply',
    respondToDemand: 'Respond to Demand',
    sendOfferBtn: 'Send Offer to Customer',
    offeredPriceLabel: 'Offered Price (₹)',
    availabilityDateLabel: 'When is it available?',
    yourNoteLabel: 'Note for customer',
    activeDemandsCount: 'Active Customer Demands',
    unansweredDemands: 'Unanswered Demands',

    trendStrengthSub: 'How fast demand is growing',
    signalConvergenceSub: 'Same demand detected across multiple local sources',

    profileTitle: 'Profile & Account',
    customerAccountLabel: 'Customer Account',
    sellerAccountLabel: 'Seller / Business Account',
    activeExperienceCustomer: 'Active Experience: Customer',
    activeExperienceSeller: 'Active Experience: Seller',
    switchRoleNoteCustomer: 'Switch to manage your local shop profile, respond to customer demands, and post videos.',
    switchRoleNoteSeller: 'To browse local shops, watch seller reels, or post customer requests, switch to Customer mode.',

    close: 'Close',
    back: 'Back',
    verifiedLocalMerchant: 'Verified Local Merchant',
    allSectors: 'Kopargaon (All Sectors)'
  },
  mr: {
    appName: 'LocalSignal',
    tagline: 'स्थानिक बाजारपेठ आणि मागणी शोध प्रणाली',
    
    customerRole: '🛍️ ग्राहक',
    sellerRole: '🏪 विक्रेता',
    navHome: 'मुख्यपृष्ठ',
    navDiscover: 'शोधा / नवीन पहा',
    navSearch: 'शोध',
    navRequests: 'माझ्या मागण्या',
    navProfile: 'प्रोफाइल',
    navDashboard: 'डॅशबोर्ड',
    navDemands: 'ग्राहकांच्या मागण्या',
    navMyVideos: 'माझे व्हिडिओ',
    navOpportunities: 'व्यवसायाच्या संधी',
    switchToSeller: 'विक्रेता मोड',
    switchToCustomer: 'ग्राहक मोड',
    
    roleSelectionTitle: 'तुम्ही पुढे कसे जायचे आहे?',
    roleSelectionSubtitle: 'तुम्ही लोकलसिग्नल कसे वापरू इच्छिता ते निवडा.',
    cardCustomerTitle: 'ग्राहक',
    cardCustomerDesc: 'कोपरगावमध्ये काय ट्रेंडिंग आहे ते पाहा आणि जवळ काय उपलब्ध आहे ते शोधा.',
    cardCustomerPoints: [
      'स्थानिक ट्रेंडिंग उत्पादने आणि सेवा पहा',
      'जवळच्या दुकानदारांचे व्हिडिओ पहा',
      'जवळची उत्पादने किंवा सेवा शोधा',
      'हवी ती वस्तू न सापडल्यास मागणी नोंदवा',
    ],
    cardCustomerBtn: 'ग्राहक म्हणून पुढे जा →',
    cardSellerTitle: 'विक्रेता / व्यवसाय',
    cardSellerDesc: 'ग्राहकांची स्थानिक मागणी ओळखा आणि तुमचा व्यवसाय वाढवा.',
    cardSellerPoints: [
      'ग्राहकांच्या थेट मागण्या पहा',
      'मागणीला थेट प्रतिसाद द्या',
      'उत्पादनांचे व्हिडिओ रिल्स अपलोड करा',
      'नवीन व्यावसायिक संधी शोधा',
      'मागणी आणि पुरवठ्यातील फरक तपासा',
    ],
    cardSellerBtn: 'विक्रेता म्हणून पुढे जा →',
    roleSwitchFooterNote: 'कधीही ग्राहक आणि विक्रेता मोड दरम्यान बदला.',

    trendingTitle: 'कोपरगावमध्ये काय ट्रेंडिंग आहे?',
    trendingSubtitle: 'लोक सध्या काय शोधत आहेत आणि काय पाहत आहेत ते पहा.',
    trendingDisclaimer: 'ट्रेंडिंग म्हणजे स्थानिक लोकांचे लक्ष आणि चौकशी वाढत आहे; याचा अर्थ खरेदी निश्चित आहे असे नाही.',
    trendingProductsTitle: 'ट्रेंडिंग उत्पादने आणि सेवा',
    sellerReelsTitle: 'जवळच्या दुकानदारांचे व्हिडिओ',
    sellerReelsSubtitle: 'कोपरगावमधील स्थानिक दुकानदारांचे १५-३० सेकंदांचे व्हिडिओ पहा.',
    searchSectionTitle: 'काही विशिष्ट वस्तू हवी आहे?',
    searchSectionSubtitle: 'जवळच्या दुकानांमध्ये उपलब्ध वस्तू किंवा सेवा शोधा.',
    searchPlaceholder: 'जवळचे उत्पादन किंवा सेवा शोधा...',
    searchBtn: 'शोधा',
    cantFindTitle: 'हवे ते सापडत नाहीये?',
    cantFindSubtitle: 'मागणी नोंदवा. कोपरगावमधील स्थानिक व्यापारी उपलब्ध स्टॉक तपासून तुम्हाला प्रतिसाद देतील.',
    postDemandBtn: 'मागणी नोंदवा',
    browsingIn: 'स्थान:',
    allCategories: 'सर्व',

    searchTitle: 'स्थानिक उत्पादने आणि व्हिडिओ शोध',
    searchSubtitle: 'जवळच्या कोपरगाव दुकानदारांची उत्पादने आणि व्हिडिओ शोधा.',
    matchingProducts: 'मिळालेली उत्पादने व व्हिडिओ',
    noResultsFound: 'जवळच्या दुकानांमध्ये ही वस्तू सापडली नाही',
    noResultsDesc: 'दुकानदारांनी हे उत्पादन अद्याप ऑनलाइन नोंदवले नसेल. तुम्ही थेट मागणी नोंदवू शकता!',
    postDemandForThis: 'या वस्तूसाठी मागणी नोंदवा',
    filterByBudget: 'बजेट मर्यादा लागू केली',
    contactSeller: 'विक्रेत्याशी संपर्क करा',
    viewDetails: 'माहिती पहा',
    watchReel: 'व्हिडिओ पहा',

    demandFormTitle: 'नवीन मागणी नोंदवा',
    demandFormSubtitle: 'तुम्हाला नेमके काय हवे आहे ते सांगा. स्थानिक दुकानदार स्टॉक तपासून थेट प्रतिसाद देतील.',
    whatDoYouNeed: 'तुम्हाला काय हवे आहे?',
    whatDoYouNeedPlaceholder: 'उदा. १५०० रुपयांच्या आत काळे फॉर्मल शूज, एसी गॅस रिफिल...',
    detailsLabel: 'थोडक्यात माहिती',
    detailsPlaceholder: 'आकार, रंग किंवा इतर तपशील...',
    budgetLabel: 'बजेट (₹)',
    budgetPlaceholder: 'उदा. ₹१,५००',
    locationLabel: 'ठिकाण',
    quantityLabel: 'किती हवे?',
    quantityPlaceholder: 'उदा. १ जोडी, २ नग',
    neededByLabel: 'कधीपर्यंत हवे?',
    categoryLabel: 'विभाग (वर्गवारी)',
    sendDemandBtn: 'मागणी पाठवा',
    cancelBtn: 'रद्द करा',
    demandSuccess: 'मागणी यशस्वीपणे नोंदवली गेली!',
    demandSuccessDesc: 'कोपरगावमधील दुकानदारांना माहिती पाठवली आहे, उपलब्ध असल्यास ते लवकरच प्रतिसाद देतील.',

    statusOpen: 'उघडी मागणी',
    statusMatched: 'विक्रेत्याशी जुळले',
    statusFulfilled: 'पूर्ण झाले',
    statusExpired: 'कालबाह्य',

    sellerResponseIHaveIt: 'माझ्याकडे आहे',
    sellerResponseICanSourceIt: 'मी मिळवून देतो',
    availToday: 'आज उपलब्ध',
    availInStock: 'स्टॉकमध्ये उपलब्ध',
    availLimitedStock: 'मर्यादित स्टॉक',
    availExpected: '२-३ दिवसात उपलब्ध होईल',
    offersReceived: 'प्राप्त झालेले प्रतिसाद',
    noOffersYet: 'स्थानिक दुकानदारांच्या प्रतिसादाची प्रतीक्षा आहे...',
    callSeller: 'कॉल करा',
    chatWhatsApp: 'व्हॉट्सॲप',
    markFulfilled: 'वस्तू मिळाली (पूर्ण करा)',

    sellerDashboardTitle: 'विक्रेता डॅशबोर्ड व मागण्या',
    sellerDashboardSubtitle: 'ग्राहकांच्या मागण्या पहा, त्वरित प्रतिसाद द्या आणि तुमचा स्थानिक व्यवसाय वाढवा.',
    customerDemandsTitle: 'ग्राहकांच्या मागण्या',
    emergingDemandTitle: 'स्थानिक मागणी वाढत आहे',
    emergingDemandSub: 'स्थानिक मागणी वाढत आहे',
    opportunityGapTitle: 'मागणी जास्त, उपलब्धता कमी',
    opportunityGapSub: 'मागणी जास्त, उपलब्ध स्थानिक पुरवठा कमी',
    respondToDemand: 'मागणीला प्रतिसाद द्या',
    sendOfferBtn: 'ग्राहकाला ऑफर पाठवा',
    offeredPriceLabel: 'ऑफर किंमत (₹)',
    availabilityDateLabel: 'कधीपर्यंत देऊ शकता?',
    yourNoteLabel: 'ग्राहकासाठी संदेश',
    activeDemandsCount: 'सक्रिय ग्राहकांच्या मागण्या',
    unansweredDemands: 'नवीन मागण्या',

    trendStrengthSub: 'मागणी किती वेगाने वाढत आहे',
    signalConvergenceSub: 'वेगवेगळ्या स्रोतांमधून समान मागणी दिसते',

    profileTitle: 'प्रोफाइल',
    customerAccountLabel: 'ग्राहक खाते',
    sellerAccountLabel: 'विक्रेता / व्यवसाय खाते',
    activeExperienceCustomer: 'चालू मोड: ग्राहक',
    activeExperienceSeller: 'चालू मोड: विक्रेता',
    switchRoleNoteCustomer: 'स्थानिक दुकान व्यवस्थापित करण्यासाठी आणि ग्राहकांच्या मागण्यांना उत्तर देण्यासाठी विक्रेता मोड वापरा.',
    switchRoleNoteSeller: 'जवळच्या दुकानांमधील वस्तू पाहण्यासाठी किंवा मागणी नोंदवण्यासाठी ग्राहक मोड वापरा.',

    close: 'बंद करा',
    back: 'मागे',
    verifiedLocalMerchant: 'प्रमाणित स्थानिक व्यापारी',
    allSectors: 'कोपरगाव (सर्व परिसर)'
  }
};
