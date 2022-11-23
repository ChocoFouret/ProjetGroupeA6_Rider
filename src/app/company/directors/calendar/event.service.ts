import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DayPilot} from "daypilot-pro-angular";
import {environment} from "../../../../environments/environment";
import {DtoInputEvents} from "./dtos/dto-input-events";
import {DtoInputEmployee} from "../../../util/management/dtos/dto-input-employee";
import {ManagementService} from "../../../util/management/management.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: any[] = [];
  private static readonly ENTRY_POINT = environment.apiUrlEvents;

  constructor(private _httpClient: HttpClient) {
  }

  fetchAll(): Observable<DtoInputEvents[]> {
    return this._httpClient.get<DtoInputEvents[]>(EventService.ENTRY_POINT + "/fetch/all");
  }

  fetchFromTo(from: DayPilot.Date, to: DayPilot.Date): Observable<DtoInputEvents[]> {
    return this._httpClient.get<DtoInputEvents[]>(EventService.ENTRY_POINT + "/fetch/" + from + "/" + to);
  }

  fetchAllEmployees(id: number): Observable<DtoInputEmployee[]> {
    return this._httpClient.get<DtoInputEmployee[]>(environment.apiUrlHas + "/fetchCompanies/" + id);
  }

  fetchEmployeeById(id: number): Observable<DtoInputEmployee> {
    return this._httpClient.get<DtoInputEmployee>(`${ManagementService.ENTRY_POINT}/fetch/${id}`);
  }

}
