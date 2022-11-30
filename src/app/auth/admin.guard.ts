import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _serviceService: SessionService, private router: Router) { };

  // @ts-ignore
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this._serviceService.getFunction()=="True"){
      return true;
    } else {
      this.router.navigate(['./employee'])
      return false
    }
  }

}
