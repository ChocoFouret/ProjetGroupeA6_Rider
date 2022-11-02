import {Component, Input, OnInit} from '@angular/core';
import {DtoInputEmployee} from "../dtos/dto-input-employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input()
  employees: DtoInputEmployee[]= [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
