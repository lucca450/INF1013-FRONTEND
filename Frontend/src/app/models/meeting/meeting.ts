export interface Meeting {
  id: number;
  interfaceName: 'Meeting';
  notes: string;
  followup: string;
  goals: string;
  idPerson: number;
  idIntervenant: number;
}
