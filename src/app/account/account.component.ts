import { Component, OnInit } from '@angular/core';
import {SessionService} from "../session/session.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  function: string = this._session.getFunction();

  constructor(private _session: SessionService) {
  }

  ngOnInit(): void { }

}
