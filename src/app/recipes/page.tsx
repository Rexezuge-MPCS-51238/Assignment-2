"use client";

import { useState } from "react";
import { useRecipes } from "@/lib/recipe-context";
import { RecipeCard } from "@/components/recipe-card";

export default function RecipesPage() {
  const { recipes, getAllTags, getRecipesByTag } = useRecipes();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = getAllTags();
  const displayed = activeTag ? getRecipesByTag(activeTag) : recipes;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold text-zinc-900">All Recipes</h1>
      <p className="mt-2 text-zinc-500">
        Browse your collection of {recipes.length} recipes.
      </p>

      {/* Tag filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeTag === null
              ? "bg-amber-600 text-white"
              : "bg-amber-50 text-amber-700 hover:bg-amber-100"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTag === tag
                ? "bg-amber-600 text-white"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Recipe grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {displayed.length === 0 && (
        <p className="mt-12 text-center text-zinc-400">
          No recipes found with tag &ldquo;{activeTag}&rdquo;.
        </p>
      )}
    </div>
  );
}
