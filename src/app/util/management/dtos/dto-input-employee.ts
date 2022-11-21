export interface DtoInputEmployee {
  // Identification
  idAccount: number;

  // Personal
  firstName: string;
  lastName: string;

  street: string;
  number: string;
  postCode: number;
  city: string;

  // Connection
  email: string;
  password: string;

  // Work
  function: string;
  isAdmin: boolean;

  // Other
  pictureURL:string;
}
