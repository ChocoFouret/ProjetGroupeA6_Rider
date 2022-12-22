import { Component } from '@angular/core';
import {DtoInputAnnouncements} from "../../company/announcements/dtos/dto-input-announcements";
import {SessionService} from "../../session/session.service";
import {AnnouncementsService} from "../../company/announcements/announcements.service";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements-employee.component.html',
  styleUrls: ['./announcements-employee.component.css']
})
export class AnnouncementsEmployeeComponent {
  idCompanies: number = this._session.getCompanies();
  announcement: DtoInputAnnouncements = {
    idAnnouncements: 0,
    idCompanies: this._session.getCompanies(),
    idFunctions: 0,
    content: "",
  }
  announcements: DtoInputAnnouncements[] = [];

  constructor(private _session: SessionService,
              private _announcementsService: AnnouncementsService) {
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.announcements = [];
    this._announcementsService.fetchByFunction(this._session.getCompanies(), 2).subscribe(announcement => {
      this.announcements = announcement;
    })
  }
}
