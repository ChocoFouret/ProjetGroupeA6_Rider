import {Injectable} from '@angular/core';
import {DtoOutputCreateCompanies} from "./createCompanies/dtos/dto-output-create-companies";
import {Observable} from "rxjs";
import {DtoInputCompanies} from "./createCompanies/dtos/dto-input-companies";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DtoOutputJoin} from "./createCompanies/dtos/dto-output-join";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private static readonly ENTRY_POINT_URL_COMPANIES_CREATE=environment.apiUrlCompanies + "/create";
  private static readonly ENTRY_POINT_URL_JOIN_COMPANIE=environment.apiUrlCompanies+"/join";
  private static readonly ENTRY_POINT_URL_FETCH_COMPANIE_BY_NAME=environment.apiUrlCompanies+"/fetchByName/";

  constructor(private _httpClient: HttpClient) { }

  create(dto: DtoOutputCreateCompanies): Observable<DtoInputCompanies>{
    return this._httpClient.post<DtoInputCompanies>(CompanyService.ENTRY_POINT_URL_COMPANIES_CREATE, {companie: dto} ,
      {
        withCredentials: true
      });
  }
  join(dto:DtoOutputJoin):Observable<any>{
    return this._httpClient.post(CompanyService.ENTRY_POINT_URL_JOIN_COMPANIE, {
      "name": dto.name,
      "password": dto.password},
      {
      withCredentials:true
    });
  }
  fetchByName(name:string):Observable<any>{
    return this._httpClient.get<DtoInputCompanies>(CompanyService.ENTRY_POINT_URL_FETCH_COMPANIE_BY_NAME+name);
  }
}
