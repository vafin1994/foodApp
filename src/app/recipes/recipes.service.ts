import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

export class RecipesService {
  public recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test recipe 1',
      'This is a test description',
      'https://aheadofourthyme.com/wp-content/uploads/2022/04/air-fryer-salmon-recipe-3.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20),
      ]),
    new Recipe(
      'Test recipe 2',
      'This is a test description',
      'https://aheadofourthyme.com/wp-content/uploads/2022/04/air-fryer-salmon-recipe-3.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
      ]),
    new Recipe(
      'Test recipe 3',
      'This is a test description',
      'https://aheadofourthyme.com/wp-content/uploads/2022/04/air-fryer-salmon-recipe-3.jpg',
      [])
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number){
    return this.recipes[id];
  }
}
