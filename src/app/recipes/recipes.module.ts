import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeDetailsComponent,
  ],
  exports: [],
  imports: [
    RecipesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]

})

export class RecipesModule {

}
