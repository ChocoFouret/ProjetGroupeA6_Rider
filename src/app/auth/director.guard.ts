import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class DirectorGuard implements CanActivate {
  constructor(private _serviceService: SessionService, private router: Router) { };

  // @ts-ignore
  async canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    await this._serviceService.isStatus().subscribe(key => {
      if(key.director){
        return key.director
      } else {
        this.router.navigate(['./connected/employee'])
        return false
      }
    })
  }

}
