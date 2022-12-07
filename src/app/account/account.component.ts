import { Component, OnInit } from '@angular/core';
import {SessionService} from "../session/session.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  // function: any = "employee"
  function: any = "director"


  constructor(private _session: SessionService) { }

  ngOnInit(): void {
    console.log("ID : " + this._session.getID());
  }

}
