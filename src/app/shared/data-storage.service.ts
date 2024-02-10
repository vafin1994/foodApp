import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipesService} from "../recipes/recipes.service";
import {filter, map, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    dbUrl: string = 'https://foodapp-b7809-default-rtdb.europe-west1.firebasedatabase.app/';

    constructor(private http: HttpClient, private recipesService: RecipesService, private authService: AuthService) {
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
        return this.http.get<Recipe[] | null>(this.dbUrl + '/recipes.json').pipe(
            filter((response: Recipe[] | null) => {
                return response !== null;
            }),
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
