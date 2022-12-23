import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreateEvents} from "../../company/dtos/dto-output-create-events";
import {DayPilot} from "daypilot-pro-angular";
import {SessionService} from "../../session/session.service";
import {HttpClient} from "@angular/common/http";
import {EventService} from "../../company/event.service";
import {WebsocketService} from "../../hubs/websocket.service";

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
  eventDelete: any;
  isVisibleForm: boolean = false;
  isVisibleList: boolean = true;
  isVisibleNotice: boolean = false;
  alert: boolean = false;

  form: FormGroup = new FormGroup({
    types: new FormControl("", Validators.required),
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
              private wb: WebsocketService,
              private _requests: EventService) {
  }

  ngOnInit(): void {
    this.wb.init(this);
    this.loadEvents();
  }

  loadEvents() {
    this.events = [];
    this._requests.fetchByEmployee(this._session.getID()).subscribe(event => {
      this.events = event;
      this.events = this.events.filter((event: any) => event.types != "Travail")
    })
  }

  // Method for updating events. (WebSocket)
  localUpdate(dto: any) {
    this.events.forEach((event: any) => {
      if (event.idEventsEmployee == dto.idEventsEmployee) {
        event.startDate = dto.startDate;
        event.endDate = dto.endDate;
        event.comments = dto.comments;
        event.types = dto.types;
      }
    });
  }

  // Method for deleting events. (WebSocket)
  localDelete(idEventsEmployee: string) {
    this.events = this.events.filter((event: any) => event.idEventsEmployee != idEventsEmployee)
  }

  // Method for creating events. (WebSocket)
  localCreate(dto: any) {
    if (!this.events.includes(dto.events.idEventsEmployee)) {
      this.event = {
        idEventsEmployee: dto.events.idEventsEmployee,
        startDate: dto.events.startDate,
        endDate: dto.events.endDate,
        comments: dto.events.comments,
        types: dto.events.types,
      }
      this.events.push(this.event);
      this.event = null;
    }
  }

  // Method for sending events
  send() {
    if (!this.form.invalid) {
      this.request = {
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
        comments: this.form.value.comments,
        types: this.form.value.types,
        idEventsEmployee: DayPilot.guid(),
        idAccount: this._session.getID(),
        idCompanies: this.idCompanies,
        isValid: false,
      }
      if (this.event.idEventsEmployee != null) {
        this.request.idEventsEmployee = this.event.idEventsEmployee;
        this.doUpdate(this.request);
      } else {
        this.doRequest(this.request);
      }
      this.isVisibleNotice = true
      this.form.reset()
    }
  }

  // Sends the event to the service.
  doRequest(dto: DtoOutputCreateEvents) {
    this.visible(2)
    this._requests.createEvent(dto, dto.idCompanies.toString()).subscribe();
  }

  // Sends the event to the service.
  doUpdate(dto: DtoOutputCreateEvents) {
    this.visible(2)
    this._requests.fetchEventById(dto.idEventsEmployee).subscribe(event => {
      this.event = event;
      this.event.startDate = dto.startDate;
      this.event.endDate = dto.endDate;
      this.event.comments = dto.comments;
      this.event.types = dto.types;
      this._requests.updateEvent(this.event, this.event.idCompanies.toString()).subscribe();
    });
  }

  // Change the visibility of the divs
  visible(idEventsEmployee: number) {
    if (idEventsEmployee == 1) {
      this.isVisibleForm = true
      this.isVisibleList = false;
      this.event = {
        idEventsEmployee: null,
        startDate: "",
        endDate: "",
        comments: "",
        types: ""
      }
      this.changeForm(this.event);
    } else if (idEventsEmployee == 2) {
      this.isVisibleForm = false;
      this.isVisibleList = true;
      this.isVisibleNotice = false;
    }
  }

  // Checking dates
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

  // Allows to update an event (displays it in the form)
  edit(idEventsEmployee: string) {
    let event = this.events.find((event: any) => event.idEventsEmployee == idEventsEmployee)
    this.event = {
      idEventsEmployee: event.idEventsEmployee,
      startDate: event.startDate,
      endDate: event.endDate,
      comments: event.comments,
      types: event.types
    }
    this.changeForm(this.event);

    this.isVisibleForm = true
    this.isVisibleList = false;
  }

  // Change view
  changeForm(event: any) {
    this.form.setValue({
      startDate: event.startDate,
      endDate: event.endDate,
      comments: event.comments,
      types: event.types
    })
  }

  emitChoose(choose: any) {
    if (choose) {
      this._requests.deleteEvent(this.eventDelete, this.idCompanies.toString()).subscribe();
    }
    this.alert = false;
  }

  confirmDelete(idEventsEmployee: string) {
    this.eventDelete = this.events.find((event: any) => event.idEventsEmployee == idEventsEmployee);
    this.alert = true;
  }
}
