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

  loggedUser = this.userService.user;
  meetingSubject = new Subject<any[]>();
  PersonMeetingsSubject = new Subject<any[]>();
  errorsSubject: Subject<string> = new Subject<string>();

  constructor(private router: Router, private userService: UserService,  private httpClient: HttpClient) {

   /* console.log(this.loggedUser.role);
    console.log(this.loggedUser.id);*/
    this.loadAllMeetings();

  }

  editMeeting(meeting: Meeting): void{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(meeting);

    this.httpClient.put('http://localhost:3000/meeting/' + meeting.id, body, {'headers': headers}).subscribe(
      (meet: any) => {
        this.meetingSubject.next(meet);
        this.router.navigate(['meeting']);
      },
      (error) => {
        const message = 'Une erreur au niveau du serveur est survenu lors de la modification de la rencontre. Veuillez réessayer plus tard';
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
    return this.httpClient.get<Meeting>(`http://localhost:3000/meeting`);
  }

  // Retourne tous les meetings d'un intervenant
  public getMeetingsFromIntervenantId(id: number): Observable<Meeting> {
    return this.httpClient.get<Meeting>(`http://localhost:3000/meeting?idIntervenant=` + id);
  }

  // Retourne un meeting spécifique
  public getMeetingFromId(id: number) {
    this.httpClient.get<Meeting>(`http://localhost:3000/meeting?id=` + id).subscribe(
        (meet: any) => {
          this.meetingSubject.next(meet);
        },
        (error) => {
          const message = 'Un erreur au niveau du serveur est survenu lors du chargement de la rencontre. Veuillez réessayer plus tard';
          this.errorsSubject.next(message);
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
        const message = 'Une erreur au niveau du serveur est survenu lors de l\'ajout de la rencontre. Veuillez réessayer plus tard';
        this.errorsSubject.next(message);
      }
    );
  }

  public loadAllMeetings(): void{
    if (this.loggedUser.role === 'A'){
      this.getAllMeetings().subscribe(
        (meeting: any) => {
          this.meetingSubject.next(meeting);
        },
        (error) => {
          const message = 'Une erreur au niveau du serveur est survenu lors du chargement des rencontres. Veuillez réessayer plus tard';
          this.errorsSubject.next(message);
        }
      );
    }else{
      this.getMeetingsFromIntervenantId(this.loggedUser.id).subscribe(
        (meeting: any) => {
          this.meetingSubject.next(meeting);
        },
        (error) => {
          const message = 'Une erreur au niveau du serveur est survenu lors du chargement des rencontres. Veuillez réessayer plus tard';
          this.errorsSubject.next(message);
        }
      );
    }
  }


  // Retourne tous les meetings d'un intervenant
  public getPersonMeetings(id: number): Observable<Meeting> {
    return this.httpClient.get<Meeting>(`http://localhost:3000/meeting?idPerson=` + id);
  }

  public loadPersonMeetings(id: number): void{
      this.getPersonMeetings(id).subscribe(
        (meeting: any) => {
          this.PersonMeetingsSubject.next(meeting);
        },
        (error) => {
          const message = 'Une erreur au niveau du serveur est survenu lors du chargement des rencontres. Veuillez réessayer plus tard';
          this.errorsSubject.next(message);
        }
      );
  }

}
