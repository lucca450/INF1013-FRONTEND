import { Injectable } from '@angular/core';
import {Meeting} from '../../models/meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  meetings: Meeting[];
  constructor() {
    this.meetings = this.mockMeetingData();
  }
  private mockMeetingData(): Meeting[]{
    return [
      {
        id: 0,
        notes: 'Meeting sur le développement',
        followup: 'followup',
        goals: 'Avancer le développement',
        idPerson: 0,
        idIntervenant: 0
      },
      {
        id: 1,
        notes: 'Meeting sur l analyse',
        followup: 'followup1',
        goals: 'Avancer l analyse',
        idPerson: 1,
        idIntervenant: 0
      },
      {
        id: 2,
        notes: 'Meeting sur la recherche',
        followup: 'followup2',
        goals: 'Faire des recherches',
        idPerson: 0,
        idIntervenant: 0
      },
      {
        id: 3,
        notes: 'Meeting avec le client',
        followup: 'followup3',
        goals: 'Faire un contract avec le client',
        idPerson: 1,
        idIntervenant: 0
      }
    ];
  }
}
