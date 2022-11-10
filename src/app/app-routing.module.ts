import {NgModule} from '@angular/core';
import {ConnectedComponent} from "./connected/connected.component";
import {DirectorComponent} from "./director/director.component";
import {AdministratorComponent} from "./administrator/administrator.component";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SessionComponent} from "./session/session.component";
import {AuthGuard} from "./auth/auth.guard";
import {EmployeeComponent} from "./employee/employee.component";
import {DirectorGuard} from "./auth/director.guard";
import {AdminGuard} from "./auth/admin.guard";
import {EmployeeDetailComponent} from "./director/employee-detail/employee-detail.component";

// Routes
const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },

  {path: 'administrator', component: AdministratorComponent, canActivate: [AdminGuard]},
  {path: 'director', component: DirectorComponent, canActivate: [DirectorGuard]},
  {path: 'employee',component: EmployeeComponent, canActivate: [AuthGuard]},
        /*children : [
          {
            path: 'detail/:employeeid', component: EmployeeDetailComponent
          }
        ]
      },
      {path: 'employee', component: EmployeeComponent}
    ]
  },*/
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
