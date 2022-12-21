import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputProfil} from "./dtos/dto-input-profil";
import {environment} from "../../../environments/environment";
import {DtoOutputUpdateEmployee} from "../../administrator/management/dtos/dto-output-update-employee";
import {ManagementService} from "../../administrator/management/management.service";
import {SessionService} from "../../session/session.service";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private _httpClient: HttpClient,
              private _management: ManagementService,
              private _session: SessionService) {
  }

  fetchProfil(id: number): Observable<DtoInputProfil> {
    return this._httpClient.get<DtoInputProfil>(environment.apiUrlAccount + "/fetch/profil/" + id);
  }

  updateProfil(dto: DtoInputProfil) {
    let dtoUpdate: DtoOutputUpdateEmployee = {
      email: dto.email,
      firstName: dto.firstName,
      idAccount: this._session.getID(),
      isAdmin: null,
      phone: dto.phone,
      lastName: dto.lastName,
      pictureURL: dto.pictureURL
    }
    return this._management.update(dtoUpdate).subscribe();
  }
}
