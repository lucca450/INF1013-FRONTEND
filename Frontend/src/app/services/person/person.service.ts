import { Injectable } from '@angular/core';
import {Person} from '../../models/person/person';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {User} from '../../models/users/user';
import {UtilitiesService} from '../utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  errorsSubject: Subject<string> = new Subject<string>();
  activateDesactivateSubject = new Subject<any>();
  personsSubject = new Subject<any>();
  personSubject = new Subject<any>();


  constructor(private router: Router, private httpClient: HttpClient, private utilitiesService: UtilitiesService)
  {}

  // Fonction pour ajouter une personne
  addPerson(person: Person): void{
    const body = JSON.stringify(person);
    this.httpClient.post(this.utilitiesService.serverUrl + 'persons/add', body).subscribe(
      (data: any) => {
        this.emitpersonsSubject(data);
        this.goToMainRoute();
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de l\'ajout de la personne. Veuillez réessayer plus tard';
        this.emitErrorsSubject(message);
      }
    );
  }

  // Fonction pour retourner à la route principale
  goToMainRoute(): void{
    this.router.navigate(['person']);
  }
  // Fonction pour modifier une personne
  editPerson(person: Person): void {
    const body = JSON.stringify(person);
    this.httpClient.put(this.utilitiesService.serverUrl + 'persons/edit', body).subscribe(
      (data: any) => {
        this.utilitiesService.openSuccessSnackBar();
        this.emitpersonsSubject(data);
        this.goToMainRoute();
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la modification de la personne. Veuillez réessayer plus tard.';
        this.emitErrorsSubject(message);
      }
    );
  }

  // Fonction pour activer ou désactiver une personne
  ActiveDesactivePerson(id: number, activeDesactive: boolean): void
  {
    this.httpClient.patch(this.utilitiesService.serverUrl + 'persons/activeDesactive/' + id + '/' + activeDesactive,
      {}).subscribe(
      (user: any) => {
        this.utilitiesService.openSuccessSnackBar();
        this.emitActivateDesactive(0);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la suppression de la personne. Veuillez réessayer plus tard';
        this.emitErrorsSubject(message);
      }
    );
  }
  // Fonction pour annuler une action de la personne et retourner à la route principale.
  cancelPerson(): void {
    this.goToMainRoute();
  }
  // Fonction pour récupèrer les personens actives
  getActivePersons(): void {
    this.httpClient.get<Person>(this.utilitiesService.serverUrl + 'persons/active/get').subscribe(
      (persons: any) => {
        this.emitpersonsSubject(persons);
      },
      (error) => {
        if (!(error.status === 404)) {
          const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des personnes. Veuillez réessayer plus tard.';
          this.emitErrorsSubject(message);
        }
      }
    );
  }

  // Fonction pour rcéupèrer toutes les personnes
  getAllPersons(): void{
    this.httpClient.get(this.utilitiesService.serverUrl + 'persons/getAll').subscribe(
      (users: any) => {
        this.emitpersonsSubject(users);
      },
      (error) => {
        this.emitErrorsSubject('Une erreur s\'est produite avec le serveur lors de la récupérations des personnes. ' +
          'Veuillez réessayer plus tard.');
      }
    );
  }
  // Fonction pour récupèrer une personne à partir de son identifiant.
  getPersonFromId(id: number): void {
    this.httpClient.get<Person>(this.utilitiesService.serverUrl + 'persons/get/' + id).subscribe(
      (person: any) => {
        this.emitpersonSubject(person);
      },
      (error) => {
        const message = 'Un erreur au niveau du serveur est survenu lors de la récupération de la personne';
        this.emitErrorsSubject(message);
      }
    );
  }

  /* Émission des données */
  private emitErrorsSubject(message: string): void {
    this.errorsSubject.next(message);
  }

  private emitActivateDesactive(id: number): void {
    this.activateDesactivateSubject.next(id);
  }

  private emitpersonsSubject(message: string): void {
    this.personsSubject.next(message);
  }

  private emitpersonSubject(message: string): void {
    this.personSubject.next(message);
  }
}
