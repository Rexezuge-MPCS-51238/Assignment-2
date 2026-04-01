import { test, expect } from "@playwright/test";

const BASE = "https://project-kgbzt.vercel.app";

test.describe("Recipe Book — Full Feature Verification", () => {
  test("1. Home page loads with hero, search, featured recipes, and stats", async ({ page }) => {
    await page.goto(BASE);

    // Hero section
    await expect(page.locator("h1")).toContainText("Recipe Book");

    // Search input
    await expect(page.locator('input[placeholder="Search recipes..."]')).toBeVisible();

    // Featured recipes section
    await expect(page.getByText("Featured Recipes")).toBeVisible();

    // Stats section
    await expect(page.getByText("Total Recipes")).toBeVisible();
    await expect(page.getByRole("main").getByText("Favorites")).toBeVisible();
    await expect(page.getByRole("main").getByText("Tags")).toBeVisible();

    // Recently Added section
    await expect(page.getByText("Recently Added")).toBeVisible();
  });

  test("2. Navigation links work across all pages", async ({ page }) => {
    await page.goto(BASE);

    // Nav links visible
    const nav = page.locator("nav");
    await expect(nav.getByRole("link", { name: "Recipes" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Add Recipe" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Favorites" })).toBeVisible();

    // Navigate to Recipes page
    await nav.getByRole("link", { name: "Recipes" }).click();
    await expect(page).toHaveURL(/\/recipes/);
    await expect(page.locator("h1")).toContainText("All Recipes");

    // Navigate to Add Recipe page
    await nav.getByRole("link", { name: "Add Recipe" }).click();
    await expect(page).toHaveURL(/\/add/);
    await expect(page.locator("h1")).toContainText("Add a Recipe");

    // Navigate to Favorites page
    await nav.getByRole("link", { name: "Favorites" }).click();
    await expect(page).toHaveURL(/\/favorites/);
    await expect(page.locator("h1")).toContainText("Favorites");

    // Navigate back Home
    await nav.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL(BASE + "/");
  });

  test("3. Recipes page shows all recipes and tag filtering works", async ({ page }) => {
    await page.goto(BASE + "/recipes");

    // Should show recipe cards (use role links which are the h3 titles)
    await expect(page.getByRole("link", { name: "Classic Margherita Pizza" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Thai Green Curry" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Chocolate Lava Cake" })).toBeVisible();

    // Tag filter buttons should exist
    const allButton = page.getByRole("button", { name: "All" });
    await expect(allButton).toBeVisible();

    // Click a tag filter (e.g., "Dessert")
    const dessertButton = page.getByRole("button", { name: "Dessert" });
    await dessertButton.click();

    // Should show only dessert recipes
    await expect(page.getByRole("link", { name: "Chocolate Lava Cake" })).toBeVisible();
    // Non-dessert recipes should not be visible
    await expect(page.getByRole("link", { name: "Classic Margherita Pizza" })).not.toBeVisible();

    // Click "All" to reset
    await allButton.click();
    await expect(page.getByRole("link", { name: "Classic Margherita Pizza" })).toBeVisible();
  });

  test("4. Dynamic route: recipe detail page shows full info", async ({ page }) => {
    await page.goto(BASE + "/recipe/classic-margherita-pizza");

    // Title
    await expect(page.locator("h1")).toContainText("Classic Margherita Pizza");

    // Description
    await expect(page.getByText("simple, authentic Italian pizza")).toBeVisible();

    // Tags (use role links for tag pills)
    await expect(page.getByRole("link", { name: "Italian" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Pizza" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Vegetarian" })).toBeVisible();

    // Time info
    await expect(page.getByText("Prep")).toBeVisible();
    await expect(page.getByText("Cook")).toBeVisible();
    await expect(page.getByText("Total")).toBeVisible();
    await expect(page.getByText("Servings")).toBeVisible();

    // Ingredients section
    await expect(page.getByRole("heading", { name: "Ingredients" })).toBeVisible();
    await expect(page.getByText("8 oz fresh mozzarella")).toBeVisible();

    // Instructions section
    await expect(page.getByRole("heading", { name: "Instructions" })).toBeVisible();
    await expect(page.getByText("Dissolve yeast")).toBeVisible();

    // Delete button
    await expect(page.getByText("Delete Recipe")).toBeVisible();

    // Back link
    await expect(page.getByText("← Back to recipes")).toBeVisible();
  });

  test("5. Search functionality works from home page", async ({ page }) => {
    await page.goto(BASE);

    const searchInput = page.locator('input[placeholder="Search recipes..."]');
    await searchInput.fill("pizza");

    // Should show matching recipe
    await expect(page.getByRole("link", { name: "Classic Margherita Pizza" })).toBeVisible();

    // Featured section is hidden during search
    await expect(page.getByText("Featured Recipes")).not.toBeVisible();

    // Clear search
    await searchInput.fill("");
    await expect(page.getByText("Featured Recipes")).toBeVisible();

    // Search with no results
    await searchInput.fill("xyznonexistent");
    await expect(page.getByText("No recipes found")).toBeVisible();
  });

  test("6. Add recipe form submits and redirects to recipes page", async ({ page }) => {
    await page.goto(BASE + "/add");

    // Fill out the form
    await page.locator("#title").fill("Test Pancakes");
    await page.locator("#description").fill("Fluffy homemade pancakes for breakfast");
    await page.locator("#ingredients").fill("2 cups flour\n2 eggs\n1 cup milk\n2 tbsp butter");
    await page.locator("#steps").fill("Mix dry ingredients\nAdd wet ingredients\nCook on griddle");
    await page.locator("#tags").fill("Breakfast, Quick");
    await page.locator("#prepTime").fill("5");
    await page.locator("#cookTime").fill("15");
    await page.locator("#servings").fill("4");

    // Submit
    await page.getByRole("button", { name: "Add Recipe" }).click();

    // Should redirect to recipes page
    await expect(page).toHaveURL(/\/recipes/);

    // New recipe should appear
    await expect(page.getByRole("link", { name: "Test Pancakes" })).toBeVisible();
  });

  test("7. Favorite toggle works on recipe cards", async ({ page }) => {
    await page.goto(BASE + "/recipes");

    // Find the heart button within the Thai Green Curry card
    const curryCard = page.locator(".group").filter({ hasText: "Thai Green Curry" });
    await curryCard.getByRole("button", { name: "Add to favorites" }).click();

    // After clicking, the button label should change to "Remove from favorites"
    await expect(curryCard.getByRole("button", { name: "Remove from favorites" })).toBeVisible();

    // Navigate to favorites using client-side link (not page.goto which resets state)
    await page.locator("nav").getByRole("link", { name: "Favorites" }).click();
    await expect(page).toHaveURL(/\/favorites/);

    // Thai Green Curry should now appear in favorites
    await expect(page.getByRole("link", { name: "Thai Green Curry" })).toBeVisible();
  });

  test("8. Favorites page shows favorited recipes", async ({ page }) => {
    await page.goto(BASE + "/favorites");

    // Should show recipes that are favorited by default
    await expect(page.getByRole("link", { name: "Classic Margherita Pizza" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Lemon Herb Roasted Chicken" })).toBeVisible();
  });

  test("9. Recipe not found page handles invalid slugs", async ({ page }) => {
    await page.goto(BASE + "/recipe/nonexistent-recipe-slug");

    await expect(page.getByText("Recipe Not Found")).toBeVisible();
    await expect(page.getByRole("link", { name: "Browse Recipes" })).toBeVisible();
  });

  test("10. Footer is visible on all pages", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.getByText("Data lives in memory only")).toBeVisible();

    await page.goto(BASE + "/recipes");
    await expect(page.getByText("Data lives in memory only")).toBeVisible();

    await page.goto(BASE + "/add");
    await expect(page.getByText("Data lives in memory only")).toBeVisible();
  });
});
