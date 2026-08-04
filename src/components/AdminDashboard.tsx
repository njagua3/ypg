import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Building2,
  DollarSign,
  MousePointer,
  Wallet,
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  Globe,
  Sliders,
  Sparkles,
  ArrowRight,
  Database,
  PlusCircle,
  Trash2,
  Send
} from 'lucide-react';
import {
  User,
  BloggerProfile,
  WithdrawalRequest,
  ClickLog,
  SiteSettings,
  Listing,
  AdBanner,
  Category
} from '../types';

interface AdminDashboardProps {
  stats: any;
  categories?: Category[];
  onApproveBlogger: (id: string) => Promise<void>;
  onRejectBlogger: (id: string) => Promise<void>;
  onApproveListing: (id: string) => Promise<void>;
  onRejectListing?: (id: string) => Promise<void>;
  onAddListingDirect?: (payload: any) => Promise<void>;
  onApproveWithdrawal: (id: string) => Promise<void>;
  onUpdateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  onOpenSEOModal: () => void;
  onOpenSupabaseModal?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  categories = [],
  onApproveBlogger,
  onRejectBlogger,
  onApproveListing,
  onRejectListing,
  onAddListingDirect,
  onApproveWithdrawal,
  onUpdateSettings,
  onOpenSEOModal,
  onOpenSupabaseModal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bloggers' | 'submissions' | 'withdrawals' | 'fraud' | 'settings'>('overview');
  const [rateInput, setRateInput] = useState(stats?.settings?.payPerClickRate || 0.02);
  const [minWithdrawInput, setMinWithdrawInput] = useState(stats?.settings?.minimumWithdrawal || 50);
  const [updating, setUpdating] = useState(false);

  // Admin Direct Site Addition Form State
  const [showDirectAddForm, setShowDirectAddForm] = useState(false);
  const [addingSite, setAddingSite] = useState(false);
  const [newSiteData, setNewSiteData] = useState({
    name: '',
    websiteUrl: '',
    categoryId: categories[0]?.id || 'tube',
    description: '',
    pricingType: 'Freemium',
    editorScore: 92,
    rating: 4.8,
    logoUrl: '',
    primaryAffiliateUrl: '',
    isSponsored: false
  });

  if (!stats) return <div className="p-8 text-center text-zinc-500">Loading Admin Panel...</div>;

  // Dynamic live calculations for guaranteed accurate real-time statistics
  const usersList = stats.users || [];
  const listingsList = stats.listings || [];
  const withdrawalsList = stats.withdrawals || [];
  const clickLogsList = stats.clickLogs || [];

  const totalUsersCount = usersList.length > 0 ? usersList.length : (stats.totalUsers || 0);
  const pendingBloggersCount = usersList.length > 0
    ? usersList.filter((u: User) => u.bloggerStatus === 'pending').length
    : (stats.pendingBloggers || 0);
  const approvedBloggersCount = usersList.length > 0
    ? usersList.filter((u: User) => u.role === 'blogger' && u.bloggerStatus === 'approved').length
    : 0;

  const totalListingsCount = listingsList.length > 0 ? listingsList.length : (stats.totalListings || 0);
  const pendingListingsCount = listingsList.length > 0
    ? listingsList.filter((l: Listing) => l.isApproved === false).length
    : (stats.pendingListings || 0);
  const approvedListingsCount = listingsList.length > 0
    ? listingsList.filter((l: Listing) => l.isApproved !== false).length
    : (totalListingsCount - pendingListingsCount);

  const pendingWithdrawalsList = withdrawalsList.filter((w: WithdrawalRequest) => w.status === 'pending');
  const approvedWithdrawalsList = withdrawalsList.filter((w: WithdrawalRequest) => w.status === 'approved');
  const totalPaidOutAmount = approvedWithdrawalsList.length > 0
    ? approvedWithdrawalsList.reduce((sum: number, w: WithdrawalRequest) => sum + w.amount, 0)
    : (stats.totalPaidOut || 0);

