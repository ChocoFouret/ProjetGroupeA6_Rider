import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DtoInputCompany} from "./dtos/dto-input-company";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManagementCompaniesService {
  public static readonly ENTRY_POINT = environment.apiUrlCompanies;
  constructor(private _httpClient: HttpClient) { }

  fetchAll(): Observable<DtoInputCompany[]> {
    return this._httpClient.get<DtoInputCompany[]>(ManagementCompaniesService.ENTRY_POINT + "/fetch");
  }
}
