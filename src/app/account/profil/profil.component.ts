 import { Component, OnInit } from '@angular/core';
 import {ProfilService} from "./profil.service";
 import {DtoInputProfil} from "./dtos/dto-input-profil";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profil : DtoInputProfil = {
    firstName : "",
    lastName : "",
    email : "",
    pictureURL: "",
  };
  constructor(private profilService : ProfilService) {}

  ngOnInit(): void {
    this.profilService.fetchProfil(5).subscribe(profil=> this.profil = profil)
  }

}
