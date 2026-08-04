import React, { useState } from 'react';
import { X, PenTool, Image, Sparkles, Send, Globe, Save } from 'lucide-react';

interface BlogEditorModalProps {
  onClose: () => void;
  onSubmitPost: (data: {
    title: string;
    excerpt: string;
    content: string;
    coverImageUrl: string;
    category: string;
    tags: string[];
    status: 'published' | 'draft';
    seoTitle: string;
    metaDescription: string;
  }) => Promise<void>;
}

export const BlogEditorModal: React.FC<BlogEditorModalProps> = ({
  onClose,
  onSubmitPost
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Guides');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const categories = ['News', 'Reviews', 'Guides', 'Tutorials', 'Industry', 'AI', 'Videos'];

  const handlePublish = async (status: 'published' | 'draft') => {
    if (!title || !content) return;

    setSubmitting(true);
    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      await onSubmitPost({
        title,
        excerpt: excerpt || title,
        content,
        coverImageUrl:
          coverImageUrl ||
          'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&h=450&q=80',
        category,
        tags: tags.length ? tags : ['General'],
        status,
        seoTitle: seoTitle || title,
        metaDescription: metaDescription || excerpt
      });

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-[#ff7a00]/10 text-[#ff7a00]">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-zinc-900 dark:text-white">
                Write & Publish Article
              </h2>
              <p className="text-xs text-zinc-500">
                SEO optimized rich blog post editor for approved contributors.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Editor Form */}
        <div className="space-y-4 pt-4 text-xs">
          
          {/* Article Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Top 10 VR Adult Headsets Tested in 2026"
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cover Image URL & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Cover Image URL
              </label>
              <div className="relative flex items-center">
                <Image className="w-3.5 h-3.5 absolute left-3 text-zinc-400" />
                <input
                  type="url"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="VR, Meta Quest 3, Reviews, 8K"
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Short Excerpt / Teaser *
            </label>
            <input
              type="text"
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief 1-2 sentence preview for search results and cards."
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
            />
          </div>

          {/* Main Body (Markdown / Text) */}
          <div>
            <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Article Content (Markdown or Plain Text) *
            </label>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="# Headline\n\nWrite your in-depth review or guide here..."
              className="w-full p-3 font-mono text-xs rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
            />
          </div>

          {/* SEO Metadata Box */}
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 space-y-2">
            <h4 className="font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#ff7a00]" />
              <span>SEO Meta Settings</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="SEO Title (Google SERP)"
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none"
              />
              <input
                type="text"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Meta Description"
                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handlePublish('draft')}
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>
            <button
              type="button"
              onClick={() => handlePublish('published')}
              disabled={submitting}
              className="px-6 py-2 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Publishing...' : 'Publish Article'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
