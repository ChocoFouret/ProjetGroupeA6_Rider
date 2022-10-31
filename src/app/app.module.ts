import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GuestComponent } from './guest/guest.component';
import { ConnectedComponent } from './connected/connected.component';
import { DirectorComponent } from './director/director.component';
import { AdministratorComponent } from './administrator/administrator.component';
import {AppRoutingModule} from "./app-routing.module";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    ConnectedComponent,
    DirectorComponent,
    AdministratorComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // Route, barre de navigation
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
