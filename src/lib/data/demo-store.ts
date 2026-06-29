import "server-only";

import { cloneCvData, sortCvData } from "@/lib/data/helpers";
import { initialCvData } from "@/lib/data/seed";
import type { CvData, ResourceName } from "@/types/domain";

type DemoGlobal = typeof globalThis & {
  __portfolioCvDemoStore?: CvData;
};

function getStore(): CvData {
  const demoGlobal = globalThis as DemoGlobal;

  if (!demoGlobal.__portfolioCvDemoStore) {
    demoGlobal.__portfolioCvDemoStore = cloneCvData(initialCvData);
  }

  return demoGlobal.__portfolioCvDemoStore;
}

function setStore(data: CvData) {
  const demoGlobal = globalThis as DemoGlobal;
  demoGlobal.__portfolioCvDemoStore = cloneCvData(data);
}

export function getDemoCvData(): CvData {
  return sortCvData(cloneCvData(getStore()));
}

export function saveDemoResource(
  resource: ResourceName,
  payload: Record<string, unknown>,
) {
  const store = getStore();
  const id = String(payload.id || `${resource}-${crypto.randomUUID()}`);
  const nextPayload = { ...payload, id };

  if (resource === "profile") {
    const nextStore = {
      ...store,
      profile: nextPayload as CvData["profile"],
    };
    setStore(nextStore);
    return cloneCvData(nextStore);
  }

  const currentRecords = store[resource] as Record<string, unknown>[];
  const nextRecords = currentRecords.some((record) => record.id === id)
    ? currentRecords.map((record) => (record.id === id ? nextPayload : record))
    : [...currentRecords, nextPayload];

  const nextStore = {
    ...store,
    [resource]: nextRecords,
  } as CvData;

  setStore(nextStore);
  return cloneCvData(nextStore);
}

export function deleteDemoResource(resource: ResourceName, id: string) {
  if (resource === "profile") {
    return cloneCvData(getStore());
  }

  const store = getStore();
  const currentRecords = store[resource] as Record<string, unknown>[];
  const nextRecords = currentRecords.filter((record) => record.id !== id);
  const nextStore = {
    ...store,
    [resource]: nextRecords,
  } as CvData;

  setStore(nextStore);
  return cloneCvData(nextStore);
}
