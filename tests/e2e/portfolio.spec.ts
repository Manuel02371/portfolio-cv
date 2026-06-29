import { expect, test } from "@playwright/test";

test("public CV loads core sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Manuel Vargas" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Experiencia" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Proyectos destacados" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Habilidades tecnicas" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Exportar PDF" })).toBeVisible();
});

test("admin route requires login", async ({ page }) => {
  await page.goto("/admin");

  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(page.getByRole("heading", { name: "Panel administrador" })).toBeVisible();
});

test("demo admin can create a skill and public page reflects it", async ({ page }, testInfo) => {
  const skillName = `Data Lakehouse ${testInfo.project.name} ${Date.now()}`;

  await page.goto("/admin/login");
  await page.getByRole("button", { name: "Ingresar" }).click();

  await expect(page).toHaveURL(/\/admin$/);
  await page.getByRole("button", { name: "Skills" }).click();
  await page.getByRole("button", { name: "Nuevo" }).click();
  await page.getByLabel("Nombre").fill(skillName);
  await page.getByLabel("Categoria").fill("Data Engineering");
  await page.getByLabel("Nivel 1-5").fill("4");
  await page.getByLabel("Orden").fill("7");
  await page.getByRole("button", { name: "Guardar" }).click();

  await expect(page.getByText("Cambios guardados.")).toBeVisible();
  await page.goto("/");
  await expect(page.getByText(skillName)).toBeVisible();
});
