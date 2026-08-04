import React, { useState } from 'react';
import { Mail, Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenSEOModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, onOpenSEOModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="w-full bg-zinc-900 border-t border-zinc-800 text-zinc-400 text-xs transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#ff7a00] bg-black">
                <img
                  src={logoImg}
                  alt="Your Porn Guy Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.jpg';
                  }}
                />
              </div>
              <span className="text-lg font-black text-white">Your Porn Guy</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Discover • Compare • Enjoy. The premiere independent directory, comparison matrix, and blogger monetization network.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Safe Directory</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Directory Views</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><button onClick={() => setCurrentTab('home')} className="hover:text-[#ff7a00]">Top Rated Sites</button></li>
              <li><button onClick={() => setCurrentTab('categories')} className="hover:text-[#ff7a00]">All Categories</button></li>
              <li><button onClick={() => setCurrentTab('shop')} className="hover:text-[#ff7a00]">Affiliate Shop</button></li>
              <li><button onClick={() => setCurrentTab('blog')} className="hover:text-[#ff7a00]">Multi-Author Blog</button></li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li><button onClick={() => setCurrentTab('about')} className="hover:text-[#ff7a00]">About Us</button></li>
              <li><button onClick={() => setCurrentTab('contact')} className="hover:text-[#ff7a00]">Contact Operations</button></li>
              <li><button onClick={() => setCurrentTab('privacy')} className="hover:text-[#ff7a00]">Privacy Policy</button></li>
              <li><button onClick={() => setCurrentTab('terms')} className="hover:text-[#ff7a00]">Terms of Service</button></li>
              <li><button onClick={() => setCurrentTab('dmca')} className="hover:text-[#ff7a00]">DMCA Notice</button></li>
              <li><button onClick={onOpenSEOModal} className="hover:text-[#ff7a00] text-[#ff7a00] font-bold">XML Sitemap & SEO</button></li>
            </ul>
          </div>

          {/* Weekly Newsletter */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Weekly VIP Newsletter</h4>
            <p className="text-zinc-400 text-xs">Get hand-picked deals, free trial passes, and top AI companions delivered weekly.</p>
            
            {subscribed ? (
              <p className="text-emerald-400 font-bold">✓ Subscribed successfully!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-[#ff7a00]"
                />
                <button type="submit" className="px-3 py-2 bg-[#ff7a00] hover:bg-orange-600 text-white font-bold rounded-xl shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <p>© 2026 Your Porn Guy. All rights reserved. 18+ Adult Content Directory.</p>
          <p className="text-center sm:text-right">Designed for fast 95+ performance & SEO indexing.</p>
        </div>

      </div>
    </footer>
  );
};
