import { Component, OnInit } from '@angular/core';
import {DtoOutputLogin} from "./dtos/dto-output-login";
import {SessionService} from "./session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  constructor(private _sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
  }

  login(dto: DtoOutputLogin) {
    this._sessionService.login(dto).subscribe(
      () => this.router.navigate(['connected']),
      error => console.error(error)
    );
  }
}
