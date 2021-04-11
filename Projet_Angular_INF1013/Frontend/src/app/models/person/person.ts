export interface Person {
  id: number;
  interfaceName: 'Person';
  lname: string;
  fname: string;
  birthday: Date;
  sexe: 'Homme' | 'Femme';
  address: string;
  phone: string;
  nas: number;
  healthIssues: string;
  workCityId: number; // Trois-Rivières, Shawinigan, Louiseville, St-Tite
  startDate: Date;
  endDate: Date;
  referenceId: number;
  residenceTypeId: number; // appartement, famille d’accueil, logement supervisé
  educationalLevelId: number; // aucun diplôme, études secondaires, études professionnelles, études collégiales, études universitaires
  programStartDate: Date;
  programEndDate: Date;
  departureReasonId: number;
  hoursPerDay: number;
  statusId: number;
  roamingTracking: boolean;
  roamingStartDate: Date;
  roamingEndDate: Date;
  communityWork: boolean;
  communityStartDate: Date;
  communityEndDate: Date;
  hourlyRate: number;
  transportFees: number;
  responsibleIntervenantId: number;
  emergencyContactId: number //EmergencyContact;
  // followedBy: Intervenant | EmergencyContact | Doctor | OtherPerson;
  followedById: number; //User | EmergencyContact | Doctor | OtherPerson;
  active: boolean;
}
