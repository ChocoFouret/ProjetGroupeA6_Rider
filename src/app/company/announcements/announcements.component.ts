import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "../../session/session.service";
import {HttpClient} from "@angular/common/http";
import {AnnouncementsService} from "./announcements.service";
import {DtoOutputCreateAnnouncements} from "./dtos/dto-output-create-announcements";
import {DtoOutputUpdateAnnouncements} from "./dtos/dto-output-update-announcements";
import {DtoInputAnnouncements} from "./dtos/dto-input-announcements";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent {
  idCompanies: number = this._session.getCompanies();
  newAnnouncements: DtoOutputCreateAnnouncements | undefined;
  announcement: DtoInputAnnouncements = {
    idAnnouncements: 0,
    idCompanies: this._session.getCompanies(),
    idFunctions: 0,
    content: "",
  }
  announcements: DtoInputAnnouncements[] = [];
  announcementDelete: any;
  isVisibleForm: boolean = false;
  isVisibleList: boolean = true;
  isVisibleNotice: boolean = false;
  alert: boolean = false;

  form: FormGroup = new FormGroup({
    idFunctions: new FormControl(0, Validators.required),
    content: new FormControl("", Validators.required),
  });

  constructor(private _session: SessionService,
              private _httpClient: HttpClient,
              private _announcementsService: AnnouncementsService) {
  }

  ngOnInit(): void {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.announcements = [];
    this._announcementsService.fetchByCompany(this._session.getCompanies()).subscribe(announcement => {
      this.announcements = announcement.sort((a: any, b: any) => b.idFunctions - a.idFunctions);
    })
  }

  send() {
    if (!this.form.invalid) {
      this.newAnnouncements = {
        idCompanies: this._session.getCompanies(),
        idAnnouncements: this.announcement.idAnnouncements,
        idFunctions: this.form.value.idFunctions,
        content: this.form.value.content,
      }
      if (this.announcement.idAnnouncements != 0) {
        this.doUpdate(this.newAnnouncements);
      } else {
        this.doRequest(this.newAnnouncements);
        this.announcements.push(this.newAnnouncements);
      }
      this.isVisibleNotice = true
      this.form.reset()
    }
  }

  doRequest(dto: DtoOutputCreateAnnouncements) {
    this._announcementsService.createAnnouncements(dto).subscribe(() => this.loadAnnouncements());
    this.visible(2);
  }

  doUpdate(dto: DtoOutputUpdateAnnouncements) {
    this.visible(2)
    this.announcements.forEach((announcement: any) => {
      if (announcement.idAnnouncements == dto.idAnnouncements) {
        announcement.idFunctions = dto.idFunctions;
        announcement.content = dto.content;
      }
    });
    this._announcementsService.updateAnnouncements(dto).subscribe();
  }

  visible(id: number) {
    if (id == 1) {
      this.isVisibleForm = true
      this.isVisibleList = false;
      this.announcement = {
        idAnnouncements: 0,
        idCompanies: this._session.getCompanies(),
        idFunctions: 0,
        content: "",
      }
      this.changeForm(this.announcement);
    } else if (id == 2) {
      this.isVisibleForm = false;
      this.isVisibleList = true;
      this.isVisibleNotice = false;
    }
  }

  edit(id: number) {
    let announcement = this.announcements.find((announcement: any) => announcement.idAnnouncements == id)
    if (announcement) {
      this.announcement = {
        idAnnouncements: announcement.idAnnouncements,
        idCompanies: announcement.idCompanies,
        idFunctions: announcement.idFunctions,
        content: announcement.content,
      }
      this.changeForm(this.announcement);
    }
    this.isVisibleForm = true
    this.isVisibleList = false;
  }

  // Change view
  changeForm(announcement: DtoInputAnnouncements) {
    this.form.setValue({
      idFunctions: announcement.idFunctions,
      content: announcement.content,
    })
  }

  emitChoose(choose: any) {
    if (choose) {
      this._announcementsService.deleteAnnouncements(this.announcementDelete).subscribe();
      this.announcements = this.announcements.filter((announcement: any) => announcement.idAnnouncements != this.announcementDelete.idAnnouncements);
    }
    this.alert = false;
  }

  confirmDelete(id: number) {
    this.announcementDelete = this.announcements.find((announcement: any) => announcement.idAnnouncements == id);
    this.alert = true;
  }
}
