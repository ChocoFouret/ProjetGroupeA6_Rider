import { Component, OnInit } from '@angular/core';
import {DayPilot} from "daypilot-pro-angular";

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public text: string = "link";
  public data: any;

  click(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    DayPilot.Modal.alert("Event id: " + this.data.id);
  }
}
