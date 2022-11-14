import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputEmployee} from "../dtos/dto-input-employee";
import {DtoOutputUpdateEmployee} from "../dtos/dto-output-update-employee";
import {ActivatedRoute} from "@angular/router";
import {ManagementService} from "../management.service";
import {SessionService} from "../../../session/session.service";
import {DtoOutputDeleteEmployee} from "../dtos/dto-output-delete-employee";
import {DtoOutputUpdatePasswordEmployee} from "../dtos/dto-output-update-password-employee";

@Component({
  selector: 'app-management-detail',
  templateUrl: './management-detail.component.html',
  styleUrls: ['./management-detail.component.css']
})
export class ManagementDetailComponent implements OnInit {
  @Input() employee: DtoInputEmployee | undefined;

  @Output() employeeUpdated: EventEmitter<DtoOutputUpdateEmployee> = new EventEmitter<DtoOutputUpdateEmployee>();
  @Output() employeeUpdatedPassword: EventEmitter<DtoOutputUpdatePasswordEmployee> = new EventEmitter<DtoOutputUpdatePasswordEmployee>();

  @Output() employeeDeleted: EventEmitter<DtoOutputDeleteEmployee> = new EventEmitter<DtoOutputDeleteEmployee>();

  found: boolean = false;

  isLocked: boolean = true;

  isAdmin: boolean = false;

  constructor(private _employeeService: ManagementService,
              private _route: ActivatedRoute,
              private _serviceService: SessionService) {
    this.isAdmin = this._serviceService.getFunction() == 'Administrator';
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

      street : dto.street,
      number : dto.number,
      postCode : dto.postCode,
      city : dto.city,

      function: dto.function,
      isChief : dto.isChief,

      pictureURL: dto.pictureURL
    })
  }

  emitUpdatePassword(dto: DtoOutputUpdatePasswordEmployee){
    this.employeeUpdatedPassword.next({
      id: dto.id
    })
  }

  emitDelete(dto: DtoInputEmployee) {
    this.employeeDeleted.next({
      id: dto.id
    })
  }
}
