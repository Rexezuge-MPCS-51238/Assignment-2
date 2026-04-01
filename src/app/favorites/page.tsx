"use client";

import Link from "next/link";
import { useRecipes } from "@/lib/recipe-context";
import { RecipeCard } from "@/components/recipe-card";

export default function FavoritesPage() {
  const { recipes } = useRecipes();
  const favorites = recipes.filter((r) => r.isFavorite);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold text-zinc-900">Favorites</h1>
      <p className="mt-2 text-zinc-500">
        Your hand-picked collection of go-to recipes.
      </p>

      {favorites.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-5xl">💛</p>
          <h2 className="mt-4 text-xl font-semibold text-zinc-900">
            No favorites yet
          </h2>
          <p className="mt-2 text-zinc-500">
            Heart a recipe to save it here for quick access.
          </p>
          <Link
            href="/recipes"
            className="mt-6 inline-block rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700"
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
