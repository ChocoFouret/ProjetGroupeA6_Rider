import {NgModule} from '@angular/core';
import {ConnectedComponent} from "./connected/connected.component";
import {DirectorComponent} from "./connected/director/director.component";
import {AdministratorComponent} from "./connected/administrator/administrator.component";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SessionComponent} from "./session/session.component";
import {AuthGuard} from "./auth/auth.guard";
import {EmployeeComponent} from "./connected/employee/employee.component";
import {DirectorGuard} from "./auth/director.guard";
import {AdminGuard} from "./auth/admin.guard";

// Routes
const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'connected', component: ConnectedComponent, canActivate: [AuthGuard], children: [
      {path: 'administrator', component: AdministratorComponent, canActivate: [AdminGuard]},
      {path: 'director', component: DirectorComponent, canActivate: [DirectorGuard]},
      {path: 'employee', component: EmployeeComponent}
    ]
  },
  {path: 'login', component: SessionComponent},
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
