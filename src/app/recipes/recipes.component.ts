import {Component, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipesService} from "./recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipesService) {

  }

  ngOnInit(): void {
  }


}
