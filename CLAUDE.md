# Recipe Book

A personal recipe book app built with Next.js and Tailwind CSS. Store your favorite recipes with ingredients, steps, tags, and more. Search, filter, and save your favorites.

## Pages

- `/` — Home page with hero, featured recipes, and search
- `/recipes` — Browse all recipes, filter by tags
- `/add` — Form to add a new recipe
- `/recipe/[slug]` — Dynamic route showing full recipe details
- `/favorites` — View saved favorite recipes

## Data Model

All data is stored in client-side state (React Context) and lives in memory only.

```typescript
interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  prepTime: number;    // minutes
  cookTime: number;    // minutes
  servings: number;
  isFavorite: boolean;
  createdAt: string;
}
```

## Style Preferences

- Warm, inviting color palette (amber/orange tones)
- Clean typography with good whitespace
- Card-based layout for recipe listings
- Responsive design (mobile-first)
- Geist font family

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- React Context for state management
