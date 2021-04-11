import { Injectable } from '@angular/core';
import {Meeting} from '../../models/meeting/meeting';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user/user.service';
import {UtilitiesService} from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  loggedUser = this.userService.user;
  meetingSubject = new Subject<any[]>();
  PersonMeetingsSubject = new Subject<any[]>();
  errorsSubject: Subject<string> = new Subject<string>();

  constructor(private router: Router, private userService: UserService,  private httpClient: HttpClient, private utilitiesService: UtilitiesService) {
  }

  // Fonction pour modifier une rencontre
  editMeeting(meeting: Meeting, personid: number): void{

    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(meeting);

    console.log(body);
    console.log('personid' + personid);

    this.httpClient.put(/*'http://localhost:3000/meeting/'*/ this.utilitiesService.serverUrl + 'meetings/edit' /*+ meeting.id*/, body, {headers}).subscribe(
      (meet: any) => {
        this.meetingSubject.next(meet);
        if (isNaN(personid) === false){
          this.router.navigate(['meeting/' + personid]);
        }else {
          this.router.navigate(['meeting']);
        }
      },
      (error) => {
        const message = 'Une erreur au niveau du serveur est survenu lors de la modification de la rencontre. Veuillez réessayer plus tard';
        this.errorsSubject.next(message);
      }
    );
  }

  // Fonction pour annuler une rencontre et revenir à l'étape précédente
  cancelMeeting(personid: number): void {
    if (isNaN(personid) === false){
      this.router.navigate(['meeting/' + personid]);
    }else {
      this.router.navigate(['meeting']);
    }
   // this.router.navigate(['meeting']);
  }

  // Retourne tous les meetings
  public getAllMeetings(): Observable<Meeting> {
    return this.httpClient.get<Meeting>(/*`http://localhost:3000/meeting`*/ this.utilitiesService.serverUrl + 'meetings/getAll');
  }

  // Retourne tous les meetings d'un intervenant
  public getMeetingsFromIntervenantId(id: number): Observable<Meeting> {
    return this.httpClient.get<Meeting>(/*`http://localhost:3000/meeting?idIntervenant=`*/ this.utilitiesService.serverUrl + 'meetings/getByIntervenantId/' + id);
  }

  // Retourne un meeting spécifique
  public getMeetingFromId(id: number): void {
    this.httpClient.get<Meeting>(/*`http://localhost:3000/meeting?id=`*/ this.utilitiesService.serverUrl + 'meetings/get/' + id).subscribe(
        (meet: any) => {
          this.meetingSubject.next(meet);
        },
        (error) => {
          if (!(error.status === 404)) {
            const message = 'Un erreur au niveau du serveur est survenu lors du chargement de la rencontre. Veuillez réessayer plus tard';
            this.errorsSubject.next(message);
          }
        }
      );

  }

  // Fonction pour ajouter une rencontre
  public addMeeting(meeting: Meeting, personid: number): void{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(meeting);

    this.httpClient.post(this.utilitiesService.serverUrl + 'meetings/add', body, {headers}).subscribe(
      (meet: any) => {
            this.meetingSubject.next(meet);

            if (isNaN(personid) === false){
              this.router.navigate(['meeting/' + personid]);
            }else {
              this.router.navigate(['meeting']);
            }

      },
      (error) => {
        const message = 'Une erreur au niveau du serveur est survenu lors de l\'ajout de la rencontre. Veuillez réessayer plus tard';
        this.errorsSubject.next(message);
      }
    );
  }

  // Fonction pour charger toutes les rencontres
  public loadAllMeetings(): void{
    this.loggedUser = this.userService.user;
    // Si c'est un administrateur, on récupère toutes les rencontres
    if (this.loggedUser.role === 'A'){
      this.getAllMeetings().subscribe(
        (meeting: any) => {
          this.meetingSubject.next(meeting);
        },
        (error) => {
          if (!(error.status === 404)) {
            const message = 'Une erreur au niveau du serveur est survenu lors du chargement des rencontres. Veuillez réessayer plus tard';
            this.errorsSubject.next(message);
          }
        }
      );
      //  Sinon c'est un intervenant,alors on récupère seulement ses rencontres à lui
    }else{
      this.getMeetingsFromIntervenantId(this.loggedUser.id).subscribe(
        (meeting: any) => {
          this.meetingSubject.next(meeting);
        },
        (error) => {
          if (!(error.status === 404)) {
            const message = 'Une erreur au niveau du serveur est survenu lors du chargement des rencontres. Veuillez réessayer plus tard';
            this.errorsSubject.next(message);
          }
        }
      );
    }
  }


  // Retourne tous les meetings d'un intervenant
  public getPersonMeetings(id: number): Observable<Meeting> {
    return this.httpClient.get<Meeting>(/*`http://localhost:3000/meeting?idPerson=`*/ this.utilitiesService.serverUrl + 'meetings/getByPersonId/' + id);
  }
  // Fonction qui charge les rencontres de la personnes
  public loadPersonMeetings(id: number): void{
    this.loggedUser = this.userService.user;
    this.getPersonMeetings(id).subscribe(
        (meeting: any) => {
          this.PersonMeetingsSubject.next(meeting);
        },
        (error) => {
          if (!(error.status === 404)) {
            const message = 'Une erreur au niveau du serveur est survenu lors du chargement des rencontres. Veuillez réessayer plus tard';
            this.errorsSubject.next(message);
          }
        }
      );
  }

}
