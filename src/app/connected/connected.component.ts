import {Component, OnInit} from '@angular/core';
import {SessionService} from "../session/session.service";

@Component({
  selector: 'app-connected',
  templateUrl: './connected.component.html',
  styleUrls: ['./connected.component.css']
})
export class ConnectedComponent implements OnInit {
  isDirector: boolean = false;
  isAdmin: boolean = false;


  constructor(private _serviceService: SessionService) {
  }

  ngOnInit(): void {
    this.menus()
  }

  // @ts-ignore
  menus() {
    this._serviceService.isStatus().subscribe(key => {
      this.isDirector = key.director
      this.isAdmin = key.admin
    })
  }

}
