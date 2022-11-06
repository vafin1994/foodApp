import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() linkEvent = new EventEmitter<'recipes' | 'shoppingList'>();

  collapsed = true;

  constructor() {
  }

  onLinkClicked(link: 'recipes' | 'shoppingList'){
    this.linkEvent.emit(link);
  }

  ngOnInit(): void {
  }

}
