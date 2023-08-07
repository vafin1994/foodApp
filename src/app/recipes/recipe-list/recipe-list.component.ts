import {Component, OnDestroy, OnInit,} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes: Recipe[];

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.subscription = this.recipesService.recipesListUpdated.subscribe((response: Recipe[]) => {
      this.recipes = this.recipesService.getRecipes();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
