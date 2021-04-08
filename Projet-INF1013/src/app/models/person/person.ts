import {EmergencyContact} from '../emergency/emergency-contact';
import {Intervenant} from '../intervenant/intervenant';
import {Doctor} from '../doctor/doctor';
import {OtherPerson} from '../other-person/other-person';
import {User} from '../users/user';

export interface Person {
  interfaceName: 'Person';
  id: number;
  lname: string;
  fname: string;
  birthday: Date;
  sexe: 'Homme' | 'Femme';
  address: string;
  phone: number;
  NAS: number;
  healthIssues: string;
  workCityID: number; // Trois-Rivières, Shawinigan, Louiseville, St-Tite
  startDate: Date;
  endDate: Date;
  referenceID: number;
  residenceTypeID: number; // appartement, famille d’accueil, logement supervisé
  educationalLevelID: number; // aucun diplôme, études secondaires, études professionnelles, études collégiales, études universitaires
  programStartDate: Date;
  programEndDate: Date;
  departureReasonID: number;
  hoursPerDay: number;
  statusID: number;
  roamingTracking: boolean;
  roamingStartDate: Date;
  roamingEndDate: Date;
  communityWork: boolean;
  communityStartDate: Date;
  communityEndDate: Date;
  hourlyRate: number;
  transportFees: number;
  responsibleIntervenantID: number;
  emergencyContact: EmergencyContact;
  // followedBy: Intervenant | EmergencyContact | Doctor | OtherPerson;
  followedBy: User | EmergencyContact | Doctor | OtherPerson;
  active: boolean;
}
