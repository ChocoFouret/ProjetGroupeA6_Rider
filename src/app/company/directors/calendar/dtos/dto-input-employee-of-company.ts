import {DtoInputEmployee} from "../../../../util/management/dtos/dto-input-employee";

export interface DtoInputEmployeeOfCompany {
  idCompanies: number;
  idAccount: number;
  idFunctions: number;
  idHas: number;
  account: DtoInputEmployee;
}
