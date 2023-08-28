import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() linkEvent = new EventEmitter<'recipes' | 'shoppingList'>();

  collapsed = true;

  constructor(private dataStorageService: DataStorageService) {
  }

  onLinkClicked(link: 'recipes' | 'shoppingList') {
    this.linkEvent.emit(link);
  }

  saveData() {
    this.dataStorageService.storeRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchData().subscribe();
  }

  ngOnInit(): void {
  }

}
