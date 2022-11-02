import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DtoInputEmployee} from "./dtos/dto-input-employee";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private static readonly ENTRY_POINT = environment.apiUrl + "account/find";
  constructor(private _httpClient: HttpClient) { }

  fetchAll(): Observable<DtoInputEmployee[]> {
    return this._httpClient.get<DtoInputEmployee[]>(EmployeesService.ENTRY_POINT);
  }

  fetchById(id: number): Observable<DtoInputEmployee> {
    return this._httpClient.get<DtoInputEmployee>(`${EmployeesService.ENTRY_POINT}/${id}`);
  }
}
