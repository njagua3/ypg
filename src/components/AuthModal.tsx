import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Sparkles, CheckCircle2, Eye, EyeOff, LogIn, UserPlus, Globe, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { User, UserRole, BloggerStatus } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState<'visitor' | 'blogger'>('visitor');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Status & error handling
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (mode === 'signup' && !agreeTerms) {
      setErrorMessage('You must agree to the Terms of Service to create an account.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signin') {
        // Attempt backend login first
        const apiRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        }).catch(() => null);

        if (apiRes && apiRes.ok) {
          const data = await apiRes.json().catch(() => null);
          if (data && data.user) {
            onLoginSuccess(data.user);
            setIsLoading(false);
            onClose();
            return;
          }
        }

        // Static fallback user creation / match
        let role: UserRole = 'visitor';
        let bloggerStatus: BloggerStatus = 'none';

        if (email.includes('admin')) {
          role = 'admin';
          bloggerStatus = 'approved';
        } else if (email.includes('blogger') || email.includes('alex') || email.includes('marcus')) {
          role = 'blogger';
          bloggerStatus = email.includes('marcus') ? 'pending' : 'approved';
        }

        const authenticatedUser: User = {
          id: `usr-${Date.now().toString(36)}`,
          name: email.split('@')[0].replace('.', ' '),
          email: email.trim().toLowerCase(),
          avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80`,
          role,
          bloggerStatus,
          createdAt: new Date().toISOString().split('T')[0]
        };

        onLoginSuccess(authenticatedUser);
        setIsLoading(false);
        onClose();
      } else {
        // Sign Up Mode
        const role: UserRole = accountType === 'blogger' ? 'blogger' : 'visitor';
        const bloggerStatus: BloggerStatus = accountType === 'blogger' ? 'pending' : 'none';

        if (accountType === 'blogger') {
          // Send to blogger application endpoint if backend exists
          fetch('/api/auth/register-blogger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, bio })
          }).catch(() => null);
        }

        const newUser: User = {
          id: `usr-${Date.now().toString(36)}`,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80`,
          role,
          bloggerStatus,
          bio: bio || (accountType === 'blogger' ? 'Pending creator application' : 'Directory member'),
          createdAt: new Date().toISOString().split('T')[0]
        };

        onLoginSuccess(newUser);
        setIsLoading(false);
        onClose();
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleQuickDemoSelect = (demoUser: User) => {
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Header gradient bar */}
        <div className="h-2 bg-gradient-to-r from-[#ff7a00] via-orange-500 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          
          {/* Brand Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-black border border-[#ff7a00] flex items-center justify-center font-black text-xs text-[#ff7a00]">
              YPG
            </div>
            <div>
              <h2 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {mode === 'signin'
                  ? 'Access your saved sites, reviews & dashboard'
                  : 'Join 15,000+ directory members & creators'}
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-zinc-100 dark:bg-zinc-900/90 rounded-2xl mb-6 border border-zinc-200/60 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMessage('');
              }}
              className={`py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
                mode === 'signin'
                  ? 'bg-white dark:bg-[#27272a] text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-[#ff7a00]" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage('');
              }}
              className={`py-2 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 ${
                mode === 'signup'
                  ? 'bg-white dark:bg-[#27272a] text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 text-[#ff7a00]" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Sign Up Name Field */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Full Name / Display Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00] focus:ring-1 focus:ring-[#ff7a00]"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00] focus:ring-1 focus:ring-[#ff7a00]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link has been sent to your email.')}
                    className="text-[11px] font-semibold text-[#ff7a00] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00] focus:ring-1 focus:ring-[#ff7a00]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Account Type Selection (Sign Up only) */}
            {mode === 'signup' && (
              <div className="pt-2">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAccountType('visitor')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      accountType === 'visitor'
                        ? 'bg-[#ff7a00]/10 border-[#ff7a00] text-zinc-900 dark:text-white'
                        : 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-500'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span>Directory Member</span>
                      {accountType === 'visitor' && <CheckCircle2 className="w-4 h-4 text-[#ff7a00]" />}
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1">Bookmark, review & submit sites</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('blogger')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      accountType === 'blogger'
                        ? 'bg-[#ff7a00]/10 border-[#ff7a00] text-zinc-900 dark:text-white'
                        : 'bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 text-zinc-500'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span>Blogger / Creator</span>
                      {accountType === 'blogger' && <CheckCircle2 className="w-4 h-4 text-[#ff7a00]" />}
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1">Publish blogs & earn $0.02 PPC</p>
                  </button>
                </div>
              </div>
            )}

            {/* Blogger Specific Fields */}
            {mode === 'signup' && accountType === 'blogger' && (
              <div className="space-y-3 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Blog / Channel Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us briefly about your content or blog niche..."
                    className="w-full p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-[#ff7a00] h-16 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Checkboxes */}
            <div className="flex items-center justify-between pt-1">
              {mode === 'signin' ? (
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-600 dark:text-zinc-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-zinc-300 text-[#ff7a00] focus:ring-[#ff7a00]"
                  />
                  <span>Keep me signed in</span>
                </label>
              ) : (
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-600 dark:text-zinc-400">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="rounded border-zinc-300 text-[#ff7a00] focus:ring-[#ff7a00]"
                  />
                  <span>I agree to 18+ Terms & Publisher Policy</span>
                </label>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff7a00] to-orange-600 hover:opacity-95 text-white font-extrabold text-xs shadow-lg shadow-[#ff7a00]/25 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to Account' : 'Complete Registration'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins Section */}
          <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80 text-center">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
              Instant Demo Sign In
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() =>
                  handleQuickDemoSelect({
                    id: 'usr-visitor-1',
                    name: 'Guest Visitor',
                    email: 'guest@yourpornguy.com',
                    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
                    role: 'visitor',
                    bloggerStatus: 'none',
                    createdAt: '2026-08-01'
                  })
                }
                className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                Guest
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickDemoSelect({
                    id: 'usr-blogger-1',
                    name: 'Alex Mercer',
                    email: 'alex.mercer@blogger.com',
                    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80',
                    role: 'blogger',
                    bloggerStatus: 'approved',
                    bio: 'Tech journalist & adult industry analyst.',
                    createdAt: '2026-06-15'
                  })
                }
                className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                Blogger (Approved)
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickDemoSelect({
                    id: 'usr-blogger-pending',
                    name: 'Marcus Vance',
                    email: 'marcus.vance@creator.org',
                    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120&q=80',
                    role: 'blogger',
                    bloggerStatus: 'pending',
                    bio: 'Adult gaming reviewer and VR hardware test pilot.',
                    createdAt: '2026-08-03'
                  })
                }
                className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300 transition-colors"
              >
                Blogger (Pending)
              </button>

              <button
                type="button"
                onClick={() =>
                  handleQuickDemoSelect({
                    id: 'usr-admin-1',
                    name: 'YPG System Admin',
                    email: 'admin@yourpornguy.com',
                    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
                    role: 'admin',
                    bloggerStatus: 'approved',
                    bio: 'Platform Operations Director',
                    createdAt: '2026-01-01'
                  })
                }
                className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[10px] font-semibold text-[#ff7a00] transition-colors font-bold"
              >
                Admin CMS
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
