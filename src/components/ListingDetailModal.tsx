import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Star,
  Check,
  X as XMark,
  ShieldCheck,
  Award,
  ThumbsUp,
  MessageSquare,
  Gift,
  Share2,
  Bookmark,
  Building2,
  Send
} from 'lucide-react';
import { Listing, ListingReview } from '../types';

interface ListingDetailModalProps {
  listing: Listing | null;
  reviews: ListingReview[];
  relatedListings: Listing[];
  onClose: () => void;
  onAffiliateClick: (listing: Listing, isSecondary?: boolean) => void;
  onSubmitReview: (listingId: string, rating: number, comment: string) => void;
  onSelectListing: (listing: Listing) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  reviews,
  relatedListings,
  onClose,
  onAffiliateClick,
  onSubmitReview,
  onSelectListing
}) => {
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!listing) return null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    onSubmitReview(listing.id, userRating, userComment);
    setUserComment('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-y-auto my-8">
        
        {/* Sticky Header Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <img
              src={listing.logoUrl}
              alt={listing.name}
              className="w-9 h-9 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700 bg-black"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80';
              }}
            />
            <div>
              <h2 className="text-lg font-black text-zinc-900 dark:text-white leading-tight">
                {listing.name}
              </h2>
              <p className="text-xs text-zinc-500 font-medium">{listing.categoryName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl transition-colors ${
                bookmarked ? 'text-[#ff7a00] bg-[#ff7a00]/10' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              title="Save to bookmarks"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Banner Hero */}
        <div className="relative h-64 sm:h-80 w-full bg-zinc-900 overflow-hidden">
          <img
            src={listing.thumbnailUrl}
            alt={listing.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&h=380&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/40 to-transparent" />

          {/* Hero Badges */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#ff7a00] text-white text-xs font-black uppercase">
                  {listing.categoryName}
                </span>
                {listing.isVerified && (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-xs font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Official
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-lg bg-black/60 text-white text-xs font-semibold backdrop-blur-md">
                  {listing.pricingType}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
                {listing.name} Review
              </h1>
            </div>

            {/* Editor Score & Rating */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-emerald-500 text-white font-black text-center shadow-lg">
                <div className="text-xl leading-none">{listing.editorScore}</div>
                <div className="text-[10px] uppercase font-bold text-emerald-100">Editor Score</div>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-amber-500 text-white font-black text-center shadow-lg">
                <div className="text-xl leading-none flex items-center gap-1">
                  <Star className="w-4 h-4 fill-white" />
                  <span>{listing.rating.toFixed(1)}</span>
                </div>
                <div className="text-[10px] uppercase font-bold text-amber-100">User Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8">
          
          {/* Primary Action Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#ff7a00]/10 via-orange-500/5 to-transparent border border-[#ff7a00]/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Official Access Link
              </h3>
              <p className="text-xs text-zinc-500">
                Direct referral channel with guaranteed high performance & updated offers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {listing.secondaryAffiliateLabel && (
                <button
                  onClick={() => onAffiliateClick(listing, true)}
                  className="px-4 py-2.5 text-xs font-bold text-[#ff7a00] bg-white dark:bg-zinc-800 hover:bg-[#ff7a00]/10 border border-[#ff7a00] rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Gift className="w-4 h-4" />
                  <span>{listing.secondaryAffiliateLabel}</span>
                </button>
              )}

              <button
                onClick={() => onAffiliateClick(listing)}
                className="px-6 py-2.5 text-sm font-extrabold text-white bg-gradient-to-r from-[#ff7a00] to-orange-600 hover:opacity-95 rounded-xl shadow-lg shadow-[#ff7a00]/25 transition-all flex items-center gap-2"
              >
                <span>Visit {listing.name}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full Description & Overview */}
          <div className="space-y-3">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white">Overview & Features</h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
              {listing.fullDescription || listing.description}
            </p>
          </div>

          {/* Pros & Cons Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Pros */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-3">
              <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Pros</span>
              </h4>
              <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                {listing.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-4 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 space-y-3">
              <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <XMark className="w-4 h-4" />
                <span>Cons</span>
              </h4>
              <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                {listing.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* User Reviews Section */}
          <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#ff7a00]" />
                <span>User Reviews ({reviews.length})</span>
              </h3>
            </div>

            {/* Submit Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Leave Your Rating</h4>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Rating:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= userRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-zinc-300 dark:text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Write your honest review..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-[#ff7a00] text-zinc-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ff7a00] text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-colors shrink-0 flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit</span>
                </button>
              </div>
            </form>

            {/* Reviews List */}
            <div className="space-y-3">
              {reviews.length === 0 ? (
                <p className="text-xs text-zinc-500 text-center py-4">Be the first to leave a review for {listing.name}!</p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={rev.userAvatar} alt={rev.userName} className="w-6 h-6 rounded-full object-cover" referrerPolicy="no-referrer" />
                        <span className="font-bold text-zinc-900 dark:text-white">{rev.userName}</span>
                        {rev.verifiedUser && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-500 font-semibold">Verified</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Related Listings */}
          {relatedListings.length > 0 && (
            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Similar Alternatives</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relatedListings.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectListing(rel)}
                    className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-[#ff7a00] text-left transition-all group"
                  >
                    <img src={rel.logoUrl} alt={rel.name} className="w-8 h-8 rounded-lg object-cover mb-2" referrerPolicy="no-referrer" />
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-[#ff7a00] transition-colors line-clamp-1">{rel.name}</h4>
                    <p className="text-[10px] text-zinc-500">Score: {rel.editorScore}/100</p>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
