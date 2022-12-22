import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoInputHas} from "./createCompanies/dtos/dto-input-has";
import {DtoOutputCreateHas} from "./dtos/dto-output-create-has";

@Injectable({
  providedIn: 'root'
})
export class HasService {

  private static readonly ENTRY_POINT_URL_HAS_CREATE=environment.apiUrlHas+"/create"

  constructor(private _httpClient: HttpClient) { }
  create(dto: DtoOutputCreateHas): Observable<DtoInputHas>{
    return  this._httpClient.post<DtoInputHas>(HasService.ENTRY_POINT_URL_HAS_CREATE, {has: dto}, {
      withCredentials: true
    });
  }
}
