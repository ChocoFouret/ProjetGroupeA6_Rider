import {Component, OnInit} from '@angular/core';
import {DayPilot} from "daypilot-pro-angular";
import {CalendarComponent} from "../calendar.component";
import {DtoInputEventTypes} from "../../dtos/dto-input-eventTypes";
import {EventService} from "../../event.service";

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent implements OnInit {
  public formEventTypes: any[] = [];
  public component: CalendarComponent | null = null;
  public text: string = "link";
  public inputEventTypes: DtoInputEventTypes[] = [];
  public data: any;
  public form: any = [
    {name: "Type d'évènement", id: "types", type: "select", options: this.formEventTypes},
    {name: "Validé", id: "isValid", type: "checkbox"},
    {name: "Demandes", id: "comments", type: "text"},
    {name: "Du", id: "start", type: "datetime", dateFormat: "d-M-yyyy", timeFormat: "HH:mm"},
    {name: "Au", id: "end", type: "datetime", dateFormat: "d-M-yyyy", timeFormat: "HH:mm"}
  ];

  constructor(private es: EventService) {
  }

  ngOnInit(): void {
    this.es
      .fetchAllEventTypes()
      .subscribe((dto: DtoInputEventTypes[]) => {
        dto.forEach(eventType => {
          this.formEventTypes.push({
            name: eventType.types,
            id: eventType.types
          })
        })
      })
  }

  async click(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const modal = await DayPilot.Modal.form(this.form, this.data);
    if (modal.canceled) {
      return;
    }
    let backColor = "";
    let barColor = "";
    if (!modal.result.isValid) {
      backColor = "#894f4f";
    }

    this.inputEventTypes.forEach((inputEventType) => {
      if (inputEventType.types === modal.result.types) {
        barColor = inputEventType.barColor;
      }
    })

    if (modal.result.types == "Congé" || modal.result.types == "Vacances" || modal.result.types == "Absence") {
      modal.result.start = modal.result.start.toString().split("T")[0] + "T00:00:00";
      if (modal.result.start.toString().split("T")[0] == modal.result.end.toString().split("T")[0]) {
        modal.result.end = modal.result.end.addDays(1).toString().split("T")[0] + "T00:00:00";
      } else {
        modal.result.end = modal.result.end.toString().split("T")[0] + "T00:00:00";
      }
    }

    modal.result.barColor = barColor;
    modal.result.backColor = backColor;
    modal.result.startDate = modal.result.start;
    modal.result.endDate = modal.result.end;
    modal.result.idEventsEmployee = modal.result.id;
    modal.result.idAccount = modal.result.resource;
    modal.result.eventTypes = {};

    if (modal.result.start <= modal.result.end) {
      this.component?.update(modal.result);
    } else {
      alert("La date de début doit être inférieure à la date de fin.");
    }
  }
}

