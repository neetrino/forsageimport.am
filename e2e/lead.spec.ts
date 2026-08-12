import { expect, test } from "@playwright/test";

test.describe("Lead form smoke", () => {
  test("rejects invalid client input and accepts valid lead", async ({ page }, testInfo) => {
    await page.goto("/hy#apply");
    await page.waitForFunction(
      () => document.documentElement.dataset.landingReady === "1",
    );
    await expect(page.locator(".landing-canvas-revealed")).toBeVisible();
    await page.locator("section#apply").scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: "Ուղարկել հայտը" }).click();
    await expect(page.locator("#lead-name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Պարտադիր դաշտ").first()).toBeVisible();

    // Unique phone avoids shared in-process phone rate-limit collisions under --repeat-each.
    const phoneSuffix = String(
      100000 + testInfo.parallelIndex * 1000 + testInfo.repeatEachIndex,
    ).padStart(6, "0");

    await page.locator("#lead-name").fill("Սուրեն");
    await page.locator("#lead-phone").fill(`+37499${phoneSuffix}`);
    await page.locator("#lead-message").fill("Ուզում եմ SUV մինչև 15000$");

    // Respect fast-submit bot guard (server min gap is 1200ms from openedAt).
    await page.waitForTimeout(1300);

    await page.getByRole("button", { name: "Ուղարկել հայտը" }).click();
    await expect(page.getByText("Հայտը ստացված է")).toBeVisible();
  });

  test("API rejects invalid JSON content-type", async ({ request }) => {
    const response = await request.post("/api/leads", {
      headers: { "content-type": "text/plain" },
      data: "nope",
    });
    expect(response.status()).toBe(415);
  });
});
