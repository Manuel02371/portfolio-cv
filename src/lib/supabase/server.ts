import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/types/database";

export async function createSupabaseServerClient() {
  const env = getSupabaseEnv();

  if (!env.url || !env.anonKey) {
    throw new Error("Supabase is not configured.");
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet, headers) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always write cookies. The proxy handles
          // session refreshes for normal requests.
        }

        void headers;
      },
    },
  });
}
