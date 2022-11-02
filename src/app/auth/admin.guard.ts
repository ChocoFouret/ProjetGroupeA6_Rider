import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private _serviceService: SessionService, private router: Router) { };

  // @ts-ignore
  async canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    await this._serviceService.isStatus().subscribe(key => {
      if(key.admin){
        return key.admin
      } else {
        this.router.navigate(['./connected/director'])
        return false
      }
    })
  }

}
