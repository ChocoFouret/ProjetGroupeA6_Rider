import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from "../session/session.service";
import {Observable} from "rxjs";
import {DtoInputHas} from "../company/createCompanies/dtos/dto-input-has";
import {CompanyService} from "../company/company.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private _session: SessionService) {
  }

  ngOnInit(): void {

  }

}
