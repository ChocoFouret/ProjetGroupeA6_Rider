import {Component, OnInit} from '@angular/core';
import {SessionService} from "../session/session.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public _session: SessionService) {
  }

  ngOnInit(): void {
  }

}
