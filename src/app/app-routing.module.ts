import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SessionComponent} from "./session/session.component";
import {AuthGuard} from "./auth/auth.guard";
import {ManagementComponent} from "./administrator/management/management.component";
import {LeaveComponent} from "./util/leave/leave.component";
import {HomeComponent} from "./home/home.component";
import {AccountComponent} from "./account/account.component";
import {RequestComponent} from "./account/request/request.component";
import {ProfilComponent} from "./account/profil/profil.component";
import {TimesheetComponent} from "./account/timesheet/timesheet.component";
import {CalendarComponent} from "./company/calendar/calendar.component";
import {RegisterComponent} from "./register/register.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {AboutComponent} from "./about/about.component";
import {CreateCompaniesComponent} from "./company/createCompanies/create-companies/create-companies.component";
import {ManagementCompaniesComponent} from "./administrator/management-companies/management-companies.component";
import {AnnouncementsComponent} from "./company/announcements/announcements.component";
import {DirectorGuard} from "./auth/director.guard";
import {AnnouncementsEmployeeComponent} from "./account/announcements-employee/announcements-employee.component";
import {AboutusComponent} from "./aboutus/aboutus.component";

// Routes
const routes: Routes = [
  {path: '', redirectTo: 'home/welcome', pathMatch: 'full'},
  {
    path: 'account', component: AccountComponent, canActivate: [AuthGuard],
    children: [
      {path: 'request', component: RequestComponent},
      {path: 'announcements', component: AnnouncementsEmployeeComponent},
      {path: 'profil', component: ProfilComponent},
      {path: 'planning', component: TimesheetComponent},
      {path: 'users-management', component: ManagementComponent},
      {path: 'companies-management', component: ManagementCompaniesComponent},
      {path: 'director/calendar', component: CalendarComponent, canActivate: [DirectorGuard]},
      {path: 'director/announcements', component: AnnouncementsComponent, canActivate: [DirectorGuard]},
    ]
  },
  {
    path: 'home', component: HomeComponent,
    children: [
      {path: 'login', component: SessionComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'welcome', component: WelcomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'aboutus', component: AboutusComponent},
      {path: 'createCompanie', component: CreateCompaniesComponent}
    ]
  },

  {path: 'leave', component: LeaveComponent},
  {path: "**", component: NotFoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
