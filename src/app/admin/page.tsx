import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminResourcePanel } from "@/components/admin/AdminResourcePanel";
import { getAdminCvData } from "@/lib/data/cv";
import { requireAdminSession } from "@/lib/auth/admin";

export default async function AdminPage() {
  const session = await requireAdminSession();
  const data = await getAdminCvData();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <AdminHeader session={session} />
      <div className="mx-auto w-full max-w-7xl px-5 py-6 md:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
              Contenido del CV
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Los cambios guardados se reflejan en la pagina publica.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-teal-600 hover:text-teal-700 dark:border-slate-800 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
          >
            <ExternalLink aria-hidden="true" size={17} />
            Ver pagina
          </Link>
        </div>
        <AdminResourcePanel data={data} />
      </div>
    </main>
  );
}
