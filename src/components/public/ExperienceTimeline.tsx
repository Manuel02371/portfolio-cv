import { BriefcaseBusiness } from "lucide-react";
import { formatDateRange } from "@/lib/format";
import type { Experience } from "@/types/domain";

type ExperienceTimelineProps = {
  experiences: Experience[];
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (experiences.length === 0) {
    return <p className="text-slate-600 dark:text-slate-300">Agrega experiencia desde el panel administrador.</p>;
  }

  return (
    <div className="space-y-6">
      {experiences.map((experience) => (
        <article
          key={experience.id ?? `${experience.company}-${experience.role}`}
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-teal-700 dark:text-teal-300">
                <BriefcaseBusiness aria-hidden="true" size={17} />
                {experience.company}
              </div>
              <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
                {experience.role}
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}
            </p>
          </div>
          <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
            {experience.description}
          </p>
          {experience.achievements.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {experience.achievements.map((achievement) => (
                <li key={achievement} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {experience.technologies.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
