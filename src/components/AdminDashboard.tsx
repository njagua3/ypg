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
  Database
} from 'lucide-react';
import {
  User,
  BloggerProfile,
  WithdrawalRequest,
  ClickLog,
  SiteSettings,
  Listing,
  AdBanner
} from '../types';

interface AdminDashboardProps {
  stats: any;
  onApproveBlogger: (id: string) => Promise<void>;
  onRejectBlogger: (id: string) => Promise<void>;
  onApproveListing: (id: string) => Promise<void>;
  onApproveWithdrawal: (id: string) => Promise<void>;
  onUpdateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  onOpenSEOModal: () => void;
  onOpenSupabaseModal?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  onApproveBlogger,
  onRejectBlogger,
  onApproveListing,
  onApproveWithdrawal,
  onUpdateSettings,
  onOpenSEOModal,
  onOpenSupabaseModal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bloggers' | 'submissions' | 'withdrawals' | 'fraud' | 'settings'>('overview');
  const [rateInput, setRateInput] = useState(stats?.settings?.payPerClickRate || 0.02);
  const [minWithdrawInput, setMinWithdrawInput] = useState(stats?.settings?.minimumWithdrawal || 50);
  const [updating, setUpdating] = useState(false);

  if (!stats) return <div className="p-8 text-center text-zinc-500">Loading Admin CMS...</div>;

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
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{stats.totalUsers}</div>
          <div className="text-[10px] text-amber-500 font-bold">{stats.pendingBloggers} Pending Approval</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Directory Sites</span>
            <Building2 className="w-4 h-4 text-[#ff7a00]" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{stats.totalListings}</div>
          <div className="text-[10px] text-emerald-500 font-bold">{stats.pendingListings} Webmaster Submissions</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Valid Click Logs</span>
            <MousePointer className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{stats.validClicks} / {stats.totalClicks}</div>
          <div className="text-[10px] text-zinc-500">Filtered for bots & 24h duplicates</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Paid Out</span>
            <DollarSign className="w-4 h-4 text-[#ff7a00]" />
          </div>
          <div className="text-2xl font-black text-emerald-500">${stats.totalPaidOut.toFixed(2)}</div>
          <div className="text-[10px] text-amber-500 font-bold">{stats.pendingWithdrawals.length} Pending Payouts</div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'bloggers', label: `Pending Bloggers (${stats.pendingBloggers})` },
          { id: 'submissions', label: `Site Submissions (${stats.pendingListings})` },
          { id: 'withdrawals', label: `Pending Withdrawals (${stats.pendingWithdrawals.length})` },
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
        <div className="space-y-4">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Webmaster Site Submissions</h3>
          <div className="space-y-3">
            {stats.listings.filter((l: Listing) => l.isApproved === false).length === 0 ? (
              <p className="text-xs text-zinc-500 p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800">No pending site submissions.</p>
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
                    </div>
                  </div>

                  <button
                    onClick={() => onApproveListing(l.id)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm"
                  >
                    Approve & Publish
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'withdrawals' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pending Blogger Payouts</h3>
          <div className="space-y-3">
            {stats.pendingWithdrawals.length === 0 ? (
              <p className="text-xs text-zinc-500 p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800">No pending withdrawal requests.</p>
            ) : (
              stats.pendingWithdrawals.map((w: WithdrawalRequest) => (
                <div key={w.id} className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">${w.amount.toFixed(2)} to {w.userName}</h4>
                    <p className="text-xs text-zinc-500">Method: {w.method.toUpperCase()} • Details: {w.paymentDetails}</p>
                  </div>

                  <button
                    onClick={() => onApproveWithdrawal(w.id)}
                    className="px-4 py-2 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-sm"
                  >
                    Approve & Mark Paid
                  </button>
                </div>
              ))
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
