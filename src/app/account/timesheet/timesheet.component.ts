import {Component, OnInit, ViewChild} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {DtoInputEventTypes} from "../../company/dtos/dto-input-eventTypes";
import {EventService} from "../../company/event.service";
import {WebsocketService} from "../../hubs/websocket.service";
import {DtoInputEvents} from "../../company/dtos/dto-input-events";
import {SessionService} from "../../session/session.service";

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  idCompanies: number = this._session.getCompanies();
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
  month: string = "";
  monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  e: DayPilot.EventData = {id: 0, start: "", end: "", text: "", employee: 0};
  eventsEmployee: DayPilot.EventData[] = [];

  @ViewChild('timesheet')
  timesheet!: DayPilotSchedulerComponent;
  eventTypes: DtoInputEventTypes[] = [];

  config: DayPilot.SchedulerConfig = {
    locale: "fr-be",
    onBeforeRowHeaderRender: (args) => {
      args.row.horizontalAlignment = "center";
    },
    cellWidthSpec: "Auto",
    cellWidthMin: 20,
    crosshairType: "Header",
//    autoScroll: "Always",
    timeHeaders: [
      {
        "groupBy": "Hour"
      }
    ],
    scale: "Hour",
    days: DayPilot.Date.today().daysInMonth(),
    viewType: "Days",
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    showNonBusiness: true,
    businessBeginsHour: 3,
    businessEndsHour: 22,
    businessWeekends: false,
    floatingEvents: true,
    eventHeight: 30,
    eventMovingStartEndEnabled: false,
    eventResizingStartEndEnabled: false,
    timeRangeSelectingStartEndEnabled: false,
    groupConcurrentEvents: false,
    eventStackingLineHeight: 100,
    allowEventOverlap: true,
    timeRangeSelectedHandling: "Disabled",
    eventMoveHandling: "Disabled",
    eventResizeHandling: "Disabled",
    eventDeleteHandling: "Disabled",
    eventClickHandling: "Disabled",
    eventHoverHandling: "Disabled"
  };

  previous(): void {
    this.config.startDate = new DayPilot.Date(this.config.startDate).addMonths(-1);
    this.config.days = this.config.startDate.daysInMonth();
    this.schedulerViewChanged();
  }

  next(): void {
    this.config.startDate = new DayPilot.Date(this.config.startDate).addMonths(1);
    this.config.days = this.config.startDate.daysInMonth();
    this.schedulerViewChanged();
  }

  schedulerViewChanged() {
    const from = new DayPilot.Date(this.config.startDate);
    const to = new DayPilot.Date(this.config.startDate).addMonths(1);
    this.loadEvents(from, to, this.employee, this.idCompanies);
    this.month = this.monthNames[new DayPilot.Date(this.config.startDate).getMonth()];
  }

  constructor(private es: EventService,
              private wb: WebsocketService,
              private _session: SessionService) {
  }

  employeeSelected() {
    const from = this.timesheet.control.visibleStart();
    const to = this.timesheet.control.visibleEnd();
    this.loadEvents(from, to, this.employee, this.idCompanies);
  }

  ngAfterViewInit(): void {
    const firstDay = this.timesheet.control.visibleStart().getDatePart();
    const businessStart = this.timesheet.control.businessBeginsHour || 9;
    const scrollToTarget = firstDay.addHours(businessStart);
    this.timesheet.control.scrollTo(scrollToTarget);

    this.es
      .fetchAllEmployees(this.idCompanies)
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
        this.employee = this._session.getID();
        this.employeeSelected();
      })
  }

  ngOnInit(): void {
    this.wb.init(this);
  }

  loadEvents(from: DayPilot.Date | undefined, to: DayPilot.Date, idAccount: number, idCompanies: number) {
    let request = this.es.fetchEventsFromToAccount(idCompanies, idAccount, from, to)
    request.subscribe(events => {
      let reset: any = []
      this.timesheet.control.update(reset);
      this.eventsEmployee = [];
      for (let event of events) {
        this.eventsEmployee.push({
          types: event.types,
          eventTypes: event.eventTypes,
          backColor: event.isValid ? this.colors.valid : this.colors.notValid,
          barColor: event.eventTypes.barColor,
          start: event.startDate,
          end: event.endDate,
          id: event.idEventsEmployee,
          employee: event.idAccount,
          isValid: event.isValid,
          comments: event.comments,
          text: event.types != "Travail" ? event.types : event.startDate.split("T")[1].slice(0, -3) + " - " + event.endDate.split("T")[1].slice(0, -3)
        });
        this.timesheet.control.events.add(this.eventsEmployee[this.eventsEmployee.length - 1]);
        this.month = this.monthNames[new DayPilot.Date(this.config.startDate).getMonth()];
      }
    })
  }

  localUpdate(dto: DtoInputEvents) {
    this.createE(dto);
    if (this.timesheet.control.events.find(this.e.id) != null && this.e['employee'] == this.employee) {
      this.timesheet.control.events.update(this.e);
    } else if (this.timesheet.control.events.find(this.e.id) != null && this.e['employee'] != this.employee) {
      this.timesheet.control.events.remove(this.e.id);
    } else if (this.timesheet.control.events.find(this.e.id) == null && this.e['employee'] == this.employee) {
      this.timesheet.control.events.add(this.e);
    }
  }

  localDelete(id: any) {
    this.timesheet.control.events.remove(id);
  }

  localCreate(dto: any) {
    this.es.fetchEventById(dto.events.idEventsEmployee).subscribe(event => {
      this.createE(event);
      if (this.employee == event.idAccount) {
        if (!this.eventsEmployee.map((e: any) => e.id).includes(this.e.id)) {
          this.eventsEmployee.push(this.e);
          this.timesheet.control.events.add(this.e);
        }
      }
    })
  }

  private createE(dto: any) {
    this.e = Object.assign({}, {
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
      employee: dto.idAccount
    });
  }
}
