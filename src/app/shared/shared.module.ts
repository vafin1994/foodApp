import {NgModule} from "@angular/core";
import {AlertComponent} from "./alert/alert.component";
import {LoadingComponent} from "./loading/loading.component";
import {AlertPlaceholderDirective} from "./alert-placeholder.directive";
import {DropdownDirective} from "./dropdown.directive";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:[
    AlertComponent,
    LoadingComponent,
    AlertPlaceholderDirective,
    DropdownDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoadingComponent,
    AlertPlaceholderDirective,
    DropdownDirective,
    CommonModule
  ]
})

export class SharedModule {}
