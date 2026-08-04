import React from 'react';
import { X, ExternalLink, Star, Check, Award, ShieldCheck, Trash2 } from 'lucide-react';
import { Listing } from '../types';

interface ComparisonModalProps {
  listings: Listing[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onAffiliateClick: (listing: Listing) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  listings,
  onClose,
  onRemove,
  onAffiliateClick
}) => {
  if (listings.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <div>
            <h2 className="text-lg font-black text-zinc-900 dark:text-white">
              Side-by-Side Site Comparison
            </h2>
            <p className="text-xs text-zinc-500">
              Comparing {listings.length} platform{listings.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Matrix Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="p-3 text-xs font-bold text-zinc-400 uppercase tracking-wider w-1/4">
                  Feature / Specs
                </th>
                {listings.map((item) => (
                  <th key={item.id} className="p-3 text-center align-top relative">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="absolute top-1 right-1 p-1 text-zinc-400 hover:text-rose-500 rounded"
                      title="Remove from comparison"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex flex-col items-center gap-1.5 pt-2">
                      <img
                        src={item.logoUrl}
                        alt={item.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700 bg-black"
                      />
                      <span className="font-extrabold text-sm text-zinc-900 dark:text-white line-clamp-1">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff7a00]/10 text-[#ff7a00] font-bold">
                        {item.categoryName}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-xs">
              {/* Pricing Model */}
              <tr>
                <td className="p-3 font-semibold text-zinc-500">Pricing Model</td>
                {listings.map((item) => (
                  <td key={item.id} className="p-3 text-center font-bold text-zinc-900 dark:text-white">
                    {item.pricingType}
                  </td>
                ))}
              </tr>

              {/* Editor Score */}
              <tr>
                <td className="p-3 font-semibold text-zinc-500">Editor Score</td>
                {listings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-black text-xs inline-flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {item.editorScore}/100
                    </span>
                  </td>
                ))}
              </tr>

              {/* User Rating */}
              <tr>
                <td className="p-3 font-semibold text-zinc-500">User Rating</td>
                {listings.map((item) => (
                  <td key={item.id} className="p-3 text-center font-bold text-amber-500">
                    <span className="inline-flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {item.rating.toFixed(1)} / 5.0
                    </span>
                  </td>
                ))}
              </tr>

              {/* Verified Badge */}
              <tr>
                <td className="p-3 font-semibold text-zinc-500">Official Verification</td>
                {listings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    {item.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-emerald-500 font-bold">
                        <ShieldCheck className="w-4 h-4" /> Verified
                      </span>
                    ) : (
                      <span className="text-zinc-400">Standard</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Key Pros */}
              <tr>
                <td className="p-3 font-semibold text-zinc-500 align-top">Top Key Features</td>
                {listings.map((item) => (
                  <td key={item.id} className="p-3 align-top text-left">
                    <ul className="space-y-1 text-[11px] text-zinc-700 dark:text-zinc-300">
                      {item.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Direct Access CTA */}
              <tr>
                <td className="p-3 font-semibold text-zinc-500">Action</td>
                {listings.map((item) => (
                  <td key={item.id} className="p-3 text-center">
                    <button
                      onClick={() => onAffiliateClick(item)}
                      className="px-4 py-2 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center gap-1"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
