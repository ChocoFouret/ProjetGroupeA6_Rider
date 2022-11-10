import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DtoInputEmployee} from "./dtos/dto-input-employee";
import {Observable} from "rxjs";
import {DtoOutputUpdateEmployee} from "./dtos/dto-output-update-employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private static readonly ENTRY_POINT = environment.apiUrl;
  constructor(private _httpClient: HttpClient) { }

  fetchAll(): Observable<DtoInputEmployee[]> {
    return this._httpClient.get<DtoInputEmployee[]>(EmployeesService.ENTRY_POINT + "/fetch");
  }

  fetchById(id: number): Observable<DtoInputEmployee> {
    return this._httpClient.get<DtoInputEmployee>(`${EmployeesService.ENTRY_POINT}/fetch/${id}`);
  }

  update(dto: DtoOutputUpdateEmployee): Observable<any>{
    return this._httpClient.put(`${EmployeesService.ENTRY_POINT}/update`, dto)
  }
}
