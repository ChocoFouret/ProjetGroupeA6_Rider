export interface DtoOutputUpdateEmployee {
  // Identification
  idAccount: number;

  // Personal
  firstName: string;
  lastName: string;
  phone: string;
//  street: string;
//  number: string;
//  postCode: number;
//  city: string;

  email: string;

  // Work
  isAdmin: boolean | null;

  // Other
  pictureURL: string;
}
