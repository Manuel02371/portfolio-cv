import { describe, expect, it } from "vitest";
import {
  certificationSchema,
  contactSchema,
  educationSchema,
  experienceSchema,
  profileSchema,
  projectSchema,
  skillSchema,
} from "@/lib/validators";

describe("CV data validators", () => {
  it("accepts a complete professional profile", () => {
    const result = profileSchema.safeParse({
      fullName: "Manuel Vargas",
      headline: "Data Analyst / Data Engineer / Business Intelligence",
      summary: "Especialista en SQL Server, Python, Power BI y procesos ETL.",
      location: "Lima, Peru",
      email: "manuel@example.com",
      phone: "+51 999 999 999",
      linkedinUrl: "https://www.linkedin.com/in/manuel",
      githubUrl: "https://github.com/manuel",
      portfolioUrl: "https://manuel.dev",
      isPublished: true,
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid profile links and email", () => {
    const result = profileSchema.safeParse({
      fullName: "M",
      headline: "",
      summary: "",
      email: "not-an-email",
      linkedinUrl: "linkedin",
      githubUrl: "github",
    });

    expect(result.success).toBe(false);
  });

  it("validates experience date ranges", () => {
    const result = experienceSchema.safeParse({
      company: "Insurance Data Co.",
      role: "Data Engineer",
      startDate: "2024-01-01",
      endDate: "2023-12-31",
      isCurrent: false,
      description: "ETL and data validation.",
      achievements: ["Reduced manual validation time."],
      technologies: ["SQL Server", "Python"],
      displayOrder: 1,
      isPublished: true,
    });

    expect(result.success).toBe(false);
  });

  it("accepts a project with technologies and optional URLs", () => {
    const result = projectSchema.safeParse({
      name: "Migracion on-premise a nube",
      description: "Migracion y validacion de datos con SQL Server.",
      problem: "Datos distribuidos en entornos legacy.",
      solution: "Pipeline reproducible con controles de calidad.",
      technologies: ["SQL Server", "Azure", "ETL"],
      repositoryUrl: "https://github.com/manuel/data-migration",
      demoUrl: "https://demo.example.com",
      displayOrder: 1,
      isFeatured: true,
      isPublished: true,
    });

    expect(result.success).toBe(true);
  });

  it("rejects empty skill names and out-of-range levels", () => {
    const result = skillSchema.safeParse({
      name: "",
      category: "Data",
      level: 6,
      displayOrder: 1,
      isPublished: true,
    });

    expect(result.success).toBe(false);
  });

  it("validates certification URLs", () => {
    const result = certificationSchema.safeParse({
      name: "Power BI",
      institution: "Microsoft",
      issueDate: "2024-03-01",
      credentialUrl: "not-a-url",
      displayOrder: 1,
      isPublished: true,
    });

    expect(result.success).toBe(false);
  });

  it("validates education date ranges", () => {
    const result = educationSchema.safeParse({
      institution: "Universidad",
      degree: "Ingenieria",
      startDate: "2020-01-01",
      endDate: "2019-01-01",
      description: "Formacion en sistemas.",
      displayOrder: 1,
      isPublished: true,
    });

    expect(result.success).toBe(false);
  });

  it("requires valid contact URLs when provided", () => {
    const result = contactSchema.safeParse({
      label: "LinkedIn",
      value: "linkedin.com/in/manuel",
      url: "https://www.linkedin.com/in/manuel",
      displayOrder: 1,
      isPublic: true,
    });

    expect(result.success).toBe(true);
  });
});
