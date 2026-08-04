import {
  Listing,
  Category,
  Product,
  BlogPost,
  User,
  BloggerProfile,
  WithdrawalRequest,
  ClickLog,
  AdBanner,
  SiteSettings,
  ListingReview,
  BlogComment
} from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'tube',
    name: 'Tube Sites',
    slug: 'tube-sites',
    iconName: 'Tv',
    description: 'Top free tube platforms with massive HD video libraries and fast streaming.',
    listingCount: 3840,
    isFeatured: true
  },
  {
    id: 'premium',
    name: 'Premium Sites',
    slug: 'premium-sites',
    iconName: 'Sparkles',
    description: 'Exclusive, studio-quality 4K adult streaming channels and membership networks.',
    listingCount: 2150,
    isFeatured: true
  },
  {
    id: 'ai-girls',
    name: 'AI Sites',
    slug: 'ai-sites',
    iconName: 'Bot',
    description: 'Interactive AI companion platforms, virtual girlfriends, voice chat & image generation.',
    listingCount: 1420,
    isFeatured: true
  },
  {
    id: 'cams',
    name: 'Live Cam Sites',
    slug: 'live-cams',
    iconName: 'Video',
    description: 'Interactive live webcam broad-casters with private 2-way chat and interactive toys.',
    listingCount: 1980,
    isFeatured: true
  },
  {
    id: 'vr',
    name: 'VR Sites',
    slug: 'vr-sites',
    iconName: 'Glasses',
    description: 'Ultra immersive 180° & 360° virtual reality 8K video experiences and interactive sims.',
    listingCount: 950,
    isFeatured: true
  },
  {
    id: 'dating',
    name: 'Dating',
    slug: 'dating',
    iconName: 'Heart',
    description: 'Verified hookup networks, casual adult dating apps, and local encounter matching.',
    listingCount: 1670,
    isFeatured: true
  },
  {
    id: 'games',
    name: 'Games',
    slug: 'games',
    iconName: 'Gamepad2',
    description: 'Interactive 3D adult games, visual novels, virtual RPGs, and browser games.',
    listingCount: 880,
    isFeatured: true
  },
  {
    id: 'onlyfans',
    name: 'OnlyFans Models',
    slug: 'onlyfans-models',
    iconName: 'Star',
    description: 'Top trending independent creators, exclusive model feeds, and VIP subscriptions.',
    listingCount: 2900,
    isFeatured: true
  },
  {
    id: 'toys',
    name: 'Toys',
    slug: 'toys-gear',
    iconName: 'ShoppingBag',
    description: 'Teledildonic smart toys, male strokers, luxury vibrators, and interactive gear.',
    listingCount: 1120,
    isFeatured: true
  },
  {
    id: 'vpn',
    name: 'VPN',
    slug: 'vpn',
    iconName: 'ShieldCheck',
    description: 'High-speed encrypted VPNs tailored for fast stream unlocking and private browsing.',
    listingCount: 420,
    isFeatured: true
  },
  {
    id: 'hentai',
    name: 'Hentai',
    slug: 'hentai',
    iconName: 'Flame',
    description: 'High quality anime adult streaming, manga readers, doujinshi, and animated series.',
    listingCount: 1310,
    isFeatured: false
  },
  {
    id: 'products',
    name: 'Adult Products',
    slug: 'adult-products',
    iconName: 'Gift',
    description: 'Lingerie, romantic gift sets, wellness products, and intimacy accessories.',
    listingCount: 850,
    isFeatured: false
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'lst-1',
    name: 'Pornhub Premium',
    slug: 'pornhub-premium',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&h=380&q=80',
    description: 'The world\'s largest adult streaming network with ad-free 4K Ultra HD videos, offline downloads, and exclusive studio channels.',
    fullDescription: 'Pornhub Premium is the undisputed industry giant offering unlimited ad-free access to over 500,000 full-length premium movies, 4K UHD streaming, fast cloud servers, and offline mobile synchronization across all desktop and mobile devices.',
    categoryId: 'premium',
    categoryName: 'Premium Sites',
    subCategories: ['4K UHD', 'Ad-Free', 'Studio Exclusive'],
    rating: 4.9,
    editorScore: 98,
    userRatingCount: 14250,
    primaryAffiliateUrl: 'https://example.com/aff/ph-premium?ref=ypg',
    secondaryAffiliateUrl: 'https://example.com/aff/ph-trial?ref=ypg',
    secondaryAffiliateLabel: '7-Day Free Trial',
    pros: ['Massive 4K HD library updated daily', 'Completely ad-free experience with fast servers', 'Cross-platform mobile apps with offline mode', 'Includes exclusive performer channels'],
    cons: ['Subscription required for premium tier', 'Requires account registration'],
    tags: ['4K', 'HD Streaming', 'No Ads', 'Official Studio', 'Mobile App'],
    gallery: [
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&h=450&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&h=450&q=80'
    ],
    popularityScore: 99,
    isSponsored: true,
    isVerified: true,
    isApproved: true,
    dateAdded: '2026-01-10',
    pricingType: 'Freemium',
    websiteUrl: 'https://pornhub.com'
  },
  {
    id: 'lst-2',
    name: 'Candy AI',
    slug: 'candy-ai',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&h=380&q=80',
    description: 'Next-gen hyper-realistic AI girlfriend companion generator with custom voice notes, adaptive chat personalities, and instant image generation.',
    fullDescription: 'Candy AI leads the AI adult companion revolution with unmatched conversational AI models, customizable anime and realistic avatars, voice messaging, dynamic roleplay modes, and private uncensored photo generation on demand.',
    categoryId: 'ai-girls',
    categoryName: 'AI Sites',
    subCategories: ['AI Girlfriend', 'Voice Chat', 'Image Generator'],
    rating: 4.8,
    editorScore: 96,
    userRatingCount: 8930,
    primaryAffiliateUrl: 'https://example.com/aff/candy-ai?ref=ypg',
    secondaryAffiliateUrl: 'https://example.com/aff/candy-discount?ref=ypg',
    secondaryAffiliateLabel: 'Get 20% Off',
    pros: ['Uncensored natural voice messaging and photorealistic image generation', 'Highly responsive, memory-retentive AI personality', 'Custom character creation wizard', 'Strict privacy and instant account setup'],
    cons: ['Image generation requires premium credits', 'High server load during peak hours'],
    tags: ['AI Companion', 'Voice Chat', 'Uncensored', 'Custom Avatars', 'Roleplay'],
    gallery: [
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&h=450&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&h=450&q=80'
    ],
    popularityScore: 97,
    isSponsored: true,
    isVerified: true,
    isApproved: true,
    dateAdded: '2026-02-15',
    pricingType: 'Freemium',
    websiteUrl: 'https://candy.ai'
  },
  {
    id: 'lst-3',
    name: 'Brazzers Premium',
    slug: 'brazzers-premium',
    logoUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&h=380&q=80',
    description: 'Iconic adult video studio featuring world famous performers, 10,000+ full HD scenes, high budget comedy parodies, and daily releases.',
    fullDescription: 'Brazzers remains the flagship name in adult entertainment with unmatched production value, exclusive contract superstars, crystal clear 4K VR streaming, and high bitrate video downloads.',
    categoryId: 'premium',
    categoryName: 'Premium Sites',
    subCategories: ['Studio Exclusive', 'Parody', '4K Ultra HD'],
    rating: 4.8,
    editorScore: 95,
    userRatingCount: 11200,
    primaryAffiliateUrl: 'https://example.com/aff/brazzers?ref=ypg',
    secondaryAffiliateUrl: 'https://example.com/aff/brazzers-deal?ref=ypg',
    secondaryAffiliateLabel: 'Claim $1 Promo Trial',
    pros: ['Industry leading production budget and talent', '10,000+ exclusive full length scenes', 'Ultra high bitrate 4K video downloads', 'Weekly exclusive performer series'],
    cons: ['Paid membership required for full access', 'Aggressive account security check'],
    tags: ['Brazzers', '4K Studio', 'HD Videos', 'Parodies', 'Superstars'],
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&h=450&q=80'
    ],
    popularityScore: 98,
    isSponsored: false,
    isVerified: true,
    isApproved: true,
    dateAdded: '2026-01-05',
    pricingType: 'Subscription',
    websiteUrl: 'https://brazzers.com'
  },
  {
    id: 'lst-4',
    name: 'Stripchat',
    slug: 'stripchat',
    logoUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&h=380&q=80',
    description: 'Interactive live webcam network with 10,000+ active broadcasters, Lovense teledildonics integration, group shows, and free HD chat.',
    fullDescription: 'Stripchat offers cutting edge live cam entertainment with interactive bluetooth toy controls, high definition free stream viewing, private 1-on-1 rooms, tip menus, and mobile device optimization.',
    categoryId: 'cams',
    categoryName: 'Live Cam Sites',
    subCategories: ['Teledildonics', 'Group Shows', 'Free HD Cams'],
    rating: 4.7,
    editorScore: 94,
    userRatingCount: 9400,
    primaryAffiliateUrl: 'https://example.com/aff/stripchat?ref=ypg',
    secondaryAffiliateUrl: 'https://example.com/aff/stripchat-tokens?ref=ypg',
    secondaryAffiliateLabel: 'Get 50 Free Tokens',
    pros: ['Full Lovense smart toy interactive integration', 'Tens of thousands of live models online 24/7', 'Free HD preview streams', 'Instant anonymous token top-up'],
    cons: ['Private chat consumes tokens rapidly', 'Varying internet connection per model'],
    tags: ['Live Cam', 'Lovense Toys', 'HD Video', 'Interactive Chat', 'Couples Cams'],
    gallery: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&h=450&q=80'
    ],
    popularityScore: 96,
    isSponsored: false,
    isVerified: true,
    isApproved: true,
    dateAdded: '2026-01-18',
    pricingType: 'Freemium',
    websiteUrl: 'https://stripchat.com'
  },
  {
    id: 'lst-5',
    name: 'SexLikeReal (SLR VR)',
    slug: 'sexlikereal-vr',
    logoUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&h=380&q=80',
    description: 'The ultimate VR adult video platform supporting Quest 3, Vision Pro, PSVR2, and PCVR in native 60fps / 120fps 8K 180° 3D.',
    fullDescription: 'SexLikeReal is the reigning king of VR adult entertainment, hosting thousands of high-definition 60fps/120fps 180° and 360° VR videos compatible with all modern headsets and haptic feedback devices.',
    categoryId: 'vr',
    categoryName: 'VR Sites',
    subCategories: ['8K VR', 'PassThrough', 'Haptics Compatible'],
    rating: 4.9,
    editorScore: 99,
    userRatingCount: 5210,
    primaryAffiliateUrl: 'https://example.com/aff/slr-vr?ref=ypg',
    secondaryAffiliateUrl: 'https://example.com/aff/slr-app?ref=ypg',
    secondaryAffiliateLabel: 'Download DeoVR App',
    pros: ['Native 8K resolution at buttery smooth 60fps/120fps', 'Haptic feedback integration with Handy & Keon devices', 'Pass-through AR video playback mode', 'Seamless app available on Oculus Store'],
    cons: ['Requires VR headset for best experience', 'High internet bandwidth recommended'],
    tags: ['Virtual Reality', '8K 3D', 'Quest 3', 'DeoVR Player', 'Haptics'],
    gallery: [
      'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&h=450&q=80'
    ],
    popularityScore: 95,
    isSponsored: true,
    isVerified: true,
    isApproved: true,
    dateAdded: '2026-02-01',
    pricingType: 'Freemium',
    websiteUrl: 'https://sexlikereal.com'
  },
  {
    id: 'lst-6',
    name: 'AdultFriendFinder',
    slug: 'adultfriendfinder',
    logoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&h=380&q=80',
    description: 'The world\'s largest open-minded adult dating & casual encounter network with over 80 million active members worldwide.',
    fullDescription: 'AdultFriendFinder connects open-minded singles, couples, and swingers with local adult dating profiles, chatrooms, webcam broadcasts, and location-based matching algorithms.',
    categoryId: 'dating',
    categoryName: 'Dating',
    subCategories: ['Casual Hookups', 'Swinger Network', 'Local Matching'],
    rating: 4.6,
    editorScore: 92,
    userRatingCount: 18200,
    primaryAffiliateUrl: 'https://example.com/aff/aff-dating?ref=ypg',
    secondaryAffiliateUrl: 'https://example.com/aff/aff-free-signup?ref=ypg',
    secondaryAffiliateLabel: 'Free Member Signup',
    pros: ['Massive member base in almost every region', 'Diverse search filters including preferences & locations', 'Live member webcams and blogs included', 'Strict account verification options'],
    cons: ['Interface feels slightly dated', 'Requires gold membership to message freely'],
    tags: ['Adult Dating', 'Casual Hookups', 'Swinger Club', 'Local Singles', 'Group Chat'],
    gallery: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&h=450&q=80'
    ],
    popularityScore: 94,
    isSponsored: false,
    isVerified: true,
    isApproved: true,
    dateAdded: '2026-01-02',
    pricingType: 'Freemium',
    websiteUrl: 'https://adultfriendfinder.com'
  },
  {
    id: 'lst-7',
    name: 'NordVPN Adult Shield',
    slug: 'nordvpn-adult-shield',
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&h=380&q=80',
    description: 'Ultra fast encrypted VPN with Threat Protection, strict no-logs guarantee, and 6,000+ servers to bypass geo-blocks seamlessly.',
    fullDescription: 'NordVPN secures your adult browsing privacy with RAM-only servers, Double VPN encryption, automatic Kill Switch protection, and ultra fast NordLynx protocol optimized for 4K adult video streaming.',
    categoryId: 'vpn',
    categoryName: 'VPN',
    subCategories: ['No-Logs', '4K Stream Optimized', 'Double Encryption'],
    rating: 4.9,
    editorScore: 97,
    userRatingCount: 22100,
    primaryAffiliateUrl: 'https://example.com/aff/nordvpn?ref=ypg',
    secondaryAffiliateUrl: 'https://example.com/aff/nordvpn-70off?ref=ypg',
    secondaryAffiliateLabel: 'Get 70% Off + 3 Months Extra',
    pros: ['Blazing fast NordLynx speeds for 4K streaming', 'Strict audited no-logs policy and kill switch', 'Unlocks geo-restricted adult content globally', 'Supports 10 simultaneous device connections'],
    cons: ['Slightly higher monthly pricing if paid monthly'],
    tags: ['VPN', 'Privacy', 'No Logs', 'Fast Streaming', 'Geo Unblocker'],
    gallery: [
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&h=450&q=80'
    ],
    popularityScore: 97,
    isSponsored: true,
    isVerified: true,
    isApproved: true,
    dateAdded: '2026-01-12',
    pricingType: 'Subscription',
    websiteUrl: 'https://nordvpn.com'
  },
  {
    id: 'lst-8',
    name: 'WildLife 3D Games',
    slug: 'wildlife-3d-games',
    logoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&h=380&q=80',
    description: 'High budget Unreal Engine 5 adult RPG game featuring custom character editing, deep branching storylines, and real-time interactive physics.',
    fullDescription: 'WildLife Studios sets the standard in 3D adult gaming with breathtaking ray-traced visuals, interactive motion capture animations, sandbox customization, and regular expansion updates.',
    categoryId: 'games',
    categoryName: 'Games',
    subCategories: ['3D RPG', 'Unreal Engine 5', 'Sandbox'],
    rating: 4.7,
    editorScore: 93,
    userRatingCount: 6800,
    primaryAffiliateUrl: 'https://example.com/aff/wildlife-game?ref=ypg',
    secondaryAffiliateUrl: 'https://example.com/aff/wildlife-patreon?ref=ypg',
    secondaryAffiliateLabel: 'Join Developer Patreon',
    pros: ['Unreal Engine 5 physics and photorealistic graphics', 'Deep character design and clothing customization', 'Frequent monthly content updates and quests', 'Cross-platform PC and Mac support'],
    cons: ['Requires dedicated graphics card for high settings'],
    tags: ['Adult Game', '3D RPG', 'UE5', 'Character Creator', 'PC Game'],
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&h=450&q=80'
    ],
    popularityScore: 92,
    isSponsored: false,
    isVerified: true,
    isApproved: true,
    dateAdded: '2026-02-10',
    pricingType: 'Paid',
    websiteUrl: 'https://wildlifegame.com'
  },
  {
    id: 'lst-9',
    name: 'Hanime.tv',
    slug: 'hanime-tv',
    logoUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&h=380&q=80',
    description: 'The world\'s top hentai anime streaming portal with 1080p uncensored downloads, multi-language subtitles, and vast category archives.',
    fullDescription: 'Hanime.tv is the most trusted source for adult anime streaming, offering ultra-crisp 1080p video playback, active community comments, bookmarking playlists, and mobile apps.',
    categoryId: 'hentai',
    categoryName: 'Hentai',
    subCategories: ['1080p HD', 'Subtitled', 'Uncensored'],
    rating: 4.8,
    editorScore: 95,
    userRatingCount: 12800,
    primaryAffiliateUrl: 'https://example.com/aff/hanime-tv?ref=ypg',
    secondaryAffiliateUrl: 'https://example.com/aff/hanime-premium?ref=ypg',
    secondaryAffiliateLabel: 'Get Premium No-Ads',
    pros: ['Extensive archive of dubbed and subbed hentai series', '1080p 60fps video player with fast CDN', 'Custom playlists and favorite lists', 'Active community forums and rating system'],
    cons: ['Free tier displays advertisement banners'],
    tags: ['Hentai', 'Anime', 'Uncensored', 'Subtitled', '1080p'],
    gallery: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&h=450&q=80'
    ],
    popularityScore: 96,
    isSponsored: false,
    isVerified: true,
    isApproved: true,
    dateAdded: '2026-01-20',
    pricingType: 'Freemium',
    websiteUrl: 'https://hanime.tv'
  },
  {
    id: 'lst-10',
    name: 'OnlyFans Top VIP Models',
    slug: 'onlyfans-top-vip-models',
    logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=380&q=80',
    description: 'Curated directory of the top 0.1% verified OnlyFans models offering discounted subscription links, free trial passes, and private custom content.',
    fullDescription: 'Our OnlyFans directory showcases top-tier independent creators, verified social media icons, cosplay stars, and fitness models with daily updated promotion codes.',
    categoryId: 'onlyfans',
    categoryName: 'OnlyFans Models',
    subCategories: ['Top 0.1%', 'Verified Models', 'Discount Promos'],
    rating: 4.9,
    editorScore: 96,
    userRatingCount: 15400,
    primaryAffiliateUrl: 'https://example.com/aff/onlyfans-dir?ref=ypg',
    secondaryAffiliateUrl: 'https://example.com/aff/of-free-trials?ref=ypg',
    secondaryAffiliateLabel: 'Claim Free Trial Passes',
    pros: ['Hand-verified 0.1% top creator listings', 'Daily active promo discounts up to 80% off', 'Direct messaging and custom request guides', 'Preview video clips and picture galleries'],
    cons: ['Individual creator subscription fees apply'],
    tags: ['OnlyFans', 'Independent Models', 'Cosplay', 'VIP Feeds', 'Discount Link'],
    gallery: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&h=450&q=80'
    ],
    popularityScore: 98,
    isSponsored: true,
    isVerified: true,
    isApproved: true,
    dateAdded: '2026-02-05',
    pricingType: 'Subscription',
    websiteUrl: 'https://onlyfans.com'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'The Handy Interactive Automator',
    slug: 'the-handy-interactive-automator',
    price: 199.00,
    originalPrice: 249.00,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&h=600&q=80',
    description: 'The world\'s most popular Wi-Fi synchronized automatic male stroker. Syncs with VR videos and live interactive cam shows.',
    category: 'Adult Toys',
    affiliateUrl: 'https://example.com/aff/shop-handy?ref=ypg',
    rating: 4.9,
    reviewCount: 1840,
    isPopular: true,
    isFeatured: true,
    brand: 'SweetTech Norway'
  },
  {
    id: 'prod-2',
    name: 'Lovense Max 2 Teledildonics Stroker',
    slug: 'lovense-max-2-stroker',
    price: 149.00,
    originalPrice: 179.00,
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&h=600&q=80',
    description: 'App-controlled dual suction and vibration stroker designed for long-distance partner control and webcam site synchronization.',
    category: 'Adult Toys',
    affiliateUrl: 'https://example.com/aff/shop-lovense?ref=ypg',
    rating: 4.8,
    reviewCount: 1250,
    isPopular: true,
    isFeatured: true,
    brand: 'Lovense'
  },
  {
    id: 'prod-3',
    name: 'Silk & Satin Luxury Lingerie Set',
    slug: 'silk-satin-luxury-lingerie-set',
    price: 68.50,
    originalPrice: 89.00,
    imageUrl: 'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=600&h=600&q=80',
    description: 'Elegant lace trim dark satin teddy with adjustable straps and luxury sheer robe for romantic evenings.',
    category: 'Lingerie',
    affiliateUrl: 'https://example.com/aff/shop-lingerie?ref=ypg',
    rating: 4.7,
    reviewCount: 620,
    isPopular: false,
    isFeatured: true,
    brand: 'Amore Noir'
  },
  {
    id: 'prod-4',
    name: 'Kama Sutra Deluxe Romantic Gift Box',
    slug: 'kama-sutra-deluxe-romantic-gift-box',
    price: 45.00,
    originalPrice: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&h=600&q=80',
    description: 'Includes aromatic massage oils, honey dust, body paint, and silk blindfold packaged in a velvet collector box.',
    category: 'Accessories',
    affiliateUrl: 'https://example.com/aff/shop-kamasutra?ref=ypg',
    rating: 4.9,
    reviewCount: 940,
    isPopular: true,
    isFeatured: false,
    brand: 'Kama Sutra Co.'
  },
  {
    id: 'prod-5',
    name: 'ExpressVPN 12-Month Security Router Box',
    slug: 'expressvpn-hardware-box',
    price: 129.99,
    originalPrice: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&h=600&q=80',
    description: 'Pre-configured home Wi-Fi security router with built-in hardware VPN encryption for all smart TVs, VR headsets, and smartphones.',
    category: 'VPN',
    affiliateUrl: 'https://example.com/aff/shop-expressvpn?ref=ypg',
    rating: 4.8,
    reviewCount: 410,
    isPopular: false,
    isFeatured: true,
    brand: 'ExpressVPN'
  },
  {
    id: 'prod-6',
    name: 'Meta Quest 3 VR 128GB Headset',
    slug: 'meta-quest-3-vr-headset',
    price: 499.00,
    originalPrice: 549.00,
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&h=600&q=80',
    description: 'Next generation pancake lens VR headset with color passthrough and native 120Hz 4K-per-eye resolution for VR adult streaming.',
    category: 'Streaming Devices',
    affiliateUrl: 'https://example.com/aff/shop-quest3?ref=ypg',
    rating: 4.9,
    reviewCount: 3100,
    isPopular: true,
    isFeatured: true,
    brand: 'Meta'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Ultimate Guide to AI Companions in 2026: Candy AI vs Character AI',
    slug: 'ultimate-guide-ai-companions-2026',
    excerpt: 'An in-depth comparison of top uncensored AI girlfriend platforms, custom personality engines, voice quality, and image generation speeds.',
    content: `
# The Revolution of AI Companions in 2026

Artificial intelligence has transformed virtual intimacy over the past few years. Modern AI companion platforms now feature **persistent neural memory**, natural emotional understanding, and photorealistic multi-modal output.

## Key Features to Look For
When selecting an AI companion platform in 2026, consider these essential factors:

1. **Uncensored Natural Language Processing**: Freedom to express roleplay scenarios without restrictive filters.
2. **Adaptive Memory Retention**: The companion remembers key preferences, user history, and personal anecdotes across sessions.
3. **Voice & Image Synthesis**: Instant generation of realistic audio notes and context-aware photos.

## Top Contenders Breakdown

### Candy AI
Candy AI remains the benchmark for raw realism and custom character editing. Users can define specific personality traits, outfit styles, and voice tones.

### Character & AI Companions
Other notable platforms focus on anime-style visual novels and interactive fantasy worlds.

## Conclusion
Whether you seek casual banter or deep virtual companionship, 2026 offers options tailored to every user preference.
    `,
    coverImageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&h=450&q=80',
    category: 'AI',
    tags: ['AI Girlfriends', 'Technology', 'Candy AI', 'Reviews', 'Guides'],
    authorId: 'usr-blogger-1',
    authorName: 'Alex Mercer',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    authorRole: 'Senior Tech & AI Reviewer',
    publishedAt: '2026-07-28',
    readTimeMinutes: 6,
    views: 14200,
    uniqueClicks: 1850,
    likes: 420,
    shares: 88,
    commentsCount: 15,
    status: 'published',
    isFeatured: true,
    seoTitle: 'Best AI Companions & Uncensored AI Girlfriend Apps 2026',
    metaDescription: 'Compare the top AI companion platforms in 2026. Detailed reviews of Candy AI, voice chat quality, and uncensored image generators.'
  },
  {
    id: 'blog-2',
    title: 'Top 5 VR Adult Platforms Tested for Meta Quest 3 & Vision Pro',
    slug: 'top-5-vr-adult-platforms-tested',
    excerpt: 'We tested 8K 120fps video playback, haptic device sync, and passthrough AR on the newest VR headsets.',
    content: `
# Experiencing Virtual Reality Adult Streaming in 8K

Virtual reality adult content has reached peak immersion with 8K 180° stereoscopic rendering and haptic response synchronization.

## Headset Performance Overview
* **Meta Quest 3**: Crisp pancake lenses and zero screendoor effect.
* **Apple Vision Pro**: Outstanding micro-OLED panel contrast with hand-tracking controls.

## Platform Rankings
1. **SexLikeReal**: Leading video repository with native haptic device integration.
2. **VRCosplayX**: Highly specialized fantasy roleplay VR experiences.

## How to Set Up Haptic Feedback
Connect your favorite teledildonic stroker via Bluetooth through DeoVR or the SLR native application to match stroke speed directly to video motion.
    `,
    coverImageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&h=450&q=80',
    category: 'Reviews',
    tags: ['VR', 'Meta Quest 3', '8K Video', 'SexLikeReal', 'Haptics'],
    authorId: 'usr-blogger-1',
    authorName: 'Alex Mercer',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    authorRole: 'Senior Tech & AI Reviewer',
    publishedAt: '2026-08-01',
    readTimeMinutes: 5,
    views: 9800,
    uniqueClicks: 1240,
    likes: 310,
    shares: 64,
    commentsCount: 9,
    status: 'published',
    isFeatured: true,
    seoTitle: 'Best VR Adult Sites 2026 - Tested on Quest 3 & Vision Pro',
    metaDescription: 'Discover top VR adult streaming platforms with 8K stereoscopic support and haptic device synchronization.'
  },
  {
    id: 'blog-3',
    title: 'How to Protect Your Adult Browsing Privacy: VPN vs Encrypted DNS',
    slug: 'protect-adult-browsing-privacy-vpn-guide',
    excerpt: 'Learn how ISP tracking works and how to shield your IP address using audited no-logs VPN services.',
    content: `
# Digital Privacy Guide for Private Browsing

Your Internet Service Provider (ISP) and public Wi-Fi operators can log your DNS requests and visit history unless encrypted properly.

## Why Standard Incognito Mode Isn't Enough
Incognito mode only clears your local browser history. It does **NOT** hide your IP address from your ISP or network administrator.

## Step-by-Step Privacy Setup
1. **Choose a Verified No-Logs VPN**: Look for independent audits from PwC or Deloitte.
2. **Enable Kill Switch**: Automatically cuts internet access if the VPN connection drops.
3. **Use Encrypted DNS (DoH/DoT)**: Prevents DNS leaking to third party resolvers.
    `,
    coverImageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&h=450&q=80',
    category: 'Tutorials',
    tags: ['VPN', 'Privacy', 'Security', 'NordVPN', 'Guides'],
    authorId: 'usr-blogger-2',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    authorRole: 'Cybersecurity & Privacy Specialist',
    publishedAt: '2026-08-02',
    readTimeMinutes: 4,
    views: 7400,
    uniqueClicks: 920,
    likes: 245,
    shares: 42,
    commentsCount: 6,
    status: 'published',
    isFeatured: false,
    seoTitle: 'Adult Browsing Privacy & VPN Setup Guide 2026',
    metaDescription: 'Keep your adult web browsing private with audited no-logs VPNs and DNS encryption.'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-visitor-1',
    name: 'Guest Visitor',
    email: 'guest@yourpornguy.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    role: 'visitor',
    bloggerStatus: 'none',
    createdAt: '2026-08-01'
  },
  {
    id: 'usr-blogger-1',
    name: 'Alex Mercer',
    email: 'alex.mercer@blogger.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    role: 'blogger',
    bloggerStatus: 'approved',
    bio: 'Tech journalist, AI enthusiast, and adult industry analyst.',
    createdAt: '2026-06-15'
  },
  {
    id: 'usr-blogger-pending',
    name: 'Marcus Vance',
    email: 'marcus.vance@creator.org',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
    role: 'blogger',
    bloggerStatus: 'pending',
    bio: 'Adult gaming reviewer and VR hardware test pilot.',
    createdAt: '2026-08-03'
  },
  {
    id: 'usr-admin-1',
    name: 'YPG System Admin',
    email: 'admin@yourpornguy.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    role: 'admin',
    bloggerStatus: 'approved',
    bio: 'Platform Operations Director',
    createdAt: '2026-01-01'
  }
];

