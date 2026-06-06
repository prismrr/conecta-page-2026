const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

test("acessibilidade baseline WCAG", async ({ page }) => {
  await page.goto("/");

  const report = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  expect(report.violations).toEqual([]);
});
