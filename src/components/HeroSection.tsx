import React from 'react';
import {
  Search,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  Tv,
  Bot,
  Video,
  Glasses,
  Heart,
  Gamepad2,
  Star,
  ShoppingBag,
  Flame,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Category } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  categories: Category[];
  totalListingsCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onSelectCategory,
  categories,
  totalListingsCount
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tv': return <Tv className="w-5 h-5 text-[#ff7a00]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'Bot': return <Bot className="w-5 h-5 text-indigo-400" />;
      case 'Video': return <Video className="w-5 h-5 text-emerald-400" />;
      case 'Glasses': return <Glasses className="w-5 h-5 text-purple-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-cyan-400" />;
      case 'Star': return <Star className="w-5 h-5 text-yellow-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-orange-400" />;
      case 'ShieldCheck': return <Shield className="w-5 h-5 text-blue-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-red-500" />;
      default: return <Sparkles className="w-5 h-5 text-[#ff7a00]" />;
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-100 via-white to-zinc-50 dark:from-zinc-950 dark:via-[#111111] dark:to-zinc-900 border-b border-zinc-200 dark:border-zinc-800/80 pt-8 pb-12 transition-colors">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-[#ff7a00]/10 via-orange-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center mb-1">
            <div className="relative group p-1 bg-black rounded-full border-2 border-[#ff7a00] shadow-xl shadow-[#ff7a00]/20 flex items-center gap-3 pr-4">
              <img
                src="/logo.jpg"
                alt="Your Porn Guy Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <span className="block text-xs font-black tracking-wider text-white uppercase">Your Porn Guy</span>
                <span className="block text-[10px] text-[#ff7a00] font-bold tracking-widest uppercase">Official Affiliate Portal</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-[#ff7a00] text-xs font-bold tracking-wide uppercase">
            <Zap className="w-3.5 h-3.5 fill-[#ff7a00]" />
            <span>The #1 Verified Adult Directory & Review Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
            Discover <span className="text-[#ff7a00]">•</span> Compare <span className="text-[#ff7a00]">•</span> Enjoy
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Explore over <strong className="text-zinc-900 dark:text-white font-bold">15,000+ hand-curated websites</strong> across Tube, Premium Studios, AI Companions, Live Cams, VR, Games, Dating, and Sex Toys.
          </p>
        </div>

        {/* Large Central Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-2xl rounded-2xl border-2 border-zinc-200 dark:border-zinc-700/80 bg-white dark:bg-[#18181b] focus-within:border-[#ff7a00] transition-all overflow-hidden p-1.5">
            <div className="pl-3 text-zinc-400">
              <Search className="w-5 h-5 text-[#ff7a00]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search over 15,000 websites, games, AI girls, or cams..."
              className="w-full px-3 py-2.5 text-sm sm:text-base font-medium text-zinc-900 dark:text-white bg-transparent focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-2 py-1 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                Clear
              </button>
            )}
            <button
              className="px-5 py-2.5 bg-gradient-to-r from-[#ff7a00] to-orange-600 hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter Tag suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-400">Popular Searches:</span>
            {['4K Premium', 'Candy AI', 'Lovense Toys', '8K VR', 'Free Cams', 'NordVPN'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 hover:bg-[#ff7a00]/10 hover:text-[#ff7a00] border border-zinc-200 dark:border-zinc-700/50 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Showcase Grid (Large Cards) */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.slice(0, 12).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group text-left p-3.5 rounded-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800/90 hover:border-[#ff7a00] dark:hover:border-[#ff7a00] shadow-sm hover:shadow-xl hover:shadow-[#ff7a00]/10 transition-all flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 group-hover:bg-[#ff7a00]/10 transition-colors">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 font-semibold">
                    {cat.listingCount.toLocaleString()}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-[#ff7a00] transition-colors leading-tight">
                  {cat.name}
                </h3>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                <span>Browse</span>
                <ArrowRight className="w-3 h-3 text-[#ff7a00] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* Feature & Security Banner Ticker */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>100% Anti-Virus & Malware Audited</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#ff7a00]" />
            <span>24/7 Fraud Guard & Bot Filter Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Blogger Payout Engine ($0.02 - $0.05 / PPC)</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Daily Updated Deals & Discount Links</span>
          </div>
        </div>

      </div>
    </div>
  );
};
