import "server-only";

import {
  certificationToRow,
  contactToRow,
  educationToRow,
  experienceToRow,
  profileToRow,
  projectToRow,
  skillToRow,
} from "@/lib/data/mappers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  Certification,
  Contact,
  Education,
  Experience,
  Profile,
  Project,
  ResourceName,
  Skill,
} from "@/types/domain";

function isDatabaseId(value?: string): value is string {
  return Boolean(
    value &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value,
      ),
  );
}

async function saveProfile(input: Profile) {
  const supabase = await createSupabaseServerClient();
  const row = profileToRow(input);

  if (isDatabaseId(input.id)) {
    const { error } = await supabase.from("profiles").update(row).eq("id", input.id);
    if (error) throw new Error("Could not save profile.");
    return;
  }

  const { error } = await supabase.from("profiles").insert(row);
  if (error) throw new Error("Could not save profile.");
}

async function saveExperience(input: Experience) {
  const supabase = await createSupabaseServerClient();
  const row = experienceToRow(input);
  const query = isDatabaseId(input.id)
    ? supabase.from("experiences").update(row).eq("id", input.id)
    : supabase.from("experiences").insert(row);
  const { error } = await query;
  if (error) throw new Error("Could not save experience.");
}

async function saveProject(input: Project) {
  const supabase = await createSupabaseServerClient();
  const row = projectToRow(input);
  const query = isDatabaseId(input.id)
    ? supabase.from("projects").update(row).eq("id", input.id)
    : supabase.from("projects").insert(row);
  const { error } = await query;
  if (error) throw new Error("Could not save project.");
}

async function saveSkill(input: Skill) {
  const supabase = await createSupabaseServerClient();
  const row = skillToRow(input);
  const query = isDatabaseId(input.id)
    ? supabase.from("skills").update(row).eq("id", input.id)
    : supabase.from("skills").insert(row);
  const { error } = await query;
  if (error) throw new Error("Could not save skill.");
}

async function saveCertification(input: Certification) {
  const supabase = await createSupabaseServerClient();
  const row = certificationToRow(input);
  const query = isDatabaseId(input.id)
    ? supabase.from("certifications").update(row).eq("id", input.id)
    : supabase.from("certifications").insert(row);
  const { error } = await query;
  if (error) throw new Error("Could not save certification.");
}

async function saveEducation(input: Education) {
  const supabase = await createSupabaseServerClient();
  const row = educationToRow(input);
  const query = isDatabaseId(input.id)
    ? supabase.from("education").update(row).eq("id", input.id)
    : supabase.from("education").insert(row);
  const { error } = await query;
  if (error) throw new Error("Could not save education.");
}

async function saveContact(input: Contact) {
  const supabase = await createSupabaseServerClient();
  const row = contactToRow(input);
  const query = isDatabaseId(input.id)
    ? supabase.from("contacts").update(row).eq("id", input.id)
    : supabase.from("contacts").insert(row);
  const { error } = await query;
  if (error) throw new Error("Could not save contact.");
}

export async function saveSupabaseResource(
  resource: ResourceName,
  input: Record<string, unknown>,
) {
  switch (resource) {
    case "profile":
      return saveProfile(input as Profile);
    case "experiences":
      return saveExperience(input as Experience);
    case "projects":
      return saveProject(input as Project);
    case "skills":
      return saveSkill(input as Skill);
    case "certifications":
      return saveCertification(input as Certification);
    case "education":
      return saveEducation(input as Education);
    case "contacts":
      return saveContact(input as Contact);
  }
}

export async function deleteSupabaseResource(resource: ResourceName, id: string) {
  if (resource === "profile") {
    return;
  }

  if (!isDatabaseId(id)) {
    return;
  }

  const supabase = await createSupabaseServerClient();

  const tableByResource = {
    experiences: "experiences",
    projects: "projects",
    skills: "skills",
    certifications: "certifications",
    education: "education",
    contacts: "contacts",
  } as const;

  const { error } = await supabase.from(tableByResource[resource]).delete().eq("id", id);

  if (error) {
    throw new Error("Could not delete record.");
  }
}
