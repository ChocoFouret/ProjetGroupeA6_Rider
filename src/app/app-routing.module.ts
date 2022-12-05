import {NgModule} from '@angular/core';
import {AdministratorComponent} from "./administrator/administrator.component";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SessionComponent} from "./session/session.component";
import {AuthGuard} from "./auth/auth.guard";
import {AdminGuard} from "./auth/admin.guard";
import {ManagementComponent} from "./util/management/management.component";
import {LeaveComponent} from "./util/leave/leave.component";
import {HomeComponent} from "./home/home.component";
import {CompanyComponent} from "./company/company.component";
import {AccountComponent} from "./account/account.component";
import {RequestComponent} from "./account/request/request.component";
import {ProfilComponent} from "./account/profil/profil.component";
import {TimesheetComponent} from "./account/timesheet/timesheet.component";
import {CalendarComponent} from "./company/calendar/calendar.component";
import {RegisterComponent} from "./register/register.component";


// Routes
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'administrator', component: AdministratorComponent, canActivate: [AdminGuard],
    children: [
      {path: 'employee-management', component: ManagementComponent, canActivate: [AdminGuard]}
    ]
  },
  {
    path: 'employee', component: AccountComponent, canActivate: [AuthGuard],
    children: [
      {path: 'request', component: RequestComponent},
      {path: 'profil', component: ProfilComponent},
      {path: 'planning/:idCompanies', component: TimesheetComponent}
    ]
  },
  {
    path: 'company/:idCompanies', component: CompanyComponent, children: [
      {path: 'calendar', component: CalendarComponent}
    ]
  },
  // {path: 'company/:idCompagnie/:idSchedule', component: CompanyComponent},
  {path: 'home', component: HomeComponent,
    children: [
      {path: 'login', component: SessionComponent},
      {path: 'register', component: RegisterComponent}
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
