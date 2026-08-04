export type UserRole = 'visitor' | 'blogger' | 'admin';
export type BloggerStatus = 'none' | 'pending' | 'approved' | 'rejected' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  bloggerStatus: BloggerStatus;
  bio?: string;
  createdAt: string;
}

export interface Listing {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  thumbnailUrl: string;
  description: string;
  fullDescription: string;
  categoryId: string;
  categoryName: string;
  subCategories?: string[];
  rating: number; // 1 to 5
  editorScore: number; // 0 to 100
  userRatingCount: number;
  primaryAffiliateUrl: string;
  secondaryAffiliateUrl?: string;
  secondaryAffiliateLabel?: string;
  pros: string[];
  cons: string[];
  tags: string[];
  gallery: string[];
  popularityScore: number;
  isSponsored?: boolean;
  isVerified?: boolean;
  isApproved?: boolean;
  dateAdded: string;
  pricingType: 'Free' | 'Freemium' | 'Subscription' | 'Paid';
  websiteUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  listingCount: number;
  isFeatured?: boolean;
}

export interface ListingReview {
  id: string;
  listingId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  verifiedUser?: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  category: string;
  affiliateUrl: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  inWishlist?: boolean;
  brand?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  category: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  publishedAt: string;
  readTimeMinutes: number;
  views: number;
  uniqueClicks: number;
  likes: number;
  shares: number;
  commentsCount: number;
  status: 'published' | 'draft' | 'scheduled';
  isFeatured?: boolean;
  seoTitle?: string;
  metaDescription?: string;
}

export interface BlogComment {
  id: string;
  postId: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
  likes: number;
}

export interface BloggerProfile {
  userId: string;
  name: string;
  email: string;
  avatarUrl: string;
  status: BloggerStatus;
  bio?: string;
  totalViews: number;
  totalClicks: number;
  ctr: number;
  estimatedEarnings: number;
  availableBalance: number;
  pendingEarnings: number;
  paidEarnings: number;
  paymentMethod?: 'bank' | 'paypal' | 'usdt';
  paymentDetails?: string;
  registrationDate: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  method: 'bank' | 'paypal' | 'usdt';
  paymentDetails: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  processedAt?: string;
  notes?: string;
}

export interface ClickLog {
  id: string;
  type: 'blog' | 'listing';
  targetId: string;
  targetTitle: string;
  bloggerUserId?: string;
  visitorIpHash: string;
  userAgent: string;
  country: string;
  device: string;
  isBot: boolean;
  isDuplicate: boolean;
  isFraud: boolean;
  validPayout: boolean;
  payoutAmount: number;
  timestamp: string;
  referrer: string;
}

export interface AdBanner {
  id: string;
  title: string;
  imageUrl: string;
  targetUrl: string;
  position: 'hero_top' | 'sidebar' | 'listing_feed' | 'blog_middle';
  isActive: boolean;
  impressions: number;
  clicks: number;
}

export interface SiteSettings {
  payPerClickRate: number; // e.g. 0.02
  minimumWithdrawal: number; // e.g. 50
  autoApproveBloggers: boolean;
  fraudWindowHours: number; // e.g. 24 hours
  siteTitle: string;
  metaDescription: string;
  contactEmail: string;
  dmcaNotice: string;
}

export interface SubmitListingPayload {
  name: string;
  websiteUrl: string;
  categoryId: string;
  description: string;
  contactEmail: string;
  affiliateProgramUrl?: string;
  logoUrl?: string;
  pricingType: 'Free' | 'Freemium' | 'Subscription' | 'Paid';
}
