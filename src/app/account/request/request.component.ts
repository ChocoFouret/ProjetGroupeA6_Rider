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
  isVisibleForm: boolean = false;
  isVisibleList: boolean = true;
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
  localDelete(id: string) {
    this.events = this.events.filter((event: any) => event.idEventsEmployee != id)
  }

  // Method for creating events. (WebSocket)
  localCreate(dto: any) {
    if(!this.events.includes(dto.events.idEventsEmployee)){
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
        types: this.form.value.type,
        idEventsEmployee: DayPilot.guid(),
        idAccount: this._session.getID(),
        idCompanies: this.idCompanies,
        isValid: false,
      }
      if (this.event.id != null) {
        this.request.idEventsEmployee = this.event.id;
        this.doUpdate(this.request);
      } else {
        this.doRequest(this.request);
        this.events.push(this.request);
      }
      this.isVisibleNotice = true
      this.form.reset()
    }
  }

  // Sends the event to the service.
  doRequest(dto: DtoOutputCreateEvents) {
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

      this.loadEvents();
    });
  }

  // Change the visibility of the divs
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

  // Change view
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
