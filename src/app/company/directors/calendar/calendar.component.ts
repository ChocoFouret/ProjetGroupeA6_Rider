import {Component, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {EventService} from "./event.service";
import {InfoEventComponent} from "./info-event/info-event.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @ViewChild('scheduler')
  scheduler!: DayPilotSchedulerComponent;

  events: DayPilot.EventData[] = [];

  constructor(private ds: EventService,
              private viewContainerRef: ViewContainerRef) {
  }

  createLinkComponent(text: string, data?: any): ComponentRef<InfoEventComponent> {
    const component: ComponentRef<InfoEventComponent> = this.viewContainerRef.createComponent(InfoEventComponent);

    component.instance.text = text;
    component.instance.data = data;
    component.changeDetectorRef.detectChanges();

    return component;
  }

  ngOnInit(): void {
  }

  // themes :             https://javascript.daypilot.org/demo/scheduler/themetraditional.html

  // highlighting date :  https://code.daypilot.org/38541/angular-scheduler-highlighting-holidays

  // Phases :             https://code.daypilot.org/82163/angular-scheduler-displaying-event-phases

  // Read only :          https://code.daypilot.org/25443/angular-scheduler-read-only-and-edit-mode-switching
  // https://code.daypilot.org/64510/angular-timesheet-quick-start-project
  config: DayPilot.SchedulerConfig = {
    locale: "fr-be",
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
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      dp.clearSelection();
      if (modal.canceled) { return; }
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
        { text: "Delete", onClick: (args) => { const dp = args.source.calendar; dp.events.remove(args.source); } }
      ]
    }),
    onBeforeEventDomAdd: args => {
      console.log("Creating LinkComponent for " + args.e.text());
      const component = this.createLinkComponent('details', args.e.data);
      args.element = component.location.nativeElement;
      (<any>args).component = component;
    },
    onBeforeEventDomRemove: args => {
      console.log("Destroying LinkComponent for " + args.e.text());
      const component = (<any>args).component;
      component.destroy();
    },
  }
  ngAfterViewInit(): void {
    this.ds.getResources().subscribe(result => this.config.resources = result);
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
      this.ds.getEvents(from, to).subscribe(result => {
        this.events = result;
      });
    }
  }

  debug() {
    console.log(this.events);
  }
}
