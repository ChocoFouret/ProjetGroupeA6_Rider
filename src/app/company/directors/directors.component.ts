import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DayPilot} from "daypilot-pro-angular";
import {CompanyComponent} from "../company.component";

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent implements OnInit {
  @Input() homePage : CompanyComponent | undefined;
  @Input() employees: any[] = [];
  @Input() events: DayPilot.EventData[] = [];
  @Output() eventsChanges: EventEmitter<any> = new EventEmitter<any>();
  @Input() colors: any = {};

  constructor() {
  }

  ngOnInit(): void {
  }

  updateEvent(dto: any) {
    this.eventsChanges.next({
      idSchedule: dto.idSchedule,
      backColor: dto.backColor,
      barColor: dto.barColor,
      startDate: dto.startDate,
      endDate: dto.endDate,
      idEventsEmployee: dto.idEventsEmployee,
      idAccount: dto.idAccount,
      types: dto.types,
      isValid: dto.isValid,
      comments: dto.comments,
      eventTypes: dto.eventTypes,
    })
  }
}
