import { ContactSection } from "@/components/public/ContactSection";
import { CredentialList } from "@/components/public/CredentialList";
import { ExperienceTimeline } from "@/components/public/ExperienceTimeline";
import { Hero } from "@/components/public/Hero";
import { ProjectGrid } from "@/components/public/ProjectGrid";
import { Section } from "@/components/public/Section";
import { SkillCloud } from "@/components/public/SkillCloud";
import { getPublicCvData } from "@/lib/data/cv";

export default async function Home() {
  const data = await getPublicCvData();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Hero profile={data.profile} />
      <Section id="perfil" eyebrow="Perfil" title="Sobre mi">
        <div className="max-w-3xl space-y-4 text-lg leading-8 text-slate-700 dark:text-slate-300">
          <p>{data.profile.summary}</p>
          <p>
            Mi foco esta en crear datos confiables: desde extraccion y limpieza,
            hasta dashboards, validaciones y automatizaciones que reducen trabajo manual.
          </p>
        </div>
      </Section>
      <Section id="experiencia" eyebrow="Trayectoria" title="Experiencia">
        <ExperienceTimeline experiences={data.experiences} />
      </Section>
      <Section id="proyectos" eyebrow="Portafolio" title="Proyectos destacados">
        <ProjectGrid projects={data.projects} />
      </Section>
      <Section id="habilidades" eyebrow="Stack" title="Habilidades tecnicas">
        <SkillCloud skills={data.skills} />
      </Section>
      <Section id="formacion" eyebrow="Credenciales" title="Certificaciones y educacion">
        <CredentialList
          certifications={data.certifications}
          education={data.education}
        />
      </Section>
      <Section id="contacto" eyebrow="Contacto" title="Contacto">
        <ContactSection contacts={data.contacts} profile={data.profile} />
      </Section>
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 print:hidden">
        <p>CV y portafolio editable desde el panel administrador.</p>
      </footer>
    </main>
  );
}