export const INITIAL_BLOGGER_PROFILES: BloggerProfile[] = [
  {
    userId: 'usr-blogger-1',
    name: 'Alex Mercer',
    email: 'alex.mercer@blogger.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
    status: 'approved',
    bio: 'Tech journalist, AI enthusiast, and adult industry analyst.',
    totalViews: 24000,
    totalClicks: 3090,
    ctr: 12.875,
    estimatedEarnings: 61.80,
    availableBalance: 46.80,
    pendingEarnings: 15.00,
    paidEarnings: 120.00,
    paymentMethod: 'usdt',
    paymentDetails: 'TRX7x99182310xABCD99102481',
    registrationDate: '2026-06-15'
  },
  {
    userId: 'usr-blogger-pending',
    name: 'Marcus Vance',
    email: 'marcus.vance@creator.org',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
    status: 'pending',
    bio: 'Adult gaming reviewer and VR hardware test pilot.',
    totalViews: 0,
    totalClicks: 0,
    ctr: 0,
    estimatedEarnings: 0,
    availableBalance: 0,
    pendingEarnings: 0,
    paidEarnings: 0,
    registrationDate: '2026-08-03'
  }
];

export const INITIAL_WITHDRAWALS: WithdrawalRequest[] = [
  {
    id: 'wdr-1',
    userId: 'usr-blogger-1',
    userName: 'Alex Mercer',
    userEmail: 'alex.mercer@blogger.com',
    amount: 120.00,
    method: 'usdt',
    paymentDetails: 'TRX7x99182310xABCD99102481',
    status: 'approved',
    createdAt: '2026-07-15',
    processedAt: '2026-07-16',
    notes: 'Paid via USDT TRC20 network.'
  },
  {
    id: 'wdr-2',
    userId: 'usr-blogger-1',
    userName: 'Alex Mercer',
    userEmail: 'alex.mercer@blogger.com',
    amount: 50.00,
    method: 'paypal',
    paymentDetails: 'alex.mercer@paypal.com',
    status: 'pending',
    createdAt: '2026-08-03'
  }
];

