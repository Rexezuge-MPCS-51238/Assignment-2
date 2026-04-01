"use client";

import { useState } from "react";
import Link from "next/link";
import { useRecipes } from "@/lib/recipe-context";
import { RecipeCard } from "@/components/recipe-card";

export default function Home() {
  const { recipes, searchRecipes } = useRecipes();
  const [query, setQuery] = useState("");

  const featured = recipes.filter((r) => r.isFavorite).slice(0, 3);
  const results = query ? searchRecipes(query) : [];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-50 to-transparent px-6 pb-16 pt-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
          Your Personal <span className="text-amber-600">Recipe Book</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-zinc-500">
          Collect, organize, and cook your favorite recipes. Search by name, ingredient, or tag.
        </p>

        {/* Search */}
        <div className="mx-auto mt-8 max-w-md">
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-amber-200 bg-white px-5 py-3 text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {query && (
          <div className="mx-auto mt-6 max-w-6xl">
            {results.length === 0 ? (
              <p className="text-zinc-400">No recipes found for &ldquo;{query}&rdquo;</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Featured */}
      {!query && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-zinc-900">Featured Recipes</h2>
            <Link
              href="/recipes"
              className="text-sm font-medium text-amber-600 hover:text-amber-700"
            >
              View all →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-amber-100 bg-white p-6 text-center">
              <p className="text-3xl font-bold text-amber-600">{recipes.length}</p>
              <p className="mt-1 text-sm text-zinc-500">Total Recipes</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white p-6 text-center">
              <p className="text-3xl font-bold text-amber-600">
                {recipes.filter((r) => r.isFavorite).length}
              </p>
              <p className="mt-1 text-sm text-zinc-500">Favorites</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white p-6 text-center">
              <p className="text-3xl font-bold text-amber-600">
                {new Set(recipes.flatMap((r) => r.tags)).size}
              </p>
              <p className="mt-1 text-sm text-zinc-500">Tags</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
