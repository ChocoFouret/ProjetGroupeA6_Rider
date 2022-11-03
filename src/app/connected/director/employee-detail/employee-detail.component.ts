import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputEmployee} from "../dtos/dto-input-employee";
import {EmployeesService} from "../employees.service";
import {ActivatedRoute} from "@angular/router";
import {DtoOutputLogin} from "../../../session/dtos/dto-output-login";
import {DtoOutputUpdateEmployee} from "../dtos/dto-output-update-employee";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() employee: DtoInputEmployee | undefined;
  @Output() employeeUpdated: EventEmitter<DtoOutputUpdateEmployee> = new EventEmitter<DtoOutputUpdateEmployee>();

  found: boolean = false;
  isLocked: boolean = true;

  constructor(private _employeeService: EmployeesService,
              private _route: ActivatedRoute) {
  }

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

  emitUpdate(dto: DtoInputEmployee) {
    this.employeeUpdated.next({
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      function: dto.function
    })
  }
}
