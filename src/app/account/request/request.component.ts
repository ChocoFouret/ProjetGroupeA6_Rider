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
  idCompanies: number = this._session.getCompanies();
  request: DtoOutputCreateEvents | undefined;
  event: any;
  isVisibleForm: boolean = false;
  isVisibleList: boolean = false;
  isVisibleNotice: boolean = false;

  form: FormGroup = new FormGroup({
    type: new FormControl("", Validators.required),
    comments: new FormControl("", Validators.required),
    startDate: new FormControl("", [
      Validators.required
    ]),
    endDate: new FormControl("", [
      Validators.required
    ]),
  });

  constructor(private _session: SessionService,
              private _httpClient: HttpClient,
              private _requests: EventService) {
  }

  ngOnInit(): void {
    this._requests.fetchByEmployee(this._session.getID()).subscribe(event => {
      this.event = event
      this.event = this.event.filter((event: any) => event.types != "Travail")
    })
  }

  send() {
    if (!this.form.invalid) {
      this.request = {
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
        comments: this.form.value.comments,
        types: this.form.value.type,
        idEventsEmployee: DayPilot.guid(),
        idAccount: this._session.getID(),
        idCompanies: this.idCompanies,
        isValid: false,
      }
      this.doRequest(this.request).subscribe()
      this.isVisibleNotice = true
      this.form.reset()
      this.event.push(this.request)
    }
  }

  doRequest(dto: DtoOutputCreateEvents) {
    return this._httpClient.post<DtoInputEvents>(environment.apiUrlEvents + "/create/" + this.idCompanies, {events: dto});
  }

  visible(id: number) {
    if (id == 1) {
      this.isVisibleForm = true
      this.isVisibleList = false;
    } else if (id == 2) {
      this.isVisibleForm = false;
      this.isVisibleList = true;
      this.isVisibleNotice = false;
    }
  }

  dateChooseValidators() {
    let startDate = this.form.value.startDate;
    let endDate = this.form.value.endDate;
    if (startDate > endDate) {
      this.form.controls['startDate'].setErrors({invalid: true});
    } else if (startDate <= endDate) {
      this.form.controls['startDate'].setErrors(null);
    }
    return null;
  }
}
