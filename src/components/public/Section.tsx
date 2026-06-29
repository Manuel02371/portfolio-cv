import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="cv-section border-t border-slate-200 py-14 dark:border-slate-800">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 md:grid-cols-[220px_1fr] md:px-8">
        <div>
          {eyebrow ? (
            <p className="mb-2 text-xs font-semibold uppercase text-amber-700 dark:text-amber-300">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
