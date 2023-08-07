import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Ingredient} from 'src/app/shared/ingredient.model';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) form: NgForm;
  editItemSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.editItemSubscription = this.shoppingListService.shoppingItemClicked.subscribe((response: number) => {
      this.editItem(response);
    })
  }

  ngOnDestroy() {
    this.editItemSubscription.unsubscribe();
  }

  addItem(form: NgForm) {
    const value = form.value;
    const newIngredient: Ingredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.resetForm()
  }

  editItem(index: number) {
    this.editMode = true;
    this.editedItemIndex = index;
    this.editedItem = this.shoppingListService.getIngredientByIndex(index);
    this.form.setValue(this.editedItem);
  }

  resetForm(){
    this.editMode = false;
    this.editedItemIndex = null;
    this.editedItem = null;
    this.form.reset();
  }

  deleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.resetForm();
  }


}
