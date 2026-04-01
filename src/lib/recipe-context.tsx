"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Recipe } from "./types";
import { sampleRecipes } from "./sample-recipes";

interface RecipeContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, "id" | "slug" | "createdAt" | "isFavorite">) => void;
  deleteRecipe: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getRecipeBySlug: (slug: string) => Recipe | undefined;
  searchRecipes: (query: string) => Recipe[];
  getRecipesByTag: (tag: string) => Recipe[];
  getAllTags: () => string[];
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);

  const addRecipe = (recipe: Omit<Recipe, "id" | "slug" | "createdAt" | "isFavorite">) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: Date.now().toString(),
      slug: generateSlug(recipe.title),
      isFavorite: false,
      createdAt: new Date().toISOString(),
    };
    setRecipes((prev) => [newRecipe, ...prev]);
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  };

  const getRecipeBySlug = (slug: string) => {
    return recipes.find((r) => r.slug === slug);
  };

  const searchRecipes = (query: string) => {
    const q = query.toLowerCase();
    return recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  };

  const getRecipesByTag = (tag: string) => {
    return recipes.filter((r) => r.tags.includes(tag));
  };

  const getAllTags = () => {
    const tags = new Set<string>();
    recipes.forEach((r) => r.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        addRecipe,
        deleteRecipe,
        toggleFavorite,
        getRecipeBySlug,
        searchRecipes,
        getRecipesByTag,
        getAllTags,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider");
  }
  return context;
}
