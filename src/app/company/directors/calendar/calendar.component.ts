import {Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from "daypilot-pro-angular";
import {EventService} from "../../event.service";
import {InfoEventComponent} from "./info-event/info-event.component";
import {DtoOutputCreateEvents} from "../../dtos/dto-output-create-events";
import {DtoOutputUpdateEvents} from "../../dtos/dto-output-update-events";
import {DtoOutputDeleteEvents} from "../../dtos/dto-output-delete-events";
import {DtoInputEventTypes} from "../../dtos/dto-input-eventTypes";
import ModalFormItem = DayPilot.ModalFormItem;
import {CompanyComponent} from "../../company.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  @Input() homePage: CompanyComponent | undefined;
  @Input() employees: any[] = [];
  @Input() events: DayPilot.EventData[] = [];
  @Output() eventsChanges: EventEmitter<any> = new EventEmitter<any>();
  @Input() colors: any = {};

  @ViewChild('scheduler')
  scheduler!: DayPilotSchedulerComponent;
  eventTypes: DtoInputEventTypes[] = [];
  formEventTypes: ModalFormItem[] = [];

  // themes :             https://javascript.daypilot.org/demo/scheduler/themetraditional.html
  // https://themes.daypilot.org/scheduler/create#cdu5so
  config: DayPilot.SchedulerConfig = {
    locale: "fr-be",
    cellWidthSpec: "Fixed",
    cellWidth: 100,
    crosshairType: "Full",
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

      if (args.resource == undefined) {
        dp.clearSelection();
        return;
      }

      let formEventTypes: any[] = [];
      this.eventTypes.forEach(eventType => {
        formEventTypes.push({
          name: eventType.types,
          id: eventType.types
        })
      })

      function validateYears(args: any) {
        let value = args.value.toString() || "";
        if (!value.includes(String((new Date()).getFullYear()))) {
          if ((!value.includes(String((new Date()).getFullYear() + 1)))) {
            args.valid = false;
            args.message = "Seuls les années " + (new Date()).getFullYear() + " et " + ((new Date()).getFullYear() + 1) + " sont autorisées";
          }
        }
        if (value.split(":")[0] == "" || value.split(":")[1] == "") {
          args.valid = false;
          args.message = "L'heure de début est obligatoire";
        }
      }

      let data = {
        isValid: true,
        types: "Travail",
        start: args.start.addHours(8).toString(),
        end: args.end.addDays(-1).addHours(16).toString(),
      }

      const form = [
        {name: "Type d'évènement", id: "types", type: "select", options: formEventTypes},
        {name: "Validé", id: "isValid", type: "checkbox"},
        {name: "Demandes", id: "comments", type: "text"},
        {
          name: "Du",
          id: "start",
          type: "datetime",
          dateFormat: "d-M-yyyy",
          timeFormat: "HH:mm",
          onValidate: validateYears
        },
        {
          name: "Au",
          id: "end",
          type: "datetime",
          dateFormat: "d-M-yyyy",
          timeFormat: "HH:mm",
          onValidate: validateYears
        }
      ]

      const modal = await DayPilot.Modal.form(form, data);
      dp.clearSelection();
      if (modal.canceled) {
        return;
      }

      let backColor = "";
      let barColor = "";
      if (!modal.result.isValid) {
        backColor = this.colors.notValid;
      }

      this.eventTypes.forEach((eventTypes) => {
        if (eventTypes.types === modal.result.types) {
          barColor = eventTypes.barColor;
        }
      })

      if (modal.result.types == "Congé" || modal.result.types == "Vacances" || modal.result.types == "Absence") {
        modal.result.start = args.start.toString();
        if (modal.result.start != modal.result.end.addDays(-1)) {
          modal.result.end = args.end.toString();
        } else {
          modal.result.end = args.start.addDays(1).toString();
        }
      }

      dp.events.add({
        isValid: modal.result.isValid,
        comments: modal.result.comments,
        types: modal.result.types,
        barColor: barColor,
        backColor: backColor,
        start: modal.result.start,
        end: modal.result.end,
        id: DayPilot.guid(),
        resource: args.resource,
        text: modal.result.types != "Travail" ? modal.result.types :
          modal.result.start.toString().split("T")[1].slice(0, -3)
          + " - " +
          modal.result.end.toString().split("T")[1].slice(0, -3)
      });

      let dto: DtoOutputCreateEvents = {
        startDate: this.events[this.events.length - 1].start.toString().slice(0, 19),
        endDate: this.events[this.events.length - 1].end.toString().slice(0, 19),
        idEventsEmployee: this.events[this.events.length - 1].id.toString(),
        idSchedule: this.ds.idSchedule,
        idAccount: parseInt(args.resource.toString()),
        types: this.events[this.events.length - 1]['types'],
        isValid: this.events[this.events.length - 1]['isValid'],
        comments: this.events[this.events.length - 1]['comments'],
      }
      this.ds
        .create(dto, this.ds.idCompanies.toString()).subscribe();
    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
      args.control.message("Évènement déplacé : " + args.e.id());
      this.updateEventFromEventId(args.e);
    },
    eventResizeHandling: "Update",
    onEventResize: (args) => {
      let oldStartDate = args.e.data.start;
      let oldEndDate = args.e.data.end;
      let oldHourStart = args.e.data.start.toString().split("T")[1].slice(0, 2);
      let oldHourEnd = args.e.data.end.toString().split("T")[1].slice(0, 2);
      let oldMinuteStart = args.e.data.start.toString().split("T")[1].slice(3, 5);
      let oldMinuteEnd = args.e.data.end.toString().split("T")[1].slice(3, 5);

      if (oldStartDate != args.newStart) {
        args.newStart = args.newStart.addHours(oldHourStart);
        args.newStart = args.newStart.addMinutes(oldMinuteStart);
      }
      if (oldEndDate != args.newEnd) {
        args.newEnd = args.newEnd.addDays(-1);
        args.newEnd = args.newEnd.addHours(oldHourEnd);
        args.newEnd = args.newEnd.addMinutes(oldMinuteEnd);
      }

      args.e.data.start = args.newStart;
      args.e.data.end = args.newEnd;

      this.updateEventFromEventId(args.e);
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      args.control.message("Évènement supprimé : " + args.e.text());
      let dto: DtoOutputDeleteEvents = {
        idEventsEmployee: args.e.id().toString(),
      }
      this.ds.delete(dto, this.ds.idCompanies.toString()).subscribe();
    },
    eventClickHandling: "Disabled",
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: (args) => {
        // if event object doesn't specify "bubbleHtml" property
        // this onLoad handler will be called to provide the bubble HTML
        args.html = "Détails de l'évènement."
      }
    }),
    treeEnabled: true,
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Supprimer", onClick: (args) => {
            const dp = args.source.calendar;
            dp.events.remove(args.source);
            let dto: DtoOutputDeleteEvents = {
              idEventsEmployee: args.source.id().toString(),
            }
            this.ds.delete(dto, this.ds.idCompanies.toString()).subscribe();
          }
        }
      ]
    }),
    onBeforeEventDomAdd: args => {
      const component = this.createLinkComponent(args.e.text(), args.e.data);
      args.element = component.location.nativeElement;
      (<any>args).component = component;
    },
    onBeforeEventDomRemove: args => {
      const component = (<any>args).component;
      component.destroy();
    },
    beforeCellRenderCaching: false,
    onBeforeRowHeaderRender: (args) => {
      if (args.row.data["idGroup"] != undefined) {
        // Couleur header des groupes
        // args.row.backColor = this.colors.rowGroup;;
      } else {
        // Couleur header des employés
        args.row.backColor = this.colors.rowEmployee;
      }
    },
    onBeforeCellRender: (args) => {
      if (args.cell.resource == undefined) {
        if(args.cell.properties.business){
          // Couleur lignes des employés
          args.cell.properties.backColor = this.colors.rowGroup;
        } else {
          // Couleur lignes des employés
          args.cell.properties.backColor = this.colors.rowGroupWk;
        }
      } else {
        if(args.cell.properties.business){
          // Couleur lignes des employés
          args.cell.properties.backColor = this.colors.rowEmployee;
        } else {
          // Couleur lignes des employés
          args.cell.properties.backColor = this.colors.rowEmployeeWk;
        }
      }
    },
  }


  constructor(private ds: EventService,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.ds
      .fetchAllEventTypes()
      .subscribe((dto: DtoInputEventTypes[]) => {
        this.eventTypes = dto;
      })
  }

  createLinkComponent(text: string, data?: any): ComponentRef<InfoEventComponent> {
    const component: ComponentRef<InfoEventComponent> = this.viewContainerRef.createComponent(InfoEventComponent);
    component.instance.text = text;
    component.instance.data = data;
    component.instance.inputEventTypes = this.eventTypes;
    component.instance.component = this;
    component.changeDetectorRef.detectChanges();
    return component;
  }

  ngAfterViewInit(): void {
    this.config.resources = this.employees;
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
      this.homePage?.loadEvents(from, to, 0);
    }
  }

  public updateEventFromEventId(args: DayPilot.Event) {
    this.events.find(event => {
      if (event.id === args.id()) {
        let dto: DtoOutputUpdateEvents = {
          backColor: args.data.backColor,
          barColor: args.data.barColor,
          startDate: args.start().toString().slice(0, 19),
          endDate: args.end().toString().slice(0, 19),
          idEventsEmployee: args.id().toString(),
          idAccount: parseInt(args.resource().toString()),
          types: args.data.types,
          isValid: args.data.isValid,
          comments: args.data.comments,
          eventTypes: args.data.eventTypes,
        }
        this.update(dto);
      }
    })
  }

  update(dto: any) {
    this.events.forEach(event => {
      if (event.id == dto.id) {
        event['isValid'] = dto.isValid;
        event['types'] = dto.types;
        event.barColor = dto.barColor;
        event.backColor = dto.backColor;
        event.start = dto.startDate;
        event.end = dto.endDate;
        event.resource = dto.resource;
        event.text = event['types'] != "Travail" ? event['types'] :
          dto.startDate.toString().split("T")[1].slice(0, -3)
          + " - " + dto.endDate.toString().split("T")[1].slice(0, -3)
      }
    })

    this.eventsChanges.next({
      idSchedule: this.ds.idSchedule,
      backColor: dto.backColor,
      barColor: dto.barColor,
      startDate: dto.startDate,
      endDate: dto.endDate,
      idEventsEmployee: dto.idEventsEmployee,
      idAccount: dto.idAccount,
      types: dto.types,
      isValid: dto.isValid,
      comments: dto.comments,
      eventTypes: dto.eventTypes,
    })
  }
}
