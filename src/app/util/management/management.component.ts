import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../session/session.service";
import {DtoInputEmployee} from "./dtos/dto-input-employee";
import {EmployeesService} from "../../director/employees.service";
import {DtoOutputUpdateEmployee} from "./dtos/dto-output-update-employee";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  employees: DtoInputEmployee[] = [];
  isDirector: boolean = false;
  isAdmin: boolean = false;

  constructor(private _employeesService: EmployeesService, private _serviceService: SessionService) {
  }

  ngOnInit(): void {
    this.authorization();
    this.fetchAll();
  }

  private authorization() {
    if (this._serviceService.getFunction() == "Administrator") {
      this.isAdmin = true;
    } else if (this._serviceService.getFunction() == "Director") {
      this.isDirector = true;
    }
  }

  private fetchAll() {
    this._employeesService
      .fetchAll()
      .subscribe(employees => {
        this.employees = employees;
        if(this.isDirector) {
          this.employees = this.employees.filter((item) => {
            return item.function === "Employee";
          });
        }
        if(this.isAdmin) {
          this.employees = this.employees.filter((item) => {
            return item.function === "Director" || item.function === "Administrator";
          });
        }
      })
  }

  update(dto: DtoOutputUpdateEmployee) {
    this._employeesService
      .update(dto)
      .subscribe();
  }

}
