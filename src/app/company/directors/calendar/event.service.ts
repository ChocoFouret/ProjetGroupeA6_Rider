import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DayPilot} from "daypilot-pro-angular";
import {environment} from "../../../../environments/environment";
import {DtoInputEvents} from "./dtos/dto-input-events";
import {ManagementService} from "../../../util/management/management.service";
import {DtoOutputUpdateEvents} from "./dtos/dto-output-update-events";
import {DtoOutputCreateEvents} from "./dtos/dto-output-create-events";
import {DtoInputEmployee} from "../../../util/management/dtos/dto-input-employee";
import {DtoOutputDeleteEvents} from "./dtos/dto-output-delete-events";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  events: any[] = [];
  private static readonly ENTRY_POINT = environment.apiUrlEvents;

  constructor(private _httpClient: HttpClient) {
  }

  create(dto: DtoOutputCreateEvents): Observable<DtoInputEvents>{
    return this._httpClient.post<DtoInputEvents>(`${EventService.ENTRY_POINT}/create`, dto);
  }

  delete(dto: DtoOutputDeleteEvents): Observable<any>{
    return this._httpClient.delete(`${EventService.ENTRY_POINT}/delete/` + dto.idEventsEmployee);
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
