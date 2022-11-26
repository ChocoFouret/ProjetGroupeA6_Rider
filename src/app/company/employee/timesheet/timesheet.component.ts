import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {CompanyComponent} from "../../company.component";

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  @Input() homePage: CompanyComponent | undefined;
  @Input() employees: any[] = [];
  @Input() employee: any;
  @Input() events: DayPilot.EventData[] = [];

  @ViewChild('timesheet')
  timesheet!: DayPilotSchedulerComponent;

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
      console.log(args);
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (modal.canceled) {
        return;
      }
      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        resource: this.employee,
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

  constructor() {
  }

  employeeSelected() {
    const from = this.timesheet.control.visibleStart();
    const to = this.timesheet.control.visibleEnd();
    this.homePage?.loadEvents(from, to, this.employee);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['events']) {
      if(this.timesheet != undefined) {
        let tmp: any = []
        this.timesheet.control.update(tmp);
        for (let event of this.events) {
          this.timesheet.control.events.add(event);
        }
      }
    }
  }

  ngAfterViewInit(): void {
    const firstDay = this.timesheet.control.visibleStart().getDatePart();
    const businessStart = this.timesheet.control.businessBeginsHour || 9;
    const scrollToTarget = firstDay.addHours(businessStart);
    this.timesheet.control.scrollTo(scrollToTarget);
  }

  ngOnInit(): void {
  }

  debug() {
    console.log(this.timesheet.control.events.list);
  }
}
