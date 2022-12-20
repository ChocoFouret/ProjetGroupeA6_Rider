import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputProfil} from "./dtos/dto-input-profil";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private _httpClient : HttpClient) {


  }

  fetchProfil(id:number):Observable<DtoInputProfil>{
    return this._httpClient.get<DtoInputProfil>(environment.apiUrlAccount+"/fetch/profil/"+id);
  }
}
