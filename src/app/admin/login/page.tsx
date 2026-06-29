import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminSession } from "@/lib/auth/admin";
import { isDemoMode } from "@/lib/supabase/env";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <LoginForm demoMode={isDemoMode()} />
    </main>
  );
}
