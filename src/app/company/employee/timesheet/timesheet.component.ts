import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {CompanyComponent} from "../../company.component";
import ModalFormItem = DayPilot.ModalFormItem;
import {DtoInputEventTypes} from "../../dtos/dto-input-eventTypes";

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
  @Input() colors: any = {};

  @ViewChild('timesheet')
  timesheet!: DayPilotSchedulerComponent;
  eventTypes: DtoInputEventTypes[] = [];
  formEventTypes: ModalFormItem[] = [];

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

}
