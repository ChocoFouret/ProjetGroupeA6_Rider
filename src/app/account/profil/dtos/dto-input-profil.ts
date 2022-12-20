import {DtoInputAddress} from "./dto-input-address";
import {DtoInputCompany} from "../../../administrator/management-companies/dtos/dto-input-company";

export interface DtoInputProfil {
  idAccount : number;
  firstName : string;
  lastName : string;
  email : string;
  pictureURL : string;
  phone: string;
  address : DtoInputAddress;
  companies: DtoInputCompany;
  function : string;
}
