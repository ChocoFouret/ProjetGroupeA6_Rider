import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputEmployee} from "../dtos/dto-input-employee";
import {Router} from "@angular/router";
import {last} from "rxjs";
import {DtoOutputUpdateEmployee} from "../dtos/dto-output-update-employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() employees: DtoInputEmployee[] = [];
  @Output() employee: DtoInputEmployee | undefined;
  @Output() employeeUpdated: EventEmitter<DtoOutputUpdateEmployee> = new EventEmitter<DtoOutputUpdateEmployee>();
  selectedEmployee = "";


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  getDetail = () => {
    this.employees.find((e) => e.firstName == this.selectedEmployee);

    let lastName = this.selectedEmployee.substring(0, this.selectedEmployee.indexOf(","));
    let firstName = this.selectedEmployee.substring(this.selectedEmployee.indexOf(",") + 2);

    this.employee = this.employees.find(e =>
      e.firstName == firstName && e.lastName == lastName
    );
  }

  update(dto: DtoOutputUpdateEmployee) {
    this.selectedEmployee = "";
    this.employeeUpdated.next({
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      function: dto.function
    })
  }
}
