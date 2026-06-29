import { ExternalLink, GitBranch } from "lucide-react";
import type { Project } from "@/types/domain";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="text-slate-600 dark:text-slate-300">Agrega proyectos desde el panel administrador.</p>;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {projects.map((project) => (
        <article
          key={project.id ?? project.name}
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
              {project.name}
            </h3>
            {project.isFeatured ? (
              <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-300/15 dark:text-amber-200">
                Destacado
              </span>
            ) : null}
          </div>
          <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">
            {project.description}
          </p>
          {project.problem || project.solution ? (
            <dl className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              {project.problem ? (
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-white">Problema</dt>
                  <dd className="mt-1">{project.problem}</dd>
                </div>
              ) : null}
              {project.solution ? (
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-white">Solucion</dt>
                  <dd className="mt-1">{project.solution}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}
          {project.technologies.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-300/10 dark:text-teal-200"
                >
                  {technology}
                </span>
              ))}
            </div>
          ) : null}
          {project.repositoryUrl || project.demoUrl ? (
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
              {project.repositoryUrl ? (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-slate-700 hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-200"
                >
                  <GitBranch aria-hidden="true" size={16} />
                  Repositorio
                </a>
              ) : null}
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-slate-700 hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-200"
                >
                  <ExternalLink aria-hidden="true" size={16} />
                  Demo
                </a>
              ) : null}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
