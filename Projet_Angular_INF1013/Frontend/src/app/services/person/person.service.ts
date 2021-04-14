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
  personFullnameSubject = new Subject<any>();
  errorsSubject: Subject<string> = new Subject<string>();
  activateDesactivateSubject = new Subject<any>();
  personsSubject = new Subject<any>();
  personSubject = new Subject<any>();


  constructor(private router: Router, private httpClient: HttpClient, private utilitiesService: UtilitiesService)
  {}

  // Fonction pour ajouter une personne
  addPerson(person: Person): void{
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(person);
    this.httpClient.post(this.utilitiesService.serverUrl + 'persons/add', body, {headers}).subscribe(
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
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(person);
    this.httpClient.put(this.utilitiesService.serverUrl + 'persons/edit', body, {headers}).subscribe(
      (data: any) => {
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
    const headers = { 'content-type': 'application/json'};
    this.httpClient.patch(this.utilitiesService.serverUrl + 'persons/activeDesactive/' + id + '/' + activeDesactive, {},{headers}).subscribe(
      (user: any) => {
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




/*
// Fonction pour récupérer le nom complet de la personne
public personFullName(id: number): void {
  this.httpClient.get(this.utilitiesService.serverUrl + 'persons/getFullName/' + id).subscribe(
    (fullName: any) => {
      this.personFullnameSubject.next(fullName);
    },
    (error) => {
      const message = 'Un erreur au niveau du serveur est survenu lors de la récupération des personnes';
      this.emitErrorsSubject(error.error);
    }
  );
}
*/
  /*
// Fonction pour générer les données lié aux docteurs
private mockDoctorData(): Doctor{
return {interfaceName: 'Doctor', lname: 'protou', fname: 'colin', email: 'test1@doctor.ca', fax: 8888888888, phone: 9333333333};
}
// Fonction pour générer les données lié aux contactes d'urgences
private mockEmergencyContactData(): EmergencyContact{
return this.emergencyContact = {interfaceName: 'EmergencyContact', lname: 'smith', fname: 'john', phone: 8190002222, relation: 'Frère'};
}
// Fonction pour générer les données lié aux personnes
private mockPersonData(): Person[]{
return [
  {
    interfaceName: 'Person',
    id: 0,
    active: 'Oui',
    lname: 'blo',
    fname: 'joe',
    birthday: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    sexe: 'Homme',
    address: '1000 rue des forges',
    phone: 8195554455 ,
    NAS: 123456789 ,
    healthIssues: 'Diabète',
    workCityID: 0,
    startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    endDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    referenceID: 1,
    residenceTypeID: 0,
    educationalLevelID: 0,

    programStartDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    programEndDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),

    departureReasonID: 1,
    hoursPerDay: 8,
    statusID: 1,
    roamingTracking: true,
    roamingStartDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    roamingEndDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    communityWork: true,
    communityStartDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    communityEndDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    hourlyRate: 20,
    transportFees: 5,
    responsibleIntervenantID: 1,
    emergencyContact: this.mockEmergencyContactData(),
    followedBy: this.mockEmergencyContactData()
  },
  {
    interfaceName: 'Person',
    id: 1,
    active: 'Oui',
    lname: 'plante',
    fname: 'marcel',
    birthday: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    sexe: 'Homme',
    address: '200 rue saint-jean',
    phone: 5142229999 ,
    NAS: 987654321 ,
    healthIssues: 'Aucun',
    workCityID: 2,
    startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    endDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    referenceID: 2,
    residenceTypeID: 1,
    educationalLevelID: 1,

    programStartDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    programEndDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),

    departureReasonID: 2,
    hoursPerDay: 3,
    statusID: 2,
    roamingTracking: true,
    roamingStartDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    roamingEndDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    communityWork: false,
    communityStartDate: null,
    communityEndDate: null,
    hourlyRate: 22,
    transportFees: 5,
    responsibleIntervenantID: 2,
    emergencyContact: this.mockEmergencyContactData(),
    followedBy: this.mockEmergencyContactData()
  },
  {
    interfaceName: 'Person',
    id: 2,
    active: 'Oui',
    lname: 'boucher',
    fname: 'Linette',
    birthday: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    sexe: 'Femme',
    address: '200 rue saint-jean',
    phone: 4508886666 ,
    NAS: 456789123 ,
    healthIssues: 'Aucun',
    workCityID: 1,
    startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    endDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    referenceID: 0,
    residenceTypeID: 2,
    educationalLevelID: 2,

    programStartDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
    programEndDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),

    departureReasonID: 0,
    hoursPerDay: 6,
    statusID: 0,
    roamingTracking: false,
    roamingStartDate: null,
    roamingEndDate: null,
    communityWork: false,
    communityStartDate: null,
    communityEndDate: null,
    hourlyRate: 25.75,
    transportFees: 5,
    responsibleIntervenantID: 1,
    emergencyContact: this.mockEmergencyContactData(),
    followedBy: this.mockDoctorData()
  }
];
}
*/
}
