const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("acessibilidade baseline WCAG", async ({ page }) => {
  await page.goto("/");

  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  expect(report.violations).toEqual([]);
});

test("acessibilidade WCAG — política de privacidade", async ({ page }) => {
  await page.goto("/politica-privacidade/");

  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  expect(report.violations).toEqual([]);
});

test("acessibilidade WCAG — termos de uso", async ({ page }) => {
  await page.goto("/termos-uso/");

  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  expect(report.violations).toEqual([]);
});
