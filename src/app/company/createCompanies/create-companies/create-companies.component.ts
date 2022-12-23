import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreateCompanies} from "../dtos/dto-output-create-companies";
import {CompanyService} from "../../company.service";
import {DtoOutputCreateHas} from "../../dtos/dto-output-create-has";
import {SessionService} from "../../../session/session.service";
import {HasService} from "../../has.service";
import {Router} from "@angular/router";
import {DtoOutputJoin} from "../dtos/dto-output-join";


@Component({
  selector: 'app-create-companies',
  templateUrl: './create-companies.component.html',
  styleUrls: ['./create-companies.component.css']
})
export class CreateCompaniesComponent implements OnInit {

  choiceCompanie;
  form: FormGroup = this._fb.group({
    name: this._fb.control("", Validators.required),
    password: this._fb.control("", Validators.required)
  });
  joinForm: FormGroup = this._fb.group({
    nameJoin: this._fb.control("", Validators.required),
    passwordJoin: this._fb.control("", Validators.required)
  })
  @Output()
  hasCreated: DtoOutputCreateHas = {
    idCompanies: 0,
    idHas: 0,
    idAccount: 0,
    idFunctions: 0,
    function: null,
    account: null
  }
  companiesCreated: DtoOutputCreateCompanies = {
    idCompanies: 0,
    companiesName: "",
    directorEmail: "",
    password: ""
  };
  @Output()
  sessionJoin: EventEmitter<DtoOutputJoin> = new EventEmitter<DtoOutputJoin>();
  private idCompaniesVar: number = 0;

  constructor(private _fb: FormBuilder, private _companyService: CompanyService, private _session: SessionService, private _hasService: HasService, private router: Router) {
    this.choiceCompanie = {
      choice: "create"
    }
  }

  ngOnInit(): void {

  }

  createCompanies() {

    this.companiesCreated = ({
      idCompanies: 0,
      companiesName: this.form.value.name.toString(),
      directorEmail: "",
      password: this.form.value.password.toString()
    });
    this._companyService
      .create(this.companiesCreated)
      .subscribe(companie => {
        this.idCompaniesVar = companie.idCompanies;
        this.hasCreated = ({
          idCompanies: this.idCompaniesVar,
          idFunctions: 5,
          idAccount: Number(this._session.getID()),
          idHas: 0,
          function: null,
          account: null
        })
        this._hasService
          .create(this.hasCreated)
          .subscribe(() => this.router.navigateByUrl('account'));
      });

  }

  joinCompanie() {

    //First step, find the companie
    let dtoJoin: DtoOutputJoin = {
      name: this.joinForm.value.nameJoin.toString(),
      password: this.joinForm.value.passwordJoin.toString()
    }

    this._companyService.join(dtoJoin)
      .subscribe(() => {
        this._companyService.fetchByName(dtoJoin.name)
          .subscribe(companie => {
            this.idCompaniesVar = companie[0].idCompanies;
            this.hasCreated = ({
              idCompanies: this.idCompaniesVar,
              idFunctions: 2,
              idAccount: Number(this._session.getID()),
              idHas: 0,
              function: null,
              account: null
            })
            this._hasService
              .create(this.hasCreated)
              .subscribe(() => this.router.navigateByUrl('account'))
          })
      })

  }

  skip() {
    if (confirm("Etes vous sûr de vouloir passer cette étape ? (vous pouvez y revenir par après)")) {
      this.router.navigateByUrl('account');
    }
  }
}
