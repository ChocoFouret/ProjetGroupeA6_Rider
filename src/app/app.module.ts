import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GuestComponent} from './guest/guest.component';
import {ConnectedComponent} from './connected/connected.component';
import {DirectorComponent} from './director/director.component';
import {AdministratorComponent} from './administrator/administrator.component';
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundComponent} from './not-found/not-found.component';
import {SessionComponent} from './session/session.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './director/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './director/employee-detail/employee-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    ConnectedComponent,
    DirectorComponent,
    AdministratorComponent,
    NotFoundComponent,
    SessionComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
