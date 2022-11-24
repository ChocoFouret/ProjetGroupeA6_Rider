export interface DtoOutputCreateEvents {
  // Date de début, contient également l'heure
  startDate: string;

  // Date de fin, contient également l'heure
  endDate: string;

  // Numéro unique de l'événement
  idEventsEmployee: number;

  // Numéro de l'employé
  idAccount: number;

  idSchedule: number;

  idWork: number | null;
  idAbsents: number | null;
  idHolidays: number | null;
}
