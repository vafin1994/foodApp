import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ShoppingListService} from "../shoppingList.service";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInput: ElementRef;

  constructor(private shoppingList: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  addItem() {
    this.shoppingList.addIngredient({
      name: this.nameInput.nativeElement.value,
      amount: this.amountInput.nativeElement.value
    })
  }

  deleteItem() {

  }

  clearAll() {

  }

}
