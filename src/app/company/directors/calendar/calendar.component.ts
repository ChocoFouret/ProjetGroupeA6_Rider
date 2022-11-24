import {Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {DayPilot, DayPilotQueueComponent, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {EventService} from "./event.service";
import {InfoEventComponent} from "./info-event/info-event.component";
import {DtoOutputCreateEvents} from "./dtos/dto-output-create-events";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  @ViewChild('scheduler')
  scheduler!: DayPilotSchedulerComponent;
  public events: DayPilot.EventData[] = [];
  employees: any[] = [];
  idSchedule: number = 1;
  // eventCreate: DtoOutputCreateEvents = [];

  // idCompany:number = 2;

  // themes :             https://javascript.daypilot.org/demo/scheduler/themetraditional.html

  // highlighting date :  https://code.daypilot.org/38541/angular-scheduler-highlighting-holidays

  // Phases :             https://code.daypilot.org/82163/angular-scheduler-displaying-event-phases

  // Read only :          https://code.daypilot.org/25443/angular-scheduler-read-only-and-edit-mode-switching
  // https://code.daypilot.org/64510/angular-timesheet-quick-start-project
  config: DayPilot.SchedulerConfig = {
    locale: "fr-be",
    cellWidthSpec: "Fixed",
    cellWidth: 100,
    timeHeaders: [
      {
        "groupBy": "Month"
      },
      {
        "groupBy": "Day",
        "format": "d"
      }
    ],
    scale: "Day",
    days: DayPilot.Date.today().daysInMonth(),
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    businessBeginsHour: 1,
    businessEndsHour: 22,
    groupConcurrentEvents: true,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
      const dp = args.control;

      const form = [
        {name: "Heure de début", id: "start", type: "hour"},
        {name: "Heure de fin", id: "end", type: "hour"},
      ];

      const data = {
        start: "08:00",
        end: "16:00"
      };

      const modal = await DayPilot.Modal.form(form, data);
      dp.clearSelection();
      if (modal.canceled) {
        return;
      }

      dp.events.add({
        start: args.start.addHours(modal.result.start.split(":")[0]).addMinutes(modal.result.start.split(":")[1]).toString(),
        end: args.start.addHours(modal.result.end.split(":")[0]).addMinutes(modal.result.end.split(":")[1]).toString(),
        id: DayPilot.guid(),
        resource: args.resource,
        text: args.start.addHours(modal.result.start.split(":")[0]).addMinutes(modal.result.start.split(":")[1]).toString().split("T")[1].slice(0, -3)
          + " - " +
          args.start.addHours(modal.result.end.split(":")[0]).addMinutes(modal.result.end.split(":")[1]).toString().split("T")[1].slice(0, -3),
      });

      this.ds.create(this.events.pop());
    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
      args.control.message("Event moved: " + args.e.id());
      this.events.find(event => {
        if (event.id === args.e.id()) {

          /*
          const eventUpdate = {
            "startDate": event.start.toString().slice(0, 19),
            "endDate": event.end.toString().slice(0, 19),
            "idEventsEmployee": event.id,
            "idSchedule": 1,
            "idAccount": event.resource
          }
          */
/*
          this.eventCreate = {
            startDate: event.start.toString().slice(0, 19),
            endDate: event.end.toString().slice(0, 19),
            idEventsEmployee: event.id,
            idSchedule: 1,
            idAccount: event.resource.toString()
          }
        */

          // this.ds.update().subscribe();
        }
      })
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
      args.control.message("Event resized: " + args.e.text());
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      args.control.message("Event deleted: " + args.e.text());
    },
    eventClickHandling: "Disabled",
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: (args) => {
        // if event object doesn't specify "bubbleHtml" property
        // this onLoad handler will be called to provide the bubble HTML
        args.html = "Event details";
      }
    }),
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete", onClick: (args) => {
            const dp = args.source.calendar;
            dp.events.remove(args.source);
          }
        }
      ]
    }),
    onBeforeEventDomAdd: args => {
      console.log("Creating LinkComponent for " + args.e.text());
      const component = this.createLinkComponent(args.e.text(), args.e.data);
      args.element = component.location.nativeElement;
      (<any>args).component = component;
    },
    onBeforeEventDomRemove: args => {
      console.log("Destroying LinkComponent for " + args.e.text());
      const component = (<any>args).component;
      component.destroy();
    },
  }

  constructor(private ds: EventService,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
  }

  createLinkComponent(text: string, data?: any): ComponentRef<InfoEventComponent> {
    const component: ComponentRef<InfoEventComponent> = this.viewContainerRef.createComponent(InfoEventComponent);
    component.instance.text = text;
    component.instance.data = data;
    component.instance.component = this;
    component.changeDetectorRef.detectChanges();
    return component;
  }

  ngAfterViewInit(): void {
    this.ds
      .fetchAllEmployees(2)
      .subscribe(employees => {
        for (let employee of employees) {
          this.ds.fetchEmployeeById(employee.idAccount).subscribe(employee => {
            this.employees.push({
              "name": employee.lastName.toString() + " " + employee.firstName.toString(),
              "id": employee.idAccount
            });
            this.employees.sort((a: any, b: any) => {
              return a.name.localeCompare(b.name);
            });
          });
        }
        this.config.resources = this.employees;
      })
  }

  previous(): void {
    this.config.startDate = new DayPilot.Date(this.config.startDate).addMonths(-1);
    this.config.days = this.config.startDate.daysInMonth();
  }

  today(): void {
    this.config.startDate = DayPilot.Date.today().firstDayOfMonth();
    this.config.days = this.config.startDate.daysInMonth();
  }

  next(): void {
    this.config.startDate = new DayPilot.Date(this.config.startDate).addMonths(1);
    this.config.days = this.config.startDate.daysInMonth();
  }

  schedulerViewChanged(args: any) {
    if (args.visibleRangeChanged) {
      const from = this.scheduler.control.visibleStart();
      const to = this.scheduler.control.visibleEnd();
      this.ds
        .fetchFromTo(this.idSchedule, from, to)
        .subscribe(events => {
          this.events = [];
          for (let event of events) {
            this.events.push({
              "start": event.startDate,
              "end": event.endDate,
              "id": event.idEventsEmployee,
              "resource": event.idAccount,
              "text": event.startDate.split("T")[1].slice(0, -3)
                + " - " +
                event.endDate.split("T")[1].slice(0, -3)
            });
          }
        })
    }
  }

  debug() {
    console.log(this.events)
  }

  public updateEvent(dto: any) {
    this.events.forEach(event => {
      if (event.id == dto.id) {
        event.start = dto.start;
        event.end = dto.end;
        event.text = dto.start.toString().split("T")[1].slice(0, -3)
          + " - " +
          dto.end.toString().split("T")[1].slice(0, -3);
      }
    })



    this.ds.update(dto).subscribe();
  }
}
