import {Ingredient} from "../shared/ingredient.model";
import { Inject} from "@angular/core";
import {Subject} from "rxjs";

@Inject({
  providedIn: 'root',
})

export class ShoppingListService {
  shoppingListUpdated: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  shoppingItemClicked: Subject<number> = new Subject<number>()
  private ingredients: Ingredient[] = [
    new Ingredient('Onions', 1),
    new Ingredient('Apples', 5),
  ];

  getIngredientList(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredientByIndex(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.shoppingListUpdated.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.shoppingListUpdated.next(this.ingredients);
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.shoppingListUpdated.next(this.ingredients);
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.shoppingListUpdated.next(this.ingredients);
  }


  itemClicked(id: number){
    this.shoppingItemClicked.next(id);
  }
}
