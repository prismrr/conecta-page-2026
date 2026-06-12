const { test, expect } = require("@playwright/test");

test.describe("jornada principal", () => {
  test("fluxo principal de agenda, localizacao e inscricao", async ({ page }) => {
    // Pre-grant consent so Google Maps renders on load (gated by LGPD-001 since 359cc0f)
    await page.addInitScript(() => {
      localStorage.setItem("user_privacy_consent", JSON.stringify({ analytics: true, functional: true }));
    });
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Agenda" })).toBeVisible();
    await expect(page.locator("#agenda-status")).toContainText("Mostrando");

    const input = page.locator("#agenda-search");
    await input.fill("git");
    await expect(page.locator("#agenda-list .agenda-item:visible")).toHaveCount(1);

    await expect(page.locator("#agenda-status")).toContainText("resultado");

    const geoLink = page.locator("a[data-cta='localizacao-geo']");
    await expect(geoLink).toHaveAttribute("href", /geo:/);

    const mapCard = page.locator("[data-cta='localizacao-mapa-cit']");
    await expect(mapCard).toBeVisible();

    const mapFrame = page.locator(".location-map-frame");
    await expect(mapFrame).toBeVisible();
    await expect(mapFrame).toHaveAttribute("src", /google\.com\/maps/);

    const mapGeoLink = page.locator("a[data-cta='localizacao-geo-mapa']");
    await expect(mapGeoLink).toHaveAttribute("href", /geo:/);

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
