import type { Contact, CvData } from "@/types/domain";

type OrderedRecord = {
  displayOrder: number;
};

type PublishableRecord = {
  isPublished: boolean;
};

export function sortByDisplayOrder<T extends OrderedRecord>(records: T[]): T[] {
  return [...records].sort((left, right) => {
    if (left.displayOrder === right.displayOrder) {
      return 0;
    }

    return left.displayOrder - right.displayOrder;
  });
}

function visibleRecords<T extends OrderedRecord & PublishableRecord>(
  records: T[],
): T[] {
  return sortByDisplayOrder(records.filter((record) => record.isPublished));
}

function publicContacts(records: Contact[]): Contact[] {
  return sortByDisplayOrder(records.filter((record) => record.isPublic));
}

export function filterPublishedCvData(data: CvData): CvData {
  return {
    profile: data.profile,
    experiences: visibleRecords(data.experiences),
    projects: visibleRecords(data.projects),
    skills: visibleRecords(data.skills),
    certifications: visibleRecords(data.certifications),
    education: visibleRecords(data.education),
    contacts: publicContacts(data.contacts),
  };
}

export function sortCvData(data: CvData): CvData {
  return {
    profile: data.profile,
    experiences: sortByDisplayOrder(data.experiences),
    projects: sortByDisplayOrder(data.projects),
    skills: sortByDisplayOrder(data.skills),
    certifications: sortByDisplayOrder(data.certifications),
    education: sortByDisplayOrder(data.education),
    contacts: sortByDisplayOrder(data.contacts),
  };
}

export function parseListInput(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function cloneCvData(data: CvData): CvData {
  return structuredClone(data);
}
