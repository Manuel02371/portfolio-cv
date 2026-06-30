export type Profile = {
  id?: string;
  full_name: string;
  headline: string;
  summary: string;
  location?: string | null;
  email: string;
  phone?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  portfolio_url?: string | null;
};

export type Experience = {
  id?: string;
  company: string;
  role: string;
  start_date: string;
  end_date?: string | null;
  is_current?: boolean | null;
  description?: string | null;
  achievements: string[];
  technologies: string[];
  display_order: number;
};

export type Project = {
  id?: string;
  name: string;
  description: string;
  problem?: string | null;
  solution?: string | null;
  technologies: string[];
  repository_url?: string | null;
  demo_url?: string | null;
  display_order: number;
  is_featured?: boolean | null;
};

export type Skill = {
  id?: string;
  name: string;
  category: string;
  level?: number | null;
  display_order: number;
};

export type Certification = {
  id?: string;
  name: string;
  institution?: string | null;
  issue_date?: string | null;
  credential_url?: string | null;
  display_order: number;
};

export type Education = {
  id?: string;
  institution: string;
  degree: string;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
  display_order: number;
};

export type Contact = {
  id?: string;
  label: string;
  value: string;
  url?: string | null;
  display_order: number;
};

export type PortfolioData = {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  education: Education[];
  contacts: Contact[];
};
