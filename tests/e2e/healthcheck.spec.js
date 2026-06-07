const { test, expect } = require("@playwright/test");

test("healthcheck endpoint responde OK", async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/healthz`);
  expect(response.ok()).toBeTruthy();
  const body = await response.text();
  expect(body.trim()).toBe("ok");
});
