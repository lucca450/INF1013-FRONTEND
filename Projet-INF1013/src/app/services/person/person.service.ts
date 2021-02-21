import { Injectable } from '@angular/core';
import {Doctor} from '../../models/doctor/doctor';
import {Person} from '../../models/person/person';
import {EmergencyContact} from '../../models/emergency/emergency-contact';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  doctors: Doctor[];
  persons: Person[];
  emergencyContact: EmergencyContact;

  constructor(private router: Router)
  {
    /*this.doctors = this.mockDoctorData(); */
    this.persons = this.mockPersonData();
  }
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
  // Fonction pour récupérer le nom complet de la personne
  public personFullName(id: number): string {
    let person: Person;
    // tslint:disable-next-line:only-arrow-functions typedef
    person = this.persons.find(function(p: Person) {
      return p.id === id;
    });
    return person.fname  + ' ' + person.lname;
  }
  // Fonction pour ajouter une personne
  addPerson(): void{
    this.router.navigate(['person']);
  }
  // Fonction pour modifier une personne
  editPerson() {
    this.router.navigate(['person']);
  }

  cancelPerson() {
    this.router.navigate(['person']);
  }
}
