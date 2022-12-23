import {Component, Input} from '@angular/core';
import {SessionService} from "../../session/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() function : string = ""
  @Input() home: boolean = true
  @Input() pageDirector: boolean = false
  isLogged: boolean = this._session.existCookie()

  constructor(public _session : SessionService) {
  }
}

