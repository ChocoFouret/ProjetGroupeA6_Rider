import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputEmployee} from "../dtos/dto-input-employee";
import {DtoOutputUpdateEmployee} from "../dtos/dto-output-update-employee";
import {ActivatedRoute} from "@angular/router";
import {ManagementService} from "../management.service";
import {SessionService} from "../../../session/session.service";
import {DtoOutputDeleteEmployee} from "../dtos/dto-output-delete-employee";

@Component({
  selector: 'app-management-detail',
  templateUrl: './management-detail.component.html',
  styleUrls: ['./management-detail.component.css']
})
export class ManagementDetailComponent implements OnInit {
  @Input() employee: DtoInputEmployee | undefined;

  @Output() employeeUpdated: EventEmitter<DtoOutputUpdateEmployee> = new EventEmitter<DtoOutputUpdateEmployee>();

  @Output() employeeDeleted: EventEmitter<DtoOutputDeleteEmployee> = new EventEmitter<DtoOutputDeleteEmployee>();

  found: boolean = false;
  toggleEdit: boolean = false;
  isAdmin: boolean = false;
  alert : boolean = false;

  constructor(private _managementService: ManagementService,
              private _route: ActivatedRoute,
              private _serviceService: SessionService) {
    this.isAdmin = this._serviceService.isAdmin() == "True";
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
    this._managementService
      .fetchById(id)
      .subscribe(employee => this.employee = employee);
  }

  emitUpdate(dto: DtoInputEmployee) {
    this.employeeUpdated.next({
      idAccount: dto.idAccount,
      firstName: dto.firstName,
      lastName: dto.lastName,

      email: dto.email,
      phone : dto.phone,

      // street : dto.street,
      // number : dto.number,
      // postCode : dto.postCode,
      // city : dto.city,

      isAdmin: dto.isAdmin,
      pictureURL: dto.pictureURL
    })
  }

  emitDelete(dto: DtoInputEmployee) {
    this.employeeDeleted.next({
      idAccount: dto.idAccount
    })
  }

  confirmDelete() {
    this.alert = true;
  }

  emitChoose(choose : any) {
    if(choose){
      this.emitDelete(this.employee!);
    }
    this.alert = false;
  }
}
