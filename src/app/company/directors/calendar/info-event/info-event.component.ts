import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DayPilot} from "daypilot-pro-angular";
import {CalendarComponent} from "../calendar.component";

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  public component: CalendarComponent | null = null;
  public text: string = "link";
  public data: any;
  public idAccount: any;
  public form: any = [
    {name: "Du", id: "start", type: "datetime", dateFormat: "d-M-yyyy", timeFormat: "HH:mm"},
    {name: "Au", id: "end", type: "datetime", dateFormat: "d-M-yyyy", timeFormat: "HH:mm"}
  ];

  async click(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const modal = await DayPilot.Modal.form(this.form, this.data);
    if (modal.canceled) {
      return;
    }

    if(modal.result.start <= modal.result.end) {
      this.data = ({
        start: modal.result.start,
        end: modal.result.end,
        id: modal.result.id,
        resource: modal.result.resource,
      })
      this.component?.updateEvent(this.data);
    } else {
      alert("La date de début doit être inférieure à la date de fin.");
    }
  }
}
