import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DtoInputAnnouncements} from "./dtos/dto-input-announcements";
import {DtoOutputCreateAnnouncements} from "./dtos/dto-output-create-announcements";
import {DtoOutputUpdateAnnouncements} from "./dtos/dto-output-update-announcements";
import {DtoOutputDeleteAnnouncements} from "./dtos/dto-output-delete-announcements";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  private static readonly ENTRY_POINT = environment.apiUrlAnnouncements;

  constructor(private _httpClient: HttpClient) {
  }

  createAnnouncements(dto: DtoOutputCreateAnnouncements): Observable<DtoInputAnnouncements> {
    return this._httpClient.post<DtoInputAnnouncements>(`${AnnouncementsService.ENTRY_POINT}/create/`, {announcements: dto}, {withCredentials: true});
  }

  updateAnnouncements(dto: DtoOutputUpdateAnnouncements): Observable<any> {
    return this._httpClient.put(AnnouncementsService.ENTRY_POINT + "/update/", {announcements: dto}, {withCredentials: true});
  }

  deleteAnnouncements(dto: DtoOutputDeleteAnnouncements): Observable<any> {
    return this._httpClient.delete(`${AnnouncementsService.ENTRY_POINT}/delete/` + dto.idAnnouncements, {withCredentials: true});
  }

  fetchAnnouncementsById(id: number): Observable<DtoInputAnnouncements> {
    return this._httpClient.get<DtoInputAnnouncements>(AnnouncementsService.ENTRY_POINT + "/fetch/" + id, {withCredentials: true});
  }

  fetchByCompany(id: number): Observable<DtoInputAnnouncements[]> {
    return this._httpClient.get<DtoInputAnnouncements[]>(AnnouncementsService.ENTRY_POINT + "/fetchByCompany/" + id, {withCredentials: true});
  }

  fetchByFunction(idCompanies: number, idFunctions: number): Observable<DtoInputAnnouncements[]> {
    return this._httpClient.post<DtoInputAnnouncements[]>(AnnouncementsService.ENTRY_POINT + "/fetchByFunction/",
      {idCompanies: idCompanies, idFunctions: idFunctions, withCredentials: true});
  }
}
