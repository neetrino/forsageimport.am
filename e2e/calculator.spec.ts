import { expect, test } from "@playwright/test";

test.describe("Calculator smoke", () => {
  test("blocks empty submit and calculates valid input", async ({ page }) => {
    await page.goto("/hy#calculator");
    await page.locator("#calculator").scrollIntoViewIfNeeded();

    await page.locator("#calculator").getByRole("button", { name: "Հաշվել" }).click();
    await expect(page.locator("#vehiclePrice")).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByText("Պարտադիր դաշտ").first()).toBeVisible();
    await expect(page.getByText("Ֆիզիկական անձ")).toHaveCount(0);

    await page.locator("#vehiclePrice").fill("12000");
    await page.getByRole("button", { name: /IAA/i }).click();
    await page.locator("#auctionLocation").selectOption("ca");
    await page.locator("#year").selectOption("2021");
    await page.locator("#engineVolume").fill("2000");
    await page.locator("#transportFee").fill("1100");
    await page.getByLabel("Ապահովագրություն").check();

    await page.locator("#calculator").getByRole("button", { name: "Հաշվել" }).click();

    await expect(page.getByText("Ֆիզիկական անձ")).toBeVisible();
    await expect(page.getByText("Իրավաբանական անձ")).toBeVisible();
    await expect(page.getByText("Վերջնական ընդհանուր").first()).toBeVisible();
    await expect(page.getByText(/Սակագները DRAFT են/)).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Ներբեռնել" }).first().click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/forsage-estimate-.*\.pdf/);
  });
});
