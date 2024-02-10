import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingListService} from "./shopping-list/shopping-list.service";
import {AppRoutingModule} from "./app-routing.module";
import {RecipesService} from "./recipes/recipes.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthComponent} from './auth/auth.component';
import {LoadingComponent} from './shared/loading/loading.component';
import {TokenInterceptorService} from "./shared/token.interceptor.service";
import {AlertComponent} from './shared/alert/alert.component';
import {AlertPlaceholderDirective} from './shared/alert-placeholder.directive';
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingComponent,
    AlertComponent,
    AlertPlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
  ],
  providers: [ShoppingListService, RecipesService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
