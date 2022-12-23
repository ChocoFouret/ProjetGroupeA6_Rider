import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GuestComponent} from './guest/guest.component';
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundComponent} from './not-found/not-found.component';
import {SessionComponent} from './session/session.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ManagementComponent} from './administrator/management/management.component';
import {ManagementDetailComponent} from './administrator/management/management-detail/management-detail.component';
import {ManagementListComponent} from './administrator/management/management-list/management-list.component';
import {LeaveComponent} from './util/leave/leave.component';
import {HomeComponent} from './home/home.component';
import {CalendarComponent} from './company/calendar/calendar.component';
import {DayPilotModule} from "daypilot-pro-angular";
import {TimesheetComponent} from './account/timesheet/timesheet.component';
import {InfoEventComponent} from './company/calendar/info-event/info-event.component';
import {AccountComponent} from "./account/account.component";
import {CreateCompaniesComponent} from "./company/createCompanies/create-companies/create-companies.component";
import {RequestComponent} from './account/request/request.component';
import {ProfilComponent} from './account/profil/profil.component';
import {RegisterComponent} from './register/register.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AboutComponent} from './about/about.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AlertComponent} from './util/alert/alert.component';
import {ManagementCompaniesComponent} from './administrator/management-companies/management-companies.component';
import {ManagementCompaniesListComponent} from './administrator/management-companies/management-companies-list/management-companies-list.component';
import {ManagementCompaniesDetailComponent} from './administrator/management-companies/management-companies-detail/management-companies-detail.component';
import {HeaderComponent} from './util/header/header.component';
import {AnnouncementsComponent} from './company/announcements/announcements.component';
import {AnnouncementsEmployeeComponent} from "./account/announcements-employee/announcements-employee.component";
import { AboutusComponent } from './aboutus/aboutus.component';

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    NotFoundComponent,
    SessionComponent,
    ManagementComponent,
    ManagementDetailComponent,
    ManagementListComponent,
    LeaveComponent,
    HomeComponent,
    CalendarComponent,
    TimesheetComponent,
    InfoEventComponent,
    AccountComponent,
    RequestComponent,
    ProfilComponent,
    RegisterComponent,
    WelcomeComponent,
    AboutComponent,
    CreateCompaniesComponent,
    AlertComponent,
    ManagementCompaniesComponent,
    ManagementCompaniesListComponent,
    ManagementCompaniesDetailComponent,
    HeaderComponent,
    AnnouncementsComponent,
    AnnouncementsEmployeeComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DayPilotModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
