import type { ResourceName } from "@/types/domain";

export type ResourceField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "date" | "url" | "email" | "checkbox" | "list";
  required?: boolean;
  placeholder?: string;
};

export type ResourceConfig = {
  name: ResourceName;
  title: string;
  description: string;
  itemLabel: string;
  fields: ResourceField[];
};

export const resourceConfigs: Record<ResourceName, ResourceConfig> = {
  profile: {
    name: "profile",
    title: "Perfil",
    description: "Datos principales que aparecen en el hero y el contacto.",
    itemLabel: "perfil",
    fields: [
      { name: "fullName", label: "Nombre completo", type: "text", required: true },
      { name: "headline", label: "Titulo profesional", type: "text", required: true },
      { name: "summary", label: "Resumen", type: "textarea", required: true },
      { name: "location", label: "Ubicacion", type: "text" },
      { name: "email", label: "Correo", type: "email" },
      { name: "phone", label: "Telefono", type: "text" },
      { name: "linkedinUrl", label: "LinkedIn URL", type: "url" },
      { name: "githubUrl", label: "GitHub URL", type: "url" },
      { name: "portfolioUrl", label: "Portfolio URL", type: "url" },
      { name: "isPublished", label: "Publicado", type: "checkbox" },
    ],
  },
  experiences: {
    name: "experiences",
    title: "Experiencia",
    description: "Roles, logros, tecnologias y fechas laborales.",
    itemLabel: "experiencia",
    fields: [
      { name: "company", label: "Empresa", type: "text", required: true },
      { name: "role", label: "Rol", type: "text", required: true },
      { name: "startDate", label: "Fecha inicio", type: "date", required: true },
      { name: "endDate", label: "Fecha fin", type: "date" },
      { name: "isCurrent", label: "Trabajo actual", type: "checkbox" },
      { name: "description", label: "Descripcion", type: "textarea", required: true },
      { name: "achievements", label: "Logros", type: "list", placeholder: "Un logro por linea" },
      { name: "technologies", label: "Tecnologias", type: "list", placeholder: "SQL Server, Python, Power BI" },
      { name: "displayOrder", label: "Orden", type: "number" },
      { name: "isPublished", label: "Publicado", type: "checkbox" },
    ],
  },
  projects: {
    name: "projects",
    title: "Proyectos",
    description: "Casos de uso, problema, solucion y stack tecnico.",
    itemLabel: "proyecto",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "description", label: "Descripcion", type: "textarea", required: true },
      { name: "problem", label: "Problema", type: "textarea" },
      { name: "solution", label: "Solucion", type: "textarea" },
      { name: "technologies", label: "Tecnologias", type: "list", placeholder: "SQL Server, Azure, ETL" },
      { name: "repositoryUrl", label: "Repositorio URL", type: "url" },
      { name: "demoUrl", label: "Demo URL", type: "url" },
      { name: "displayOrder", label: "Orden", type: "number" },
      { name: "isFeatured", label: "Destacado", type: "checkbox" },
      { name: "isPublished", label: "Publicado", type: "checkbox" },
    ],
  },
  skills: {
    name: "skills",
    title: "Skills",
    description: "Habilidades tecnicas por categoria y nivel.",
    itemLabel: "skill",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "category", label: "Categoria", type: "text", required: true },
      { name: "level", label: "Nivel 1-5", type: "number", required: true },
      { name: "displayOrder", label: "Orden", type: "number" },
      { name: "isPublished", label: "Publicado", type: "checkbox" },
    ],
  },
  certifications: {
    name: "certifications",
    title: "Certificaciones",
    description: "Certificaciones, institucion y credenciales.",
    itemLabel: "certificacion",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "institution", label: "Institucion", type: "text", required: true },
      { name: "issueDate", label: "Fecha emision", type: "date" },
      { name: "credentialUrl", label: "Credencial URL", type: "url" },
      { name: "displayOrder", label: "Orden", type: "number" },
      { name: "isPublished", label: "Publicado", type: "checkbox" },
    ],
  },
  education: {
    name: "education",
    title: "Educacion",
    description: "Formacion academica o tecnica.",
    itemLabel: "educacion",
    fields: [
      { name: "institution", label: "Institucion", type: "text", required: true },
      { name: "degree", label: "Titulo o programa", type: "text", required: true },
      { name: "startDate", label: "Fecha inicio", type: "date" },
      { name: "endDate", label: "Fecha fin", type: "date" },
      { name: "description", label: "Descripcion", type: "textarea" },
      { name: "displayOrder", label: "Orden", type: "number" },
      { name: "isPublished", label: "Publicado", type: "checkbox" },
    ],
  },
  contacts: {
    name: "contacts",
    title: "Contacto",
    description: "Canales y enlaces visibles en la pagina publica.",
    itemLabel: "contacto",
    fields: [
      { name: "label", label: "Etiqueta", type: "text", required: true },
      { name: "value", label: "Valor", type: "text", required: true },
      { name: "url", label: "URL", type: "url" },
      { name: "displayOrder", label: "Orden", type: "number" },
      { name: "isPublic", label: "Publico", type: "checkbox" },
    ],
  },
};

export const resourceOrder: ResourceName[] = [
  "profile",
  "experiences",
  "projects",
  "skills",
  "certifications",
  "education",
  "contacts",
];

export function isResourceName(value: unknown): value is ResourceName {
  return typeof value === "string" && Object.hasOwn(resourceConfigs, value);
}
