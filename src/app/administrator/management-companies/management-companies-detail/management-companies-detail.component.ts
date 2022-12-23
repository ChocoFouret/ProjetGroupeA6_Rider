import {Component, Input} from '@angular/core';
import {DtoInputCompany} from "../dtos/dto-input-company";

@Component({
  selector: 'app-management-companies-detail',
  templateUrl: './management-companies-detail.component.html',
  styleUrls: ['./management-companies-detail.component.css']
})
export class ManagementCompaniesDetailComponent {
   @Input() company: DtoInputCompany | undefined;
}
