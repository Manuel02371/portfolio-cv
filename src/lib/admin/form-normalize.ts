import { parseListInput } from "@/lib/data/helpers";
import { resourceConfigs } from "@/lib/admin/resources";
import type { ResourceName } from "@/types/domain";

type RawValues = Record<string, unknown>;

export function normalizeResourceValues(resource: ResourceName, values: RawValues) {
  const config = resourceConfigs[resource];

  return config.fields.reduce<Record<string, unknown>>(
    (normalized, field) => {
      const value = values[field.name];

      if (field.type === "checkbox") {
        return { ...normalized, [field.name]: Boolean(value) };
      }

      if (field.type === "number") {
        return { ...normalized, [field.name]: value === "" ? 0 : Number(value ?? 0) };
      }

      if (field.type === "list") {
        return { ...normalized, [field.name]: parseListInput(value) };
      }

      if (typeof value === "string") {
        return { ...normalized, [field.name]: value.trim() };
      }

      return { ...normalized, [field.name]: value ?? "" };
    },
    typeof values.id === "string" && values.id ? { id: values.id } : {},
  );
}

export function resourceItemTitle(resource: ResourceName, item: Record<string, unknown>) {
  if (resource === "profile") {
    return String(item.fullName ?? "Perfil");
  }

  return String(item.name ?? item.company ?? item.institution ?? item.label ?? "Registro");
}
