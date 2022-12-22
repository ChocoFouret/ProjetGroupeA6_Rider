import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputLogin} from "./dtos/dto-output-login";
import * as jwt from "jwt-decode";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // Entries from C#
  private static readonly ENTRY_POINT_URL = environment.apiUrlAccount

  constructor(private _httpClient: HttpClient,
              private cookieService: CookieService) {
  }

  // Create session
  login(dto: DtoOutputLogin): Observable<any> {
    return this._httpClient.post(
      SessionService.ENTRY_POINT_URL + "/login",
      {
        "email": dto.email,
        "password": dto.password
      },
      {
        withCredentials: true
      })
  }

  disconnect() {
    return this._httpClient.post(SessionService.ENTRY_POINT_URL + "/disconnect", {}, {withCredentials: true})
  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  existCookie(): boolean {
    return this.cookieService.get("public") != ""
  }

  private DecodeToken(token: string): string {
    return jwt.default(token);
  }

  isAdmin(): string {
    let cookie = this.DecodeToken(this.getCookie("public"));
    let result = Object.entries(cookie);
    return result[1][1];
  }

  getID(): number {

    let cookie = this.DecodeToken(this.getCookie("public"));
    let result = Object.entries(cookie);

    return (parseInt(result[0][1].toString()));
  }

  getCompanies(): number {
    let cookie = this.DecodeToken(this.getCookie("public"));
    let result = Object.entries(cookie);
    return (parseInt(result[2][1].toString()));
  }

  getFunction(): string {
    let cookie = this.DecodeToken(this.getCookie("public"));
    let result = Object.entries(cookie);
    return result[3][1];
  }
}
