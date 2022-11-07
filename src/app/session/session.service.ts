import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable, of} from "rxjs";
import {DtoOutputLogin} from "./dtos/dto-output-login";

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

  // Check if is logged
  isStatus(): Observable<any> {
    return this._httpClient
      .get(
        SessionService.ENTRY_POINT_URL + "/is/login",
        {withCredentials: true})
      .pipe(
        catchError(
          error => {
            return of(error)
          })
      )
  }
}
