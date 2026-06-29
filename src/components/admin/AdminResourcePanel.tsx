"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Edit3, Plus, Save, Trash2, X } from "lucide-react";
import {
  deleteResourceAction,
  saveResourceAction,
  type ActionResult,
} from "@/app/actions/resources";
import {
  resourceConfigs,
  resourceOrder,
  type ResourceField,
} from "@/lib/admin/resources";
import { resourceItemTitle } from "@/lib/admin/form-normalize";
import type { CvData, ResourceName } from "@/types/domain";

type AdminResourcePanelProps = {
  data: CvData;
};

type FormValues = Record<string, string | number | boolean>;

function getItems(data: CvData, resource: ResourceName): Record<string, unknown>[] {
  if (resource === "profile") {
    return [data.profile as Record<string, unknown>];
  }

  return data[resource] as unknown as Record<string, unknown>[];
}

function fieldDefaultValue(field: ResourceField, item?: Record<string, unknown>, itemCount = 0) {
  const value = item?.[field.name];

  if (field.type === "checkbox") {
    if (typeof value === "boolean") return value;
    return field.name === "isPublished" || field.name === "isPublic";
  }

  if (field.type === "number") {
    if (typeof value === "number") return value;
    return field.name === "displayOrder" ? itemCount + 1 : 0;
  }

  if (field.type === "list") {
    return Array.isArray(value) ? value.join("\n") : "";
  }

  return typeof value === "string" ? value : "";
}

function buildDefaultValues(
  resource: ResourceName,
  item?: Record<string, unknown>,
  itemCount = 0,
) {
  const config = resourceConfigs[resource];

  return config.fields.reduce<FormValues>((values, field) => {
    return {
      ...values,
      [field.name]: fieldDefaultValue(field, item, itemCount),
    };
  }, {});
}

function renderField(field: ResourceField, register: ReturnType<typeof useForm<FormValues>>["register"]) {
  const baseClass =
    "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

  if (field.type === "textarea" || field.type === "list") {
    return (
      <textarea
        {...register(field.name, { required: field.required })}
        rows={field.type === "list" ? 4 : 5}
        placeholder={field.placeholder}
        className={baseClass}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <input
        {...register(field.name)}
        type="checkbox"
        className="mt-2 h-5 w-5 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
      />
    );
  }

  return (
    <input
      {...register(field.name, { required: field.required })}
      type={field.type}
      placeholder={field.placeholder}
      className={baseClass}
    />
  );
}

export function AdminResourcePanel({ data }: AdminResourcePanelProps) {
  const router = useRouter();
  const [resource, setResource] = useState<ResourceName>("profile");
  const [editingId, setEditingId] = useState<string | undefined>(
    data.profile.id,
  );
  const [result, setResult] = useState<ActionResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const items = useMemo(() => getItems(data, resource), [data, resource]);
  const editingItem = useMemo(() => {
    return items.find((item) => item.id === editingId) ?? items[0];
  }, [editingId, items]);
  const isCreating = resource !== "profile" && !editingId;
  const defaultValues = useMemo(
    () =>
      buildDefaultValues(
        resource,
        isCreating ? undefined : editingItem,
        items.length,
      ),
    [editingItem, isCreating, items.length, resource],
  );
  const { handleSubmit, register, reset } = useForm<FormValues>({
    defaultValues,
  });
  const config = resourceConfigs[resource];

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  function switchResource(nextResource: ResourceName) {
    const nextItems = getItems(data, nextResource);
    setResource(nextResource);
    setEditingId(nextResource === "profile" ? data.profile.id : undefined);
    setResult(null);
    reset(buildDefaultValues(nextResource, nextItems[0], nextItems.length));
  }

  const onSubmit = handleSubmit((values) => {
    const payload = editingId ? { ...values, id: editingId } : values;
    setResult(null);

    startTransition(async () => {
      const actionResult = await saveResourceAction(resource, payload);
      setResult(actionResult);

      if (actionResult.ok) {
        if (resource !== "profile") {
          setEditingId(undefined);
        }
        router.refresh();
      }
    });
  });

  function removeRecord(id?: string) {
    if (!id || resource === "profile") return;

    setResult(null);
    startTransition(async () => {
      const actionResult = await deleteResourceAction(resource, id);
      setResult(actionResult);

      if (actionResult.ok) {
        setEditingId(undefined);
        router.refresh();
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-2">
        {resourceOrder.map((resourceName) => (
          <button
            key={resourceName}
            type="button"
            onClick={() => switchResource(resourceName)}
            className={`w-full rounded-md px-3 py-2 text-left text-sm font-semibold transition ${
              resource === resourceName
                ? "bg-teal-700 text-white"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            }`}
          >
            {resourceConfigs[resourceName].title}
          </button>
        ))}
      </aside>
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                {config.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {config.description}
              </p>
            </div>
            {resource !== "profile" ? (
              <button
                type="button"
                onClick={() => {
                  setEditingId(undefined);
                  setResult(null);
                  reset(buildDefaultValues(resource, undefined, items.length));
                }}
                className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                <Plus aria-hidden="true" size={17} />
                Nuevo
              </button>
            ) : null}
          </div>
          <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
            {editingId ? <input type="hidden" value={editingId} readOnly /> : null}
            {config.fields.map((field) => (
              <label
                key={field.name}
                className={field.type === "textarea" || field.type === "list" ? "block md:col-span-2" : "block"}
              >
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {field.label}
                </span>
                {renderField(field, register)}
              </label>
            ))}
            {result ? (
              <p
                className={`rounded-md px-3 py-2 text-sm md:col-span-2 ${
                  result.ok
                    ? "bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-200"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200"
                }`}
              >
                {result.message}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save aria-hidden="true" size={17} />
                {isPending ? "Guardando..." : "Guardar"}
              </button>
              {resource !== "profile" && editingId ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(undefined);
                    reset(buildDefaultValues(resource, undefined, items.length));
                  }}
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 dark:border-slate-800 dark:text-slate-200"
                >
                  <X aria-hidden="true" size={17} />
                  Cancelar
                </button>
              ) : null}
            </div>
          </form>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
            Registros
          </h2>
          <div className="mt-4 space-y-2">
            {items.map((item) => (
              <div
                key={String(item.id ?? resourceItemTitle(resource, item))}
                className="rounded-md border border-slate-200 p-3 dark:border-slate-800"
              >
                <p className="text-sm font-semibold text-slate-950 dark:text-white">
                  {resourceItemTitle(resource, item)}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(String(item.id ?? ""));
                      setResult(null);
                    }}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 hover:border-teal-600 hover:text-teal-700 dark:border-slate-800 dark:text-slate-200"
                  >
                    <Edit3 aria-hidden="true" size={14} />
                    Editar
                  </button>
                  {resource !== "profile" ? (
                    <button
                      type="button"
                      onClick={() => removeRecord(String(item.id ?? ""))}
                      className="inline-flex items-center gap-1 rounded-md border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-200 dark:hover:bg-rose-950"
                    >
                      <Trash2 aria-hidden="true" size={14} />
                      Eliminar
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
