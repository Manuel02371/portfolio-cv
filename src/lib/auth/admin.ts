import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isDemoMode, isSupabaseConfigured } from "@/lib/supabase/env";

const DEMO_ADMIN_COOKIE = "portfolio_demo_admin";

export type AdminSession = {
  email: string;
  mode: "demo" | "supabase";
};

export async function getAdminSession(): Promise<AdminSession | null> {
  if (isDemoMode()) {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get(DEMO_ADMIN_COOKIE)?.value === "1";

    return isLoggedIn
      ? {
          email: process.env.DEMO_ADMIN_EMAIL ?? "demo@portfolio.local",
          mode: "demo",
        }
      : null;
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("user_id, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !adminUser) {
    return null;
  }

  return {
    email: user.email ?? "admin",
    mode: "supabase",
  };
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function setDemoAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearDemoAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_ADMIN_COOKIE);
}
