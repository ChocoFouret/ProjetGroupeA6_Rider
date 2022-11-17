import {NgModule} from '@angular/core';
import {AdministratorComponent} from "./administrator/administrator.component";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SessionComponent} from "./session/session.component";
import {AuthGuard} from "./auth/auth.guard";
import {EmployeeComponent} from "./employee/employee.component";
import {AdminGuard} from "./auth/admin.guard";
import {ManagementComponent} from "./util/management/management.component";
import {LeaveComponent} from "./util/leave/leave.component";

// Routes
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'administrator', component: AdministratorComponent, canActivate: [AdminGuard],
    children : [
      {
        path: 'employee-management', component: ManagementComponent, canActivate: [AdminGuard]
      }
    ]
  },
  {path: 'employee',component: EmployeeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: SessionComponent},
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
