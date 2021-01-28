import {EmergencyContact} from './emergency-contact';
import {Intervenant} from './intervenant';
import {Doctor} from './doctor';
import {OtherPerson} from './other-person';

export interface Person {
  active: 'Oui' | 'Non';
  lname: string;
  fname: string;
  birthday: Date;
  sexe: 'Homme' | 'Femme';
  address: string;
  phone: number;
  NAS: number;
  healthIssues: string;
  workCity: 0 | 1 | 2 | 3; // Trois-Rivières, Shawinigan, Louiseville, St-Tite
  startDate: Date;
  endDate: Date;
  reference: string;
  residenceType: string; // appartement, famille d’accueil, logement supervisé, etc.
  educationalLevel: string; // aucun diplôme, études secondaires, études professionnelles, études collégiales, études universitaires

  // ???? 	Participation à un programme d’employabilité: date de début, date de fin

  departureReason: 'Emploi' | 'Retour aux études' | 'Problèmes de santé mentale';
  hoursPerDay: number;
  status: 'Clientèle' | 'Employés réguliers'; // (administration, intervenant, soutien)
  roamingTracking: boolean;
  communityWork: boolean;
  hourlyRate: number;
  responsibleIntervenantID: number;
  emergencyContact: EmergencyContact;
  followedBy: Intervenant | EmergencyContact | Doctor | OtherPerson;
}
