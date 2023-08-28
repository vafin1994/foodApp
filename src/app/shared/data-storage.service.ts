import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipesService} from "../recipes/recipes.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  dbUrl: string = 'https://foodapp-b7809-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient, private recipesService: RecipesService) {
    this.fetchData();
  }

  storeRecipes() {
    const recipes: Recipe[] = this.recipesService.getRecipes();
    this.http.put(this.dbUrl + '/recipes.json', recipes).subscribe(
      (response: Recipe[]) => {
      }
    )
  }

  fetchData() {
    return this.http.get<Recipe[]>(this.dbUrl + '/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          })
        }),
        tap((recipes: Recipe[]) => {
          this.recipesService.loadRecipesList(recipes);
        })
      )
  }
}
