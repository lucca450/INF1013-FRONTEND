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

 // meetings: Meeting[];
  //meetings: any[] = [];
  loggedUser = this.userService.user;
  meetingSubject = new Subject<any[]>();
  errorsSubject: Subject<string> = new Subject<string>();

  constructor(private router: Router, private userService: UserService,  private httpClient: HttpClient) {
    // this.meetings = this.mockMeetingData();
    console.log('constructeur');

    console.log(this.loggedUser.role);
    console.log(this.loggedUser.id);
    this.loadAllMeetings();

  }
/*
  getMeetingIndexFromId(id: number): any {

    for (let i = 0 ; i < this.meetings.length; i++) {
      if (this.meetings[i].id === id) {
        return i;
      }
    }
  }
*/
  editMeeting(meeting: Meeting): void{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(meeting);
    console.log(body);
    console.log('meeting id');
    console.log(meeting.id);
    this.httpClient.put('http://localhost:3000/meeting/' + meeting.id, body, {'headers': headers}).subscribe(
      (meet: any) => {
     /*   const index = this.getMeetingIndexFromId(meet.id);
        this.meetings[index] = meeting;*/
        this.meetingSubject.next(meet);
        this.router.navigate(['meeting']);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la modification de la rencontre. Veuillez réessayer plus tard';
        this.errorsSubject.next(message);
      }
    );
  }

  // Fonction pour annuler une rencontre et revenir à l'étape précédente
  cancelMeeting(): void {
    this.router.navigate(['meeting']);
  }

  // Retourne tous les meetings
  public getAllMeetings(): Observable<Meeting> {
    console.log('request to the server');
    return this.httpClient.get<Meeting>(`http://localhost:3000/meeting`);
  }

  // Retourne tous les meetings d'un intervenant
  public getMeetingsFromIntervenantId(id: number): Observable<Meeting> {
    console.log('request to the server');
    return this.httpClient.get<Meeting>(`http://localhost:3000/meeting?idIntervenant=` + id);
  }

  // Retourne un meeting spécifique
  public getMeetingFromId(id: number) {
    //const index = this.getMeetingIndexFromId(id);
    //return this.meetings[index];
    //return this.httpClient.get<Meeting>(`http://localhost:3000/meeting?id=` + id);

    this.httpClient.get<Meeting>(`http://localhost:3000/meeting?id=` + id).subscribe(
        (meet: any) => {
          this.meetingSubject.next(meet);
        },
        (error) => {
          const message = 'Un erreur au niveau du serveur est survenu lors de la modification de la rencontre. Veuillez réessayer plus tard';
          this.errorsSubject.next(error.error);
        }
      );

  }

  public addMeeting(meeting: Meeting): void{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(meeting);
    console.log(body);

    this.httpClient.post('http://localhost:3000/meeting', body, {'headers': headers}).subscribe(
      (meet: any) => {
            this.meetingSubject.next(meet);
            this.router.navigate(['meeting']);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de l\'ajout de l\'intervenant. Veuillez réessayer plus tard';
        this.errorsSubject.next(message);
      }
    );
  }

/*
  private emitMeetingSubject(): void {
    this.meetingSubject.next(this.meetings.slice());
  }

  private emitErrorsSubject(message: string): void {
    this.errorsSubject.next(message);
  }
*/
  public loadAllMeetings(): void{
    if (this.loggedUser.role === 'A'){
      this.getAllMeetings().subscribe(
        (meeting: any) => {
          console.log('next');
          this.meetingSubject.next(meeting);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }else{
      this.getMeetingsFromIntervenantId(this.loggedUser.id).subscribe(
        (meeting: any) => {
          console.log('next');
          this.meetingSubject.next(meeting);
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
    }
  }



}
