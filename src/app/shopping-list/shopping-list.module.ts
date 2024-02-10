import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingListEditComponent} from "./shopping-list-edit/shopping-list-edit.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: 'shopping-list', component: ShoppingListComponent},
    ]),
    CommonModule,
    FormsModule],
  exports: [ShoppingListComponent]
})

export class ShoppingListModule {

}
