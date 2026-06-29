import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";
import type { AdminSession } from "@/lib/auth/admin";

type AdminHeaderProps = {
  session: AdminSession;
};

export function AdminHeader({ session }: AdminHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-950 dark:text-white">
            CV Admin
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {session.email} · {session.mode}
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-600 hover:text-teal-700 dark:border-slate-800 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
          >
            <LogOut aria-hidden="true" size={17} />
            Salir
          </button>
        </form>
      </div>
    </header>
  );
}
