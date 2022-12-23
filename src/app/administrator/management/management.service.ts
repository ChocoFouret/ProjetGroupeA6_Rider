import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputEmployee} from "./dtos/dto-input-employee";
import {DtoOutputUpdateEmployee} from "./dtos/dto-output-update-employee";
import {DtoOutputDeleteEmployee} from "./dtos/dto-output-delete-employee";
import {DtoOutputUpdateAddress} from "../../account/profil/dtos/dto-output-update-address";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  public static readonly ENTRY_POINT = environment.apiUrlAccount;
  public static readonly ENTRY_POINT_UPDATE_ADDRESS=environment.apiUrlAddress+"/update";
  constructor(private _httpClient: HttpClient) { }

  fetchFunction(id: number): Observable<any[]> {
    return this._httpClient.get<any[]>(environment.apiUrlHas + "/fetchAccount/" + id);
  }

  fetchCompany(id:number): Observable<any> {
    return this._httpClient.get<any>(environment.apiUrlCompanies + "/fetchById/" + id);
  }

  fetchAll(): Observable<DtoInputEmployee[]> {
    return this._httpClient.get<DtoInputEmployee[]>(ManagementService.ENTRY_POINT + "/fetch");
  }

  fetchById(id: number): Observable<DtoInputEmployee> {
    return this._httpClient.get<DtoInputEmployee>(`${ManagementService.ENTRY_POINT}/fetch/${id}`);
  }

  update(dto: DtoOutputUpdateEmployee): Observable<any>{
    return this._httpClient.put(`${ManagementService.ENTRY_POINT}/update`, dto, {withCredentials : true})
  }
  updateAddress(dto:DtoOutputUpdateAddress):Observable<any>{
    return this._httpClient.put(ManagementService.ENTRY_POINT_UPDATE_ADDRESS, {address:dto}, {
      withCredentials:true
    })
  }

  delete(dto: DtoOutputDeleteEmployee): Observable<any>{
    return this._httpClient.delete(`${ManagementService.ENTRY_POINT}/delete/` + dto.idAccount)
  }
}
