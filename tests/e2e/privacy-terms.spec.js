// tests/e2e/privacy-terms.spec.js
const { test, expect } = require("@playwright/test");

test.describe("política de privacidade", () => {
  test("página carrega com seções obrigatórias LGPD", async ({ page }) => {
    await page.goto("/politica-privacidade/");

    await expect(page.getByRole("heading", { name: "Política de Privacidade" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Finalidades do Tratamento/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Base Legal/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Transferência Internacional/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Dados Coletados/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Seus Direitos/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Retenção/i })).toBeVisible();
  });

  test("link de revogação aponta para mecanismo de consentimento", async ({ page }) => {
    await page.goto("/politica-privacidade/");
    await expect(page.locator("#privacy-toggle-btn")).toBeVisible();
  });
});

test.describe("termos de uso", () => {
  test("página carrega com seções obrigatórias", async ({ page }) => {
    await page.goto("/termos-uso/");

    await expect(page.getByRole("heading", { name: "Termos de Uso" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Aceitação dos Termos/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Cookies/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Natureza Informativa/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Limitação de Responsabilidade/i })).toBeVisible();
  });

  test("link para política de privacidade funciona na página de termos", async ({ page }) => {
    await page.goto("/termos-uso/");
    const privacyLink = page.locator("a[href='/politica-privacidade/']").first();
    await expect(privacyLink).toBeVisible();
  });
});

test.describe("footer com links de privacidade", () => {
  test("homepage tem links para privacidade e termos no footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer a[href='/politica-privacidade/']")).toBeVisible();
    await expect(page.locator("footer a[href='/termos-uso/']")).toBeVisible();
  });

  test("página de privacidade tem links no footer", async ({ page }) => {
    await page.goto("/politica-privacidade/");
    await expect(page.locator("footer a[href='/politica-privacidade/']")).toBeVisible();
    await expect(page.locator("footer a[href='/termos-uso/']")).toBeVisible();
  });
});
