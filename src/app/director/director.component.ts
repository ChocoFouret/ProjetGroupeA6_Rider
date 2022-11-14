import {Component, OnInit} from '@angular/core';
import {ManagementService} from "../util/management/management.service";

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

    constructor(private _employeesService: ManagementService) {
    }

    ngOnInit(): void {
    }

}
