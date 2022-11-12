import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputEmployee} from "./dtos/dto-input-employee";
import {DtoOutputUpdateEmployee} from "./dtos/dto-output-update-employee";

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  private static readonly ENTRY_POINT = environment.apiUrl;
  constructor(private _httpClient: HttpClient) { }

  fetchAll(): Observable<DtoInputEmployee[]> {
    return this._httpClient.get<DtoInputEmployee[]>(ManagementService.ENTRY_POINT + "/fetch");
  }

  fetchById(id: number): Observable<DtoInputEmployee> {
    return this._httpClient.get<DtoInputEmployee>(`${ManagementService.ENTRY_POINT}/fetch/${id}`);
  }

  update(dto: DtoOutputUpdateEmployee): Observable<any>{
    return this._httpClient.put(`${ManagementService.ENTRY_POINT}/update`, dto)
  }
}
