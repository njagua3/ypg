import React, { useState } from 'react';
import {
  X,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Bookmark,
  MessageSquare,
  Send,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { BlogPost, BlogComment } from '../types';

interface BlogPostDetailModalProps {
  blog: BlogPost | null;
  comments: BlogComment[];
  relatedBlogs: BlogPost[];
  onClose: () => void;
  onLike: (blogId: string) => void;
  onSubmitComment: (blogId: string, comment: string) => void;
  onBlogAffiliateClick: (blog: BlogPost) => void;
}

export const BlogPostDetailModal: React.FC<BlogPostDetailModalProps> = ({
  blog,
  comments,
  relatedBlogs,
  onClose,
  onLike,
  onSubmitComment,
  onBlogAffiliateClick
}) => {
  const [commentText, setCommentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!blog) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onSubmitComment(blog.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-y-auto my-8">
        
        {/* Sticky Top Header Controls */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white/90 dark:bg-[#18181b]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#ff7a00]/10 text-[#ff7a00] font-bold text-xs">
              {blog.category}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTimeMinutes} min read
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-xl transition-colors ${
                bookmarked ? 'text-[#ff7a00] bg-[#ff7a00]/10' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              title="Bookmark article"
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

        {/* Hero Banner */}
        <div className="relative h-64 sm:h-80 w-full bg-zinc-900 overflow-hidden">
          <img
            src={blog.coverImageUrl}
            alt={blog.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&h=380&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-[#18181b]/30 to-transparent" />

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
              {blog.title}
            </h1>

            {/* Author Profile Card */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={blog.authorAvatar}
                alt={blog.authorName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                referrerPolicy="no-referrer"
              />
              <div className="text-xs text-white">
                <p className="font-bold">{blog.authorName}</p>
                <p className="text-zinc-300 text-[11px]">{blog.authorRole} • Published {blog.publishedAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 space-y-8 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
          
          {/* Blogger Affiliate Offer Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#ff7a00]/10 to-orange-500/5 border border-[#ff7a00]/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff7a00]">Featured Recommendation</span>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                Try the #1 Recommended Platform in this Guide
              </h4>
              <p className="text-xs text-zinc-500">
                Support our author by checking out our verified sponsor deal.
              </p>
            </div>

            <button
              onClick={() => onBlogAffiliateClick(blog)}
              className="px-5 py-2.5 bg-[#ff7a00] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Visit Recommended Deal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Content Markdown Formatted */}
          <div className="prose dark:prose-invert max-w-none space-y-4">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                return <h1 key={idx} className="text-2xl font-black text-zinc-900 dark:text-white mt-6 mb-2">{paragraph.replace('# ', '')}</h1>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-xl font-bold text-zinc-900 dark:text-white mt-5 mb-2">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={idx} className="text-lg font-bold text-zinc-900 dark:text-white mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
              }
              return <p key={idx} className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{paragraph}</p>;
            })}
          </div>

          {/* Social Stats & Like Button */}
          <div className="flex items-center justify-between pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-zinc-400" />
                {blog.views.toLocaleString()} Views
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4 text-zinc-400" />
                {comments.length} Comments
              </span>
            </div>

            <button
              onClick={() => onLike(blog.id)}
              className="px-4 py-2 rounded-xl bg-[#ff7a00]/10 hover:bg-[#ff7a00]/20 text-[#ff7a00] font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Like Article ({blog.likes})</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-base font-black text-zinc-900 dark:text-white">
              Discussion ({comments.length})
            </h3>

            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Join the discussion..."
                className="flex-1 px-4 py-2 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#ff7a00] text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-colors flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>

            <div className="space-y-3">
              {comments.map((cm) => (
                <div key={cm.id} className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <img src={cm.userAvatar} alt={cm.userName} className="w-6 h-6 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <span className="font-bold text-zinc-900 dark:text-white">{cm.userName}</span>
                    <span className="text-[10px] text-zinc-500">{cm.date}</span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 pl-8">{cm.content}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
