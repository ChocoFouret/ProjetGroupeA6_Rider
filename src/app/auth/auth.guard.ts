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
    await this._serviceService.isLogged().subscribe(key => {
      if(key.ok){
        return key.ok
      } else {
        this.router.navigate(['./login'])
        return false
      }
    })
  }
}
