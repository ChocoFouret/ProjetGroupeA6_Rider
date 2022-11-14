import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputLogin} from "../session/dtos/dto-output-login";
import * as jwt from "jwt-decode";

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  form: FormGroup = this._fb.group({
    email: this._fb.control("", Validators.required),
    password: this._fb.control("", Validators.required),
  });
  @Output() sessionLogin: EventEmitter<DtoOutputLogin> = new EventEmitter<DtoOutputLogin>();
  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  emitLogin() {
    this.sessionLogin.next({
      email: this.form.value.email,
      password: this.form.value.password
    });
  }

  private getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  DecodeToken(token: string): string {
    return jwt.default(token);
  }
}
