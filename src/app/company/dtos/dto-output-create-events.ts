export interface DtoOutputCreateEvents {
  // Date de début, contient également l'heure
  startDate: string;

  // Date de fin, contient également l'heure
  endDate: string;

  // Numéro unique de l'événement
  idEventsEmployee: string;

  // Numéro de l'employé
  idAccount: number;

  idCompanies: number;

  types: string;
  isValid: boolean;
  comments: string;
}