  const totalClicksCount = clickLogsList.length > 0 ? clickLogsList.length : (stats.totalClicks || 0);
  const validClicksCount = clickLogsList.length > 0
    ? clickLogsList.filter((c: ClickLog) => c.validPayout).length
    : (stats.validClicks || 0);

  const handleDirectAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteData.name || !newSiteData.websiteUrl) return;

    setAddingSite(true);
    try {
      if (onAddListingDirect) {
        await onAddListingDirect(newSiteData);
      }
      setNewSiteData({
        name: '',
        websiteUrl: '',
        categoryId: categories[0]?.id || 'tube',
        description: '',
        pricingType: 'Freemium',
        editorScore: 92,
        rating: 4.8,
        logoUrl: '',
        primaryAffiliateUrl: '',
        isSponsored: false
      });
      setShowDirectAddForm(false);
      alert('New site created and published live on directory!');
    } catch (err) {
      console.error(err);
      alert('Failed to publish site.');
    } finally {
      setAddingSite(false);
    }
  };

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await onUpdateSettings({
        payPerClickRate: Number(rateInput),
        minimumWithdrawal: Number(minWithdrawInput)
      });
      alert('Platform settings updated!');
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-zinc-800 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#ff7a00] text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black">YPG Platform Control Center</h1>
            <p className="text-xs text-zinc-400">Admin Operations, Blogger Approvals, Fraud Guard & Financial CMS</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenSupabaseModal && (
            <button
              onClick={onOpenSupabaseModal}
              className="px-4 py-2 bg-[#ff7a00]/20 hover:bg-[#ff7a00]/30 text-[#ff7a00] font-bold text-xs rounded-xl border border-[#ff7a00]/40 transition-colors flex items-center gap-1.5"
            >
              <Database className="w-4 h-4 text-[#ff7a00]" />
              <span>Supabase DB Sync</span>
            </button>
          )}

          <button
            onClick={onOpenSEOModal}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <Globe className="w-4 h-4 text-[#ff7a00]" />
            <span>SEO & Live Sitemap</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Users & Bloggers</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{totalUsersCount}</div>
          <div className="text-[10px] text-amber-500 font-bold">{pendingBloggersCount} Pending Approval ({approvedBloggersCount} Approved)</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Directory Sites</span>
            <Building2 className="w-4 h-4 text-[#ff7a00]" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{totalListingsCount}</div>
          <div className="text-[10px] text-emerald-500 font-bold">{pendingListingsCount} Pending Submissions ({approvedListingsCount} Published)</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Valid Click Logs</span>
            <MousePointer className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{validClicksCount} / {totalClicksCount}</div>
          <div className="text-[10px] text-zinc-500">Filtered for bots & 24h duplicates</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Paid Out</span>
            <DollarSign className="w-4 h-4 text-[#ff7a00]" />
          </div>
          <div className="text-2xl font-black text-emerald-500">${totalPaidOutAmount.toFixed(2)}</div>
          <div className="text-[10px] text-amber-500 font-bold">{pendingWithdrawalsList.length} Pending Payouts</div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'bloggers', label: `Pending Bloggers (${pendingBloggersCount})` },
          { id: 'submissions', label: `Site Submissions (${pendingListingsCount})` },
          { id: 'withdrawals', label: `Pending Withdrawals (${pendingWithdrawalsList.length})` },
          { id: 'fraud', label: 'Fraud & Click Logs' },
          { id: 'settings', label: 'PPC Payout Rates' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#ff7a00] text-white shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'bloggers' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Blogger Applications</h3>
          <div className="space-y-3">
            {stats.users.filter((u: User) => u.bloggerStatus === 'pending').length === 0 ? (
              <p className="text-xs text-zinc-500 p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800">No pending blogger applications.</p>
            ) : (
              stats.users.filter((u: User) => u.bloggerStatus === 'pending').map((u: User) => (
                <div key={u.id} className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={u.avatarUrl} alt={u.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{u.name}</h4>
                      <p className="text-xs text-zinc-500">{u.email} • Bio: {u.bio}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onApproveBlogger(u.id)}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onRejectBlogger(u.id)}
                      className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h3 className="text-base font-black text-zinc-900 dark:text-white">Directory Site Management</h3>
              <p className="text-xs text-zinc-500">Only Admins can directly add new sites or approve user submitted ones.</p>
            </div>
            <button
              onClick={() => setShowDirectAddForm(!showDirectAddForm)}
              className="px-4 py-2 bg-gradient-to-r from-[#ff7a00] to-orange-600 text-white font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showDirectAddForm ? 'Close Add Form' : '+ Directly Add & Publish Site'}</span>
            </button>
          </div>

          {/* Admin Direct Site Publisher Form */}
          {showDirectAddForm && (
            <form onSubmit={handleDirectAddSubmit} className="p-6 rounded-3xl bg-white dark:bg-[#18181b] border-2 border-[#ff7a00]/30 space-y-4 text-xs shadow-xl">
              <div className="flex items-center gap-2 text-[#ff7a00] font-black border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">Admin Direct Site Publisher (Instant Directory Release)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Site / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSiteData.name}
                    onChange={(e) => setNewSiteData({ ...newSiteData, name: e.target.value })}
                    placeholder="e.g. Candy AI VR"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={newSiteData.websiteUrl}
                    onChange={(e) => setNewSiteData({ ...newSiteData, websiteUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newSiteData.categoryId}
                    onChange={(e) => setNewSiteData({ ...newSiteData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Pricing Model
                  </label>
                  <select
                    value={newSiteData.pricingType}
                    onChange={(e) => setNewSiteData({ ...newSiteData, pricingType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                  >
                    <option value="Free">Free</option>
                    <option value="Freemium">Freemium</option>
                    <option value="Subscription">Subscription</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Editor Score (0-100)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newSiteData.editorScore}
                    onChange={(e) => setNewSiteData({ ...newSiteData, editorScore: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Primary Affiliate / Outgoing Link (Optional)
                </label>
                <input
                  type="url"
                  value={newSiteData.primaryAffiliateUrl}
                  onChange={(e) => setNewSiteData({ ...newSiteData, primaryAffiliateUrl: e.target.value })}
                  placeholder="https://affiliate-link.com?ref=ypg"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Description / Features *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newSiteData.description}
                  onChange={(e) => setNewSiteData({ ...newSiteData, description: e.target.value })}
                  placeholder="Key features, content speed, VR compatibility..."
                  className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-zinc-700 dark:text-zinc-300">
                  <input
                    type="checkbox"
                    checked={newSiteData.isSponsored}
                    onChange={(e) => setNewSiteData({ ...newSiteData, isSponsored: e.target.checked })}
                    className="w-4 h-4 rounded text-[#ff7a00] focus:ring-[#ff7a00]"
                  />
                  <span>Mark as Sponsored / Featured Site</span>
                </label>

                <button
                  type="submit"
                  disabled={addingSite}
                  className="px-6 py-2 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{addingSite ? 'Publishing...' : 'Publish Live to Directory'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Pending Submissions Queue */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Pending Submissions Awaiting Admin Approval ({stats.listings.filter((l: Listing) => l.isApproved === false).length})
            </h4>

            {stats.listings.filter((l: Listing) => l.isApproved === false).length === 0 ? (
              <p className="text-xs text-zinc-500 p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800">
                No pending site submissions.
              </p>
            ) : (
              stats.listings.filter((l: Listing) => l.isApproved === false).map((l: Listing) => (
                <div key={l.id} className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={l.logoUrl}
                      alt={l.name}
                      className="w-10 h-10 rounded-xl object-cover bg-black"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80';
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{l.name}</h4>
                      <p className="text-xs text-zinc-500">{l.categoryName} • URL: {l.websiteUrl}</p>
                      <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{l.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onApproveListing(l.id)}
                      className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish</span>
                    </button>
                    {onRejectListing && (
                      <button
                        onClick={() => onRejectListing(l.id)}
                        className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Active Published Sites */}
          <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              Live Approved Directory Sites ({stats.listings.filter((l: Listing) => l.isApproved !== false).length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {stats.listings.filter((l: Listing) => l.isApproved !== false).slice(0, 20).map((l: Listing) => (
                <div key={l.id} className="p-3 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <img src={l.logoUrl} alt={l.name} className="w-8 h-8 rounded-lg object-cover bg-black shrink-0" />
                    <div className="truncate">
                      <h5 className="font-bold text-xs text-zinc-900 dark:text-white truncate">{l.name}</h5>
                      <p className="text-[10px] text-zinc-500 truncate">{l.categoryName} • Score: {l.editorScore}</p>
                    </div>
                  </div>
                  {onRejectListing && (
                    <button
                      onClick={() => onRejectListing(l.id)}
                      className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors shrink-0"
                      title="Remove from directory"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {activeTab === 'withdrawals' && (
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pending Blogger Payouts ({pendingWithdrawalsList.length})</h3>
            {pendingWithdrawalsList.length === 0 ? (
              <p className="text-xs text-zinc-500 p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800">
                No pending withdrawal requests. All blogger payouts are up to date!
              </p>
            ) : (
              pendingWithdrawalsList.map((w: WithdrawalRequest) => (
                <div key={w.id} className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">${w.amount.toFixed(2)} to {w.userName}</h4>
                    <p className="text-xs text-zinc-500">Method: {w.method.toUpperCase()} • Details: {w.paymentDetails} • Date: {w.createdAt}</p>
                  </div>

                  <button
                    onClick={() => onApproveWithdrawal(w.id)}
                    className="px-4 py-2 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Mark Paid</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Approved Completed Payouts */}
          <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              Approved Payout History (${totalPaidOutAmount.toFixed(2)} Total Paid)
            </h4>
            {approvedWithdrawalsList.length === 0 ? (
              <p className="text-xs text-zinc-500 p-3 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800">
                No completed payouts recorded yet.
              </p>
            ) : (
              <div className="space-y-2">
                {approvedWithdrawalsList.map((w: WithdrawalRequest) => (
                  <div key={w.id} className="p-3 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div>
                        <span className="font-bold text-zinc-900 dark:text-white">${w.amount.toFixed(2)}</span>
                        <span className="text-zinc-500"> to {w.userName} ({w.method.toUpperCase()})</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Paid
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'fraud' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Real-Time Click Audit Logs</h3>
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#18181b]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold uppercase">
                  <th className="p-3">Target</th>
                  <th className="p-3">IP Hash</th>
                  <th className="p-3">Device / User Agent</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {stats.clickLogs.slice(0, 15).map((log: ClickLog) => (
                  <tr key={log.id}>
                    <td className="p-3 font-bold text-zinc-900 dark:text-white">{log.targetTitle}</td>
                    <td className="p-3 font-mono text-zinc-500">{log.visitorIpHash}</td>
                    <td className="p-3 text-zinc-400 truncate max-w-xs">{log.userAgent}</td>
                    <td className="p-3 font-bold">
                      {log.isBot ? (
                        <span className="text-rose-500">Bot Blocked</span>
                      ) : log.isDuplicate ? (
                        <span className="text-amber-500">24h Duplicate</span>
                      ) : (
                        <span className="text-emerald-500">Valid Unique</span>
                      )}
                    </td>
                    <td className="p-3 font-black text-emerald-500">${log.payoutAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <form onSubmit={handleSettingsSave} className="max-w-md space-y-4 p-6 rounded-3xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 text-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Configure Blogger Revenue & Fraud Engine</h3>
          
          <div>
            <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Pay-Per-Click Rate ($ per valid unique click)
            </label>
            <input
              type="number"
              step="0.01"
              value={rateInput}
              onChange={(e) => setRateInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Minimum Withdrawal Threshold ($)
            </label>
            <input
              type="number"
              value={minWithdrawInput}
              onChange={(e) => setMinWithdrawInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="w-full py-2.5 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-md"
          >
            {updating ? 'Saving...' : 'Save Config'}
          </button>
        </form>
      )}

    </div>
  );
};
