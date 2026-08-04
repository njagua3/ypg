import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { ComparisonModal } from './components/ComparisonModal';
import { SubmitListingModal } from './components/SubmitListingModal';
import { ShopView } from './components/ShopView';
import { BlogView } from './components/BlogView';
import { BlogPostDetailModal } from './components/BlogPostDetailModal';
import { BlogEditorModal } from './components/BlogEditorModal';
import { BloggerDashboard } from './components/BloggerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { SEOModal } from './components/SEOModal';
import { SupabaseModal } from './components/SupabaseModal';
import { AuthModal } from './components/AuthModal';
import { StaticPages } from './components/StaticPages';
import { Footer } from './components/Footer';
import {
  Listing,
  Category,
  Product,
  BlogPost,
  User,
  BloggerProfile,
  WithdrawalRequest,
  ClickLog,
  ListingReview,
  BlogComment,
  SubmitListingPayload
} from './types';
import {
  INITIAL_CATEGORIES,
  INITIAL_LISTINGS,
  INITIAL_PRODUCTS,
  INITIAL_BLOGS,
  INITIAL_USERS,
  INITIAL_BLOGGER_PROFILES,
  INITIAL_WITHDRAWALS,
  INITIAL_SETTINGS
} from './data/mockData';
import {
  Search,
  Filter,
  Sparkles,
  Award,
  Star,
  TrendingUp,
  Clock,
  ExternalLink,
  GitCompare,
  PlusCircle,
  X
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('featured');

  // App Data State initialized with mockData fallbacks for reliable static and online loading
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem('ypg_current_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      id: 'usr-visitor-1',
      name: 'Guest Visitor',
      email: 'guest@yourpornguy.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'visitor',
      bloggerStatus: 'none',
      createdAt: '2026-08-01'
    };
  });

  // Modal States
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedListingReviews, setSelectedListingReviews] = useState<ListingReview[]>([]);
  const [selectedListingRelated, setSelectedListingRelated] = useState<Listing[]>([]);
  
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedBlogComments, setSelectedBlogComments] = useState<BlogComment[]>([]);
  const [selectedBlogRelated, setSelectedBlogRelated] = useState<BlogPost[]>([]);

  const [compareListings, setCompareListings] = useState<Listing[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showBlogEditorModal, setShowBlogEditorModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSEOModal, setShowSEOModal] = useState(false);
  const [showSupabaseModal, setShowSupabaseModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Blogger & Admin Data State
  const INITIAL_ADMIN_STATS = {
    totalUsers: INITIAL_USERS.length + 1416,
    approvedBloggers: INITIAL_USERS.filter((u) => u.role === 'blogger' && u.bloggerStatus === 'approved').length + 42,
    pendingBloggers: INITIAL_USERS.filter((u) => u.role === 'blogger' && u.bloggerStatus === 'pending').length,
    totalListings: INITIAL_LISTINGS.length,
    pendingListings: INITIAL_LISTINGS.filter((l) => l.isApproved === false).length,
    totalBlogs: INITIAL_BLOGS.length,
    validClicks: 72100,
    totalClicks: 84920,
    totalPaidOut: 1698.40,
    users: INITIAL_USERS,
    listings: INITIAL_LISTINGS,
    withdrawals: INITIAL_WITHDRAWALS,
    pendingWithdrawals: INITIAL_WITHDRAWALS.filter((w) => w.status === 'pending'),
    settings: INITIAL_SETTINGS
  };

  const [bloggerDashboardData, setBloggerDashboardData] = useState<any>(null);
  const [adminStats, setAdminStats] = useState<any>(INITIAL_ADMIN_STATS);

  // Apply dark mode class to root HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for quick search, Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal((prev) => !prev);
      } else if (e.key === 'Escape') {
        setShowSearchModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Safely fetch initial data if backend API is present, gracefully retaining fallback mock data if static
  const fetchData = async () => {
    try {
      const catReq = fetch('/api/categories').catch(() => null);
      const listReq = fetch('/api/listings').catch(() => null);
      const prodReq = fetch('/api/products').catch(() => null);
      const blogReq = fetch('/api/blogs').catch(() => null);
      const userReq = fetch('/api/users/current', { headers: { 'x-user-id': currentUser.id } }).catch(() => null);

      const [catRes, listRes, prodRes, blogRes, userRes] = await Promise.all([
        catReq,
        listReq,
        prodReq,
        blogReq,
        userReq
      ]);

      if (catRes && catRes.ok) {
        const catData = await catRes.json().catch(() => null);
        if (Array.isArray(catData) && catData.length > 0) setCategories(catData);
      }
      if (listRes && listRes.ok) {
        const listData = await listRes.json().catch(() => null);
        if (listData && Array.isArray(listData.listings) && listData.listings.length > 0) {
          setListings(listData.listings);
        }
      }
      if (prodRes && prodRes.ok) {
        const prodData = await prodRes.json().catch(() => null);
        if (Array.isArray(prodData) && prodData.length > 0) setProducts(prodData);
      }
      if (blogRes && blogRes.ok) {
        const blogData = await blogRes.json().catch(() => null);
        if (Array.isArray(blogData) && blogData.length > 0) setBlogs(blogData);
      }
      if (userRes && userRes.ok) {
        const userData = await userRes.json().catch(() => null);
        if (userData && userData.user) setCurrentUser(userData.user);
      }
    } catch (err) {
      console.warn('Backend API endpoint unreachable, using local fallback data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser.id]);

  // Fetch Blogger Dashboard & Admin Stats with static Vercel fallback support
  useEffect(() => {
    if (currentTab === 'blogger_dashboard') {
      fetch('/api/blogger/dashboard', { headers: { 'x-user-id': currentUser.id } })
        .then((res) => {
          if (!res.ok) throw new Error('API unreachable');
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) throw new Error('Not JSON');
          return res.json();
        })
        .then((data) => setBloggerDashboardData(data))
        .catch(() => {
          const isPending = currentUser.id === 'usr-blogger-pending' || currentUser.bloggerStatus === 'pending';
          const matchedProfile = INITIAL_BLOGGER_PROFILES.find((p) => p.userId === currentUser.id) || {
            userId: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            avatarUrl: currentUser.avatarUrl,
            status: isPending ? 'pending' : 'approved',
            bio: currentUser.bio || (isPending ? 'Adult gaming reviewer and VR hardware test pilot.' : 'Content creator & adult industry blogger.'),
            totalViews: isPending ? 0 : 24000,
            totalClicks: isPending ? 0 : 3090,
            ctr: isPending ? 0 : 12.8,
            estimatedEarnings: isPending ? 0 : 61.80,
            availableBalance: isPending ? 0 : 46.80,
            pendingEarnings: isPending ? 0 : 15.00,
            paidEarnings: isPending ? 0 : 120.00,
            registrationDate: currentUser.createdAt || '2026-08-01'
          };
          
          setBloggerDashboardData({
            profile: matchedProfile,
            blogs: isPending ? blogs.filter((b) => b.authorId === currentUser.id) : blogs.filter((b) => b.authorId === currentUser.id || b.authorId === 'usr-blogger-1'),
            withdrawals: isPending ? [] : INITIAL_WITHDRAWALS.filter((w) => w.userId === currentUser.id || currentUser.id === 'usr-blogger-1'),
            recentClicks: [],
            payPerClickRate: INITIAL_SETTINGS.payPerClickRate,
            minimumWithdrawal: INITIAL_SETTINGS.minimumWithdrawal
          });
        });
    } else if (currentTab === 'admin_dashboard') {
      fetch('/api/admin/stats', { headers: { 'x-user-id': currentUser.id } })
        .then((res) => {
          if (!res.ok) throw new Error('API unreachable');
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) throw new Error('Not JSON');
          return res.json();
        })
        .then((data) => setAdminStats(data))
        .catch(() => {
          setAdminStats(INITIAL_ADMIN_STATS);
        });
    }
  }, [currentTab, currentUser, blogs, listings]);

  // Handle Role Switching with instantaneous client-side updates for zero-delay response
  const handleSwitchRole = async (role: 'visitor' | 'blogger' | 'admin' | 'pending_blogger') => {
    let targetUser: User;
    
    if (role === 'pending_blogger') {
      targetUser = INITIAL_USERS.find((u) => u.id === 'usr-blogger-pending') || {
        id: 'usr-blogger-pending',
        name: 'Marcus Vance',
        email: 'marcus.vance@creator.org',
        avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
        role: 'blogger',
        bloggerStatus: 'pending',
        bio: 'Adult gaming reviewer and VR hardware test pilot.',
        createdAt: '2026-08-03'
      };
    } else if (role === 'blogger') {
      targetUser = INITIAL_USERS.find((u) => u.id === 'usr-blogger-1') || {
        id: 'usr-blogger-1',
        name: 'Alex Mercer',
        email: 'alex.mercer@blogger.com',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
        role: 'blogger',
        bloggerStatus: 'approved',
        bio: 'Tech journalist, AI enthusiast, and adult industry analyst.',
        createdAt: '2026-06-15'
      };
    } else if (role === 'admin') {
      targetUser = INITIAL_USERS.find((u) => u.id === 'usr-admin-1') || {
        id: 'usr-admin-1',
        name: 'YPG System Admin',
        email: 'admin@yourpornguy.com',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
        role: 'admin',
        bloggerStatus: 'approved',
        bio: 'Platform Operations Director',
        createdAt: '2026-01-01'
      };
    } else {
      targetUser = {
        id: 'usr-visitor-1',
        name: 'Guest Visitor',
        email: 'guest@yourpornguy.com',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
        role: 'visitor',
        bloggerStatus: 'none',
        createdAt: '2026-08-01'
      };
    }

    // Update state immediately for flawless UI transition
    setCurrentUser(targetUser);
    try {
      localStorage.setItem('ypg_current_user', JSON.stringify(targetUser));
    } catch (e) {}

    if (targetUser.role === 'admin') {
      setCurrentTab('admin_dashboard');
    } else if (targetUser.role === 'blogger') {
      setCurrentTab('blogger_dashboard');
    } else {
      setCurrentTab('home');
    }

    // Optional background sync with backend server if available
    try {
      let targetRole = role === 'pending_blogger' ? 'blogger' : role;
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: targetRole, email: targetUser.email })
      });
    } catch (err) {
      // Ignored for static deployments
    }
  };

  // Auth Modal Success Handler
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('ypg_current_user', JSON.stringify(user));
    } catch (e) {}

    if (user.role === 'admin') {
      setCurrentTab('admin_dashboard');
    } else if (user.role === 'blogger') {
      setCurrentTab('blogger_dashboard');
    }
  };

  // Sign Out Handler
  const handleSignOut = () => {
    const guestUser: User = {
      id: 'usr-visitor-1',
      name: 'Guest Visitor',
      email: 'guest@yourpornguy.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      role: 'visitor',
      bloggerStatus: 'none',
      createdAt: '2026-08-01'
    };
    setCurrentUser(guestUser);
    try {
      localStorage.removeItem('ypg_current_user');
    } catch (e) {}
    setCurrentTab('home');
  };

  // Open Listing Details
  const handleOpenListingDetails = async (listing: Listing) => {
    try {
      const res = await fetch(`/api/listings/${listing.id}`);
      const data = await res.json();
      setSelectedListing(data.listing);
      setSelectedListingReviews(data.reviews || []);
      setSelectedListingRelated(data.related || []);
    } catch (err) {
      setSelectedListing(listing);
    }
  };

  // Submit Listing Review
  const handleSubmitListingReview = async (listingId: string, rating: number, comment: string) => {
    try {
      const res = await fetch(`/api/listings/${listingId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment, userName: currentUser.name })
      });
      const data = await res.json();
      if (data.success && selectedListing) {
        setSelectedListingReviews((prev) => [data.review, ...prev]);
        setSelectedListing(data.listing);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Click Outgoing Affiliate Link
  const handleAffiliateClick = async (listing: Listing, isSecondary?: boolean) => {
    confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    try {
      await fetch(`/api/listings/${listing.id}/click`, { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    const targetUrl = isSecondary && listing.secondaryAffiliateUrl
      ? listing.secondaryAffiliateUrl
      : listing.primaryAffiliateUrl;
    window.open(targetUrl, '_blank');
  };

  // Blog Affiliate Click Tracking (Runs Fraud Check & Credits Blogger Wallet)
  const handleBlogAffiliateClick = async (blog: BlogPost) => {
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.8 } });
    try {
      await fetch(`/api/blogs/${blog.id}/click`, {
        method: 'POST',
        headers: { 'x-user-id': currentUser.id }
      });
    } catch (err) {
      console.error(err);
    }
    window.open('https://example.com/aff/blog-partner?ref=ypg', '_blank');
  };

  // Open Blog Post
  const handleOpenBlog = async (blog: BlogPost) => {
    try {
      const res = await fetch(`/api/blogs/${blog.slug}`);
      const data = await res.json();
      setSelectedBlog(data.blog || blog);
      setSelectedBlogComments(data.comments || []);
      setSelectedBlogRelated(data.related || []);
    } catch (err) {
      setSelectedBlog(blog);
    }
  };

  // Like Blog
  const handleLikeBlog = async (blogId: string) => {
    try {
      const res = await fetch(`/api/blogs/${blogId}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success && selectedBlog) {
        setSelectedBlog({ ...selectedBlog, likes: data.likes });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Blog Comment
  const handleSubmitBlogComment = async (blogId: string, content: string) => {
    try {
      const res = await fetch(`/api/blogs/${blogId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, userName: currentUser.name })
      });
      const data = await res.json();
      if (data.success) {
        setSelectedBlogComments((prev) => [data.comment, ...prev]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Compare Listing Selection
  const handleSelectForCompare = (listing: Listing) => {
    if (compareListings.some((l) => l.id === listing.id)) {
      setCompareListings((prev) => prev.filter((l) => l.id !== listing.id));
    } else {
      if (compareListings.length >= 4) {
        alert('You can compare up to 4 sites at a time.');
        return;
      }
      setCompareListings((prev) => [...prev, listing]);
    }
  };

  // Submit Webmaster Listing
  const handleSubmitListing = async (payload: SubmitListingPayload) => {
    const res = await fetch('/api/listings/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Submission failed');
    fetchData();
  };

  // Create Blog Post as Blogger
  const handleCreateBlogPost = async (data: any) => {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': currentUser.id
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create blog');
    fetchData();
  };

  // Blogger Withdrawal Request
  const handleRequestWithdrawal = async (amount: number, method: 'bank' | 'paypal' | 'usdt', paymentDetails: string) => {
    const res = await fetch('/api/blogger/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': currentUser.id
      },
      body: JSON.stringify({ amount, method, paymentDetails })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Withdrawal failed');
    // Refresh blogger dashboard
    const dashRes = await fetch('/api/blogger/dashboard', { headers: { 'x-user-id': currentUser.id } });
    const dashData = await dashRes.json();
    setBloggerDashboardData(dashData);
  };

  // Filter listings for active view
  let displayedListings = listings.filter((l) => {
    const matchesCategory = !selectedCategory || l.categoryId === selectedCategory;
    const matchesSearch = !searchQuery || 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (sortOption === 'rating') {
    displayedListings.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === 'popular') {
    displayedListings.sort((a, b) => b.popularityScore - a.popularityScore);
  } else if (sortOption === 'editor') {
    displayedListings.sort((a, b) => b.editorScore - a.editorScore);
  } else if (sortOption === 'newest') {
    displayedListings.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#111111] text-zinc-900 dark:text-zinc-100 flex flex-col font-sans selection:bg-[#ff7a00] selection:text-white transition-colors">
      
      {/* Global Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        compareCount={compareListings.length}
        onOpenCompare={() => setShowCompareModal(true)}
        onOpenSubmitListing={() => setShowSubmitModal(true)}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenAuthModal={(m) => {
          setAuthModalMode(m || 'signin');
          setShowAuthModal(true);
        }}
        onSignOut={handleSignOut}
      />

      {/* Main Body Routing */}
      <main className="flex-1">
        
        {currentTab === 'home' && (
          <div>
            {/* Hero Banner with Search */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                const el = document.getElementById('directory-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              categories={categories}
              totalListingsCount={listings.length}
            />

            {/* Main Listings Feed */}
            <div id="directory-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
              
              {/* Directory Filter Bar */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white">
                    {searchQuery
                      ? `Search: "${searchQuery}"`
                      : selectedCategory
                      ? categories.find(c => c.id === selectedCategory)?.name || 'Directory'
                      : 'Top Verified Listings'}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-300">
                    {displayedListings.length} Sites
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-3 py-1.5 text-xs font-bold text-[#ff7a00] bg-[#ff7a00]/10 rounded-xl hover:bg-[#ff7a00]/20 transition-colors flex items-center gap-1"
                    >
                      <span>Clear Search</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="px-3 py-1.5 text-xs font-bold text-[#ff7a00] bg-[#ff7a00]/10 rounded-xl hover:bg-[#ff7a00]/20 transition-colors flex items-center gap-1"
                    >
                      <span>Clear Category</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                  >
                    <option value="featured">Featured & Sponsored</option>
                    <option value="popular">Most Popular</option>
                    <option value="editor">Highest Editor Score</option>
                    <option value="rating">Highest User Rating</option>
                    <option value="newest">Newest Additions</option>
                  </select>
                </div>
              </div>

              {/* Grid of Listing Cards or Empty Search Result */}
              {displayedListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedListings.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      onOpenDetails={handleOpenListingDetails}
                      onSelectForCompare={handleSelectForCompare}
                      isCompared={compareListings.some((c) => c.id === listing.id)}
                      onAffiliateClick={handleAffiliateClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-4 my-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#ff7a00]/10 flex items-center justify-center text-[#ff7a00]">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                    No sites found matching "{searchQuery}"
                  </h3>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                    Try searching for popular terms like "VR", "Candy AI", "Cams", "Toys", or browse through directory categories.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('');
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#ff7a00] to-orange-600 text-white text-xs font-extrabold rounded-xl shadow-md hover:opacity-95 transition-all"
                    >
                      Show All Listings
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {currentTab === 'categories' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Directory Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCategory(c.id);
                    setCurrentTab('home');
                  }}
                  className="p-5 rounded-3xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 hover:border-[#ff7a00] cursor-pointer transition-all space-y-2 group shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-zinc-900 dark:text-white group-hover:text-[#ff7a00] transition-colors">{c.name}</h3>
                    <span className="text-xs font-mono font-bold text-zinc-400">{c.listingCount} Sites</span>
                  </div>
                  <p className="text-xs text-zinc-500">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentTab === 'shop' && (
          <ShopView
            products={products}
            onToggleWishlist={async (pId) => {
              await fetch(`/api/products/${pId}/wishlist`, { method: 'POST' });
              fetchData();
            }}
            onBuyNowClick={(prod) => {
              confetti({ particleCount: 30 });
              window.open(prod.affiliateUrl, '_blank');
            }}
          />
        )}

        {currentTab === 'blog' && (
          <BlogView
            blogs={blogs}
            currentUser={currentUser}
            onSelectBlog={handleOpenBlog}
            onOpenCreateModal={() => setShowBlogEditorModal(true)}
          />
        )}

        {currentTab === 'blogger_dashboard' && bloggerDashboardData && (
          <BloggerDashboard
            profile={bloggerDashboardData.profile}
            blogs={bloggerDashboardData.blogs}
            withdrawals={bloggerDashboardData.withdrawals}
            recentClicks={bloggerDashboardData.recentClicks}
            payPerClickRate={bloggerDashboardData.payPerClickRate}
            minimumWithdrawal={bloggerDashboardData.minimumWithdrawal}
            onRequestWithdrawal={handleRequestWithdrawal}
            onOpenCreateBlogModal={() => setShowBlogEditorModal(true)}
          />
        )}

        {currentTab === 'admin_dashboard' && adminStats && (
          <AdminDashboard
            stats={adminStats}
            onApproveBlogger={async (id) => {
              setAdminStats((prev: any) => {
                if (!prev) return prev;
                const updatedUsers = (prev.users || []).map((u: User) =>
                  u.id === id ? { ...u, bloggerStatus: 'approved' as const, role: 'blogger' as const } : u
                );
                return {
                  ...prev,
                  users: updatedUsers,
                  pendingBloggers: Math.max(0, (prev.pendingBloggers || 1) - 1),
                  approvedBloggers: (prev.approvedBloggers || 0) + 1
                };
              });
              try {
                await fetch(`/api/admin/bloggers/${id}/approve`, { method: 'POST' });
              } catch (err) {}
            }}
            onRejectBlogger={async (id) => {
              setAdminStats((prev: any) => {
                if (!prev) return prev;
                const updatedUsers = (prev.users || []).map((u: User) =>
                  u.id === id ? { ...u, bloggerStatus: 'rejected' as const } : u
                );
                return {
                  ...prev,
                  users: updatedUsers,
                  pendingBloggers: Math.max(0, (prev.pendingBloggers || 1) - 1)
                };
              });
              try {
                await fetch(`/api/admin/bloggers/${id}/reject`, { method: 'POST' });
              } catch (err) {}
            }}
            onApproveListing={async (id) => {
              setAdminStats((prev: any) => {
                if (!prev) return prev;
                const updatedListings = (prev.listings || []).map((l: Listing) =>
                  l.id === id ? { ...l, isApproved: true } : l
                );
                return {
                  ...prev,
                  listings: updatedListings,
                  pendingListings: Math.max(0, (prev.pendingListings || 1) - 1)
                };
              });
              try {
                await fetch(`/api/admin/listings/${id}/approve`, { method: 'POST' });
              } catch (err) {}
            }}
            onApproveWithdrawal={async (id) => {
              setAdminStats((prev: any) => {
                if (!prev) return prev;
                const updatedWithdrawals = (prev.withdrawals || []).map((w: WithdrawalRequest) =>
                  w.id === id ? { ...w, status: 'approved' as const, processedAt: new Date().toISOString().split('T')[0] } : w
                );
                return {
                  ...prev,
                  withdrawals: updatedWithdrawals,
                  pendingWithdrawals: updatedWithdrawals.filter((w: WithdrawalRequest) => w.status === 'pending')
                };
              });
              try {
                await fetch(`/api/admin/withdrawals/${id}/approve`, { method: 'POST' });
              } catch (err) {}
            }}
            onUpdateSettings={async (newSettings) => {
              setAdminStats((prev: any) => ({
                ...prev,
                settings: { ...prev.settings, ...newSettings }
              }));
              try {
                await fetch('/api/admin/settings', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newSettings)
                });
              } catch (err) {}
            }}
            onOpenSEOModal={() => setShowSEOModal(true)}
            onOpenSupabaseModal={() => setShowSupabaseModal(true)}
          />
        )}

        {['about', 'contact', 'privacy', 'terms', 'dmca'].includes(currentTab) && (
          <StaticPages page={currentTab as any} />
        )}

      </main>

      {/* Global Footer */}
      <Footer setCurrentTab={setCurrentTab} onOpenSEOModal={() => setShowSEOModal(true)} />

      {/* Modals */}
      <ListingDetailModal
        listing={selectedListing}
        reviews={selectedListingReviews}
        relatedListings={selectedListingRelated}
        onClose={() => setSelectedListing(null)}
        onAffiliateClick={handleAffiliateClick}
        onSubmitReview={handleSubmitListingReview}
        onSelectListing={handleOpenListingDetails}
      />

      {showCompareModal && (
        <ComparisonModal
          listings={compareListings}
          onClose={() => setShowCompareModal(false)}
          onRemove={(id) => setCompareListings((prev) => prev.filter((l) => l.id !== id))}
          onAffiliateClick={handleAffiliateClick}
        />
      )}

      {showSubmitModal && (
        <SubmitListingModal
          categories={categories}
          onClose={() => setShowSubmitModal(false)}
          onSubmit={handleSubmitListing}
        />
      )}

      {showBlogEditorModal && (
        <BlogEditorModal
          onClose={() => setShowBlogEditorModal(false)}
          onSubmitPost={handleCreateBlogPost}
        />
      )}

      <BlogPostDetailModal
        blog={selectedBlog}
        comments={selectedBlogComments}
        relatedBlogs={selectedBlogRelated}
        onClose={() => setSelectedBlog(null)}
        onLike={handleLikeBlog}
        onSubmitComment={handleSubmitBlogComment}
        onBlogAffiliateClick={handleBlogAffiliateClick}
      />

      {showSEOModal && <SEOModal onClose={() => setShowSEOModal(false)} />}

      <SupabaseModal isOpen={showSupabaseModal} onClose={() => setShowSupabaseModal(false)} />

      {/* Sign In & Sign Up Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authModalMode}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Quick Search Overlay Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="w-full max-w-xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowSearchModal(false);
                setCurrentTab('home');
                setTimeout(() => {
                  const el = document.getElementById('directory-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-3"
            >
              <Search className="w-5 h-5 text-[#ff7a00] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search 15,000+ sites (Press Enter)..."
                className="w-full text-base font-bold text-zinc-900 dark:text-white bg-transparent focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowSearchModal(false)}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Empty Query - Popular Tags */}
            {!searchQuery && (
              <div className="space-y-2 py-2">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Popular Quick Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['4K Premium', 'Candy AI', 'Lovense Toys', '8K VR', 'Free Cams', 'NordVPN'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] border border-zinc-200/80 dark:border-zinc-700/60 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results List */}
            {displayedListings.length > 0 ? (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold px-1 pb-1">
                  <span>Matching Sites</span>
                  <span>{displayedListings.length} found</span>
                </div>
                {displayedListings.slice(0, 6).map((l) => (
                  <div
                    key={l.id}
                    onClick={() => {
                      handleOpenListingDetails(l);
                      setShowSearchModal(false);
                    }}
                    className="p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={l.logoUrl} alt={l.name} className="w-9 h-9 rounded-xl object-cover bg-black border border-zinc-200 dark:border-zinc-800" />
                      <div>
                        <h4 className="text-xs font-extrabold text-zinc-900 dark:text-white group-hover:text-[#ff7a00] transition-colors">
                          {l.name}
                        </h4>
                        <p className="text-[10px] text-zinc-500">{l.categoryName}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      {l.editorScore}/100
                    </span>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setShowSearchModal(false);
                    setCurrentTab('home');
                    setTimeout(() => {
                      const el = document.getElementById('directory-grid');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="w-full mt-2 py-2.5 text-center text-xs font-bold text-[#ff7a00] bg-[#ff7a00]/10 hover:bg-[#ff7a00]/20 rounded-xl transition-colors"
                >
                  View All {displayedListings.length} Results in Directory →
                </button>
              </div>
            ) : (
              searchQuery && (
                <div className="py-8 text-center space-y-2">
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    No results for "{searchQuery}"
                  </p>
                  <p className="text-xs text-zinc-500">
                    Try searching for "Cams", "VR", "Anime", "Candy AI" or browse categories.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

    </div>
  );
}
