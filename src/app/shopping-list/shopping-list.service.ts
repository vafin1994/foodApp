import {Ingredient} from "../shared/ingredient.model";
import { Inject} from "@angular/core";
import {Subject} from "rxjs";

@Inject({
  providedIn: 'root',
})

export class ShoppingListService {
  shoppingListUpdated: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Onions', 1),
    new Ingredient('Apples', 5),
  ];

  getIngredientList(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.shoppingListUpdated.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.shoppingListUpdated.next(this.ingredients);
  }
}
