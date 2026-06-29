"use client";

import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export function createSupabaseBrowserClient() {
  const env = getSupabaseEnv();

  if (!env.url || !env.anonKey) {
    throw new Error("Supabase is not configured.");
  }

  return createBrowserClient<Database>(env.url, env.anonKey);
}
