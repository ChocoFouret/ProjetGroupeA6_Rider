import {Component, OnInit, ViewChild} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {DataService} from "./data.service";

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  @ViewChild('timesheet')
  timesheet!: DayPilotSchedulerComponent;

  events: any[] = [];

  config: DayPilot.SchedulerConfig = {
    locale: "fr-be",
    onBeforeRowHeaderRender: (args) => {
      args.row.horizontalAlignment = "center";

      // Day name
      const day = args.row.start.toString("dddd", "fr-be");
      args.row.columns[1].text = `${day}`;

      // Total hours
      const duration = args.row.events.totalDuration();
      if (duration.totalSeconds() === 0) {
        return;
      }

      let hours = duration.toString('H:mm');
      if (duration.totalDays() >= 1) {
        hours = Math.floor(duration.totalHours()) + ':' + duration.toString('mm');
      }
      args.row.columns[2].text = `${hours}`;

    },
    cellWidthSpec: "Auto",
    cellWidthMin: 20,
    crosshairType: "Header",
    autoScroll: "Drag",
    timeHeaders: [
      {
        "groupBy": "Hour"
      },
      {
        "groupBy": "Cell",
        "format": "mm"
      }
    ],
    scale: "CellDuration",
    cellDuration: 60,
    days: 7,
    viewType: "Days",
    startDate: DayPilot.Date.today().firstDayOfWeek(),
    showNonBusiness: false,
    businessBeginsHour: 0,
    businessEndsHour: 24,
    businessWeekends: true,
    floatingEvents: true,
    eventHeight: 30,
    eventMovingStartEndEnabled: false,
    eventResizingStartEndEnabled: false,
    timeRangeSelectingStartEndEnabled: false,
    groupConcurrentEvents: true,
    eventStackingLineHeight: 100,
    allowEventOverlap: true,
    timeRangeSelectedHandling: "Enabled",
    rowHeaderColumns: [
      {text: "Date"},
      {text: "Day", width: 50},
      {text: "Total", width: 40},
    ],
    onTimeRangeSelected: async (args) => {
      const dp = args.control;
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (modal.canceled) {
        return;
      }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
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
    eventHoverHandling: "Disabled",
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
  };


  /*
  config: DayPilot.SchedulerConfig = {
    rowHeaderColumns: [
      {text: "Date"},
      {text: "Day", width: 50},
      {text: "Total", width: 40},
    ],
    timeHeaders: [
      {groupBy: "Hour"},
      {groupBy: "Cell", format: "mm"}
    ],
    scale: "CellDuration",
    cellDuration: 30,
    startDate: "2022-11-22",
    days: 31,
    viewType: "Days",
    showNonBusiness: true,
    businessWeekends: false,
    allowEventOverlap: false,
    onTimeRangeSelected: async (args) => {
      const dp = args.control;
      const modal = await DayPilot.Modal.prompt("Create a new task:", "Task 1");
      dp.clearSelection();
      if (modal.canceled) {
        return;
      }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: args.resource,
        text: modal.result
      });
    },
    onEventMoved: (args) => {
      args.control.message("Event moved: " + args.e.text());
    },
    onEventResized: (args) => {
      args.control.message("Event resized: " + args.e.text());
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      args.control.message("Event deleted: " + args.e.text());
    },
    onEventClick: (args) => {

    },
    onBeforeRowHeaderRender: args => {
      const day = args.row.start.toString("ddd");
      args.row.columns[1].text = `${day}`;

      const duration = args.row.events.totalDuration();
      if (duration.totalSeconds() === 0) {
        return;
      }

      let hours = duration.toString('H:mm');
      if (duration.totalDays() >= 1) {
        hours = Math.floor(duration.totalHours()) + ':' + duration.toString('mm');
      }
      args.row.columns[2].text = `${hours}`;

      const max = DayPilot.Duration.ofHours(8);
      const pct = args.row.events.totalDuration().totalSeconds() / max.totalSeconds();
      args.row.columns[2].areas = [
        {
          bottom: 0,
          left: 0,
          width: 40,
          height: 4,
          backColor: "#ffe599",
        },
        {
          bottom: 0,
          left: 0,
          width: 40 * pct,
          height: 4,
          backColor: "#f1c232",
        }
      ];
    },
    onBeforeEventRender: args => {
      const duration = new DayPilot.Duration(args.data.start, args.data.end);
      args.data.areas = [
        {
          right: 2,
          top: 0,
          bottom: 0,
          width: 30,
          fontColor: "#999999",
          text: duration.toString('h:mm'),
          style: 'display: flex; align-items: center'
        }
      ];
    }
  };
  */

  constructor(private ds: DataService) {
  }

  /*
    ngAfterViewInit(): void {
      const from = this.timesheet.control.visibleStart();
      const to = this.timesheet.control.visibleEnd();
      this.ds.getEvents(from, to).subscribe(result => {
        this.events = result;
      });
    }
  */



  employees: any[] = [];

  employee: any;
  employeeSelected($event: Event) {
    const from = this.timesheet.control.visibleStart();
    const to = this.timesheet.control.visibleEnd();
    this.ds.getEvents(from, to, this.employee).subscribe(events => {
      this.timesheet.control.update({events});
    });

  }

  ngAfterViewInit(): void {

    const firstDay = this.timesheet.control.visibleStart().getDatePart();
    const businessStart = this.timesheet.control.businessBeginsHour || 9;
    const scrollToTarget = firstDay.addHours(businessStart);
    this.timesheet.control.scrollTo(scrollToTarget);


    this.ds.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.employee = this.employees[0].id;
      this.employeeSelected(new Event("change"));
    });
  }


  ngOnInit(): void {
  }

  debug() {
    console.log(this.timesheet.control.events.list);
  }
}
