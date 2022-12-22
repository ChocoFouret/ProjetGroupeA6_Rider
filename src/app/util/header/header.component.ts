import {Component, Input} from '@angular/core';
import {SessionService} from "../../session/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() function : string = ""
  @Input() isAdmin : boolean = false
  isLogged: boolean = this._session.existCookie("public");
  @Input() home: boolean = true;

  constructor(private _session : SessionService) {
  }
}

