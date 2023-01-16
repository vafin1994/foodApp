import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shoppingList.service";
import {Ingredient} from "../../shared/ingredient.model";
import {RecipesService} from "../recipes.service";
import {ActivatedRoute, Params, UrlSegment} from "@angular/router";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  selectedRecipe: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.selectedRecipe = this.recipesService.getRecipeById(this.id);
      }
    )
  }

  addIngredientsToShoppingList() {
    this.shoppingListService.addIngredients(this.selectedRecipe.ingredients);
  }

}
