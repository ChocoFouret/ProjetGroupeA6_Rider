import {Component, OnInit} from '@angular/core';
import {EventService} from "./event.service";
import {DayPilot} from "daypilot-pro-angular";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {environment} from "../../environments/environment";
import {DtoInputEvents} from "./dtos/dto-input-events";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  employeesGroup: any[] = [];
  employees: any[] = [];
  employee: any;
  colors = {
    valid: "",
    notValid: "#fa8989",
    rowGroup: "#d0cec7",
    rowGroupWk: "#c2b2b2",
    rowEmployee: "",
    rowEmployeeWk: "#fddada",
    borderColor: "#ff0000"
  }
  e: DayPilot.EventData = {id: 0, start: "", end: "", text: "", resource: 0};
  copyE: DayPilot.EventData = {id: 0, start: "", end: "", text: "", employee: 0};
  show: boolean = true;
  events: DayPilot.EventData[] = [];
  eventsEmployee: DayPilot.EventData[] = [];
  private connection: HubConnection | undefined;

  constructor(private ds: EventService) {
  }

  initWebSocket() {
    this.connection = new HubConnectionBuilder()
      .withUrl(environment.apiUrlServer + '/EventHub')
      .build();

    this.connection.on('updated', (dto) => {
      this.localUpdate(dto);
    });

    this.connection.on('deleted', (id) => {
      this.localDelete(id);
    });

    this.connection.on('created', (dto) => {
      this.localCreate(dto);
    });

    this.connection.start().then(() => {
      console.log('Hub connection started');
    });
  }

  ngOnInit(): void {
    this.initWebSocket();

    this.ds
      .fetchAllEmployees(2)
      .subscribe(employees => {
        for (let employee of employees) {
          if (!(employee.idFunctions in this.employeesGroup)) {
            this.employeesGroup.push({
              "name": employee.function.title,
              "idGroup": employee.idFunctions,
              "expanded": true,
              "children": [{
                "name": employee['account'].lastName + ", " + employee['account'].firstName,
                "id": employee.idAccount,
                "resource": employee.idAccount
              }]
            });
          } else {
            this.employeesGroup[this.employeesGroup.findIndex((e: any) => e.idGroup === employee.idFunctions)].children.push({
              "name": employee['account'].lastName + ", " + employee['account'].firstName,
              "id": employee.idAccount,
              "resource": employee.idAccount
            });
          }
          this.employees.push({
            "name": employee['account'].lastName + ", " + employee['account'].firstName,
            "id": employee.idAccount,
            "resource": employee.idAccount
          });
        }
        this.employeesGroup.sort((a, b) => (a.idGroup > b.idGroup) ? 1 : -1);
        this.employees.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name);
        });
        // this.employee = this.employees[0].id;
      })
  }

  loadEvents(from: DayPilot.Date, to: DayPilot.Date, idAccount: number) {
    let request = this.ds.fetchFromTo(this.ds.idSchedule, from, to);

    if (idAccount != 0) {
      request = this.ds.fetchFromToAccount(this.ds.idSchedule, idAccount, from, to)
    }

    let tmp: any[] = [];
    request.subscribe(events => {
      if (idAccount != 0) {
        this.eventsEmployee = [];
      } else {
        this.events = [];
      }
      for (let event of events) {
        tmp.push({
          types: event.types,
          eventTypes: event.eventTypes,
          backColor: event.isValid ? this.colors.valid : this.colors.notValid,
          barColor: event.eventTypes.barColor,
          start: event.startDate,
          end: event.endDate,
          id: event.idEventsEmployee,
          isValid: event.isValid,
          comments: event.comments,
          text: event.types != "Travail" ? event.types : event.startDate.split("T")[1].slice(0, -3) + " - " + event.endDate.split("T")[1].slice(0, -3)
        });
        if (idAccount != 0) {
          tmp[tmp.length - 1]['employee'] = event.idAccount
        } else {
          tmp[tmp.length - 1]['resource'] = event.idAccount
        }
      }
      if (idAccount != 0) {
        this.eventsEmployee = tmp;
      } else {
        this.events = tmp;
      }
    })
  }

  localUpdate(dto: DtoInputEvents) {
    this.createE(dto);
    this.events = this.events.map((event: DayPilot.EventData) => {
      this.e.resource = dto.idAccount;
      if (event.id === this.e.id) {
        return this.e;
      } else {
        return event;
      }
    })

    this.eventsEmployee = this.eventsEmployee.map((event: DayPilot.EventData) => {
      this.copyE['employee'] = dto.idAccount;
      if (event.id === this.copyE.id) {
        return this.copyE;
      } else {
        return event;
      }
    })
  }

  updateEvent(dto: any) {
    this.ds.update(dto).subscribe();
  }

  private localDelete(id: any) {
    this.events = this.events.filter((event: DayPilot.EventData) => event.id !== id);
    this.eventsEmployee = this.eventsEmployee.filter((event: DayPilot.EventData) => event.id !== id);
  }

  private localCreate(dto: any) {
    this.ds.fetchById(dto.events.idEventsEmployee).subscribe(event => {
      this.createE(event);
      if (!this.events.map((e: any) => e.id).includes(this.e.id)) {
        this.e.resource = event.idAccount;
        this.events.push(this.e);
      } else {
        this.events = this.events.map((e: any) => {
          if (e.id === this.e.id) {
            this.e.resource = event.idAccount;
            return this.e;
          } else {
            return e;
          }
        })
      }
      if (this.employee == event.idAccount) {
        if (!this.events.map((e: any) => e.id).includes(this.e.id)) {
          this.copyE['employee'] = event.idAccount;
          this.eventsEmployee.push(this.copyE);
        }
      }
    })
  }

  createE(dto: any) {
    this.e = {
      id: dto.idEventsEmployee,
      start: dto.startDate,
      end: dto.endDate,
      text: dto.types != "Travail" ? dto.types : dto.startDate.split("T")[1].slice(0, -3) + " - " + dto.endDate.split("T")[1].slice(0, -3),
      backColor: dto.isValid ? this.colors.valid : this.colors.notValid,
      isValid: dto.isValid,
      comments: dto.comments,
      types: dto.types,
      barColor: dto.eventTypes.barColor,
      eventTypes: dto.eventTypes,
    }
    this.copyE = Object.assign({}, this.e);
  }
}
