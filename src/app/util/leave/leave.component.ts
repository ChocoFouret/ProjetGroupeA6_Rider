import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    // Ne peut pas supprimer car HTTP Only
    // this.cookieService.delete("session");
    this.cookieService.delete("public");

    this.router.navigate(['./login'])
  }


}
