import {Component, OnInit} from '@angular/core';
import {EmployeesService} from "./employees.service";

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

    constructor(private _employeesService: EmployeesService) {
    }

    ngOnInit(): void {
    }

}
