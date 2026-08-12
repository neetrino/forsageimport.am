import { expect, test } from "@playwright/test";

test.describe("Lead form smoke", () => {
  test("rejects invalid client input and accepts valid lead", async ({ page }) => {
    await page.goto("/hy#apply");
    await page.locator("section#apply").scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: "Ուղարկել հայտը" }).click();
    await expect(page.locator("#lead-name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Պարտադիր դաշտ").first()).toBeVisible();

    await page.locator("#lead-name").fill("Սուրեն");
    await page.locator("#lead-phone").fill("+37499111222");
    await page.locator("#lead-message").fill("Ուզում եմ SUV մինչև 15000$");

    // Respect fast-submit bot guard
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
