import React from 'react';
import {
  ExternalLink,
  Star,
  Check,
  ShieldCheck,
  Sparkles,
  Award,
  GitCompare,
  Plus,
  Eye,
  Gift
} from 'lucide-react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onOpenDetails: (listing: Listing) => void;
  onSelectForCompare: (listing: Listing) => void;
  isCompared: boolean;
  onAffiliateClick: (listing: Listing, isSecondary?: boolean) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onOpenDetails,
  onSelectForCompare,
  isCompared,
  onAffiliateClick
}) => {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-[#18181b] border transition-all overflow-hidden shadow-sm hover:shadow-2xl ${
        listing.isSponsored
          ? 'border-[#ff7a00]/80 shadow-[#ff7a00]/10 ring-1 ring-[#ff7a00]/30'
          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
      }`}
    >
      {/* Top Banner & Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
        <img
          src={listing.thumbnailUrl}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&h=380&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges: Sponsored & Verified */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {listing.isSponsored && (
            <span className="px-2 py-0.5 rounded-md bg-[#ff7a00] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
              Featured
            </span>
          )}
          {listing.isVerified && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-white text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}
          <span className="px-2 py-0.5 rounded-md bg-black/60 text-zinc-200 text-[10px] font-semibold border border-white/10 backdrop-blur-sm">
            {listing.pricingType}
          </span>
        </div>

        {/* Top Right: Compare Toggle Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectForCompare(listing);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1 ${
            isCompared
              ? 'bg-[#ff7a00] text-white border-[#ff7a00] shadow-md'
              : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
          }`}
          title="Compare this site"
        >
          <GitCompare className="w-3.5 h-3.5" />
          <span className="text-[10px]">{isCompared ? 'Compared' : 'Compare'}</span>
        </button>

        {/* Bottom Banner Content Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between z-10 text-white">
          <div className="flex items-center gap-2.5">
            <img
              src={listing.logoUrl}
              alt={listing.name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-white/20 bg-black shadow-md shrink-0"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80';
              }}
            />
            <div>
              <h3 className="text-base font-black leading-tight group-hover:text-[#ff7a00] transition-colors drop-shadow">
                {listing.name}
              </h3>
              <p className="text-[11px] font-medium text-zinc-300 drop-shadow">
                {listing.categoryName}
              </p>
            </div>
          </div>

          {/* Editor Score Badge */}
          <div className="flex flex-col items-end shrink-0">
            <div className="px-2 py-0.5 rounded-lg bg-emerald-500 text-white font-black text-xs shadow-md flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span>{listing.editorScore}/100</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-amber-300 font-semibold mt-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{listing.rating.toFixed(1)}</span>
              <span className="text-zinc-400">({listing.userRatingCount.toLocaleString()})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          {/* Pros List Chips */}
          <div className="mt-3 space-y-1">
            {listing.pros.slice(0, 2).map((pro, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-zinc-700 dark:text-zinc-300">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{pro}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {listing.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: Visit Website & Details */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenDetails(listing)}
              className="px-3 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-zinc-500" />
              <span>Read Review</span>
            </button>

            <button
              onClick={() => onAffiliateClick(listing)}
              className="px-3 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#ff7a00] to-orange-600 hover:opacity-95 rounded-xl transition-all shadow-md shadow-[#ff7a00]/20 flex items-center justify-center gap-1.5"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Secondary Deal Link if present */}
          {listing.secondaryAffiliateLabel && (
            <button
              onClick={() => onAffiliateClick(listing, true)}
              className="w-full px-2.5 py-1 text-[11px] font-bold text-[#ff7a00] bg-[#ff7a00]/10 hover:bg-[#ff7a00]/20 rounded-lg transition-colors flex items-center justify-center gap-1 border border-[#ff7a00]/30"
            >
              <Gift className="w-3 h-3" />
              <span>{listing.secondaryAffiliateLabel}</span>
            </button>
          )}

        </div>
      </div>
    </div>
  );
};
