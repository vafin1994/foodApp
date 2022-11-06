import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter, Inject} from "@angular/core";

@Inject({
  providedIn: 'root',
})

export class ShoppingListService {
  shoppingListUpdated: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Onions', 1),
    new Ingredient('Apples', 5),
  ];

  getIngredientList() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.shoppingListUpdated.emit(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.shoppingListUpdated.emit(this.ingredients);
  }
}
