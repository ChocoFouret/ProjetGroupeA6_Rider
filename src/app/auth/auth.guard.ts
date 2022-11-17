import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {SessionService} from "../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _serviceService: SessionService, private router: Router) { };

  // @ts-ignore
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if(this._serviceService.getFunction()=="False"){

        return true
      } else {
        this.router.navigate(['./login'])
        return false
      }
  }
}
