export interface DtoInputEvent {
  // Date de début, contient également l'heure
  start: string;

  // Date de fin, contient également l'heure
  end: string;

  // Numéro unique de l'événement
  id: number;

  // Numéro de l'employé
  ressource: number;

  // Texte spécifié sur le calendrier
  text:string;
}
