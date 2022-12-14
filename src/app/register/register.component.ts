import {Component, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../validators/confirm-equal.validator";
import {AccountService} from "./account.service";
import {DtoInputAccount} from "./dtos/dto-input-account";
import {DtoOutputCreateAccount} from "./dtos/dto-output-create-account";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  accounts: DtoInputAccount[] = [];

  @Output()
  account: DtoOutputCreateAccount={
   IdAccount:0,
   IdAddress:-1,
   Password:"",
    PictureURL:"",
    LastName:"",
   FirstName:"",
   Email:"",
    IsAdmin:false
  }
  form: FormGroup = this._fb.group({
    email: this._fb.control("", Validators.required),
    name:this._fb.control("", Validators.required),
    firstName:this._fb.control("",Validators.required),
    password:this._fb.control("", Validators.required),
    password2:this._fb.control("", Validators.required)
  }, {
    validator: MustMatch('password', 'password2')
  });
  constructor(private router: Router, private _fb: FormBuilder, private _accountService: AccountService) { }

  ngOnInit(): void {
  }

  submit() {
    this.account=({
      IdAccount:0,
      IdAddress:-1,
      Password:this.form.value.password,
      PictureURL:"",
      LastName:this.form.value.name,
      FirstName:this.form.value.firstName,
      Email:this.form.value.email,
      IsAdmin:false
    })
    console.log(this.account);
    this._accountService.create(this.account).subscribe(account=>this.accounts.push(account));
    this.router.navigateByUrl('home/createCompanie')
  }

  get f() { return this.form.controls; }
}
