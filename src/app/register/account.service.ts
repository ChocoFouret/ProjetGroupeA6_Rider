import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoOutputCreateAccount} from "./dtos/dto-output-create-account";
import {DtoInputAccount} from "./dtos/dto-input-account";
import {DtoOutputCreateAddress} from "./dtos/dto-output-create-address";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private static readonly ENTRY_POINT_URL_ACCOUNT_CREATE=environment.apiUrlAccount+"/create";
  private static readonly ENTRY_POINT_URL_ADDRESS_CREATE=environment.apiUrlAddress+"/create";

  constructor(private _httpClient: HttpClient) { }
  create(dto: DtoOutputCreateAccount, confirmPassword:string): Observable<DtoInputAccount>{
    return this._httpClient.post<DtoInputAccount>(AccountService.ENTRY_POINT_URL_ACCOUNT_CREATE+"/"+confirmPassword, {account: dto},
      {
        withCredentials: true
      });
  }
  createAddress(dto:DtoOutputCreateAddress):Observable<any>{
    return this._httpClient.post(AccountService.ENTRY_POINT_URL_ADDRESS_CREATE, {address: dto},
      {
        withCredentials: true
      });
  }
}
