import { Injectable } from '@angular/core';
import {Meeting} from '../../models/meeting/meeting';
import {Router} from '@angular/router';
import {Person} from '../../models/person/person';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  meetings: Meeting[];
  constructor(private router: Router) {
    this.meetings = this.mockMeetingData();
  }
  // Fonction pour générer les données lié aux rencontres
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
  // Fonction pour récupérer la rencontre selon son identifiant
  public getMeetingFromID(id: number): Meeting {
    let meeting: Meeting;
    // tslint:disable-next-line:only-arrow-functions typedef
    meeting = this.meetings.find(function(m: Meeting) {
      return m.id === id;
    });
    return meeting;
  }
  // Fonction pour ajouter une rencontre
  addMeeting(): void{
    this.router.navigate(['meeting']);
  }
  // Fonction pour modifié une rencontre
  editMeeting(): void{
    this.router.navigate(['meeting']);
  }

  // Fonction pour annuler une rencontre et revenir à l'étape précédente
  cancelMeeting() {
    this.router.navigate(['meeting']);
  }
}
