import {DtoInputEmployee} from "../../../util/management/dtos/dto-input-employee";
import {DtoInputFunctions} from "./dto-input-functions";

export interface DtoInputHas {
  idCompanies:number;
  idAccount:number;
  idFunctions:number;
  idHas:number;
  account:DtoInputEmployee;
  function:DtoInputFunctions;
}
