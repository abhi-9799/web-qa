import { test, expect } from "@playwright/test";

test.describe("Signup", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForFunction(() => (window as any).__appReady === true);
  });

  test("renders page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  });

  test("shows validation errors", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.locator("#err-name")).toHaveText(/at least 2/);
    await expect(page.locator("#err-email")).toHaveText(/valid email/);
    await expect(page.locator("#err-password")).toHaveText(/(too weak|at least 6)/i);
  });

  test("happy path signup", async ({ page }) => {
    await page.fill("#name", "Alex");
    await page.fill("#email", "alex@example.com");
    await page.fill("#password", "secret1");

    const respPromise = page.waitForResponse(
      (res) => res.url().endsWith("/api/signup") && res.request().method() === "POST"
    );

    await page.getByRole("button", { name: "Sign up" }).click();
    await respPromise;

    await expect(page.locator("#result")).toBeVisible();
  });

  test("shows strength meter and blocks weak password", async ({ page }) => {
    await page.fill("#name", "Alex");
    await page.fill("#email", "alex@example.com");

    await page.fill("#password", "abcdef"); // length >= 6, but weak
    await expect(page.locator("#pw-hint")).toContainText(/Strength:/i);

    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.locator("#err-password")).toHaveText(/too weak/i);
  });
});
