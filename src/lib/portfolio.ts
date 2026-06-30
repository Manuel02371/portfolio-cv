import { portfolioData } from "./portfolio-data";
import type { PortfolioData } from "./types";

type Ordered = { display_order?: number | null };

export function byDisplayOrder<T extends Ordered>(items: readonly T[]) {
  return [...items].sort(
    (first, second) => (first.display_order ?? 0) - (second.display_order ?? 0),
  );
}

export function safeExternalUrl(url?: string | null) {
  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    if (["https:", "mailto:", "tel:"].includes(parsed.protocol)) {
      return parsed.toString();
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export function getPortfolioData(): PortfolioData {
  return {
    profile: { ...portfolioData.profile },
    experiences: byDisplayOrder(portfolioData.experiences),
    projects: byDisplayOrder(portfolioData.projects),
    skills: byDisplayOrder(portfolioData.skills),
    certifications: byDisplayOrder(portfolioData.certifications),
    education: byDisplayOrder(portfolioData.education),
    contacts: byDisplayOrder(portfolioData.contacts),
  };
}
