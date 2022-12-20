import { Component } from '@angular/core';
import {DtoInputCompany} from "./dtos/dto-input-company";
import {ManagementCompaniesService} from "./management-companies.service";

@Component({
  selector: 'app-management-companies',
  templateUrl: './management-companies.component.html',
  styleUrls: ['./management-companies.component.css']
})
export class ManagementCompaniesComponent {
  companies : DtoInputCompany[] = [];
  filter: string = "";

  constructor(private _companiesService: ManagementCompaniesService) { }

  ngOnInit(): void {
    this.fetchAll();
  }

  private fetchAll() {
    this._companiesService.fetchAll()
      .subscribe(companies => {
        this.companies = companies;
        this.companies.filter(async (item) => {
          item.companiesName = item.companiesName.charAt(0).toUpperCase() + item.companiesName.slice(1);
        })
        this.companies.sort((a, b) => {
          if (a.companiesName > b.companiesName) {
            return 1;
          } else {
            return -1;
          }
        })
      })
  }
}
