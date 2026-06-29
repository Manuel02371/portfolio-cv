export type Profile = {
  id?: string;
  fullName: string;
  headline: string;
  summary: string;
  location?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  isPublished: boolean;
};

export type Experience = {
  id?: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  displayOrder: number;
  isPublished: boolean;
};

export type Project = {
  id?: string;
  name: string;
  description: string;
  problem?: string;
  solution?: string;
  technologies: string[];
  repositoryUrl?: string;
  demoUrl?: string;
  displayOrder: number;
  isFeatured: boolean;
  isPublished: boolean;
};

export type Skill = {
  id?: string;
  name: string;
  category: string;
  level: number;
  displayOrder: number;
  isPublished: boolean;
};

export type Certification = {
  id?: string;
  name: string;
  institution: string;
  issueDate?: string;
  credentialUrl?: string;
  displayOrder: number;
  isPublished: boolean;
};

export type Education = {
  id?: string;
  institution: string;
  degree: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  displayOrder: number;
  isPublished: boolean;
};

export type Contact = {
  id?: string;
  label: string;
  value: string;
  url?: string;
  displayOrder: number;
  isPublic: boolean;
};

export type CvData = {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  education: Education[];
  contacts: Contact[];
};

export type ResourceName =
  | "profile"
  | "experiences"
  | "projects"
  | "skills"
  | "certifications"
  | "education"
  | "contacts";
