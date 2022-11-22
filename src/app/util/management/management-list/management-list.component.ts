import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputEmployee} from "../dtos/dto-input-employee";
import {DtoOutputUpdateEmployee} from "../dtos/dto-output-update-employee";
import {DtoOutputDeleteEmployee} from "../dtos/dto-output-delete-employee";
import {DtoOutputUpdatePasswordEmployee} from "../dtos/dto-output-update-password-employee";

@Component({
  selector: 'app-management-list',
  templateUrl: './management-list.component.html',
  styleUrls: ['./management-list.component.css']
})
export class ManagementListComponent implements OnInit {
  @Input() employees: DtoInputEmployee[] = [];
  @Output() employee: DtoInputEmployee | undefined;

  @Output() employeeUpdated: EventEmitter<DtoOutputUpdateEmployee> = new EventEmitter<DtoOutputUpdateEmployee>();
  @Output() employeeUpdatedPassword: EventEmitter<DtoOutputUpdatePasswordEmployee> = new EventEmitter<DtoOutputUpdatePasswordEmployee>();

  @Output() employeeDeleted: EventEmitter<DtoOutputDeleteEmployee> = new EventEmitter<DtoOutputDeleteEmployee>();

  administrators: number = 0;
  directors: number = 0;

  selectedEmployee = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    if (changes.employees != null) {
      this.administrators = this.employees.filter(employee => employee.isAdmin).length;
      this.directors = this.employees.filter(employee => !employee.isAdmin).length;
    }
  }

  getDetail = () => {
    this.employee = this.employees.find(e =>
      e.idAccount == this.selectedEmployee
    );
    console.log(this.employee)
  }

  update(dto: DtoOutputUpdateEmployee) {
    this.selectedEmployee = 0;
    this.employeeUpdated.next({
      idAccount: dto.idAccount,
      firstName: dto.firstName,
      lastName: dto.lastName,

      email: dto.email,

//      street : dto.street,
//      number : dto.number,
//      postCode : dto.postCode,
//      city : dto.city,

      isAdmin : dto.isAdmin,

//      pictureURL: dto.pictureURL
    })
  }

  updatePassword(dto: DtoOutputUpdatePasswordEmployee){
    this.employeeUpdatedPassword.next({
      idAccount: dto.idAccount
    })
  }

  delete(dto: DtoOutputDeleteEmployee) {
    this.employees = this.employees.filter(e => e.idAccount != dto.idAccount);
    this.getDetail();
    this.employeeDeleted.next({
      idAccount: dto.idAccount
    })
  }
}
