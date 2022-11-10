import {Component, OnInit} from '@angular/core';
import {DtoInputEmployee} from "./dtos/dto-input-employee";
import {EmployeesService} from "./employees.service";
import {DtoOutputUpdateEmployee} from "./dtos/dto-output-update-employee";

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {
  employees: DtoInputEmployee[] = [];

  constructor(private _employeesService: EmployeesService) {
  }

  ngOnInit(): void {
    this.fetchAll()
  }

  private fetchAll() {
    this._employeesService
      .fetchAll()
      .subscribe(employees => this.employees = employees)
  }

  update(dto: DtoOutputUpdateEmployee) {
    this._employeesService
      .update(dto)
      .subscribe();
  }
}
