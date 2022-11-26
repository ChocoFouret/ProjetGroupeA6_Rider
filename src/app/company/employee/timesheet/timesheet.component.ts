import {Component, OnInit, ViewChild} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {EventService} from "../../event.service";

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  @ViewChild('timesheet')
  timesheet!: DayPilotSchedulerComponent;
  events: any[] = [];
  employees: any = [];

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
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
      const dp = args.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (modal.canceled) {
        return;
      }
      console.log(this.employee);
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        employee: this.employee,
        text: modal.result
      });
    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
      args.control.message("Event moved: " + args.e.text());
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
    bubble: new DayPilot.Bubble({
      onLoad: (args) => {
        // if event object doesn't specify "bubbleHtml" property
        // this onLoad handler will be called to provide the bubble HTML
        args.html = "Event details";
      }
    })
  };

  constructor(private ds: EventService) {
  }

  employee: any;

  employeeSelected($event: Event) {
    const from = this.timesheet.control.visibleStart();
    const to = this.timesheet.control.visibleEnd();
    this.ds
      .fetchFromToAccount(this.ds.idSchedule, this.employee, from, to)
      .subscribe(events => {
        this.events = [];
        for (let event of events) {
          this.events.push({
            types: event.types,
            eventTypes: event.eventTypes,
            barColor: event.eventTypes.barColor,
            start: event.startDate,
            end: event.endDate,
            id: event.idEventsEmployee,
            isValid: event.isValid,
            comments: event.comments,
            employee: event.idAccount,
            text: event.startDate.split("T")[1].slice(0, -3)
              + " - " +
              event.endDate.split("T")[1].slice(0, -3)
          });
          if (!event.isValid) {
            this.events[this.events.length - 1].backColor = "#894f4f";
          }
          if (event.types != "Travail") {
            this.events[this.events.length - 1].text = event.types;
          }
        }

        // Reset
        let tmp:any = []
        this.timesheet.control.update(tmp);
        for(let event of this.events) {
          this.timesheet.control.events.add(event);
        }
      })
  }

  ngAfterViewInit(): void {
    const firstDay = this.timesheet.control.visibleStart().getDatePart();
    const businessStart = this.timesheet.control.businessBeginsHour || 9;
    const scrollToTarget = firstDay.addHours(businessStart);
    this.timesheet.control.scrollTo(scrollToTarget);
    this.ds
      .fetchAllEmployees(2)
      .subscribe(employees => {
        this.employees = [];
        for (let employee of employees) {
          this.employees.push({
            "name": employee['account'].lastName + ", " + employee['account'].firstName,
            "id": employee.idAccount
          });
        }
        this.employees.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name);
        });
        this.employee = this.employees[0].id;
        this.employeeSelected(new Event("change"));
      })
  }


  ngOnInit(): void {
  }

  debug() {
    console.log(this.timesheet.control.events.list);
  }
}
