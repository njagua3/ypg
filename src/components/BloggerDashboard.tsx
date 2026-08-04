import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  Eye,
  MousePointer,
  Percent,
  DollarSign,
  ArrowUpRight,
  BookOpen,
  Clock,
  Send,
  AlertCircle,
  CheckCircle2,
  Building2,
  Globe,
  Plus
} from 'lucide-react';
import { BloggerProfile, BlogPost, WithdrawalRequest, ClickLog } from '../types';

interface BloggerDashboardProps {
  profile: BloggerProfile;
  blogs: BlogPost[];
  withdrawals: WithdrawalRequest[];
  recentClicks: ClickLog[];
  payPerClickRate: number;
  minimumWithdrawal: number;
  onRequestWithdrawal: (amount: number, method: 'bank' | 'paypal' | 'usdt', paymentDetails: string) => Promise<void>;
  onOpenCreateBlogModal: () => void;
}

export const BloggerDashboard: React.FC<BloggerDashboardProps> = ({
  profile,
  blogs,
  withdrawals,
  recentClicks,
  payPerClickRate,
  minimumWithdrawal,
  onRequestWithdrawal,
  onOpenCreateBlogModal
}) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(minimumWithdrawal);
  const [withdrawMethod, setWithdrawMethod] = useState<'bank' | 'paypal' | 'usdt'>('usdt');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentDetails.trim()) return;

    setSubmitting(true);
    try {
      await onRequestWithdrawal(withdrawAmount, withdrawMethod, paymentDetails);
      setMsg('Withdrawal request submitted! Pending admin processing.');
      setTimeout(() => {
        setShowWithdrawModal(false);
        setMsg('');
      }, 2000);
    } catch (err: any) {
      setMsg(err.message || 'Error requesting withdrawal');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#ff7a00]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-zinc-900 dark:text-white">{profile.name}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                profile.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
              }`}>
                {profile.status}
              </span>
            </div>
            <p className="text-xs text-zinc-500">{profile.email} • Blogger Payout Rate: <strong className="text-[#ff7a00]">${payPerClickRate.toFixed(2)} / valid click</strong></p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCreateBlogModal}
            className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#ff7a00]" />
            <span>New Blog Post</span>
          </button>

          <button
            onClick={() => setShowWithdrawModal(true)}
            disabled={profile.availableBalance < minimumWithdrawal}
            className={`px-5 py-2.5 rounded-xl text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-2 ${
              profile.availableBalance >= minimumWithdrawal
                ? 'bg-gradient-to-r from-[#ff7a00] to-orange-600 hover:opacity-95'
                : 'bg-zinc-400 dark:bg-zinc-800 cursor-not-allowed opacity-60'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Withdraw (${profile.availableBalance.toFixed(2)})</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Views</span>
            <Eye className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">
            {profile.totalViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-500">Recorded article impressions</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Valid Payout Clicks</span>
            <MousePointer className="w-4 h-4 text-[#ff7a00]" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">
            {profile.totalClicks.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-500 font-semibold">
            CTR: {profile.ctr.toFixed(1)}%
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Available Balance</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-500">
            ${profile.availableBalance.toFixed(2)}
          </div>
          <div className="text-[11px] text-zinc-500">Min Payout: ${minimumWithdrawal.toFixed(2)}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Paid Out</span>
            <CheckCircle2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">
            ${profile.paidEarnings.toFixed(2)}
          </div>
          <div className="text-[11px] text-zinc-500">Pending: ${profile.pendingEarnings.toFixed(2)}</div>
        </div>

      </div>

      {/* Published Blogs Table & Withdrawals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Blogs List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#ff7a00]" />
            <span>My Published Articles ({blogs.length})</span>
          </h3>

          <div className="space-y-3">
            {blogs.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={b.coverImageUrl} alt={b.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-1">{b.title}</h4>
                    <p className="text-[11px] text-zinc-500">{b.category} • Published {b.publishedAt}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-zinc-900 dark:text-white">{b.views} Views</div>
                  <div className="text-[11px] font-semibold text-[#ff7a00]">{b.uniqueClicks} Valid Clicks</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal History & Wallet Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-500" />
            <span>Payout Requests</span>
          </h3>

          <div className="space-y-3">
            {withdrawals.length === 0 ? (
              <p className="text-xs text-zinc-500 p-4 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800">No withdrawal requests yet.</p>
            ) : (
              withdrawals.map((w) => (
                <div key={w.id} className="p-3.5 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900 dark:text-white">${w.amount.toFixed(2)} via {w.method.toUpperCase()}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      w.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {w.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate">{w.paymentDetails}</p>
                  <p className="text-[10px] text-zinc-400">Requested: {w.createdAt}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Withdrawal Request Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="font-black text-zinc-900 dark:text-white text-base">Request Earnings Payout</h3>
              <button onClick={() => setShowWithdrawModal(false)} className="text-zinc-400">
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>

            {msg && <p className="text-xs font-bold text-[#ff7a00] p-2 bg-[#ff7a00]/10 rounded-xl">{msg}</p>}

            <form onSubmit={handleWithdraw} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Payout Amount ($)
                </label>
                <input
                  type="number"
                  min={minimumWithdrawal}
                  max={profile.availableBalance}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Payment Method
                </label>
                <select
                  value={withdrawMethod}
                  onChange={(e) => setWithdrawMethod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                >
                  <option value="usdt">USDT (TRC20 Crypto)</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank">Direct Bank Wire</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Payment Destination Details
                </label>
                <input
                  type="text"
                  required
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  placeholder="USDT Wallet address or PayPal email"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-md"
                >
                  {submitting ? 'Submitting...' : 'Confirm Withdrawal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
