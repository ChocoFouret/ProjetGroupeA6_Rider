import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GuestComponent} from './guest/guest.component';
import {AdministratorComponent} from './administrator/administrator.component';
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundComponent} from './not-found/not-found.component';
import {SessionComponent} from './session/session.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {EmployeeComponent} from './employee/employee.component';
import {ManagementComponent} from './util/management/management.component';
import {ManagementDetailComponent} from './util/management/management-detail/management-detail.component';
import {ManagementListComponent} from './util/management/management-list/management-list.component';
import {LeaveComponent} from './util/leave/leave.component';
import {HomeComponent} from './home/home.component';
import {CompanyComponent} from './company/company.component';
import {CalendarComponent} from './company/calendar/calendar.component';
import {DayPilotModule} from "daypilot-pro-angular";
import { TimesheetComponent } from './company/timesheet/timesheet.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    AdministratorComponent,
    NotFoundComponent,
    SessionComponent,
    EmployeeComponent,
    ManagementComponent,
    ManagementDetailComponent,
    ManagementListComponent,
    LeaveComponent,
    HomeComponent,
    CompanyComponent,
    CalendarComponent,
    TimesheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DayPilotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
