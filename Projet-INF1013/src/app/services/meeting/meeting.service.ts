import { Injectable } from '@angular/core';
import {Meeting} from '../../models/meeting/meeting';
import {Router} from '@angular/router';
import {Person} from '../../models/person/person';
import {Intervenant} from '../../models/intervenant/intervenant';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {


  constructor(private router: Router, private httpClient: HttpClient) {
    // this.meetings = this.mockMeetingData();
    console.log('constructeur');
    this.getAllMeetings();
  }

  //meetings: any[] = [];

  public meetings = [];

  meetingsSubject = new Subject<any[]>();
/*
  meeting: any =
    [
      {
        id: '',
        notes: '',
        followup: '',
        idPerson: '',
        goals: '',
        idIntervenant: ''
      }
    ];*/


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
 /* addMeeting(): void{
    this.router.navigate(['meeting']);
  }*/
  // Fonction pour modifié une rencontre
  editMeeting(): void{
    this.router.navigate(['meeting']);
  }

  // Fonction pour annuler une rencontre et revenir à l'étape précédente
  cancelMeeting(): void {
    this.router.navigate(['meeting']);
  }

  public getAllMeetings(): Observable<Meeting> {
    const url = 'http://localhost:3000/Meeting';
    return this.httpClient.get<Meeting>(url);
  }

  public addMeeting(meeting: Meeting): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(meeting);
    console.log(body);
    return this.httpClient.post('http://localhost:3000/Meeting', body, {'headers': headers});

  }



/*
  private getAllMeetings(): void {
    console.log('Get all meetings --- DEBUT');
    const url = 'http://localhost:3000/Meeting';
    this.httpClient.get(url).subscribe(meet => {

      console.log('meet ' + JSON.stringify(meet));


      this.meeting = meet;

      for (let i = 0; i < this.meeting.length; i++) {

        console.log('ID MEETING : ' + this.meeting[i].id);
        this.meetings.push(
            {
              id: this.meeting[i].id,
              notes: this.meeting[i].notes,
              followup: this.meeting[i].followup,
              idPerson: this.meeting[i].idPerson,
              goals: this.meeting[i].goals,
              idIntervenant: this.meeting[i].idIntervenant
            }
          );
      }
      console.log('Get all meetings --- END');
      this.emitMeetingSubject();
    });
  }

  private emitMeetingSubject(): void {
    this.meetingsSubject.next(this.meetings.slice());
  }
 */
}
