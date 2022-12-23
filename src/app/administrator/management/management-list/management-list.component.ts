import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputEmployee} from "../dtos/dto-input-employee";
import {DtoOutputUpdateEmployee} from "../dtos/dto-output-update-employee";
import {DtoOutputDeleteEmployee} from "../dtos/dto-output-delete-employee";

@Component({
  selector: 'app-management-list',
  templateUrl: './management-list.component.html',
  styleUrls: ['./management-list.component.css']
})
export class ManagementListComponent implements OnInit {
  @Input() employees: DtoInputEmployee[] = [];
  @Input() filter: string = "";

  @Output() employee: DtoInputEmployee | undefined;
  @Output() employeeUpdated: EventEmitter<DtoOutputUpdateEmployee> = new EventEmitter<DtoOutputUpdateEmployee>();
  @Output() employeeDeleted: EventEmitter<DtoOutputDeleteEmployee> = new EventEmitter<DtoOutputDeleteEmployee>();
  detailVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  update(dto: DtoOutputUpdateEmployee) {
    this.employeeUpdated.next({
      idAccount: dto.idAccount,
      firstName: dto.firstName,
      lastName: dto.lastName,

      email: dto.email,
      phone: dto.phone,

      isAdmin: dto.isAdmin,
      pictureURL: dto.pictureURL
    })
  }

  delete(dto: DtoOutputDeleteEmployee) {
    this.employees = this.employees.filter(e => e.idAccount != dto.idAccount);
    this.employeeDeleted.next({
      idAccount: dto.idAccount
    })
    this.detailVisible = false;
  }

  select(employee: DtoInputEmployee | undefined) {
    this.employee = employee;
  }
}
