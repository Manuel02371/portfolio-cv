import { describe, expect, it } from "vitest";
import { isResourceName } from "@/lib/admin/resources";

describe("admin resource guards", () => {
  it("accepts known resources and rejects unsafe values", () => {
    expect(isResourceName("projects")).toBe(true);
    expect(isResourceName("profile")).toBe(true);
    expect(isResourceName("__proto__")).toBe(false);
    expect(isResourceName("users")).toBe(false);
  });
});
