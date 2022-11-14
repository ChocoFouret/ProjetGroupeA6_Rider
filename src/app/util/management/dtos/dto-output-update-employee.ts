export interface DtoOutputUpdateEmployee {
  // Identification
  id: number;

  // Personal
  firstName: string;
  lastName: string;

  street: string;
  number: string;
  postCode: number;
  city: string;

  // Connection
  email: string;

  // Work
  function: string;
  isChief: boolean;

  // Other
  pictureURL:string;
}
