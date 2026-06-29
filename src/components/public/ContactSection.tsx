import { Mail, Phone, Send } from "lucide-react";
import type { Contact, Profile } from "@/types/domain";

type ContactSectionProps = {
  contacts: Contact[];
  profile: Profile;
};

export function ContactSection({ contacts, profile }: ContactSectionProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
        Hablemos de datos, reporting y automatizacion
      </h3>
      <p className="mt-3 max-w-2xl leading-7 text-slate-700 dark:text-slate-300">
        Disponible para proyectos de analisis, migracion, automatizacion, BI y procesos ETL.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {profile.email ? (
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-3 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 hover:border-teal-600 hover:text-teal-700 dark:border-slate-800 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
          >
            <Mail aria-hidden="true" size={18} />
            {profile.email}
          </a>
        ) : null}
        {profile.phone ? (
          <span className="inline-flex items-center gap-3 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:text-slate-200">
            <Phone aria-hidden="true" size={18} />
            {profile.phone}
          </span>
        ) : null}
        {contacts.map((contact) =>
          contact.url ? (
            <a
              key={contact.id ?? contact.label}
              href={contact.url}
              target={contact.url.startsWith("http") ? "_blank" : undefined}
              rel={contact.url.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex items-center gap-3 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 hover:border-teal-600 hover:text-teal-700 dark:border-slate-800 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
            >
              <Send aria-hidden="true" size={18} />
              {contact.label}: {contact.value}
            </a>
          ) : (
            <span
              key={contact.id ?? contact.label}
              className="inline-flex items-center gap-3 rounded-md border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800 dark:border-slate-800 dark:text-slate-200"
            >
              <Send aria-hidden="true" size={18} />
              {contact.label}: {contact.value}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
