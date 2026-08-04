import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, Copy, Check, Terminal, Server, RefreshCw, Zap, ShieldAlert } from 'lucide-react';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);
  const [status, setStatus] = useState<{
    configured: boolean;
    connected: boolean;
    message: string;
    tables?: string[];
  }>({
    configured: false,
    connected: false,
    message: 'Checking Supabase connection...'
  });

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/supabase/status');
      const data = await res.json();
      setStatus(data);
    } catch (err: any) {
      setStatus({
        configured: false,
        connected: false,
        message: err?.message || 'Failed to communicate with API server.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
    }
  }, [isOpen]);

  const handleSeedData = async () => {
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await fetch('/api/supabase/seed', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setSeedResult('Successfully seeded database tables with initial listings & categories!');
        fetchStatus();
      } else {
        setSeedResult(`Seeding failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setSeedResult(`Error: ${err?.message || 'Network error'}`);
    } finally {
      setSeeding(false);
    }
  };

  const copySQLSchema = () => {
    const sql = `-- Your Porn Guy Supabase PostgreSQL Migration Script
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon_name TEXT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  rating NUMERIC(3, 1) DEFAULT 4.5,
  pricing_tier TEXT,
  url TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  logo_url TEXT,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  upvotes INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL,
  buy_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL
);
`;
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100 p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#ff7a00]/10 border border-[#ff7a00]/30 text-[#ff7a00]">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black flex items-center gap-2">
                Supabase PostgreSQL Integration
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Backend database configuration & SQL schema migration tool
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Live Status Card */}
        <div className={`p-4 rounded-2xl border ${status.connected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'} flex items-start justify-between gap-4`}>
          <div className="flex items-start gap-3">
            {status.connected ? (
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="font-bold text-sm">
                {status.connected ? 'Supabase Database Connected' : 'Supabase Setup Required / Fallback Engine Active'}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1 leading-relaxed">
                {status.message}
              </p>
            </div>
          </div>
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="p-2 rounded-xl bg-black/30 hover:bg-black/50 border border-current text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Check</span>
          </button>
        </div>

        {/* Action Buttons & SQL Schema copy */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-[#ff7a00]" />
              PostgreSQL Migration SQL Script
            </h4>
            <button
              onClick={copySQLSchema}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#ff7a00]/10 text-[#ff7a00] hover:bg-[#ff7a00]/20 border border-[#ff7a00]/30 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy SQL Schema'}</span>
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-950 font-mono text-xs text-zinc-300 border border-zinc-800 overflow-x-auto max-h-40">
            <pre className="text-[11px] leading-relaxed">
{`-- Your Porn Guy - Supabase Migration Schema
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  affiliate_url TEXT NOT NULL
);`}
            </pre>
          </div>
        </div>

        {/* Database Seeding section */}
        <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#ff7a00]" />
              Seed Supabase Tables
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Populate your connected Supabase PostgreSQL instance with initial categories & listings.
            </p>
          </div>
          <button
            onClick={handleSeedData}
            disabled={seeding}
            className="px-4 py-2 bg-[#ff7a00] hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />
            <span>{seeding ? 'Seeding...' : 'Seed Data'}</span>
          </button>
        </div>

        {seedResult && (
          <p className="text-xs font-semibold text-[#ff7a00] bg-[#ff7a00]/10 p-3 rounded-xl border border-[#ff7a00]/30">
            {seedResult}
          </p>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white text-xs font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
