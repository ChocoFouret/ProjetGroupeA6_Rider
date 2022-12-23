export interface DtoInputEmployee {
  // Identification
  idAccount: number;

  // Personal
  firstName: string;
  lastName: string;

  /*
    street: string;
    number: string;
    postCode: number;
    city: string;
  */

  // Connection
  email: string;
  phone: string;
  password: string;

  // Work
  isAdmin: boolean;
  function: string;
  company: string;

  // Other
  pictureURL: string;
}
