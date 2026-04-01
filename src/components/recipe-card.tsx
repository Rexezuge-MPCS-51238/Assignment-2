"use client";

import Link from "next/link";
import { Recipe } from "@/lib/types";
import { useRecipes } from "@/lib/recipe-context";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { toggleFavorite } = useRecipes();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-all hover:shadow-md hover:border-amber-200">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
        <span className="text-5xl">
          {recipe.tags.includes("Dessert")
            ? "🍰"
            : recipe.tags.includes("Pizza")
              ? "🍕"
              : recipe.tags.includes("Thai")
                ? "🍜"
                : recipe.tags.includes("Mexican")
                  ? "🌮"
                  : "🍽️"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/recipe/${recipe.slug}`} className="group/link">
          <h3 className="text-lg font-semibold text-zinc-900 group-hover/link:text-amber-700 transition-colors">
            {recipe.title}
          </h3>
        </Link>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-2">
          {recipe.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-3 text-xs text-zinc-400">
            <span>🕐 {recipe.prepTime + recipe.cookTime}m</span>
            <span>👤 {recipe.servings} servings</span>
          </div>
          <button
            onClick={() => toggleFavorite(recipe.id)}
            className="text-lg transition-transform hover:scale-110"
            aria-label={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {recipe.isFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}
