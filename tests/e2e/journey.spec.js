const { test, expect } = require("@playwright/test");

test.describe("jornada principal", () => {
  test("fluxo principal de agenda, localizacao e inscricao", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Agenda" })).toBeVisible();
    await expect(page.locator("#agenda-status")).toContainText("Mostrando");

    const input = page.locator("#agenda-search");
    await input.fill("git");
    await expect(page.locator("#agenda-list .agenda-item:visible")).toHaveCount(1);

    await expect(page.locator("#agenda-status")).toContainText("resultado");

    const geoLink = page.locator("a[data-cta='localizacao-geo']");
    await expect(geoLink).toHaveAttribute("href", /geo:/);

    const signup = page.locator("a[data-cta='secao-inscricao-principal']");
    await expect(signup).toHaveAttribute("target", "_blank");
    await expect(signup).toHaveAttribute("rel", /noopener/);
  });

  test("fallback quando dataset da agenda falha", async ({ page }) => {
    await page.route("**/assets/data/agenda.json", async (route) => {
      await route.fulfill({ status: 500, body: "erro" });
    });

    await page.goto("/");

    await expect(page.locator("#agenda-status")).toContainText("fallback");
    await page.locator("#agenda-search").fill("git");
    await expect(page.locator("#agenda-list .agenda-item:visible")).toHaveCount(1);
  });
});
