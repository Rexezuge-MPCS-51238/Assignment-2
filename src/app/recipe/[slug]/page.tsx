"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecipes } from "@/lib/recipe-context";

export default function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { getRecipeBySlug, toggleFavorite, deleteRecipe } = useRecipes();
  const router = useRouter();
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

  const totalTime = recipe.prepTime + recipe.cookTime;

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    router.push("/recipes");
  };

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
        <div className="flex gap-2">
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className="mt-1 text-2xl transition-transform hover:scale-110"
            aria-label={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {recipe.isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <Link
            key={tag}
            href={`/recipes?tag=${encodeURIComponent(tag)}`}
            className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 hover:bg-amber-100 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* Meta */}
      <div className="mt-6 grid grid-cols-4 gap-3">
        <div className="rounded-xl border border-amber-100 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{recipe.prepTime}m</p>
          <p className="text-xs text-zinc-500">Prep</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{recipe.cookTime}m</p>
          <p className="text-xs text-zinc-500">Cook</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{totalTime}m</p>
          <p className="text-xs text-zinc-500">Total</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{recipe.servings}</p>
          <p className="text-xs text-zinc-500">Servings</p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_2fr]">
        {/* Ingredients */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900">Ingredients</h2>
          <ul className="mt-4 space-y-2.5">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-700">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                {ingredient}
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section>
          <h2 className="text-xl font-bold text-zinc-900">Instructions</h2>
          <ol className="mt-4 space-y-5">
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

      {/* Actions */}
      <div className="mt-12 flex items-center justify-between border-t border-amber-100 pt-6">
        <Link
          href="/recipes"
          className="text-sm font-medium text-amber-600 hover:text-amber-700"
        >
          ← Back to recipes
        </Link>
        <button
          onClick={handleDelete}
          className="rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          Delete Recipe
        </button>
      </div>
    </div>
  );
}
