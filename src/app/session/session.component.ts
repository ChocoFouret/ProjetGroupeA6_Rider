import { Component, OnInit } from '@angular/core';
import {DtoOutputLogin} from "./dtos/dto-output-login";
import {SessionService} from "./session.service";
import {Router} from "@angular/router";
import {NotificationsService} from "../util/notifications/notifications.service";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  error : boolean = false;
  constructor(private _sessionService: SessionService,
              private router: Router,
              private _notification: NotificationsService) { }

  ngOnInit(): void {
  }

  login(dto: DtoOutputLogin) {
    this._sessionService.login(dto).subscribe(
      () => {
        this._notification.success("Connexion réussie");
        this.router.navigate(['account'])
      },
      () => {
        this._notification.error("Connexion échouée");
        this.error = true
      }
    );
  }
}
