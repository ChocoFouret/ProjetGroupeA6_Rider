import {Component, OnInit} from '@angular/core';
import {EventService} from "./event.service";
import {DayPilot} from "daypilot-pro-angular";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  employees: any[] = [];
  employee: any;

  public events: DayPilot.EventData[] = [];
  public eventsEmployee: DayPilot.EventData[] = [];

  constructor(private ds: EventService) {
  }

  ngOnInit(): void {
    this.ds
      .fetchAllEmployees(2)
      .subscribe(employees => {
        for (let employee of employees) {
          this.employees.push({
            "name": employee['account'].lastName + ", " + employee['account'].firstName,
            "id": employee.idAccount,
            "resource": employee.idAccount
          });
        }
        this.employees.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name);
        });
        // this.employee = this.employees[0].id;
      })
  }

  loadEvents(from: DayPilot.Date, to: DayPilot.Date, idAccount: number) {
    console.log("loadEvents");
    let request = this.ds.fetchFromTo(this.ds.idSchedule, from, to);

    if(idAccount != 0) {
      this.eventsEmployee = [];
      request = this.ds.fetchFromToAccount(this.ds.idSchedule, idAccount, from, to)
    } else {
      this.events = [];
    }

    let tmp: any[] = [];

    request.subscribe(events => {
        for (let event of events) {
          tmp.push({
            types: event.types,
            eventTypes: event.eventTypes,
            barColor: event.eventTypes.barColor,
            start: event.startDate,
            end: event.endDate,
            id: event.idEventsEmployee,
            isValid: event.isValid,
            comments: event.comments,
            text: event.startDate.split("T")[1].slice(0, -3)
              + " - " +
              event.endDate.split("T")[1].slice(0, -3)
          });
          if(idAccount != 0) {
            tmp[tmp.length - 1]['employee'] = event.idAccount
          } else {
            tmp[tmp.length - 1]['resource'] = event.idAccount
          }
          if (!event.isValid) {
            tmp[tmp.length - 1].backColor = "#894f4f";
          }
          if (event.types != "Travail") {
            tmp[tmp.length - 1].text = event.types;
          }
        }
        if(idAccount != 0) {
          this.eventsEmployee = tmp;
        } else {
          this.events = tmp;
        }
      })
  }

  debug() {
    console.log(this.events);
  }

  updateEvent(dto: any) {
    this.ds.update(dto).subscribe();
  }
}
