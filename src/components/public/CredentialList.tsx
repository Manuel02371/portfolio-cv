import { GraduationCap, ShieldCheck } from "lucide-react";
import { formatDateRange, formatDate } from "@/lib/format";
import type { Certification, Education } from "@/types/domain";

type CredentialListProps = {
  certifications: Certification[];
  education: Education[];
};

export function CredentialList({ certifications, education }: CredentialListProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
          <ShieldCheck aria-hidden="true" size={17} />
          Certificaciones
        </div>
        <div className="mt-4 space-y-4">
          {certifications.length > 0 ? (
            certifications.map((certification) => (
              <article key={certification.id ?? certification.name}>
                <h3 className="font-semibold text-slate-950 dark:text-white">
                  {certification.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {certification.institution}
                  {certification.issueDate ? ` · ${formatDate(certification.issueDate)}` : ""}
                </p>
                {certification.credentialUrl ? (
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-teal-700 dark:text-teal-300"
                  >
                    Ver credencial
                  </a>
                ) : null}
              </article>
            ))
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Agrega certificaciones desde el panel administrador.
            </p>
          )}
        </div>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
          <GraduationCap aria-hidden="true" size={17} />
          Educacion
        </div>
        <div className="mt-4 space-y-4">
          {education.length > 0 ? (
            education.map((item) => (
              <article key={item.id ?? item.institution}>
                <h3 className="font-semibold text-slate-950 dark:text-white">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {item.institution}
                  {item.startDate || item.endDate
                    ? ` · ${formatDateRange(item.startDate, item.endDate)}`
                    : ""}
                </p>
                {item.description ? (
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {item.description}
                  </p>
                ) : null}
              </article>
            ))
          ) : (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Agrega educacion desde el panel administrador.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
