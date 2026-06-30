import Image from "next/image";
import Link from "next/link";
import { getPortfolioData, safeExternalUrl } from "@/lib/portfolio";
import { assetPath } from "@/lib/site";

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("es", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-2 text-sm font-semibold uppercase text-[#0f766e]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-[#172120] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-[#4b5b5b]">{description}</p>
      ) : null}
    </div>
  );
}

export default function Home() {
  const data = getPortfolioData();
  const featuredProjects = data.projects.filter((project) => project.is_featured);
  const projects = featuredProjects.length ? featuredProjects : data.projects;
  const skillsByCategory = data.skills.reduce(
    (groups, skill) => ({
      ...groups,
      [skill.category]: [...(groups[skill.category] ?? []), skill],
    }),
    {} as Record<string, typeof data.skills>,
  );

  const primaryLinks = [
    ["LinkedIn", safeExternalUrl(data.profile.linkedin_url)],
    ["GitHub", safeExternalUrl(data.profile.github_url)],
    ["Email", safeExternalUrl(`mailto:${data.profile.email}`)],
  ].filter((link): link is [string, string] => Boolean(link[1]));
  const navItems = [
    ["Perfil", "#perfil"],
    ["Experiencia", "#experiencia"],
    ["Habilidades", "#habilidades"],
    ["Proyectos", "#proyectos"],
    ["Contacto", "#contacto"],
  ];
  const impact = [
    ["Enfoque", "Datos confiables para decidir"],
    ["Stack", "SQL, Python, SSIS y Azure"],
    ["Resultado", "ETL, cloud y reportes mas rapidos"],
  ];

  return (
    <>
      <a
        href="#perfil"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#172120]"
      >
        Saltar al contenido principal
      </a>
      <main>
        <section className="relative overflow-hidden bg-[#172120] text-white">
          <Image
            src={assetPath("/data-portfolio-hero.png")}
            alt="Estacion de trabajo con tableros de datos y reportes"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,33,32,0.95)_0%,rgba(23,33,32,0.78)_48%,rgba(23,33,32,0.22)_100%)]" />
          <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col px-6 py-6">
            <nav
              aria-label="Secciones del CV"
              className="flex flex-wrap items-center justify-between gap-4 text-sm"
            >
              <a href="#perfil" className="font-semibold text-white">
                {data.profile.full_name}
              </a>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/80">
                {navItems.map(([label, href]) => (
                  <a key={href} href={href} className="hover:text-[#f4c542]">
                    {label}
                  </a>
                ))}
              </div>
            </nav>

            <div className="flex flex-1 items-center py-16">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase text-[#f4c542]">
                  CV y portafolio profesional
                </p>
                <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">
                  {data.profile.full_name}
                </h1>
                <p className="mt-5 max-w-2xl text-2xl leading-9 text-white/90">
                  {data.profile.headline}
                </p>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                  {data.profile.summary}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/cv"
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#f4c542] px-5 py-3 text-sm font-semibold text-[#172120] transition hover:bg-[#ffd95b]"
                  >
                    Ver CV imprimible
                  </Link>
                  <a
                    href="#contacto"
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Contactar
                  </a>
                  {primaryLinks.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Resumen profesional"
          className="border-b border-[#d8ded9] bg-white"
        >
          <dl className="mx-auto grid max-w-6xl gap-5 px-6 py-7 md:grid-cols-3">
            {impact.map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm font-semibold uppercase text-[#0f766e]">
                  {label}
                </dt>
                <dd className="mt-2 text-lg font-semibold text-[#172120]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="perfil" className="mx-auto max-w-6xl px-6 py-16">
          <SectionTitle
            eyebrow="Perfil"
            title="Datos, ETL y nube con foco en procesos sostenibles"
            description="Transformo informacion operativa en pipelines, modelos y reportes que reducen trabajo manual y mejoran la trazabilidad."
          />
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <p className="text-lg leading-8 text-[#4b5b5b]">
              Trabajo en la union entre negocio y tecnologia: bases de datos,
              automatizacion, ETL, dashboards y migraciones cloud. Mi foco es
              ordenar datos, reducir trabajo manual y construir procesos que se
              puedan auditar, optimizar y mantener.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Consultas SQL confiables",
                "ETL con SSIS y Python",
                "Azure Data Factory",
                "Migraciones cloud controladas",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-md border border-[#d8ded9] bg-white px-4 py-4 text-sm font-semibold text-[#172120] shadow-[0_1px_0_rgba(23,33,32,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle
              eyebrow="Experiencia"
              title="Trabajo con datos reales"
              description="Experiencia aplicada en ETL, migracion, integracion cloud, reporteria y automatizacion."
            />
            <div className="space-y-5">
              {data.experiences.map((experience) => (
                <article
                  key={`${experience.company}-${experience.role}`}
                  className="rounded-md border border-[#d8ded9] p-6 shadow-[0_12px_30px_rgba(23,33,32,0.05)]"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-[#172120]">
                        {experience.role}
                      </h3>
                      <p className="font-medium text-[#0f766e]">
                        {experience.company}
                      </p>
                    </div>
                    <p className="text-sm text-[#637070]">
                      {formatDate(experience.start_date)} -{" "}
                      {experience.is_current
                        ? "Actualidad"
                        : formatDate(experience.end_date)}
                    </p>
                  </div>
                  {experience.description ? (
                    <p className="mt-4 leading-7 text-[#4b5b5b]">
                      {experience.description}
                    </p>
                  ) : null}
                  <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm text-[#4b5b5b]">
                    {experience.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md bg-[#eef4f1] px-3 py-1 text-sm font-medium text-[#172120]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="habilidades" className="mx-auto max-w-6xl px-6 py-16">
          <SectionTitle
            eyebrow="Stack"
            title="Habilidades tecnicas"
            description="Herramientas organizadas por categoria para leer rapido donde aporto mas valor."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <article
                key={category}
                className="rounded-md border border-[#d8ded9] bg-white p-5"
              >
                <h3 className="font-semibold text-[#172120]">{category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-md bg-[#f8efd0] px-3 py-1 text-sm text-[#5c4700]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="proyectos" className="bg-[#172120] py-16 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase text-[#f4c542]">
                Proyectos
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Casos destacados
              </h2>
              <p className="mt-3 text-base leading-7 text-white/75">
                Ejemplos de automatizacion, migracion, reporteria y analisis con
                impacto practico.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => {
                const repositoryUrl = safeExternalUrl(project.repository_url);
                const demoUrl = safeExternalUrl(project.demo_url);

                return (
                  <article
                    key={project.name}
                    className="rounded-md border border-white/15 bg-white/[0.06] p-6"
                  >
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="mt-3 leading-7 text-white/75">
                      {project.description}
                    </p>
                    {project.problem || project.solution ? (
                      <div className="mt-5 grid gap-3 text-sm leading-6 text-white/70">
                        {project.problem ? (
                          <p>
                            <strong className="text-white">Problema:</strong>{" "}
                            {project.problem}
                          </p>
                        ) : null}
                        {project.solution ? (
                          <p>
                            <strong className="text-white">Solucion:</strong>{" "}
                            {project.solution}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md bg-white/10 px-3 py-1 text-sm text-white"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                    {repositoryUrl || demoUrl ? (
                      <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                        {repositoryUrl ? (
                          <a href={repositoryUrl} className="text-[#f4c542]">
                            Ver repositorio
                          </a>
                        ) : null}
                        {demoUrl ? (
                          <a href={demoUrl} className="text-[#f4c542]">
                            Ver demo
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Formacion" title="Educacion" />
            <div className="space-y-4">
              {data.education.map((item) => (
                <article key={`${item.institution}-${item.degree}`}>
                  <h3 className="font-semibold text-[#172120]">{item.degree}</h3>
                  <p className="text-[#0f766e]">{item.institution}</p>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-6 text-[#4b5b5b]">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
          {data.certifications.length ? (
            <div>
              <SectionTitle eyebrow="Credenciales" title="Certificaciones" />
              <div className="space-y-4">
                {data.certifications.map((item) => {
                  const href = safeExternalUrl(item.credential_url);

                  return (
                    <article key={item.name}>
                      <h3 className="font-semibold text-[#172120]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#4b5b5b]">
                        {href ? (
                          <a href={href} className="text-[#0f766e]">
                            {item.institution}
                          </a>
                        ) : (
                          item.institution
                        )}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : null}
        </section>

        <section id="contacto" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle
              eyebrow="Contacto"
              title="Conversemos"
              description="Canales directos para revisar oportunidades, proyectos de datos o colaboraciones."
            />
            <div className="flex flex-wrap gap-3">
              {data.contacts.map((contact) => {
                const href = safeExternalUrl(contact.url);
                const label = `${contact.label}: ${contact.value}`;

                return href ? (
                  <a
                    key={contact.label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-md border border-[#d8ded9] px-4 py-3 text-sm font-semibold text-[#172120] transition hover:border-[#0f766e] hover:bg-[#eef4f1]"
                  >
                    {label}
                  </a>
                ) : (
                  <span
                    key={contact.label}
                    className="rounded-md border border-[#d8ded9] px-4 py-3 text-sm font-semibold text-[#172120]"
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
