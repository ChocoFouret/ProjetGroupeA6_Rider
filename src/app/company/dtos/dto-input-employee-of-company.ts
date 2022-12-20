import {DtoInputEmployee} from "../../administrator/management/dtos/dto-input-employee";
import {DtoInputFunction} from "./dto-input-function";

export interface DtoInputEmployeeOfCompany {
  idCompanies: number;
  idAccount: number;
  idFunctions: number;
  idHas: number;
  account: DtoInputEmployee;
  function: DtoInputFunction;
}
