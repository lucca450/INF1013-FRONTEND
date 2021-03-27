import { Injectable } from '@angular/core';
import {Meeting} from '../../models/meeting/meeting';
import {Router} from '@angular/router';
import {Person} from '../../models/person/person';
import {Intervenant} from '../../models/intervenant/intervenant';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  meetings: Meeting[];
  //meetings: any[] = [];
  loggedUser = this.userService.user;
  meetingSubject = new Subject<any[]>();
  errorsSubject: Subject<string> = new Subject<string>();

  constructor(private router: Router, private userService: UserService,  private httpClient: HttpClient) {
    // this.meetings = this.mockMeetingData();
    console.log('constructeur');

    console.log(this.loggedUser.role);
    console.log(this.loggedUser.id);
    if (this.loggedUser.role === 'A'){
      this.getAllMeetings().subscribe(
        (meeting: any) => {
          this.meetings = meeting;
          this.emitMeetingSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }else{
      this.getMeetingsFromID(this.loggedUser.id).subscribe(
        (meeting: any) => {
          this.meetings = meeting;
          this.emitMeetingSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }

  }

  editMeeting(): void{
    this.router.navigate(['meeting']);
  }

  // Fonction pour annuler une rencontre et revenir à l'étape précédente
  cancelMeeting(): void {
    this.router.navigate(['meeting']);
  }

  // Retourne tous les meetings
  public getAllMeetings(): Observable<Meeting> {
    return this.httpClient.get<Meeting>(`http://localhost:3000/meeting`);
  }

  // Retourne tous les meetings d'un intervenant
  public getMeetingsFromID(id: number): Observable<Meeting> {
    return this.httpClient.get<Meeting>(`http://localhost:3000/meeting?idIntervenant=` + id);
  }

  public addMeeting(meeting: Meeting): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(meeting);
    console.log(body);
    return this.httpClient.post('http://localhost:3000/meeting', body, {'headers': headers});

  }


  private emitMeetingSubject(): void {
    this.meetingSubject.next(this.meetings.slice());
  }

  private emitErrorsSubject(message: string): void {
    this.errorsSubject.next(message);
  }

}
