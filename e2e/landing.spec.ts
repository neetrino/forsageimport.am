import { expect, test } from "@playwright/test";

test.describe("Landing smoke", () => {
  test("redirects / to /hy and renders core sections", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/hy\/?$/);

    await expect(page.getByRole("banner").getByRole("link", { name: "Forsage Import" })).toBeVisible();
    await expect(page.locator("#hero").getByRole("img").first()).toBeVisible();
    await expect(page.locator("#hero")).toContainText("Forsage Import");
    await page.mouse.wheel(0, 400);
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#process")).toBeVisible();
    await expect(page.locator("#calculator")).toBeVisible();
    await expect(page.locator("#why-us")).toBeVisible();
    await expect(page.locator("#apply")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    // eyebrow + 5 body paragraphs live under #about
    await expect(page.locator("#about p")).toHaveCount(6);
    await expect(page.locator("#process li")).toHaveCount(6);
    await expect(page.locator("#why-us li")).toHaveCount(4);
  });

  test("hero CTAs scroll to calculator and apply", async ({ page }) => {
    await page.goto("/hy");
    await page.waitForFunction(
      () => document.documentElement.dataset.landingReady === "1",
    );

    await page.locator('#hero a[href="#calculator"]').click();
    await expect(page.locator(".landing-canvas-revealed")).toBeVisible();
    await expect(page.locator("#calculator")).toBeInViewport({ timeout: 15_000 });

    await page.locator('#hero a[href="#apply"]').click();
    await expect(page.locator("#apply")).toBeInViewport({ timeout: 15_000 });
  });
});
