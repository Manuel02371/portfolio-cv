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
      <p className="mb-2 text-sm font-semibold uppercase text-[#38BDF8]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold text-[#F8FAFC] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-[#CBD5E1]">{description}</p>
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
    ["Resultado", "ETL, cloud y reportes más rápidos"],
  ];

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#F8FAFC] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[#0F172A]"
      >
        Saltar al contenido principal
      </a>
      <main id="contenido" tabIndex={-1} className="bg-[#0F172A] text-[#F8FAFC]">
        <section className="relative overflow-hidden bg-[#0F172A] text-[#F8FAFC]">
          <Image
            src={assetPath("/data-portfolio-hero-23ea21d3.webp")}
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.95)_0%,rgba(15,23,42,0.82)_48%,rgba(15,23,42,0.72)_100%)]" />
          <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col px-6 py-6">
            <nav
              aria-label="Secciones del CV"
              className="flex flex-wrap items-center justify-between gap-4 text-sm"
            >
              <a href="#perfil" className="font-semibold text-[#F8FAFC]">
                {data.profile.full_name}
              </a>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[#CBD5E1]">
                {navItems.map(([label, href]) => (
                  <a key={href} href={href} className="hover:text-[#38BDF8]">
                    {label}
                  </a>
                ))}
              </div>
            </nav>

            <div className="flex flex-1 items-center py-16">
              <div className="max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase text-[#38BDF8]">
                  CV y portafolio profesional
                </p>
                <h1 className="text-5xl font-semibold leading-tight sm:text-6xl">
                  {data.profile.full_name}
                </h1>
                <p className="mt-5 max-w-2xl text-2xl leading-9 text-[#F8FAFC]">
                  {data.profile.headline}
                </p>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#CBD5E1]">
                  {data.profile.summary}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/cv"
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-[#2563EB] px-5 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:bg-[#38BDF8] hover:text-[#0F172A]"
                  >
                    Ver CV imprimible
                  </Link>
                  <a
                    href="https://wa.me/51933703902"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Contactar por WhatsApp"
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#334155] px-5 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:border-[#38BDF8] hover:bg-[#1E293B]"
                  >
                    Contactar
                  </a>
                  {primaryLinks.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#334155] px-5 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:border-[#38BDF8] hover:bg-[#1E293B]"
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
          className="border-b border-[#334155] bg-[#1E293B]"
        >
          <dl className="mx-auto grid max-w-6xl gap-5 px-6 py-7 md:grid-cols-3">
            {impact.map(([label, value]) => (
              <div key={label}>
                <dt className="text-sm font-semibold uppercase text-[#38BDF8]">
                  {label}
                </dt>
                <dd className="mt-2 text-lg font-semibold text-[#F8FAFC]">
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
            description="Transformo información operativa en pipelines, modelos y reportes que reducen trabajo manual y mejoran la trazabilidad."
          />
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <p className="text-lg leading-8 text-[#CBD5E1]">
              Trabajo en la unión entre negocio y tecnología: bases de datos,
              automatización, ETL, dashboards y migraciones cloud. Mi foco es
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
                  className="rounded-md border border-[#334155] bg-[#1E293B] px-4 py-4 text-sm font-semibold text-[#F8FAFC]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experiencia" className="bg-[#0F172A] py-16">
          <div className="mx-auto max-w-6xl px-6">
            <SectionTitle
              eyebrow="Experiencia"
              title="Trabajo con datos reales"
              description="Experiencia aplicada en ETL, migración, integración cloud, reportería y automatización."
            />
            <div className="space-y-5">
              {data.experiences.map((experience) => (
                <article
                  key={`${experience.company}-${experience.role}`}
                  className="rounded-md border border-[#334155] bg-[#1E293B] p-6"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-[#F8FAFC]">
                        {experience.role}
                      </h3>
                      <p className="font-medium text-[#38BDF8]">
                        {experience.company}
                      </p>
                    </div>
                    <p className="text-sm text-[#CBD5E1]">
                      {formatDate(experience.start_date)} -{" "}
                      {experience.is_current
                        ? "Actualidad"
                        : formatDate(experience.end_date)}
                    </p>
                  </div>
                  {experience.description ? (
                    <p className="mt-4 leading-7 text-[#CBD5E1]">
                      {experience.description}
                    </p>
                  ) : null}
                  <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm text-[#CBD5E1]">
                    {experience.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md bg-[#334155] px-3 py-1 text-sm font-medium text-[#CBD5E1]"
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
            title="Habilidades técnicas"
            description="Herramientas organizadas por categoría para leer rápido donde aporto más valor."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <article
                key={category}
                className="rounded-md border border-[#334155] bg-[#1E293B] p-5"
              >
                <h3 className="font-semibold text-[#F8FAFC]">{category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-md bg-[#334155] px-3 py-1 text-sm text-[#CBD5E1]"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="proyectos" className="bg-[#1E293B] py-16 text-[#F8FAFC]">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase text-[#38BDF8]">
                Proyectos
              </p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Casos destacados
              </h2>
              <p className="mt-3 text-base leading-7 text-[#CBD5E1]">
                Ejemplos de automatización, migración, reportería y análisis con
                impacto práctico.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => {
                const repositoryUrl = safeExternalUrl(project.repository_url);
                const demoUrl = safeExternalUrl(project.demo_url);

                return (
                  <article
                    key={project.name}
                    className="rounded-md border border-[#334155] bg-[#0F172A] p-6"
                  >
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <p className="mt-3 leading-7 text-[#CBD5E1]">
                      {project.description}
                    </p>
                    {project.problem || project.solution ? (
                      <div className="mt-5 grid gap-3 text-sm leading-6 text-[#CBD5E1]">
                        {project.problem ? (
                          <p>
                            <strong className="text-[#F8FAFC]">Problema:</strong>{" "}
                            {project.problem}
                          </p>
                        ) : null}
                        {project.solution ? (
                          <p>
                            <strong className="text-[#F8FAFC]">Solución:</strong>{" "}
                            {project.solution}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md bg-[#334155] px-3 py-1 text-sm text-[#CBD5E1]"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                    {repositoryUrl || demoUrl ? (
                      <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
                        {repositoryUrl ? (
                          <a href={repositoryUrl} className="text-[#38BDF8]">
                            Ver repositorio
                          </a>
                        ) : null}
                        {demoUrl ? (
                          <a href={demoUrl} className="text-[#38BDF8]">
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
            <SectionTitle eyebrow="Formación" title="Educación" />
            <div className="space-y-4">
              {data.education.map((item) => (
                <article key={`${item.institution}-${item.degree}`}>
                  <h3 className="font-semibold text-[#F8FAFC]">{item.degree}</h3>
                  <p className="text-[#38BDF8]">{item.institution}</p>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-6 text-[#CBD5E1]">
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
                      <h3 className="font-semibold text-[#F8FAFC]">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#CBD5E1]">
                        {href ? (
                          <a href={href} className="text-[#38BDF8]">
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

        <section id="contacto" className="bg-[#0F172A] py-16">
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
                    className="rounded-md border border-[#334155] bg-[#1E293B] px-4 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:border-[#38BDF8] hover:bg-[#2563EB]"
                  >
                    {label}
                  </a>
                ) : (
                  <span
                    key={contact.label}
                    className="rounded-md border border-[#334155] bg-[#1E293B] px-4 py-3 text-sm font-semibold text-[#F8FAFC]"
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
