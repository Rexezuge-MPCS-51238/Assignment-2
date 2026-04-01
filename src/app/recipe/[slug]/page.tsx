"use client";

import { use } from "react";
import Link from "next/link";
import { useRecipes } from "@/lib/recipe-context";

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { getRecipeBySlug, toggleFavorite } = useRecipes();
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <p className="text-5xl">🔍</p>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900">Recipe Not Found</h1>
        <p className="mt-2 text-zinc-500">
          We couldn&apos;t find a recipe with that name.
        </p>
        <Link
          href="/recipes"
          className="mt-6 inline-block rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700"
        >
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-zinc-400">
        <Link href="/recipes" className="hover:text-amber-600">
          Recipes
        </Link>
        <span>/</span>
        <span className="text-zinc-600">{recipe.title}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            {recipe.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-zinc-500">
            {recipe.description}
          </p>
        </div>
        <button
          onClick={() => toggleFavorite(recipe.id)}
          className="mt-1 text-2xl transition-transform hover:scale-110"
          aria-label={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {recipe.isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-amber-100 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{recipe.prepTime}m</p>
          <p className="text-xs text-zinc-500">Prep Time</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{recipe.cookTime}m</p>
          <p className="text-xs text-zinc-500">Cook Time</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{recipe.servings}</p>
          <p className="text-xs text-zinc-500">Servings</p>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900">Ingredients</h2>
        <ul className="mt-4 space-y-2">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-700">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
              {ingredient}
            </li>
          ))}
        </ul>
      </section>

      {/* Steps */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900">Instructions</h2>
        <ol className="mt-4 space-y-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                {i + 1}
              </span>
              <p className="pt-0.5 text-zinc-700 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
