import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, of} from "rxjs";
import {DtoOutputLogin} from "./dtos/dto-output-login";
import * as jwt from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  // Entries from C#
  private static readonly ENTRY_POINT_URL = environment.apiUrl

  constructor(private _httpClient: HttpClient) {
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

  private DecodeToken(token: string): string {
    return jwt.default(token);
  }

  getFunction():string{
    let cookie = this.DecodeToken(this.getCookie("role"));
    let result = Object.entries(cookie);
    console.log(result[0][1])
    return(result[0][1]);
  }
}
