import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import {
  INITIAL_CATEGORIES,
  INITIAL_LISTINGS,
  INITIAL_PRODUCTS,
  INITIAL_BLOGS,
  INITIAL_USERS,
  INITIAL_BLOGGER_PROFILES,
  INITIAL_WITHDRAWALS,
  INITIAL_ADS,
  INITIAL_SETTINGS,
  INITIAL_REVIEWS,
  INITIAL_BLOG_COMMENTS
} from './src/data/mockData.js';
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
  BlogComment,
  SubmitListingPayload
} from './src/types.js';

const rootDir = process.cwd();

// Helper to sanitize Supabase URL
function cleanSupabaseUrl(url: string): string {
  if (!url) return '';
  return url.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
}

// Supabase client initialization
const rawServerSupabaseUrl = process.env.VITE_SUPABASE_URL || 'https://unoicrluypnmmthrjcsu.supabase.co';
const supabaseUrl = cleanSupabaseUrl(rawServerSupabaseUrl);
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVub2ljcmx1eXBubW10aHJqY3N1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTgyNTgwOCwiZXhwIjoyMTAxNDAxODA4fQ.WcwROaWmnY9YVBEDTaUJp8ihRKZJ-ATB4FfH1HxshUM';

const isSupabaseEnabled = Boolean(supabaseUrl && supabaseKey);

export const supabaseServer = isSupabaseEnabled ? createClient(supabaseUrl, supabaseKey) : null;

// Persistent state container with disk sync
const DB_FILE = path.join(rootDir, 'data_store.json');

interface DatabaseState {
  categories: Category[];
  listings: Listing[];
  products: Product[];
  blogs: BlogPost[];
  users: User[];
  bloggerProfiles: BloggerProfile[];
  withdrawals: WithdrawalRequest[];
  clickLogs: ClickLog[];
  ads: AdBanner[];
  settings: SiteSettings;
  reviews: ListingReview[];
  blogComments: BlogComment[];
}

let db: DatabaseState = {
  categories: INITIAL_CATEGORIES,
  listings: INITIAL_LISTINGS,
  products: INITIAL_PRODUCTS,
  blogs: INITIAL_BLOGS,
  users: INITIAL_USERS,
  bloggerProfiles: INITIAL_BLOGGER_PROFILES,
  withdrawals: INITIAL_WITHDRAWALS,
  clickLogs: [],
  ads: INITIAL_ADS,
  settings: INITIAL_SETTINGS,
  reviews: INITIAL_REVIEWS,
  blogComments: INITIAL_BLOG_COMMENTS
};

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      const loaded = JSON.parse(data);
      db = { ...db, ...loaded };
      console.log('Database loaded successfully from file.');
    } else {
      saveDatabase();
    }
  } catch (err) {
    console.error('Error loading database file, using initial data:', err);
  }
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving database to file:', err);
  }
}

loadDatabase();

