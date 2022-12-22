import {Component, Input} from '@angular/core';
import {SessionService} from "../../session/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() function : string = ""
  isLogged: boolean = this._session.existCookie();
  @Input() home: boolean = true;

  constructor(public _session : SessionService) {
  }
}

