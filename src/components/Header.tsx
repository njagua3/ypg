import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  SlidersHorizontal,
  Layers,
  ShoppingBag,
  BookOpen,
  GitCompare,
  PlusCircle,
  User,
  Shield,
  Sun,
  Moon,
  Flame,
  CheckCircle2,
  Tv
} from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: UserType;
  onSwitchRole: (role: 'visitor' | 'blogger' | 'admin' | 'pending_blogger') => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenSubmitListing: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onSwitchRole,
  darkMode,
  setDarkMode,
  compareCount,
  onOpenCompare,
  onOpenSubmitListing,
  onOpenSearch
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-full overflow-hidden border-2 border-[#ff7a00] shadow-lg shadow-[#ff7a00]/25 group-hover:scale-105 transition-transform bg-black">
                <img
                  src="/logo.jpg"
                  alt="Your Porn Guy Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to text icon if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white group-hover:text-[#ff7a00] transition-colors flex items-center gap-1.5">
                  Your Porn Guy
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ff7a00]/10 text-[#ff7a00] border border-[#ff7a00]/30 font-bold uppercase">
                    Official
                  </span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase -mt-0.5">
                  Discover • Compare • Enjoy
                </span>
              </div>
            </button>

            {/* Desktop Quick Nav */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              <button
                onClick={() => setCurrentTab('home')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentTab === 'home'
                    ? 'bg-[#ff7a00]/10 text-[#ff7a00] font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                Directory
              </button>
              <button
                onClick={() => setCurrentTab('categories')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  currentTab === 'categories'
                    ? 'bg-[#ff7a00]/10 text-[#ff7a00] font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setCurrentTab('shop')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentTab === 'shop'
                    ? 'bg-[#ff7a00]/10 text-[#ff7a00] font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-[#ff7a00]" />
                Shop
              </button>
              <button
                onClick={() => setCurrentTab('blog')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentTab === 'blog'
                    ? 'bg-[#ff7a00]/10 text-[#ff7a00] font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Blog
              </button>
            </nav>
          </div>

          {/* Quick Search trigger & Actions */}
          <div className="flex items-center gap-3">
            
            {/* Search Launcher Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/60 rounded-lg transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-[#ff7a00]" />
              <span className="hidden sm:inline">Search 15,000+ sites...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded font-mono text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Compare Badge Button */}
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#ff7a00] to-orange-600 rounded-lg shadow-sm hover:opacity-95 transition-all"
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Compare</span>
                <span className="ml-0.5 px-1.5 py-0.2 bg-white text-orange-600 rounded-full font-bold text-[10px]">
                  {compareCount}
                </span>
              </button>
            )}

            {/* Submit Listing Button */}
            <button
              onClick={onOpenSubmitListing}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-lg transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#ff7a00]" />
              <span>Submit Site</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
            </button>

            {/* Role / User Account Dropdown Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-2 pl-2 pr-3 py-1 bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 rounded-xl text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:border-[#ff7a00] transition-colors"
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-full object-cover border border-[#ff7a00]"
                />
                <div className="text-left hidden md:block">
                  <div className="font-semibold leading-none">{currentUser.name}</div>
                  <div className="text-[10px] text-[#ff7a00] uppercase font-bold mt-0.5">
                    {currentUser.role === 'admin'
                      ? 'Admin'
                      : currentUser.role === 'blogger'
                      ? currentUser.bloggerStatus === 'approved'
                        ? 'Approved Blogger'
                        : 'Pending Blogger'
                      : 'Visitor'}
                  </div>
                </div>
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-700/80 rounded-2xl shadow-xl p-2 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{currentUser.name}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{currentUser.email}</p>
                  </div>

                  <div className="py-2">
                    <p className="px-3 text-[10px] uppercase font-bold text-zinc-400 mb-1">
                      Switch Active Role (Demo)
                    </p>

                    <button
                      onClick={() => {
                        onSwitchRole('visitor');
                        setShowRoleDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between text-zinc-700 dark:text-zinc-300"
                    >
                      <span>Guest Visitor</span>
                      {currentUser.role === 'visitor' && <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7a00]" />}
                    </button>

                    <button
                      onClick={() => {
                        onSwitchRole('blogger');
                        setShowRoleDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between text-zinc-700 dark:text-zinc-300"
                    >
                      <span>Approved Blogger (Alex)</span>
                      {currentUser.role === 'blogger' && currentUser.bloggerStatus === 'approved' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7a00]" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onSwitchRole('pending_blogger');
                        setShowRoleDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between text-zinc-700 dark:text-zinc-300"
                    >
                      <span>Pending Blogger (Marcus)</span>
                      {currentUser.role === 'blogger' && currentUser.bloggerStatus === 'pending' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7a00]" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onSwitchRole('admin');
                        setShowRoleDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between text-zinc-700 dark:text-zinc-300"
                    >
                      <span className="font-semibold text-[#ff7a00]">Admin CMS</span>
                      {currentUser.role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-[#ff7a00]" />}
                    </button>
                  </div>

                  {currentUser.role === 'blogger' && (
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <button
                        onClick={() => {
                          setCurrentTab('blogger_dashboard');
                          setShowRoleDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg bg-[#ff7a00]/10 text-[#ff7a00] font-semibold hover:bg-[#ff7a00]/20 text-center block"
                      >
                        Open Blogger Dashboard
                      </button>
                    </div>
                  )}

                  {currentUser.role === 'admin' && (
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <button
                        onClick={() => {
                          setCurrentTab('admin_dashboard');
                          setShowRoleDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg bg-[#ff7a00] text-white font-semibold hover:bg-orange-600 text-center block shadow-sm"
                      >
                        Open Admin Panel
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile & Tablet Tab Scroll Strip */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-2 border-t border-zinc-100 dark:border-zinc-800/80 no-scrollbar">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'home'
                ? 'bg-[#ff7a00] text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Directory</span>
          </button>
          <button
            onClick={() => setCurrentTab('categories')}
            className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'categories'
                ? 'bg-[#ff7a00] text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#ff7a00]" />
            <span>Categories</span>
          </button>
          <button
            onClick={() => setCurrentTab('shop')}
            className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'shop'
                ? 'bg-[#ff7a00] text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Shop</span>
          </button>
          <button
            onClick={() => setCurrentTab('blog')}
            className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'blog'
                ? 'bg-[#ff7a00] text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Blog</span>
          </button>
          {currentUser.role === 'admin' && (
            <button
              onClick={() => setCurrentTab('admin_dashboard')}
              className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'admin_dashboard'
                  ? 'bg-[#ff7a00] text-white font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-[#ff7a00]" />
              <span>Admin CMS</span>
            </button>
          )}
          {currentUser.role === 'blogger' && (
            <button
              onClick={() => setCurrentTab('blogger_dashboard')}
              className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentTab === 'blogger_dashboard'
                  ? 'bg-[#ff7a00] text-white font-bold'
                  : 'text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60'
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#ff7a00]" />
              <span>Blogger Portal</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
