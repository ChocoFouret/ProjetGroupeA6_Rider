import { Component, OnInit } from '@angular/core';
import {DtoOutputLogin} from "./dtos/dto-output-login";
import {SessionService} from "./session.service";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  constructor(private _sessionService: SessionService) { }

  ngOnInit(): void {
  }

  login(dto: DtoOutputLogin) {
    this._sessionService.login(dto).subscribe(
      () => console.log(),
      error => console.error(error)
    );
  }
}
