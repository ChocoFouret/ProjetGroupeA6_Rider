import { Component, OnInit } from '@angular/core';
import {DayPilot} from "daypilot-pro-angular";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  config: DayPilot.SchedulerConfig = {
    timeHeaders: [
      { groupBy: "Month", format: "MMMM yyyy" },
      { groupBy: "Day", format: "d" }
    ],
    scale: "Day"
  }

}
