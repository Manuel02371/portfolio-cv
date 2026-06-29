import "server-only";

import {
  filterPublishedCvData,
  sortCvData,
} from "@/lib/data/helpers";
import { initialCvData } from "@/lib/data/seed";
import { getDemoCvData } from "@/lib/data/demo-store";
import {
  mapCertification,
  mapContact,
  mapEducation,
  mapExperience,
  mapProfile,
  mapProject,
  mapSkill,
} from "@/lib/data/mappers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { CvData } from "@/types/domain";

async function getSupabaseCvData(): Promise<CvData> {
  const supabase = await createSupabaseServerClient();

  const [
    profileResult,
    experiencesResult,
    projectsResult,
    skillsResult,
    certificationsResult,
    educationResult,
    contactsResult,
  ] = await Promise.all([
    supabase.from("profiles").select("*").limit(1).maybeSingle(),
    supabase.from("experiences").select("*").order("display_order"),
    supabase.from("projects").select("*").order("display_order"),
    supabase.from("skills").select("*").order("display_order"),
    supabase.from("certifications").select("*").order("display_order"),
    supabase.from("education").select("*").order("display_order"),
    supabase.from("contacts").select("*").order("display_order"),
  ]);

  const errors = [
    profileResult.error,
    experiencesResult.error,
    projectsResult.error,
    skillsResult.error,
    certificationsResult.error,
    educationResult.error,
    contactsResult.error,
  ].filter(Boolean);

  if (errors.length > 0) {
    throw new Error("Could not load CV data from Supabase.");
  }

  return sortCvData({
    profile: profileResult.data
      ? mapProfile(profileResult.data)
      : initialCvData.profile,
    experiences: (experiencesResult.data ?? []).map(mapExperience),
    projects: (projectsResult.data ?? []).map(mapProject),
    skills: (skillsResult.data ?? []).map(mapSkill),
    certifications: (certificationsResult.data ?? []).map(mapCertification),
    education: (educationResult.data ?? []).map(mapEducation),
    contacts: (contactsResult.data ?? []).map(mapContact),
  });
}

export async function getAdminCvData(): Promise<CvData> {
  if (isSupabaseConfigured()) {
    return getSupabaseCvData();
  }

  return getDemoCvData();
}

export async function getPublicCvData(): Promise<CvData> {
  const data = isSupabaseConfigured() ? await getSupabaseCvData() : getDemoCvData();
  return filterPublishedCvData(data);
}
