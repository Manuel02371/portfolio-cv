import type {
  Certification,
  Contact,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
} from "@/types/domain";
import type { Database } from "@/types/database";

type Tables = Database["public"]["Tables"];

export function mapProfile(row: Tables["profiles"]["Row"]): Profile {
  return {
    id: row.id,
    fullName: row.full_name,
    headline: row.headline,
    summary: row.summary,
    location: row.location ?? undefined,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    linkedinUrl: row.linkedin_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
    portfolioUrl: row.portfolio_url ?? undefined,
    isPublished: row.is_published,
  };
}

export function profileToRow(input: Profile): Tables["profiles"]["Insert"] {
  return {
    full_name: input.fullName,
    headline: input.headline,
    summary: input.summary,
    location: input.location ?? null,
    email: input.email ?? null,
    phone: input.phone ?? null,
    linkedin_url: input.linkedinUrl ?? null,
    github_url: input.githubUrl ?? null,
    portfolio_url: input.portfolioUrl ?? null,
    is_published: input.isPublished,
  };
}

export function mapExperience(row: Tables["experiences"]["Row"]): Experience {
  return {
    id: row.id,
    company: row.company,
    role: row.role,
    startDate: row.start_date,
    endDate: row.end_date ?? undefined,
    isCurrent: row.is_current,
    description: row.description,
    achievements: row.achievements ?? [],
    technologies: row.technologies ?? [],
    displayOrder: row.display_order,
    isPublished: row.is_published,
  };
}

export function experienceToRow(input: Experience): Tables["experiences"]["Insert"] {
  return {
    company: input.company,
    role: input.role,
    start_date: input.startDate,
    end_date: input.endDate || null,
    is_current: input.isCurrent,
    description: input.description,
    achievements: input.achievements,
    technologies: input.technologies,
    display_order: input.displayOrder,
    is_published: input.isPublished,
  };
}

export function mapProject(row: Tables["projects"]["Row"]): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    problem: row.problem ?? undefined,
    solution: row.solution ?? undefined,
    technologies: row.technologies ?? [],
    repositoryUrl: row.repository_url ?? undefined,
    demoUrl: row.demo_url ?? undefined,
    displayOrder: row.display_order,
    isFeatured: row.is_featured,
    isPublished: row.is_published,
  };
}

export function projectToRow(input: Project): Tables["projects"]["Insert"] {
  return {
    name: input.name,
    description: input.description,
    problem: input.problem ?? null,
    solution: input.solution ?? null,
    technologies: input.technologies,
    repository_url: input.repositoryUrl ?? null,
    demo_url: input.demoUrl ?? null,
    display_order: input.displayOrder,
    is_featured: input.isFeatured,
    is_published: input.isPublished,
  };
}

export function mapSkill(row: Tables["skills"]["Row"]): Skill {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    level: row.level,
    displayOrder: row.display_order,
    isPublished: row.is_published,
  };
}

export function skillToRow(input: Skill): Tables["skills"]["Insert"] {
  return {
    name: input.name,
    category: input.category,
    level: input.level,
    display_order: input.displayOrder,
    is_published: input.isPublished,
  };
}

export function mapCertification(row: Tables["certifications"]["Row"]): Certification {
  return {
    id: row.id,
    name: row.name,
    institution: row.institution,
    issueDate: row.issue_date ?? undefined,
    credentialUrl: row.credential_url ?? undefined,
    displayOrder: row.display_order,
    isPublished: row.is_published,
  };
}

export function certificationToRow(
  input: Certification,
): Tables["certifications"]["Insert"] {
  return {
    name: input.name,
    institution: input.institution,
    issue_date: input.issueDate || null,
    credential_url: input.credentialUrl ?? null,
    display_order: input.displayOrder,
    is_published: input.isPublished,
  };
}

export function mapEducation(row: Tables["education"]["Row"]): Education {
  return {
    id: row.id,
    institution: row.institution,
    degree: row.degree,
    startDate: row.start_date ?? undefined,
    endDate: row.end_date ?? undefined,
    description: row.description ?? undefined,
    displayOrder: row.display_order,
    isPublished: row.is_published,
  };
}

export function educationToRow(input: Education): Tables["education"]["Insert"] {
  return {
    institution: input.institution,
    degree: input.degree,
    start_date: input.startDate || null,
    end_date: input.endDate || null,
    description: input.description ?? null,
    display_order: input.displayOrder,
    is_published: input.isPublished,
  };
}

export function mapContact(row: Tables["contacts"]["Row"]): Contact {
  return {
    id: row.id,
    label: row.label,
    value: row.value,
    url: row.url ?? undefined,
    displayOrder: row.display_order,
    isPublic: row.is_public,
  };
}

export function contactToRow(input: Contact): Tables["contacts"]["Insert"] {
  return {
    label: input.label,
    value: input.value,
    url: input.url ?? null,
    display_order: input.displayOrder,
    is_public: input.isPublic,
  };
}
