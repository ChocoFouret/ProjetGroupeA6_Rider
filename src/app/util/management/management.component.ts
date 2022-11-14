import {Component, Input, OnInit, Output} from '@angular/core';
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

  isDirector: boolean = false;
  isAdmin: boolean = false;

  constructor(private _employeesService: ManagementService, private _serviceService: SessionService) {
  }

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll() {
    this._employeesService
      .fetchAll()
      .subscribe(employees => {
        this.employees = employees;

        this.employees = this.employees.filter((item) => {
          return this._serviceService.getEmail() != item.email;
        })

        this.employees = this.employees.filter((item) => {
          return this._serviceService.getFunction() == "Administrator"
            ? item.function === "Employee" || item.function === "Director" || item.function === "Administrator"
            : item.function === "Employee" || item.function === "Director";
        });

        this.employees.sort((a, b) => {
          if (a.function > b.function) {
            return 1;
          } else if (a.function == b.function) {
            if (a.lastName > b.lastName) {
              return 1;
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
