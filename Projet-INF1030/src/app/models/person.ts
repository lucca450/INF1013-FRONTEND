import {EmergencyContact} from './emergency-contact';
import {Intervenant} from './intervenant';
import {Doctor} from './doctor';
import {OtherPerson} from './other-person';
import {City} from '../enum/city';

export interface Person {
  interfaceName: 'Person';
  id: number;
  active: 'Oui' | 'Non';
  lname: string;
  fname: string;
  birthday: Date;
  sexe: 'Homme' | 'Femme';
  address: string;
  phone: number;
  NAS: number;
  healthIssues: string;
  workCity: string // Trois-Rivières, Shawinigan, Louiseville, St-Tite
  startDate: Date;
  endDate: Date;
  reference: string;
  residenceType: string; // appartement, famille d’accueil, logement supervisé
  educationalLevel: string; // aucun diplôme, études secondaires, études professionnelles, études collégiales, études universitaires

  programStartDate: Date;
  programEndDate: Date;

  departureReason: 'Emploi' | 'Retour aux études' | 'Problèmes de santé mentale' | 'Problèmes de santé physique' | 'Déménagement' | 'Fin de contrat/projet' | 'Décès' | 'Autres';
  hoursPerDay: number;
  status: 'Clientèle' | 'Employés réguliers'; // (administration, intervenant, soutien)
  roamingTracking: boolean;
  communityWork: boolean;
  hourlyRate: number;
  transportFees: number;
  responsibleIntervenantID: number;
  emergencyContact: EmergencyContact;
  followedBy: Intervenant | EmergencyContact | Doctor | OtherPerson;
}
