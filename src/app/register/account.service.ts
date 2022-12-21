import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateAccount} from "./dtos/dto-output-create-account";
import {DtoInputAccount} from "./dtos/dto-input-account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private static readonly ENTRY_POINT_URL_ACCOUNT_CREATE=environment.apiUrlAccount+"/create";

  constructor(private _httpClient: HttpClient) { }
  create(dto: DtoOutputCreateAccount): Observable<DtoInputAccount>{
    return this._httpClient.post<DtoInputAccount>(AccountService.ENTRY_POINT_URL_ACCOUNT_CREATE, {account: dto},
      {
        withCredentials: true
      });
    //return this._httpClient.post<DtoInputAccount>(AccountService.ENTRY_POINT_URL_ACCOUNT_LOGIN, {account: dto} );
  }
}
