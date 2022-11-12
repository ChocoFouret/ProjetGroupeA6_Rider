import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputEmployee} from "../dtos/dto-input-employee";
import {DtoOutputUpdateEmployee} from "../dtos/dto-output-update-employee";

@Component({
  selector: 'app-management-list',
  templateUrl: './management-list.component.html',
  styleUrls: ['./management-list.component.css']
})
export class ManagementListComponent implements OnInit {
  @Input() employees: DtoInputEmployee[] = [];
  @Output() employee: DtoInputEmployee | undefined;
  @Output() employeeUpdated: EventEmitter<DtoOutputUpdateEmployee> = new EventEmitter<DtoOutputUpdateEmployee>();
  selectedEmployee = "";

  constructor() {
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
