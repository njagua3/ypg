import React, { useState } from 'react';
import { X, Globe, FileText, Code } from 'lucide-react';

interface SEOModalProps {
  onClose: () => void;
}

export const SEOModal: React.FC<SEOModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'sitemap' | 'robots' | 'schema'>('schema');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Your Porn Guy",
    "alternateName": "YPG",
    "url": "https://yourpornguy.com",
    "description": "Discover, compare, and enjoy over 15,000 verified adult streaming channels, AI companion platforms, VR sites, and sex toy marketplaces.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://yourpornguy.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 space-y-4 shadow-2xl">
        
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#ff7a00]" />
            <h2 className="text-lg font-black text-zinc-900 dark:text-white">SEO Engine & Technical Indexing</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-xl font-bold ${activeTab === 'schema' ? 'bg-[#ff7a00] text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}
          >
            Schema.org JSON-LD
          </button>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-[#ff7a00] flex items-center gap-1"
          >
            Open Live XML Sitemap
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-xl font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-[#ff7a00] flex items-center gap-1"
          >
            Open Robots.txt
          </a>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-900 font-mono text-xs text-emerald-400 overflow-x-auto max-h-96">
          <pre>{JSON.stringify(jsonLd, null, 2)}</pre>
        </div>

      </div>
    </div>
  );
};
