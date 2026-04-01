export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  isFavorite: boolean;
  createdAt: string;
}