// Bot detection regex
const BOT_REGEX = /bot|googlebot|crawler|spider|slurp|bingbot|yandex|headless|curl|wget|python|postman|phantomjs/i;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Helper middleware for current user simulation header
  let currentUserId = 'usr-visitor-1';

  app.use((req, res, next) => {
    const authHeader = req.headers['x-user-id'] as string;
    if (authHeader) {
      currentUserId = authHeader;
    }
    next();
  });

  // --- API ROUTES ---

  // Health check & Supabase Status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      name: 'Your Porn Guy API Engine',
      supabaseConfigured: isSupabaseEnabled,
      supabaseUrl: supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : null,
      timestamp: new Date().toISOString()
    });
  });

  // Supabase Database Status Route
  app.get('/api/supabase/status', async (req, res) => {
    if (!isSupabaseEnabled || !supabaseServer) {
      return res.json({
        configured: false,
        connected: false,
        message: 'Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are not set in environment variables.',
        tables: []
      });
    }

    try {
      const { data, error } = await supabaseServer.from('listings').select('id', { count: 'exact', head: true });
      if (error) {
        return res.json({
          configured: true,
          connected: false,
          message: `Connected to Supabase project, but query failed: ${error.message}. Please run supabase-schema.sql script in Supabase SQL Editor.`
        });
      }

      res.json({
        configured: true,
        connected: true,
        message: 'Successfully connected to Supabase PostgreSQL database!',
        tables: ['categories', 'listings', 'products', 'blogs', 'users', 'click_logs', 'withdrawals', 'reviews']
      });
    } catch (err: any) {
      res.json({
        configured: true,
        connected: false,
        message: err?.message || 'Failed to query Supabase.'
      });
    }
  });

  // Supabase Data Seeding Endpoint
  app.post('/api/supabase/seed', async (req, res) => {
    if (!isSupabaseEnabled || !supabaseServer) {
      return res.status(400).json({ error: 'Supabase is not configured yet.' });
    }

    try {
      // Seed categories
      const categoryRows = db.categories.map((c, i) => ({
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon_name: c.iconName,
        sort_order: i + 1
      }));
      await supabaseServer.from('categories').upsert(categoryRows, { onConflict: 'slug' });

      // Seed listings
      const listingRows = db.listings.map((l) => ({
        name: l.name,
        description: l.description,
        category_slug: l.slug || 'tube-sites',
        rating: l.rating,
        pricing_tier: l.pricingType || 'Free',
        url: l.websiteUrl,
        affiliate_url: l.primaryAffiliateUrl,
        logo_url: l.logoUrl,
        tags: l.tags,
        is_featured: l.isSponsored || false,
        upvotes: l.popularityScore || 0
      }));
      await supabaseServer.from('listings').upsert(listingRows, { ignoreDuplicates: true });

      res.json({ success: true, message: 'Successfully seeded database tables on Supabase!' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Seeding failed.' });
    }
  });

  // Current User Profile
  app.get('/api/users/current', (req, res) => {
    const user = db.users.find((u) => u.id === currentUserId) || db.users[0];
    const profile = db.bloggerProfiles.find((bp) => bp.userId === user.id);
    res.json({ user, profile });
  });

  // Switch User / Login Simulation
  app.post('/api/auth/login', (req, res) => {
    const { role, email } = req.body;
    let targetUser = db.users.find((u) => (email ? u.email === email : u.role === role));

    if (!targetUser) {
      targetUser = db.users[0];
    }

    currentUserId = targetUser.id;
    const profile = db.bloggerProfiles.find((bp) => bp.userId === targetUser.id);
    res.json({ success: true, user: targetUser, profile });
  });

  // Blogger Registration (Self Sign-up)
  app.post('/api/auth/register-blogger', (req, res) => {
    const { name, email, bio } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing && existing.role === 'blogger') {
      return res.status(400).json({ error: 'Email is already registered as a blogger.' });
    }

    const newUserId = `usr-blogger-${Date.now()}`;
    const newUser: User = {
      id: newUserId,
      name,
      email,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80`,
      role: 'blogger',
      bloggerStatus: db.settings.autoApproveBloggers ? 'approved' : 'pending',
      bio: bio || 'Contribute articles and reviews on Your Porn Guy.',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const newProfile: BloggerProfile = {
      userId: newUserId,
      name,
      email,
      avatarUrl: newUser.avatarUrl,
      status: newUser.bloggerStatus,
      bio: newUser.bio,
      totalViews: 0,
      totalClicks: 0,
      ctr: 0,
      estimatedEarnings: 0,
      availableBalance: 0,
      pendingEarnings: 0,
      paidEarnings: 0,
      registrationDate: newUser.createdAt
    };

    db.users.push(newUser);
    db.bloggerProfiles.push(newProfile);
    saveDatabase();

    currentUserId = newUserId;
    res.json({ success: true, message: db.settings.autoApproveBloggers ? 'Account created and approved!' : 'Account registered! Pending admin approval.', user: newUser, profile: newProfile });
  });

  // --- CATEGORIES ---
  app.get('/api/categories', (req, res) => {
    res.json(db.categories);
  });

  // --- LISTINGS ---
  app.get('/api/listings', (req, res) => {
    const { category, search, tag, sort, sponsored, verified, limit, page } = req.query;

    let filtered = db.listings.filter((l) => l.isApproved !== false);

    if (category) {
      filtered = filtered.filter((l) => l.categoryId === category || l.slug === category);
    }

    if (tag) {
      filtered = filtered.filter((l) => l.tags.some((t) => t.toLowerCase() === (tag as string).toLowerCase()));
    }

    if (sponsored === 'true') {
      filtered = filtered.filter((l) => l.isSponsored);
    }

    if (verified === 'true') {
      filtered = filtered.filter((l) => l.isVerified);
    }

    if (search) {
      const q = (search as string).toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.categoryName.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'popular') {
      filtered.sort((a, b) => b.popularityScore - a.popularityScore);
    } else if (sort === 'editor') {
      filtered.sort((a, b) => b.editorScore - a.editorScore);
    } else if (sort === 'newest') {
      filtered.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    } else if (sort === 'alphabetical') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: Sponsored first, then popularity
      filtered.sort((a, b) => (b.isSponsored ? 1 : 0) - (a.isSponsored ? 1 : 0) || b.popularityScore - a.popularityScore);
    }

    const pageSize = limit ? parseInt(limit as string) : 50;
    const pageNum = page ? parseInt(page as string) : 1;
    const total = filtered.length;
    const paginated = filtered.slice((pageNum - 1) * pageSize, pageNum * pageSize);

    res.json({ listings: paginated, total, page: pageNum, totalPages: Math.ceil(total / pageSize) });
  });

  app.get('/api/listings/:id', (req, res) => {
    const listing = db.listings.find((l) => l.id === req.params.id || l.slug === req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const reviews = db.reviews.filter((r) => r.listingId === listing.id);
    const related = db.listings.filter((l) => l.id !== listing.id && l.categoryId === listing.categoryId).slice(0, 4);

    res.json({ listing, reviews, related });
  });

  // Submit Listing Public Portal
  app.post('/api/listings/submit', (req, res) => {
    const payload: SubmitListingPayload = req.body;
    if (!payload.name || !payload.websiteUrl || !payload.categoryId) {
      return res.status(400).json({ error: 'Missing required fields: name, websiteUrl, categoryId' });
    }

    const category = db.categories.find((c) => c.id === payload.categoryId);

    const slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newListing: Listing = {
      id: `lst-${Date.now()}`,
      name: payload.name,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      logoUrl: payload.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&h=380&q=80',
      description: payload.description,
      fullDescription: `${payload.description}\n\nSubmitted for review by webmaster (${payload.contactEmail}).`,
      categoryId: payload.categoryId,
      categoryName: category ? category.name : 'Directory Listing',
      rating: 4.5,
      editorScore: 85,
      userRatingCount: 1,
      primaryAffiliateUrl: payload.affiliateProgramUrl || payload.websiteUrl,
      pros: ['Newly submitted platform', 'High performance streaming', 'Active support'],
      cons: ['New listing undergoing editor verification'],
      tags: ['Submitted', 'New Site', category ? category.name : 'Web'],
      gallery: ['https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&h=450&q=80'],
      popularityScore: 50,
      isSponsored: false,
      isVerified: false,
      isApproved: false, // Requires Admin Approval!
      dateAdded: new Date().toISOString().split('T')[0],
      pricingType: payload.pricingType || 'Free',
      websiteUrl: payload.websiteUrl
    };

    db.listings.push(newListing);
    saveDatabase();

    res.json({ success: true, message: 'Your listing was submitted successfully and is pending admin verification.', listing: newListing });
  });

  // Add Listing Review
  app.post('/api/listings/:id/review', (req, res) => {
    const { rating, comment, userName } = req.body;
    const listing = db.listings.find((l) => l.id === req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    const newReview: ListingReview = {
      id: `rev-${Date.now()}`,
      listingId: listing.id,
      userName: userName || 'Anonymous User',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      rating: Number(rating) || 5,
      comment,
      date: new Date().toISOString().split('T')[0],
      verifiedUser: true,
      helpfulCount: 0
    };

    db.reviews.push(newReview);
    // Recalculate listing rating
    const allListingReviews = db.reviews.filter((r) => r.listingId === listing.id);
    const avg = allListingReviews.reduce((acc, r) => acc + r.rating, 0) / allListingReviews.length;
    listing.rating = Math.round(avg * 10) / 10;
    listing.userRatingCount = allListingReviews.length;

    saveDatabase();
    res.json({ success: true, review: newReview, listing });
  });

  // Listing Affiliate Click Tracker
  app.post('/api/listings/:id/click', (req, res) => {
    const listing = db.listings.find((l) => l.id === req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });

    listing.popularityScore += 1;

    const userAgent = req.headers['user-agent'] || 'Unknown';
    const visitorIp = req.ip || req.socket.remoteAddress || '127.0.0.1';

    const log: ClickLog = {
      id: `clk-${Date.now()}`,
      type: 'listing',
      targetId: listing.id,
      targetTitle: listing.name,
      visitorIpHash: Buffer.from(visitorIp).toString('base64').substring(0, 16),
      userAgent,
      country: 'US',
      device: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
      isBot: BOT_REGEX.test(userAgent),
      isDuplicate: false,
      isFraud: false,
      validPayout: false,
      payoutAmount: 0,
      timestamp: new Date().toISOString(),
      referrer: req.headers['referer'] || 'Direct'
    };

    db.clickLogs.unshift(log);
    saveDatabase();

    res.json({ success: true, affiliateUrl: listing.primaryAffiliateUrl });
  });

  // --- PRODUCTS (SHOP) ---
  app.get('/api/products', (req, res) => {
    const { category, search, sort } = req.query;

    let items = [...db.products];

    if (category) {
      items = items.filter((p) => p.category.toLowerCase() === (category as string).toLowerCase());
    }

    if (search) {
      const q = (search as string).toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q));
    }

    if (sort === 'price_asc') {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      items.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    res.json(items);
  });

  // Wishlist toggle
  app.post('/api/products/:id/wishlist', (req, res) => {
    const product = db.products.find((p) => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.inWishlist = !product.inWishlist;
    saveDatabase();
    res.json({ success: true, inWishlist: product.inWishlist });
  });

  // --- BLOGS & CLICK TRACKER / FRAUD ENGINE ---
  app.get('/api/blogs', (req, res) => {
    const { category, author, tag, search, status } = req.query;

    let blogs = db.blogs;

    if (status) {
      blogs = blogs.filter((b) => b.status === status);
    } else {
      blogs = blogs.filter((b) => b.status === 'published');
    }

    if (category) {
      blogs = blogs.filter((b) => b.category.toLowerCase() === (category as string).toLowerCase());
    }

    if (author) {
      blogs = blogs.filter((b) => b.authorId === author);
    }

    if (tag) {
      blogs = blogs.filter((b) => b.tags.some((t) => t.toLowerCase() === (tag as string).toLowerCase()));
    }

    if (search) {
      const q = (search as string).toLowerCase();
      blogs = blogs.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || b.content.toLowerCase().includes(q));
    }

    blogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    res.json(blogs);
  });

  app.get('/api/blogs/:slug', (req, res) => {
    const blog = db.blogs.find((b) => b.slug === req.params.slug || b.id === req.params.slug);
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });

    // Increment basic view counter
    blog.views += 1;
    saveDatabase();

    const comments = db.blogComments.filter((c) => c.postId === blog.id);
    const related = db.blogs.filter((b) => b.id !== blog.id && b.category === blog.category).slice(0, 3);

    res.json({ blog, comments, related });
  });

  // Create Blog (Blogger role)
  app.post('/api/blogs', (req, res) => {
    const currentUser = db.users.find((u) => u.id === currentUserId);
    if (!currentUser || (currentUser.role !== 'blogger' && currentUser.role !== 'admin')) {
      return res.status(403).json({ error: 'Must be an approved blogger or admin to publish posts.' });
    }

    const { title, excerpt, content, coverImageUrl, category, tags, status, seoTitle, metaDescription } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${Date.now().toString().slice(-4)}`;

    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title,
      slug,
      excerpt: excerpt || title,
      content,
      coverImageUrl: coverImageUrl || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&h=450&q=80',
      category: category || 'Guides',
      tags: Array.isArray(tags) ? tags : ['General'],
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatarUrl,
      authorRole: currentUser.role === 'admin' ? 'Editor in Chief' : 'Verified Author',
      publishedAt: new Date().toISOString().split('T')[0],
      readTimeMinutes: Math.max(2, Math.ceil(content.split(' ').length / 200)),
      views: 0,
      uniqueClicks: 0,
      likes: 0,
      shares: 0,
      commentsCount: 0,
      status: status || 'published',
      isFeatured: false,
      seoTitle: seoTitle || title,
      metaDescription: metaDescription || excerpt
    };

    db.blogs.unshift(newBlog);
    saveDatabase();

    res.json({ success: true, blog: newBlog });
  });

  // Blog Click Tracker Engine with Bot Detection & Fraud Guard
  app.post('/api/blogs/:id/click', (req, res) => {
    const blog = db.blogs.find((b) => b.id === req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const userAgent = req.headers['user-agent'] || 'Unknown';
    const visitorIp = req.ip || req.socket.remoteAddress || '127.0.0.1';
    const ipHash = Buffer.from(`${visitorIp}-${req.headers['accept-language'] || ''}`).toString('base64').substring(0, 20);

    const isBot = BOT_REGEX.test(userAgent);

    // Check duplicate click window (default 24h)
    const windowMs = db.settings.fraudWindowHours * 60 * 60 * 1000;
    const now = Date.now();

    const previousClick = db.clickLogs.find(
      (c) => c.targetId === blog.id && c.visitorIpHash === ipHash && now - new Date(c.timestamp).getTime() < windowMs
    );

    const isDuplicate = !!previousClick;
    const isFraud = isBot || isDuplicate;

    const rate = db.settings.payPerClickRate; // e.g. $0.02
    const validPayout = !isFraud;
    const payoutAmount = validPayout ? rate : 0;

    if (validPayout) {
      blog.uniqueClicks += 1;

      // Credit Blogger Wallet
      const bloggerProfile = db.bloggerProfiles.find((bp) => bp.userId === blog.authorId);
      if (bloggerProfile) {
        bloggerProfile.totalClicks += 1;
        bloggerProfile.estimatedEarnings += rate;
        bloggerProfile.availableBalance += rate;
        if (bloggerProfile.totalViews > 0) {
          bloggerProfile.ctr = Number(((bloggerProfile.totalClicks / bloggerProfile.totalViews) * 100).toFixed(2));
        }
      }
    }

    const clickLog: ClickLog = {
      id: `clk-b-${Date.now()}`,
      type: 'blog',
      targetId: blog.id,
      targetTitle: blog.title,
      bloggerUserId: blog.authorId,
      visitorIpHash: ipHash,
      userAgent,
      country: 'US',
      device: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
      isBot,
      isDuplicate,
      isFraud,
      validPayout,
      payoutAmount,
      timestamp: new Date().toISOString(),
      referrer: req.headers['referer'] || 'Direct'
    };

    db.clickLogs.unshift(clickLog);
    saveDatabase();

    res.json({
      success: true,
      validPayout,
      payoutAmount,
      reason: isBot ? 'Bot traffic detected' : isDuplicate ? 'Duplicate click within 24h window' : 'Valid unique click recorded'
    });
  });

  // Blog Like & Comment
  app.post('/api/blogs/:id/like', (req, res) => {
    const blog = db.blogs.find((b) => b.id === req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });

    blog.likes += 1;
    saveDatabase();

    res.json({ success: true, likes: blog.likes });
  });

  app.post('/api/blogs/:id/comment', (req, res) => {
    const { content, userName } = req.body;
    const blog = db.blogs.find((b) => b.id === req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog post not found' });

    const comment: BlogComment = {
      id: `cm-${Date.now()}`,
      postId: blog.id,
      userName: userName || 'Site Visitor',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      content,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    db.blogComments.unshift(comment);
    blog.commentsCount = db.blogComments.filter((c) => c.postId === blog.id).length;

    saveDatabase();
    res.json({ success: true, comment, commentsCount: blog.commentsCount });
  });

  // --- BLOGGER DASHBOARD & WALLET ---
  app.get('/api/blogger/dashboard', (req, res) => {
    const user = db.users.find((u) => u.id === currentUserId) || db.users[1];
    let profile = db.bloggerProfiles.find((bp) => bp.userId === user.id);

    if (!profile) {
      profile = {
        userId: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        status: user.bloggerStatus,
        totalViews: 0,
        totalClicks: 0,
        ctr: 0,
        estimatedEarnings: 0,
        availableBalance: 0,
        pendingEarnings: 0,
        paidEarnings: 0,
        registrationDate: user.createdAt
      };
      db.bloggerProfiles.push(profile);
    }

    const myBlogs = db.blogs.filter((b) => b.authorId === user.id);
    const myWithdrawals = db.withdrawals.filter((w) => w.userId === user.id);
    const myLogs = db.clickLogs.filter((c) => c.bloggerUserId === user.id).slice(0, 20);

    res.json({
      profile,
      blogs: myBlogs,
      withdrawals: myWithdrawals,
      recentClicks: myLogs,
      payPerClickRate: db.settings.payPerClickRate,
      minimumWithdrawal: db.settings.minimumWithdrawal
    });
  });

  app.post('/api/blogger/withdraw', (req, res) => {
    const { amount, method, paymentDetails } = req.body;
    const user = db.users.find((u) => u.id === currentUserId);
    if (!user) return res.status(401).json({ error: 'User not found' });

    const profile = db.bloggerProfiles.find((bp) => bp.userId === user.id);
    if (!profile) return res.status(404).json({ error: 'Blogger profile not found' });

    const minAmount = db.settings.minimumWithdrawal;
    if (amount < minAmount) {
      return res.status(400).json({ error: `Minimum withdrawal amount is $${minAmount.toFixed(2)}.` });
    }

    if (amount > profile.availableBalance) {
      return res.status(400).json({ error: 'Insufficient available balance.' });
    }

    // Deduct available balance and add to pending
    profile.availableBalance -= amount;
    profile.pendingEarnings += amount;

    const withdrawal: WithdrawalRequest = {
      id: `wdr-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      amount,
      method,
      paymentDetails,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    db.withdrawals.unshift(withdrawal);
    saveDatabase();

    res.json({ success: true, withdrawal, profile });
  });

  // --- ADMIN PANEL ---
  app.get('/api/admin/stats', (req, res) => {
    const totalUsers = db.users.length;
    const pendingBloggers = db.users.filter((u) => u.bloggerStatus === 'pending').length;
    const publishedBlogs = db.blogs.filter((b) => b.status === 'published').length;
    const totalListings = db.listings.length;
    const pendingListings = db.listings.filter((l) => l.isApproved === false).length;
    const totalProducts = db.products.length;
    const totalClicks = db.clickLogs.length;
    const validClicks = db.clickLogs.filter((c) => c.validPayout).length;
    const pendingWithdrawals = db.withdrawals.filter((w) => w.status === 'pending');

    const totalPaidOut = db.withdrawals
      .filter((w) => w.status === 'approved')
      .reduce((sum, w) => sum + w.amount, 0);

    res.json({
      totalUsers,
      pendingBloggers,
      publishedBlogs,
      totalListings,
      pendingListings,
      totalProducts,
      totalClicks,
      validClicks,
      pendingWithdrawals,
      totalPaidOut,
      settings: db.settings,
      bloggers: db.bloggerProfiles,
      users: db.users,
      clickLogs: db.clickLogs.slice(0, 50),
      withdrawals: db.withdrawals,
      ads: db.ads,
      listings: db.listings
    });
  });

  app.post('/api/admin/bloggers/:id/approve', (req, res) => {
    const user = db.users.find((u) => u.id === req.params.id);
    if (user) {
      user.bloggerStatus = 'approved';
      const bp = db.bloggerProfiles.find((b) => b.userId === user.id);
      if (bp) bp.status = 'approved';
      saveDatabase();
    }
    res.json({ success: true });
  });

  app.post('/api/admin/bloggers/:id/reject', (req, res) => {
    const user = db.users.find((u) => u.id === req.params.id);
    if (user) {
      user.bloggerStatus = 'rejected';
      const bp = db.bloggerProfiles.find((b) => b.userId === user.id);
      if (bp) bp.status = 'rejected';
      saveDatabase();
    }
    res.json({ success: true });
  });

  app.post('/api/admin/listings/create', (req, res) => {
    const payload = req.body;
    if (!payload.name || !payload.websiteUrl || !payload.categoryId) {
      return res.status(400).json({ error: 'Name, website URL, and category are required.' });
    }

    const category = db.categories.find((c) => c.id === payload.categoryId);
    const slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newListing: Listing = {
      id: `lst-${Date.now()}`,
      name: payload.name,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      logoUrl: payload.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&h=380&q=80',
      description: payload.description || 'Verified adult platform in YPG directory.',
      fullDescription: payload.fullDescription || payload.description || 'Verified platform curated and published directly by Admin.',
      categoryId: payload.categoryId,
      categoryName: category ? category.name : 'Directory Listing',
      rating: Number(payload.rating) || 4.8,
      editorScore: Number(payload.editorScore) || 92,
      userRatingCount: 1,
      primaryAffiliateUrl: payload.primaryAffiliateUrl || payload.websiteUrl,
      secondaryAffiliateUrl: payload.secondaryAffiliateUrl || '',
      pros: payload.pros || ['Verified by Admin', 'High Speed Content', 'Safe & Secure'],
      cons: payload.cons || ['Premium Membership required for full access'],
      tags: payload.tags || ['Admin Verified', category ? category.name : 'Web'],
      gallery: ['https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&h=450&q=80'],
      popularityScore: 80,
      isSponsored: !!payload.isSponsored,
      isVerified: true,
      isApproved: true, // DIRECTLY APPROVED BY ADMIN
      dateAdded: new Date().toISOString().split('T')[0],
      pricingType: payload.pricingType || 'Freemium',
      websiteUrl: payload.websiteUrl
    };

    db.listings.unshift(newListing);
    saveDatabase();

    res.json({ success: true, message: 'Site created and published directly to directory!', listing: newListing });
  });

  app.post('/api/admin/listings/:id/approve', (req, res) => {
    const listing = db.listings.find((l) => l.id === req.params.id);
    if (listing) {
      listing.isApproved = true;
      listing.isVerified = true;
      saveDatabase();
    }
    res.json({ success: true, listing });
  });

  app.post('/api/admin/listings/:id/reject', (req, res) => {
    const index = db.listings.findIndex((l) => l.id === req.params.id);
    if (index !== -1) {
      db.listings.splice(index, 1);
      saveDatabase();
    }
    res.json({ success: true });
  });

  app.post('/api/admin/withdrawals/:id/approve', (req, res) => {
    const w = db.withdrawals.find((x) => x.id === req.params.id);
    if (w) {
      w.status = 'approved';
      w.processedAt = new Date().toISOString().split('T')[0];

      const bp = db.bloggerProfiles.find((p) => p.userId === w.userId);
      if (bp) {
        bp.pendingEarnings -= w.amount;
        bp.paidEarnings += w.amount;
      }
      saveDatabase();
    }
    res.json({ success: true });
  });

  app.put('/api/admin/settings', (req, res) => {
    const { payPerClickRate, minimumWithdrawal, autoApproveBloggers, fraudWindowHours } = req.body;
    if (payPerClickRate !== undefined) db.settings.payPerClickRate = Number(payPerClickRate);
    if (minimumWithdrawal !== undefined) db.settings.minimumWithdrawal = Number(minimumWithdrawal);
    if (autoApproveBloggers !== undefined) db.settings.autoApproveBloggers = Boolean(autoApproveBloggers);
    if (fraudWindowHours !== undefined) db.settings.fraudWindowHours = Number(fraudWindowHours);

    saveDatabase();
    res.json({ success: true, settings: db.settings });
  });

  // XML Sitemap Generator
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://yourpornguy.com';
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    xml += `  <url><loc>${baseUrl}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
    xml += `  <url><loc>${baseUrl}/categories</loc><changefreq>daily</changefreq><priority>0.9</priority></url>\n`;
    xml += `  <url><loc>${baseUrl}/shop</loc><changefreq>daily</changefreq><priority>0.8</priority></url>\n`;
    xml += `  <url><loc>${baseUrl}/blog</loc><changefreq>daily</changefreq><priority>0.8</priority></url>\n`;

    db.listings.forEach((l) => {
      xml += `  <url><loc>${baseUrl}/site/${l.slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
    });

    db.blogs.forEach((b) => {
      xml += `  <url><loc>${baseUrl}/blog/${b.slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });

  // Robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://yourpornguy.com';
    const txt = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: ${baseUrl}/sitemap.xml`;
    res.header('Content-Type', 'text/plain');
    res.send(txt);
  });

  // Serve Vite Frontend in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
