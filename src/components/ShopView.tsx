import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Star,
  Heart,
  ExternalLink,
  Sparkles,
  Tag,
  Gift,
  Check
} from 'lucide-react';
import { Product } from '../types';

interface ShopViewProps {
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onBuyNowClick: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  onToggleWishlist,
  onBuyNowClick
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('featured');

  const categories = ['All', 'Adult Toys', 'Lingerie', 'Accessories', 'VPN', 'Streaming Devices'];

  let filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (sortOption === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Shop Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-zinc-800 p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff7a00]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7a00]/20 border border-[#ff7a00]/40 text-[#ff7a00] text-xs font-bold uppercase">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Affiliate Gear & Product Marketplace</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black">
            Curated Adult Toys, Luxury Lingerie & Hardware
          </h1>

          <p className="text-sm text-zinc-400">
            Handpicked smart teledildonics, couples games, luxury satin lingerie, and streaming devices with exclusive reader discounts.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        
        {/* Category Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#ff7a00] text-white shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-[#ff7a00] text-zinc-900 dark:text-white"
            />
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
          >
            <option value="featured">Featured First</option>
            <option value="rating">Highest Rated</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 hover:border-[#ff7a00] p-4 transition-all shadow-sm hover:shadow-2xl overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative aspect-square w-full rounded-2xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden mb-4">
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges */}
              <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                {prod.isPopular && (
                  <span className="px-2 py-0.5 rounded-md bg-[#ff7a00] text-white text-[10px] font-black uppercase shadow-md">
                    Popular
                  </span>
                )}
                {prod.originalPrice && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold shadow-md">
                    {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(prod.id)}
                className={`absolute top-2.5 right-2.5 p-2 rounded-full border backdrop-blur-md transition-colors ${
                  prod.inWishlist
                    ? 'bg-rose-500 text-white border-rose-500'
                    : 'bg-black/60 text-white border-white/20 hover:bg-black'
                }`}
                title="Add to wishlist"
              >
                <Heart className={`w-3.5 h-3.5 ${prod.inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Content Details */}
            <div className="space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-semibold mb-1">
                  <span>{prod.brand || prod.category}</span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{prod.rating.toFixed(1)}</span>
                    <span className="text-zinc-500">({prod.reviewCount})</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-[#ff7a00] transition-colors leading-tight">
                  {prod.name}
                </h3>

                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {prod.description}
                </p>
              </div>

              {/* Price & Buy Now Button */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between mt-3">
                <div>
                  <div className="text-lg font-black text-zinc-900 dark:text-white leading-none">
                    ${prod.price.toFixed(2)}
                  </div>
                  {prod.originalPrice && (
                    <div className="text-[11px] text-zinc-400 line-through">
                      ${prod.originalPrice.toFixed(2)}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onBuyNowClick(prod)}
                  className="px-4 py-2 bg-gradient-to-r from-[#ff7a00] to-orange-600 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Buy Now</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
