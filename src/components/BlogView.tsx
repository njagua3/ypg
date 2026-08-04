import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Clock,
  Eye,
  ThumbsUp,
  PenTool,
  Sparkles,
  ArrowRight,
  TrendingUp,
  User as UserIcon
} from 'lucide-react';
import { BlogPost, User } from '../types';

interface BlogViewProps {
  blogs: BlogPost[];
  currentUser: User;
  onSelectBlog: (blog: BlogPost) => void;
  onOpenCreateModal: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  blogs,
  currentUser,
  onSelectBlog,
  onOpenCreateModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'News', 'Reviews', 'Guides', 'Tutorials', 'Industry', 'AI', 'Videos'];

  const filtered = blogs.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = blogs.find((b) => b.isFeatured) || blogs[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Blog Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff7a00]/10 text-[#ff7a00] text-xs font-bold uppercase mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SEO Multi-Author Magazine & News</span>
          </div>

          <h1 className="text-3xl font-black text-zinc-900 dark:text-white">
            Industry Insights, VR Reviews & AI Guides
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Written by approved industry analysts and tech reviewers.
          </p>
        </div>

        {/* Blogger Create Post CTA */}
        {(currentUser.role === 'blogger' || currentUser.role === 'admin') && (
          <button
            onClick={onOpenCreateModal}
            className="px-5 py-2.5 bg-gradient-to-r from-[#ff7a00] to-orange-600 hover:opacity-95 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-[#ff7a00]/20 transition-all flex items-center gap-2"
          >
            <PenTool className="w-4 h-4" />
            <span>Write & Publish Article</span>
          </button>
        )}
      </div>

      {/* Featured Headline Article */}
      {featured && (
        <div
          onClick={() => onSelectBlog(featured)}
          className="group relative rounded-3xl bg-zinc-900 overflow-hidden cursor-pointer shadow-xl border border-zinc-800 hover:border-[#ff7a00] transition-all grid grid-cols-1 lg:grid-cols-2"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <img
              src={featured.coverImageUrl}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&h=380&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 lg:hidden" />
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between text-white space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#ff7a00] text-white font-black text-xs uppercase">
                  Featured
                </span>
                <span className="text-xs text-zinc-400 font-semibold">{featured.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black group-hover:text-[#ff7a00] transition-colors leading-tight">
                {featured.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                {featured.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <img src={featured.authorAvatar} alt={featured.authorName} className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
                <span className="font-bold text-white">{featured.authorName}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readTimeMinutes} min
                </span>
                <ArrowRight className="w-4 h-4 text-[#ff7a00] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#ff7a00] text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <div
            key={post.id}
            onClick={() => onSelectBlog(post)}
            className="group cursor-pointer rounded-3xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 hover:border-[#ff7a00] p-4 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-3">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&h=380&q=80';
                  }}
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold backdrop-blur-md">
                  {post.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-[#ff7a00] transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>

              <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 mt-4">
              <div className="flex items-center gap-1.5">
                <img src={post.authorAvatar} alt={post.authorName} className="w-5 h-5 rounded-full object-cover" referrerPolicy="no-referrer" />
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">{post.authorName}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5">
                  <Clock className="w-3 h-3" />
                  {post.readTimeMinutes} min
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
