import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../session/session.service";
import {DtoInputEmployee} from "./dtos/dto-input-employee";
import {DtoOutputUpdateEmployee} from "./dtos/dto-output-update-employee";
import {DtoOutputDeleteEmployee} from "./dtos/dto-output-delete-employee";
import {ManagementService} from "./management.service";
import {DtoOutputUpdatePasswordEmployee} from "./dtos/dto-output-update-password-employee";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  employees: DtoInputEmployee[] = [];
  filter: string = "";

  constructor(private _employeesService: ManagementService, private _serviceService: SessionService) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll() {
    this._employeesService
      .fetchAll()
      .subscribe(employees => {
        this.employees = employees;
        this.employees.filter(async (item) => {
          item.firstName = item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1);
          item.lastName = item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1);
          await this._employeesService.fetchFunction(item.idAccount).subscribe(async e => {
            if (e[0] != null) {
              item.function = e[0].function.title
              await this._employeesService.fetchCompany(e[0].idCompanies).subscribe(e => {
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
    this._employeesService
      .update(dto)
      .subscribe();
  }

  updatePassword(dto: DtoOutputUpdatePasswordEmployee) {
    this._employeesService
      .updatePassword(dto)
      .subscribe(value => {
        alert("Votre nouveau mot de passe est : " + value.password);
      });
  }

  delete(dto: DtoOutputDeleteEmployee) {
    this._employeesService
      .delete(dto)
      .subscribe();
  }
}
