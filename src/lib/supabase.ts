import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();

/**
 * Prefer new publishable key (`sb_publishable_...`).
 * Falls back to legacy anon JWT if publishable is missing or invalid for this project.
 */
const supabasePublishableKey = (
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined
)?.trim();

const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

/** Publishable key first; legacy anon JWT as optional fallback. */
const supabaseKey = supabasePublishableKey || supabaseAnonKey;

const PLACEHOLDER_URL = "your-project";
const PLACEHOLDER_KEYS = ["your-anon-key", "sb_publishable_your-key-here"];

function isValidKey(key: string | undefined): key is string {
  return Boolean(key && !PLACEHOLDER_KEYS.includes(key));
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    isValidKey(supabaseKey) &&
    !supabaseUrl.includes(PLACEHOLDER_URL),
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/** Which client key type is active (for debugging). */
export const supabaseKeyType = supabasePublishableKey
  ? ("publishable" as const)
  : supabaseAnonKey
    ? ("anon" as const)
    : null;
