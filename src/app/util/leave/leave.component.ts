import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SessionService} from "../../session/session.service";
import {NotificationsService} from "../notifications/notifications.service";

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  constructor(private router: Router,
              private _session: SessionService,
              private _notification: NotificationsService) {}

  ngOnInit(): void {
    this._session.disconnect().subscribe(
      () => {
        this._notification.success("Déconnexion réussie");
        this.router.navigate(['./home'])
      }
    );
  }


}