export const INITIAL_ADS: AdBanner[] = [
  {
    id: 'ad-1',
    title: 'SexLikeReal 8K VR Promo',
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=1200&h=200&q=80',
    targetUrl: 'https://example.com/aff/slr-banner?ref=ypg',
    position: 'hero_top',
    isActive: true,
    impressions: 48500,
    clicks: 2190
  },
  {
    id: 'ad-2',
    title: 'Candy AI Uncensored Pass',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&h=600&q=80',
    targetUrl: 'https://example.com/aff/candy-sidebar?ref=ypg',
    position: 'sidebar',
    isActive: true,
    impressions: 31200,
    clicks: 1420
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  payPerClickRate: 0.02, // $0.02 per valid unique click
  minimumWithdrawal: 50.00, // $50 min payout
  autoApproveBloggers: false,
  fraudWindowHours: 24,
  siteTitle: 'Your Porn Guy - Discover • Compare • Enjoy',
  metaDescription: 'The premiere adult affiliate directory, site comparisons, shop, multi-author blog, and blogger monetization network.',
  contactEmail: 'support@yourpornguy.com',
  dmcaNotice: 'Your Porn Guy strictly complies with 17 U.S.C. § 512 and the Digital Millennium Copyright Act (DMCA). All listings are third-party links.'
};

export const INITIAL_REVIEWS: ListingReview[] = [
  {
    id: 'rev-1',
    listingId: 'lst-1',
    userName: 'Dave K.',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
    rating: 5,
    comment: 'Pornhub Premium 4K speeds are unmatched. Mobile app sync works flawlessly.',
    date: '2026-07-20',
    verifiedUser: true,
    helpfulCount: 38
  },
  {
    id: 'rev-2',
    listingId: 'lst-2',
    userName: 'Samantha R.',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    rating: 5,
    comment: 'Candy AI character voice notes sound surprisingly real. Uncensored photo generator is super fast!',
    date: '2026-07-29',
    verifiedUser: true,
    helpfulCount: 29
  }
];

export const INITIAL_BLOG_COMMENTS: BlogComment[] = [
  {
    id: 'cm-1',
    postId: 'blog-1',
    userName: 'Jason Vance',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80',
    content: 'Great comparison! Candy AI definitely leads in terms of conversational memory retention.',
    date: '2026-07-29',
    likes: 12
  }
];
