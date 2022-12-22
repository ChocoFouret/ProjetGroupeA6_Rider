import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputLogin} from "../session/dtos/dto-output-login";

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  form: FormGroup = this._fb.group({
    email: this._fb.control("", Validators.required),
    address: this._fb.control(""),
    password: this._fb.control("", Validators.required),
  });
  @Output() sessionLogin: EventEmitter<DtoOutputLogin> = new EventEmitter<DtoOutputLogin>();
  @Input() error: boolean = false;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  emitLogin() {
    this.sessionLogin.next({
      email: this.form.value.email + this.form.value.address,
      password: this.form.value.password
    });
  }

}
