import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../session/session.service";
import {DtoInputEmployee} from "./dtos/dto-input-employee";
import {DtoOutputUpdateEmployee} from "./dtos/dto-output-update-employee";
import {DtoOutputDeleteEmployee} from "./dtos/dto-output-delete-employee";
import {ManagementService} from "./management.service";
import {NotificationsService} from "../../util/notifications/notifications.service";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  employees: DtoInputEmployee[] = [];
  filter: string = "";

  constructor(private _usersService: ManagementService,
              private _serviceService: SessionService,
              private _notifcation : NotificationsService) {
  }

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll() {
    this._usersService
      .fetchAll()
      .subscribe(employees => {
        employees = employees.filter(employee => employee.idAccount != this._serviceService.getID())
        this.employees = employees;
        this.employees.filter(async (item) => {
          item.firstName = item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1);
          item.lastName = item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1);
          await this._usersService.fetchFunction(item.idAccount).subscribe(async e => {
            if (e[0] != null) {
              item.function = e[0].function.title
              await this._usersService.fetchCompany(e[0].idCompanies).subscribe(e => {
                item.company = e.companiesName;
              })
            }
          });
          if (!item.company) {
            item.company = "Aucune";
          }
        })

        this.employees.sort((a, b) => {
          if (a.isAdmin < b.isAdmin) {
            return 1;
          } else if (a.isAdmin == b.isAdmin) {
            if (a.lastName > b.lastName) {
              return 1;
            } else if (a.lastName == b.lastName) {
              if (a.firstName < b.firstName) {
                return 1;
              } else {
                return -1;
              }
            }
          }
          return -1;
        })
      })
  }

  update(dto: DtoOutputUpdateEmployee) {
    this._usersService
      .update(dto)
      .subscribe();
  }

  delete(dto: DtoOutputDeleteEmployee) {
    this._usersService
      .delete(dto)
      .subscribe(() =>
        this._notifcation.success("Suppresion effectuée.")
      );
  }
}
