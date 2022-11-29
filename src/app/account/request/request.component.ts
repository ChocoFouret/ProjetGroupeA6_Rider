import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreateEvents} from "../../company/dtos/dto-output-create-events";
import {DayPilot} from "daypilot-pro-angular";
import {SessionService} from "../../session/session.service";
import {DtoInputEvents} from "../../company/dtos/dto-input-events";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {EventService} from "../../company/event.service";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  // A CHANGER LORSQU'ON VA RECUPERER LES CALENDRIERS
  idSchedule: number = 1;
  request: DtoOutputCreateEvents | undefined;
  event: any;
  isVisibleForm : boolean = false;
  isVisibleList : boolean = false;

  form: FormGroup = new FormGroup({
    type: new FormControl("", Validators.required),
    raison: new FormControl("", Validators.required),
    datedebut: new FormControl("", Validators.required),
    datefin: new FormControl("", Validators.required),
  });

  constructor(private _session: SessionService,
              private _httpClient: HttpClient, private _requests : EventService) {
  }

  ngOnInit(): void {
    this._requests.fetchByEmployee(parseInt(this._session.getID())).subscribe(event =>{
      console.log(event)
      this.event=event
    })
  }

  send() {
    this.request = {
      startDate: this.form.value.datedebut,
      endDate: this.form.value.datefin,
      comments: this.form.value.raison,
      types: this.form.value.type,
      idEventsEmployee: DayPilot.guid(),
      idAccount: parseInt(this._session.getID()),
      idSchedule: this.idSchedule,
      isValid: false,
    }
    this.doRequest(this.request).subscribe()
  }

  doRequest(dto: DtoOutputCreateEvents) {
    return this._httpClient.post<DtoInputEvents>(environment.apiUrlEvents + "/create", {events: dto});
  }

  check() {
    if(this.form.invalid) return true;
    if (this.form.value.datefin > this.form.value.datedebut) {
      return false
    } else {
      return true
    }
  }

  visible(id:number){
    if(id ==  1){
      this.isVisibleForm =true
      this.isVisibleList = false;
    }
    if(id ==  2){
      this.isVisibleList =true
      this.isVisibleForm = false;
    }

  }


}
