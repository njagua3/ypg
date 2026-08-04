import React, { useState } from 'react';
import { ShieldCheck, Mail, Send, CheckCircle2 } from 'lucide-react';

interface StaticPagesProps {
  page: 'about' | 'contact' | 'privacy' | 'terms' | 'dmca';
}

export const StaticPages: React.FC<StaticPagesProps> = ({ page }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-zinc-800 dark:text-zinc-200">
      
      {page === 'about' && (
        <div className="space-y-6">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white">About Your Porn Guy</h1>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            <strong>Your Porn Guy</strong> is the premier independent directory, comparison matrix, and review network for top adult entertainment platforms, AI girlfriend companions, VR video streaming, live cam networks, and teledildonic hardware.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 space-y-1">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">15,000+ Listed Sites</h3>
              <p className="text-xs text-zinc-500">Hand-verified for safety, performance, and clear pricing.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 space-y-1">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">Independent Editors</h3>
              <p className="text-xs text-zinc-500">Unbiased reviews, user ratings, pros, and cons.</p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 space-y-1">
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">Creator Earnings</h3>
              <p className="text-xs text-zinc-500">Blogger monetization network with fraud detection.</p>
            </div>
          </div>
        </div>
      )}

      {page === 'contact' && (
        <div className="space-y-6">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Contact Operational Team</h1>
          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 text-emerald-500 font-bold text-sm text-center">
              Message received! Our team responds within 24 business hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-zinc-700 dark:text-zinc-300 mb-1">Message / Inquiry</label>
                <textarea
                  required
                  rows={5}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
              <button type="submit" className="px-6 py-2.5 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl shadow-md">
                Send Message
              </button>
            </form>
          )}
        </div>
      )}

      {page === 'privacy' && (
        <div className="space-y-4 text-xs leading-relaxed">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Privacy Policy</h1>
          <p>We take user privacy extremely seriously. We do not store unhashed IP addresses, personal payment credentials, or adult viewing history. All visitor IP logs for click tracking are hashed immediately using standard cryptographical digests for fraud filter verification.</p>
        </div>
      )}

      {page === 'terms' && (
        <div className="space-y-4 text-xs leading-relaxed">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white">Terms of Service</h1>
          <p>By using Your Porn Guy, you confirm you are 18 years of age or older (or of legal age in your jurisdiction). The platform provides affiliate directory information and external links.</p>
        </div>
      )}

      {page === 'dmca' && (
        <div className="space-y-4 text-xs leading-relaxed">
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white">DMCA Compliance Notice</h1>
          <p>Your Porn Guy is a search and affiliate directory platform. We do not host, store, or upload video files or copyrighted media on our servers. All listings redirect to third-party webmasters. To submit a DMCA notice, contact support@yourpornguy.com with direct target URLs.</p>
        </div>
      )}

    </div>
  );
};
