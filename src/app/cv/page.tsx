import { PrintButton } from "@/components/PrintButton";
import { getPortfolioData, safeExternalUrl } from "@/lib/portfolio";

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("es", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function CvPage() {
  const data = getPortfolioData();

  return (
    <main className="print-root bg-[#0F172A] px-4 py-8 text-[#F8FAFC]">
      <div className="no-print mx-auto mb-4 flex max-w-4xl justify-end">
        <PrintButton />
      </div>
      <article className="print-page mx-auto max-w-4xl rounded-md border border-[#334155] bg-[#1E293B] p-8 shadow-sm">
        <header className="border-b border-[#334155] pb-6">
          <h1 className="text-4xl font-semibold">{data.profile.full_name}</h1>
          <p className="mt-2 text-xl text-[#38BDF8]">{data.profile.headline}</p>
          <p className="mt-4 leading-7 text-[#CBD5E1]">{data.profile.summary}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#CBD5E1]">
            <span>{data.profile.email}</span>
            {data.profile.phone ? <span>{data.profile.phone}</span> : null}
            {data.profile.location ? <span>{data.profile.location}</span> : null}
          </div>
        </header>

        <section className="mt-7">
          <h2 className="text-lg font-semibold">Experiencia</h2>
          <div className="mt-3 space-y-5">
            {data.experiences.map((experience) => (
              <div key={`${experience.company}-${experience.role}`}>
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{experience.role}</h3>
                    <p className="text-sm text-[#38BDF8]">{experience.company}</p>
                  </div>
                  <p className="text-sm text-[#CBD5E1]">
                    {formatDate(experience.start_date)} -{" "}
                    {experience.is_current
                      ? "Actualidad"
                      : formatDate(experience.end_date)}
                  </p>
                </div>
                {experience.description ? (
                  <p className="mt-2 text-sm leading-6">{experience.description}</p>
                ) : null}
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {experience.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-lg font-semibold">Proyectos</h2>
          <div className="mt-3 grid gap-4">
            {data.projects.map((project) => (
              <div key={project.name}>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="mt-1 text-sm leading-6">{project.description}</p>
                <p className="mt-1 text-sm text-[#CBD5E1]">
                  {project.technologies.join(" - ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-lg font-semibold">Habilidades</h2>
          <p className="mt-2 text-sm leading-6">
            {data.skills.map((skill) => skill.name).join(" - ")}
          </p>
        </section>

        <section className="mt-7 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">Educación</h2>
            <div className="mt-3 space-y-3 text-sm">
              {data.education.map((item) => (
                <p key={`${item.institution}-${item.degree}`}>
                  <strong>{item.degree}</strong>
                  <br />
                  {item.institution}
                </p>
              ))}
            </div>
          </div>
          {data.certifications.length ? (
            <div>
              <h2 className="text-lg font-semibold">Certificaciones</h2>
              <div className="mt-3 space-y-3 text-sm">
                {data.certifications.map((item) => {
                  const href = safeExternalUrl(item.credential_url);
                  return (
                    <p key={item.name}>
                      <strong>{item.name}</strong>
                      <br />
                      {href ? <a href={href}>{item.institution}</a> : item.institution}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : null}
        </section>
      </article>
    </main>
  );
}
