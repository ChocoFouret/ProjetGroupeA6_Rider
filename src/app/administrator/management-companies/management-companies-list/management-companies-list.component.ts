import {Component, Input} from '@angular/core';
import {DtoInputCompany} from "../dtos/dto-input-company";

@Component({
  selector: 'app-management-companies-list',
  templateUrl: './management-companies-list.component.html',
  styleUrls: ['./management-companies-list.component.css']
})
export class ManagementCompaniesListComponent {
  @Input() companies: DtoInputCompany[] = [];
  @Input() filter: string = "";
}
