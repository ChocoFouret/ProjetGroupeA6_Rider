import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DayPilot} from "daypilot-pro-angular";
import {environment} from "../../../../environments/environment";
import {DtoInputEvents} from "./dtos/dto-input-events";
import {DtoInputEmployee} from "../../../util/management/dtos/dto-input-employee";
import {ManagementService} from "../../../util/management/management.service";
import {DtoOutputDeleteEmployee} from "../../../util/management/dtos/dto-output-delete-employee";
import {DtoOutputUpdateEvents} from "./dtos/dto-output-update-events";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: any[] = [];
  private static readonly ENTRY_POINT = environment.apiUrlEvents;

  constructor(private _httpClient: HttpClient) {
  }

  create(dto: any): Observable<any>{
    const eventCreate = {
      "startDate": dto.start.toString().slice(0, 19),
      "endDate": dto.end.toString().slice(0, 19),
      "idEventsEmployee": 0,
      "idSchedule": 1,
      "idAccount": dto.resource,
      "idWork": null,
      "idAbsents": null,
      "idHolidays": null
    }
    console.log(eventCreate);
    return this._httpClient.post(`${EventService.ENTRY_POINT}/create/`, eventCreate)
  }

  delete(dto: DtoOutputUpdateEvents): Observable<any>{
    return this._httpClient.delete(`${EventService.ENTRY_POINT}/delete/` + dto)
  }

  fetchAll(): Observable<DtoInputEvents[]> {
    return this._httpClient.get<DtoInputEvents[]>(EventService.ENTRY_POINT + "/fetch/all");
  }

  fetchFromTo(id: number, from: DayPilot.Date, to: DayPilot.Date): Observable<DtoInputEvents[]> {
    return this._httpClient.get<DtoInputEvents[]>(EventService.ENTRY_POINT + "/fetch/" + id + "/" + from + "/" + to);
  }

  fetchAllEmployees(id: number): Observable<DtoInputEmployee[]> {
    return this._httpClient.get<DtoInputEmployee[]>(environment.apiUrlHas + "/fetchCompanies/" + id);
  }

  fetchEmployeeById(id: number): Observable<DtoInputEmployee> {
    return this._httpClient.get<DtoInputEmployee>(`${ManagementService.ENTRY_POINT}/fetch/${id}`);
  }

  update(dto: DtoOutputUpdateEvents): Observable<any> {
    return this._httpClient.put(EventService.ENTRY_POINT + "/update/", dto);
  }

}
