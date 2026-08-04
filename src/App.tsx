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
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'usr-visitor-1',
    name: 'Guest Visitor',
    email: 'guest@yourpornguy.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    role: 'visitor',
    bloggerStatus: 'none',
    createdAt: '2026-08-01'
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
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-zinc-900 dark:text-white">
                    {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name || 'Directory' : 'Top Verified Listings'}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-300">
                    {displayedListings.length} Sites
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="px-3 py-1.5 text-xs font-bold text-[#ff7a00] bg-[#ff7a00]/10 rounded-xl hover:bg-[#ff7a00]/20 transition-colors"
                    >
                      Clear Category
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

              {/* Grid of Listing Cards */}
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

      {/* Quick Search Overlay Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 shadow-2xl space-y-3">
            <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              <Search className="w-5 h-5 text-[#ff7a00]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search over 15,000 adult sites..."
                className="w-full text-base font-bold text-zinc-900 dark:text-white bg-transparent focus:outline-none"
              />
              <button onClick={() => setShowSearchModal(false)} className="text-zinc-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {displayedListings.slice(0, 5).map((l) => (
                <div
                  key={l.id}
                  onClick={() => {
                    handleOpenListingDetails(l);
                    setShowSearchModal(false);
                  }}
                  className="p-3 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img src={l.logoUrl} alt={l.name} className="w-8 h-8 rounded-lg object-cover bg-black" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{l.name}</h4>
                      <p className="text-[10px] text-zinc-500">{l.categoryName}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-500">{l.editorScore}/100</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
