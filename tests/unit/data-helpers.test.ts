import { describe, expect, it } from "vitest";
import {
  filterPublishedCvData,
  parseListInput,
  sortByDisplayOrder,
} from "@/lib/data/helpers";
import type { CvData } from "@/types/domain";

describe("CV data helpers", () => {
  it("sorts records by display order without mutating the input", () => {
    const records = [
      { name: "B", displayOrder: 2 },
      { name: "A", displayOrder: 1 },
    ];

    const sorted = sortByDisplayOrder(records);

    expect(sorted.map((record) => record.name)).toEqual(["A", "B"]);
    expect(records.map((record) => record.name)).toEqual(["B", "A"]);
  });

  it("filters unpublished public records", () => {
    const data: CvData = {
      profile: {
        fullName: "Manuel",
        headline: "Data Analyst",
        summary: "Data profile summary for tests.",
        isPublished: true,
      },
      experiences: [],
      projects: [
        {
          name: "Visible",
          description: "Visible project description.",
          technologies: [],
          displayOrder: 1,
          isFeatured: true,
          isPublished: true,
        },
        {
          name: "Hidden",
          description: "Hidden project description.",
          technologies: [],
          displayOrder: 2,
          isFeatured: false,
          isPublished: false,
        },
      ],
      skills: [],
      certifications: [],
      education: [],
      contacts: [
        {
          label: "Email",
          value: "manuel@example.com",
          displayOrder: 1,
          isPublic: true,
        },
        {
          label: "Private phone",
          value: "+51 999 999 999",
          displayOrder: 2,
          isPublic: false,
        },
      ],
    };

    const filtered = filterPublishedCvData(data);

    expect(filtered.projects).toHaveLength(1);
    expect(filtered.projects[0]?.name).toBe("Visible");
    expect(filtered.contacts).toHaveLength(1);
    expect(filtered.contacts[0]?.label).toBe("Email");
  });

  it("parses comma and newline separated list input", () => {
    expect(parseListInput("SQL Server, Python\nPower BI")).toEqual([
      "SQL Server",
      "Python",
      "Power BI",
    ]);
  });
});
