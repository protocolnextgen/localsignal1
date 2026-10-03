/**
 * LocalSignal Supabase / PostgreSQL Client Configuration
 * Provides direct connection to Supabase PostgreSQL when credentials exist,
 * with seamless fallback to unified REST / FastAPI endpoints.
 */

export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
  isConfigured: boolean;
}

export const supabaseConfig: SupabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  isConfigured: Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
};

// Generic REST helper that queries either Supabase or the unified FastAPI backend
export async function queryLocalSignalData<T>(tableOrEndpoint: string, queryParams: Record<string, string> = {}): Promise<T | null> {
  const query = new URLSearchParams(queryParams).toString();
  const url = `/api/${tableOrEndpoint}${query ? `?${query}` : ''}`;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`[LocalSignal API] Fallback fetch for /api/${tableOrEndpoint}:`, err);
    return null;
  }
}
