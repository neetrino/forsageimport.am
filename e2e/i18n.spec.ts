import { expect, test } from "@playwright/test";

test.describe("i18n smoke", () => {
  test("switches hy → ru → en", async ({ page }) => {
    await page.goto("/hy");
    await expect(page.locator("html")).toHaveAttribute("lang", "hy");
    await expect(page.locator("#calculator h2")).toContainText(
      "Ավտոմեքենայի ներմուծման հաշվիչ",
    );

    await page.locator("footer").getByRole("link", { name: "Русский" }).click();
    await expect(page).toHaveURL(/\/ru\/?/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
    await expect(page.locator("#calculator h2")).toContainText(
      "Калькулятор ввоза автомобиля",
    );

    await page.locator("footer").getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en\/?/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("#calculator h2")).toContainText(
      "Vehicle import calculator",
    );
  });
});
