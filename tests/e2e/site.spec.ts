import { expect, test } from "@playwright/test";

test("home shows the public CV sections", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /MANUEL JHONNATHAN ABANTO FLORES/i }),
  ).toBeVisible();
  await expect(page.getByText(/SQL Server/i).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Casos destacados/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Ver CV imprimible/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Contactar/i })).toHaveAttribute(
    "href",
    "https://wa.me/51933703902",
  );
});

test("printable CV works", async ({ page }) => {
  await page.goto("/cv");

  await expect(page.getByRole("heading", { name: /Experiencia/i })).toBeVisible();
  await expect(page.getByText(/Universidad Nacional del Callao/i)).toBeVisible();
});

test("mobile layout has no horizontal overflow", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );

  expect(overflow).toBe(false);
});

test("admin route does not exist", async ({ page }) => {
  await page.goto("/admin");

  await expect(page.getByText(/404|not found|no encontrada/i)).toBeVisible();
});
