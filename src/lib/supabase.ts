/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Helper to sanitize Supabase URL (strip /rest/v1/ suffix if user pasted REST endpoint)
function sanitizeUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  return rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
}

// Get Supabase credentials from environment or runtime config
const rawSupabaseUrl =
  (typeof process !== 'undefined' && process.env.VITE_SUPABASE_URL) ||
  ((typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) as string) ||
  'https://unoicrluypnmmthrjcsu.supabase.co';

const rawSupabaseAnonKey =
  (typeof process !== 'undefined' && process.env.VITE_SUPABASE_ANON_KEY) ||
  ((typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVub2ljcmx1eXBubW10aHJqY3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4MjU4MDgsImV4cCI6MjEwMTQwMTgwOH0.32DEviiSdrIx2bdzoDeWiKv0x136DOVQ1LBe6Ckz9x4';

export const supabaseUrl = sanitizeUrl(rawSupabaseUrl);
export const supabaseAnonKey = rawSupabaseAnonKey;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Helper to check connection status with Supabase
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      connected: false,
      message: 'Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are not configured yet.'
    };
  }

  try {
    const { data, error } = await supabase.from('listings').select('count', { count: 'exact', head: true });
    if (error) {
      return {
        connected: false,
        message: `Supabase returned error: ${error.message}. Make sure to run the migration script.`
      };
    }
    return {
      connected: true,
      message: 'Successfully connected to Supabase PostgreSQL database!'
    };
  } catch (err: any) {
    return {
      connected: false,
      message: err?.message || 'Failed to connect to Supabase.'
    };
  }
}
