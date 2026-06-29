import Image from "next/image";
import { Code2, Link2, Mail, MapPin } from "lucide-react";
import type { Profile } from "@/types/domain";
import { PrintButton } from "@/components/public/PrintButton";

type HeroProps = {
  profile: Profile;
};

export function Hero({ profile }: HeroProps) {
  return (
    <header className="relative min-h-[78svh] overflow-hidden bg-slate-950 text-white print:min-h-0 print:bg-white print:text-slate-950">
      <Image
        src="/data-workspace-hero.png"
        alt="Workspace profesional con dashboards de datos"
        fill
        priority
        sizes="100vw"
        className="object-cover print:hidden"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/78 to-slate-950/10 print:hidden" />
      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 md:px-8 print:hidden">
        <a href="#cv" className="text-sm font-semibold">
          CV Portfolio
        </a>
        <div className="flex items-center gap-4 text-sm text-slate-200">
          <a href="#proyectos" className="hover:text-white">
            Proyectos
          </a>
          <a href="#contacto" className="hover:text-white">
            Contacto
          </a>
          <a href="/admin" className="hover:text-white">
            Admin
          </a>
        </div>
      </nav>
      <div
        id="cv"
        className="relative z-10 mx-auto flex min-h-[calc(78svh-76px)] w-full max-w-6xl items-center px-5 pb-12 pt-6 md:px-8 print:min-h-0 print:px-0 print:py-0"
      >
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase text-amber-300 print:text-slate-700">
            SQL Server · Python · Power BI · ETL · Azure
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl print:text-3xl">
            {profile.fullName}
          </h1>
          <p className="mt-4 max-w-2xl text-xl leading-8 text-slate-100 print:text-base print:text-slate-700">
            {profile.headline}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 print:text-sm print:text-slate-700">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 print:hidden">
            <PrintButton />
            {profile.email ? (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
              >
                <Mail aria-hidden="true" size={18} />
                Contactar
              </a>
            ) : null}
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-200 print:mt-4 print:text-slate-700">
            {profile.location ? (
              <span className="inline-flex items-center gap-2">
                <MapPin aria-hidden="true" size={16} />
                {profile.location}
              </span>
            ) : null}
            {profile.linkedinUrl ? (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-white print:text-slate-700"
              >
                <Link2 aria-hidden="true" size={16} />
                LinkedIn
              </a>
            ) : null}
            {profile.githubUrl ? (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-white print:text-slate-700"
              >
                <Code2 aria-hidden="true" size={16} />
                GitHub
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
