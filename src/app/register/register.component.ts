import {Component, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../validators/confirm-equal.validator";
import {AccountService} from "./account.service";
import {DtoInputAccount} from "./dtos/dto-input-account";
import {DtoOutputCreateAccount} from "./dtos/dto-output-create-account";
import {DtoOutputCreateAddress} from "./dtos/dto-output-create-address";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  accounts: DtoInputAccount[] = [];

  @Output()
  account: DtoOutputCreateAccount = {
    IdAccount: 0,
    IdAddress: 5,
    Password: "",
    PictureURL: "https://www.residencescogir.com/DATA/NOUVELLE/79.jpg",
    LastName: "",
    FirstName: "",
    Email: "",
    IsAdmin: false,
    Phone: ""
  }
  address: DtoOutputCreateAddress = {
    IdAddress: 0,
    city: "",
    street: "",
    postCode: "",
    number: ""
  }
  form: FormGroup = this._fb.group({
    email: this._fb.control("", Validators.required),
    name: this._fb.control("", Validators.required),
    firstName: this._fb.control("", Validators.required),
    password: this._fb.control("", Validators.required),
    password2: this._fb.control("", Validators.required),
    city: this._fb.control("", Validators.required),
    street: this._fb.control("", Validators.required),
    number: this._fb.control("", Validators.required),
    postalCode: this._fb.control("", Validators.required)
  }, {
    validator: MustMatch('password', 'password2'),
  });

  constructor(private router: Router, private _fb: FormBuilder, private _accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  submit() {
    this.address = ({
      IdAddress: 0,
      city: this.form.value.city,
      street: this.form.value.street,
      postCode: this.form.value.postalCode,
      number: this.form.value.number
    })
    this._accountService.createAddress(this.address).subscribe(address => {
      this.account = ({
        IdAccount: 0,
        IdAddress: address.idAddress,
        Password: this.form.value.password,
        PictureURL: "",
        LastName: this.form.value.name,
        FirstName: this.form.value.firstName,
        Email: this.form.value.email,
        IsAdmin: false,
        Phone: ""
      })
      this._accountService.create(this.account, this.form.value.password2).subscribe(() => this.router.navigateByUrl('home/createCompanie'))
    });
  }

  get f() {
    return this.form.controls;
  }
}
