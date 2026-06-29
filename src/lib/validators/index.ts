import { z } from "zod";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const trimString = (min = 1, max = 2_000) =>
  z.string().trim().min(min).max(max);

const optionalText = (max = 2_000) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal("").transform(() => undefined));

const optionalDate = z
  .string()
  .regex(datePattern, "Use YYYY-MM-DD")
  .optional()
  .or(z.literal("").transform(() => undefined));

const requiredDate = z.string().regex(datePattern, "Use YYYY-MM-DD");

const optionalUrl = z
  .string()
  .trim()
  .url()
  .optional()
  .or(z.literal("").transform(() => undefined));

const optionalEmail = z
  .string()
  .trim()
  .email()
  .optional()
  .or(z.literal("").transform(() => undefined));

export const profileSchema = z.object({
  id: optionalText(80),
  fullName: trimString(2, 120),
  headline: trimString(3, 180),
  summary: trimString(20, 2_000),
  location: optionalText(120),
  email: optionalEmail,
  phone: optionalText(60),
  linkedinUrl: optionalUrl,
  githubUrl: optionalUrl,
  portfolioUrl: optionalUrl,
  isPublished: z.boolean().default(true),
});

export const experienceSchema = z
  .object({
    id: optionalText(80),
    company: trimString(2, 120),
    role: trimString(2, 120),
    startDate: requiredDate,
    endDate: optionalDate,
    isCurrent: z.boolean().default(false),
    description: trimString(10, 2_000),
    achievements: z.array(trimString(2, 300)).default([]),
    technologies: z.array(trimString(1, 80)).default([]),
    displayOrder: z.coerce.number().int().min(0).default(0),
    isPublished: z.boolean().default(true),
  })
  .superRefine((value, ctx) => {
    if (!value.isCurrent && !value.endDate) {
      ctx.addIssue({
        code: "custom",
        message: "End date is required unless this role is current.",
        path: ["endDate"],
      });
    }

    if (value.endDate && value.endDate < value.startDate) {
      ctx.addIssue({
        code: "custom",
        message: "End date cannot be before start date.",
        path: ["endDate"],
      });
    }
  });

export const projectSchema = z.object({
  id: optionalText(80),
  name: trimString(2, 140),
  description: trimString(10, 2_000),
  problem: optionalText(1_500),
  solution: optionalText(1_500),
  technologies: z.array(trimString(1, 80)).default([]),
  repositoryUrl: optionalUrl,
  demoUrl: optionalUrl,
  displayOrder: z.coerce.number().int().min(0).default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export const skillSchema = z.object({
  id: optionalText(80),
  name: trimString(1, 80),
  category: trimString(2, 80),
  level: z.coerce.number().int().min(1).max(5),
  displayOrder: z.coerce.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const certificationSchema = z.object({
  id: optionalText(80),
  name: trimString(2, 140),
  institution: trimString(2, 140),
  issueDate: optionalDate,
  credentialUrl: optionalUrl,
  displayOrder: z.coerce.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const educationSchema = z
  .object({
    id: optionalText(80),
    institution: trimString(2, 140),
    degree: trimString(2, 140),
    startDate: optionalDate,
    endDate: optionalDate,
    description: optionalText(1_500),
    displayOrder: z.coerce.number().int().min(0).default(0),
    isPublished: z.boolean().default(true),
  })
  .superRefine((value, ctx) => {
    if (value.startDate && value.endDate && value.endDate < value.startDate) {
      ctx.addIssue({
        code: "custom",
        message: "End date cannot be before start date.",
        path: ["endDate"],
      });
    }
  });

export const contactSchema = z.object({
  id: optionalText(80),
  label: trimString(2, 80),
  value: trimString(2, 200),
  url: optionalUrl,
  displayOrder: z.coerce.number().int().min(0).default(0),
  isPublic: z.boolean().default(true),
});

export const resourceSchemas = {
  profile: profileSchema,
  experiences: experienceSchema,
  projects: projectSchema,
  skills: skillSchema,
  certifications: certificationSchema,
  education: educationSchema,
  contacts: contactSchema,
};

export type ProfileInput = z.infer<typeof profileSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type CertificationInput = z.infer<typeof certificationSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
