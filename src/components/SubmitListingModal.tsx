import React, { useState } from 'react';
import { X, Send, Building2, Globe, Mail, DollarSign, Image } from 'lucide-react';
import { Category, SubmitListingPayload } from '../types';

interface SubmitListingModalProps {
  categories: Category[];
  onClose: () => void;
  onSubmit: (payload: SubmitListingPayload) => Promise<void>;
}

export const SubmitListingModal: React.FC<SubmitListingModalProps> = ({
  categories,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<SubmitListingPayload>({
    name: '',
    websiteUrl: '',
    categoryId: categories[0]?.id || 'tube',
    description: '',
    contactEmail: '',
    affiliateProgramUrl: '',
    logoUrl: '',
    pricingType: 'Freemium'
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.websiteUrl || !formData.contactEmail) return;

    setSubmitting(true);
    try {
      await onSubmit(formData);
      setSuccessMsg('Your listing submission was received! Our editorial team will review and publish it.');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-8 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-[#ff7a00]/10 text-[#ff7a00]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-zinc-900 dark:text-white">
                Submit Website for Admin Review
              </h2>
              <p className="text-xs text-zinc-500">
                All submissions require Admin review & approval before appearing in the directory.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="py-8 text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500 text-xl font-bold">
              ✓
            </div>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">{successMsg}</p>
            <p className="text-xs text-zinc-500">Only authorized Admins can approve and publish submitted sites.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
            
            {/* Website Name & URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Website / Brand Name *
                </label>
                <div className="relative flex items-center">
                  <Building2 className="w-3.5 h-3.5 absolute left-3 text-zinc-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Candy AI"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Website URL *
                </label>
                <div className="relative flex items-center">
                  <Globe className="w-3.5 h-3.5 absolute left-3 text-zinc-400" />
                  <input
                    type="url"
                    required
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>
              </div>
            </div>

            {/* Category & Pricing Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Primary Category *
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Pricing Model
                </label>
                <select
                  value={formData.pricingType}
                  onChange={(e) => setFormData({ ...formData, pricingType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                >
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Subscription">Subscription</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>

            {/* Contact Email & Affiliate Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Contact / Webmaster Email *
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-3.5 h-3.5 absolute left-3 text-zinc-400" />
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="webmaster@example.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Affiliate Program URL (Optional)
                </label>
                <div className="relative flex items-center">
                  <DollarSign className="w-3.5 h-3.5 absolute left-3 text-zinc-400" />
                  <input
                    type="url"
                    value={formData.affiliateProgramUrl}
                    onChange={(e) => setFormData({ ...formData, affiliateProgramUrl: e.target.value })}
                    placeholder="https://affiliates.example.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Short Description / Key Features *
              </label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your platform features, content quality, HD options, etc."
                className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Submit Website'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
