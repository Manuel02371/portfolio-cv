"use server";

import { revalidatePath } from "next/cache";
import { deleteDemoResource, saveDemoResource } from "@/lib/data/demo-store";
import { normalizeResourceValues } from "@/lib/admin/form-normalize";
import { isResourceName } from "@/lib/admin/resources";
import { deleteSupabaseResource, saveSupabaseResource } from "@/lib/admin/persistence";
import { requireAdminSession } from "@/lib/auth/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  certificationSchema,
  contactSchema,
  educationSchema,
  experienceSchema,
  profileSchema,
  projectSchema,
  skillSchema,
} from "@/lib/validators";
import type { ResourceName } from "@/types/domain";

export type ActionResult = {
  ok: boolean;
  message: string;
};

function validateResource(resource: ResourceName, values: Record<string, unknown>) {
  switch (resource) {
    case "profile":
      return profileSchema.safeParse(values);
    case "experiences":
      return experienceSchema.safeParse(values);
    case "projects":
      return projectSchema.safeParse(values);
    case "skills":
      return skillSchema.safeParse(values);
    case "certifications":
      return certificationSchema.safeParse(values);
    case "education":
      return educationSchema.safeParse(values);
    case "contacts":
      return contactSchema.safeParse(values);
  }
}

export async function saveResourceAction(
  resource: ResourceName,
  values: Record<string, unknown>,
): Promise<ActionResult> {
  await requireAdminSession();

  if (!isResourceName(resource)) {
    return { ok: false, message: "Recurso invalido." };
  }

  const normalizedValues = normalizeResourceValues(resource, values);
  const parsed = validateResource(resource, normalizedValues);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Revisa los campos del formulario.",
    };
  }

  try {
    if (isSupabaseConfigured()) {
      await saveSupabaseResource(resource, parsed.data);
    } else {
      saveDemoResource(resource, parsed.data);
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return { ok: true, message: "Cambios guardados." };
  } catch {
    return { ok: false, message: "No se pudo guardar el registro." };
  }
}

export async function deleteResourceAction(
  resource: ResourceName,
  id: string,
): Promise<ActionResult> {
  await requireAdminSession();

  if (!isResourceName(resource)) {
    return { ok: false, message: "Recurso invalido." };
  }

  try {
    if (isSupabaseConfigured()) {
      await deleteSupabaseResource(resource, id);
    } else {
      deleteDemoResource(resource, id);
    }

    revalidatePath("/");
    revalidatePath("/admin");

    return { ok: true, message: "Registro eliminado." };
  } catch {
    return { ok: false, message: "No se pudo eliminar el registro." };
  }
}
