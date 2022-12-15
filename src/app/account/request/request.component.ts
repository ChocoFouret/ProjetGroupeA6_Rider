import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreateEvents} from "../../company/dtos/dto-output-create-events";
import {DayPilot} from "daypilot-pro-angular";
import {SessionService} from "../../session/session.service";
import {DtoInputEvents} from "../../company/dtos/dto-input-events";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {EventService} from "../../company/event.service";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  idCompanies: number = this._session.getCompanies();
  request: DtoOutputCreateEvents | undefined;
  event: any;
  events: any;
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
              private _requests: EventService,
              private toastr: ToastrService) {
  }

  success(arg:string) { this.toastr.success(arg, 'Succès') }
  error(arg:string) { this.toastr.error(arg, 'Erreur') }
  info(arg:string) { this.toastr.info(arg, 'Information'); }
  warning(arg:string) { this.toastr.warning(arg, 'Attention'); }

  ngOnInit(): void {
    this._requests.fetchByEmployee(this._session.getID()).subscribe(event => {
      this.events = event;
      this.events = this.events.filter((event: any) => event.types != "Travail")
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
      if (this.event.id != null) {
        this.request.idEventsEmployee = this.event.id;
        this.doUpdate(this.request).subscribe()
      } else {
        this.doRequest(this.request).subscribe()
        this.events.push(this.request)
      }
      this.isVisibleNotice = true
      this.form.reset()
    }
  }

  doRequest(dto: DtoOutputCreateEvents) {
    this.success("Demande envoyée");
    return this._httpClient.post<DtoInputEvents>(environment.apiUrlEvents + "/create/" + this.idCompanies, {events: dto});
  }

  doUpdate(dto: DtoOutputCreateEvents) {
    this.success("Demande modifiée");
    this.events.find((event: any) => event.idEventsEmployee == dto.idEventsEmployee).startDate = dto.startDate;
    this.events.find((event: any) => event.idEventsEmployee == dto.idEventsEmployee).endDate = dto.endDate;
    this.events.find((event: any) => event.idEventsEmployee == dto.idEventsEmployee).comments = dto.comments;
    this.events.find((event: any) => event.idEventsEmployee == dto.idEventsEmployee).types = dto.types;
    return this._httpClient.put(environment.apiUrlEvents + "/update/" + this.idCompanies, dto);
  }

  visible(id: number) {
    if (id == 1) {
      this.isVisibleForm = true
      this.isVisibleList = false;

      this.event = {
        id: null,
        startDate: "",
        endDate: "",
        comments: "",
        type: ""
      }

      this.changeForm(this.event);

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

  edit(id: string) {
    let event = this.events.find((event: any) => event.idEventsEmployee == id)
    this.event = {
      id: event.idEventsEmployee,
      startDate: event.startDate,
      endDate: event.endDate,
      comments: event.comments,
      type: event.types
    }
    this.changeForm(this.event);

    this.isVisibleForm = true
    this.isVisibleList = false;
  }

  changeForm(event: any) {
    this.form.setValue({
      startDate: event.startDate,
      endDate: event.endDate,
      comments: event.comments,
      type: event.type
    })
    this.form.controls['type'].setValue(event.type);
  }
}
