 import { Component, OnInit } from '@angular/core';
 import {ProfilService} from "./profil.service";
 import {DtoInputProfil} from "./dtos/dto-input-profil";
 import {NotificationsService} from "../../util/notifications/notifications.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  public user : DtoInputProfil = {
    idAccount : 0,
    firstName: "",
    lastName: "",
    email: "",
    pictureURL: "",
    phone: "",
    function : "",
    address: {
      postCode : "",
      street : "",
      city : "",
      number : "",
      idAddress : 0
    },
    companies : {
      idCompanies: 0,
      companiesName: "",
      directorEmail: "",
      password: "",
    }
  };
  editMode: boolean = false;
  constructor(private profilService : ProfilService,
              private _notification : NotificationsService) {}

  ngOnInit(): void {
    this.profilService.fetchProfil(5).subscribe(profil => {
      this.user = profil
    })
  }

  edit() {
    this.editMode = !this.editMode;
  }

  send() {
    this._notification.success("Changement effectué");
    this.profilService.updateProfil(this.user);
    this.edit();
  }
}
