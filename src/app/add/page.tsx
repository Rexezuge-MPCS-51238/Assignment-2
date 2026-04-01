"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRecipes } from "@/lib/recipe-context";

export default function AddRecipePage() {
  const { addRecipe } = useRecipes();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addRecipe({
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      steps: steps
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      tags: tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      prepTime: parseInt(prepTime) || 0,
      cookTime: parseInt(cookTime) || 0,
      servings: parseInt(servings) || 1,
    });

    router.push("/recipes");
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold text-zinc-900">Add a Recipe</h1>
      <p className="mt-2 text-zinc-500">
        Share a new recipe with your collection.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
            Recipe Title *
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Grandma's Apple Pie"
            className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-700">
            Description *
          </label>
          <textarea
            id="description"
            required
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short description of the dish..."
            className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-zinc-700">
            Ingredients * <span className="text-zinc-400 font-normal">(one per line)</span>
          </label>
          <textarea
            id="ingredients"
            required
            rows={5}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder={"2 cups flour\n1 cup sugar\n3 large eggs"}
            className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {/* Steps */}
        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-zinc-700">
            Steps * <span className="text-zinc-400 font-normal">(one per line)</span>
          </label>
          <textarea
            id="steps"
            required
            rows={5}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder={"Preheat oven to 350°F.\nMix dry ingredients together.\nAdd wet ingredients and stir."}
            className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-zinc-700">
            Tags <span className="text-zinc-400 font-normal">(comma-separated)</span>
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., Dessert, Baking, American"
            className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
        </div>

        {/* Time & Servings */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="prepTime" className="block text-sm font-medium text-zinc-700">
              Prep (min)
            </label>
            <input
              id="prepTime"
              type="number"
              min="0"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              placeholder="15"
              className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>
          <div>
            <label htmlFor="cookTime" className="block text-sm font-medium text-zinc-700">
              Cook (min)
            </label>
            <input
              id="cookTime"
              type="number"
              min="0"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              placeholder="30"
              className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>
          <div>
            <label htmlFor="servings" className="block text-sm font-medium text-zinc-700">
              Servings
            </label>
            <input
              id="servings"
              type="number"
              min="1"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              placeholder="4"
              className="mt-1.5 w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-amber-600 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}
