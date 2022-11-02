import { Component, OnInit } from '@angular/core';
import {DtoInputEmployee} from "../dtos/dto-input-employee";
import {EmployeesService} from "../employees.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee : DtoInputEmployee | null = null;
  found: boolean = false;

  constructor(private _employeeService: EmployeesService,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if (args.has("employeeid")) {
        const employeeId = Number(args.get("employeeid"));
        this.fetchEmployeeData(employeeId);
      }
    });
  }

  private fetchEmployeeData(id: number) {
    this._employeeService
      .fetchById(id)
      .subscribe(employee => this.employee = employee);
  }

}
