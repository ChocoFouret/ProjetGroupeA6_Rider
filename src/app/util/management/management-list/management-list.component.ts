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
      this.administrators = this.employees.filter(employee => employee.function === "Administrator").length;
      this.directors = this.employees.filter(employee => employee.function === "Director").length;
    }
  }

  getDetail = () => {
//    If datalist
//    let lastName = this.selectedEmployee.substring(0, this.selectedEmployee.indexOf(","));
//    let firstName = this.selectedEmployee.substring(this.selectedEmployee.indexOf(",") + 2);

    this.employee = this.employees.find(e =>
      e.id == this.selectedEmployee
    );
  }

  update(dto: DtoOutputUpdateEmployee) {
    this.selectedEmployee = 0;
    this.employeeUpdated.next({
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,

      email: dto.email,

      street : dto.street,
      number : dto.number,
      postCode : dto.postCode,
      city : dto.city,

      function: dto.function,
      isChief : dto.isChief,

      pictureURL: dto.pictureURL
    })
  }

  updatePassword(dto: DtoOutputUpdatePasswordEmployee){
    this.employeeUpdatedPassword.next({
      id: dto.id
    })
  }

  delete(dto: DtoOutputDeleteEmployee) {
    this.employees = this.employees.filter(e => e.id != dto.id);
    this.getDetail();
    this.employeeDeleted.next({
      id: dto.id
    })
  }
}
