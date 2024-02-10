import {Recipe} from "./recipe.model";
import {Subject} from "rxjs";

export class RecipesService {
  recipesListUpdated: Subject<Recipe[]> = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];


  loadRecipesList(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesListUpdated.next(this.recipes);
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesListUpdated.next(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesListUpdated.next(this.recipes);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesListUpdated.next(this.recipes);
  }
}
