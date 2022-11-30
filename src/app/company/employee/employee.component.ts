import {Component, Input, OnInit} from '@angular/core';
import {CompanyComponent} from "../company.component";
import {DayPilot} from "daypilot-pro-angular";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() homePage: CompanyComponent | undefined;
  @Input() employees: any[] = [];
  @Input() employee: any;
  @Input() events: DayPilot.EventData[] = [];
  @Input() colors: any = {};

  constructor() {
  }

  ngOnInit(): void {

  }
}
