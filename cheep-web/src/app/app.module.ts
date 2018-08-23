import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {ItemsListComponent} from './components/items/items-list.component';
import {ItemComponent} from './components/items/item/item.component';
import {ItemsService} from './services/items.service';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItemFormComponent} from "./components/items/form/item-form.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemsListComponent,
    ItemComponent,
    ItemFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
