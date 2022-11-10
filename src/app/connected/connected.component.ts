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
    console.log(this._serviceService.getFunction())
  }

  ngOnInit(): void {
    this.menus()
  }

  // @ts-ignore
  menus() {
    if(this._serviceService.getFunction()=="Administrator")
    {
      this.isAdmin=true;
    }
    else if(this._serviceService.getFunction()=="Director")
    {
      this.isDirector=true;
    }
    /*this._serviceService.isStatus().subscribe(key => {
      this.isDirector = key.director
      this.isAdmin = key.admin
    })*/
  }
  getIsAdmin()
  {
    return this.isAdmin;
  }

}
