"use server";

import { redirect } from "next/navigation";
import {
  clearDemoAdminCookie,
  getAdminSession,
  setDemoAdminCookie,
} from "@/lib/auth/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isDemoMode, isSupabaseConfigured } from "@/lib/supabase/env";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Ingresa correo y contrasena." };
  }

  if (isDemoMode()) {
    const demoEmail = process.env.DEMO_ADMIN_EMAIL ?? "demo@portfolio.local";
    const demoPassword = process.env.DEMO_ADMIN_PASSWORD ?? "portfolio-demo";

    if (email !== demoEmail || password !== demoPassword) {
      return { error: "Credenciales demo invalidas." };
    }

    await setDemoAdminCookie();
    redirect("/admin");
  }

  if (!isSupabaseConfigured()) {
    return { error: "Configura Supabase para usar el panel admin en produccion." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "No se pudo iniciar sesion." };
  }

  const session = await getAdminSession();

  if (!session) {
    await supabase.auth.signOut();
    return { error: "Tu usuario no esta autorizado como administrador." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  if (isDemoMode()) {
    await clearDemoAdminCookie();
    redirect("/admin/login");
  }

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}
