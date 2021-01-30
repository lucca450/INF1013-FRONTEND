import { Injectable } from '@angular/core';
import {Doctor} from '../models/doctor';
import {Person} from '../models/person';
import {EmergencyContact} from '../models/emergency-contact';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  doctors: Doctor[];
  persons: Person[];
  emergencyContact: EmergencyContact;

  constructor()
  {
    /*this.doctors = this.mockDoctorData(); */
    this.persons = this.mockPersonData();
  }

  private mockDoctorData(): Doctor[]{
    return [
      {lname: 'moumoua', fname: 'dau', email: 'test1@gmail.ca', fax: 1111111111, phone: 1111111111},
      {lname: 'doudou', fname: 'aby', email: 'test2@gmail.ca', fax: 2222222222, phone: 2222222222},
      {lname: 'prot', fname: 'col', email: 'test3@gmail.ca', fax: 3333333333, phone: 3333333333}
    ];
  }

  private mockEmergencyContactData(): EmergencyContact{
    return this.emergencyContact = {lname: 'smith', fname: 'john', phone: 8190002222, relation: 'Frère'};
  }

  private mockPersonData(): Person[]{
    return [
      {
        active: 'Oui',
        lname: 'blo',
        fname: 'joe',
        birthday: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        sexe: 'Homme',
        address: '1000 rue des forges',
        phone: 8195554455 ,
        NAS: 123456789 ,
        healthIssues: 'Diabète',
        workCity: 0,
        startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        endDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        reference: 'Aucune',
        residenceType: 'appartement',
        educationalLevel: 'études secondaires',

        /*Manque des champs qui sont dans le document*/

        departureReason: 'Problèmes de santé mentale',
        hoursPerDay: 8,
        status: 'Clientèle',
        roamingTracking: true,
        communityWork: true,
        hourlyRate: 20,
        responsibleIntervenantID: 1,
        emergencyContact: this.mockEmergencyContactData(),
        followedBy: this.mockEmergencyContactData()
      },
      {
        active: 'Oui',
        lname: 'plante',
        fname: 'marcel',
        birthday: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        sexe: 'Homme',
        address: '200 rue saint-jean',
        phone: 5142229999 ,
        NAS: 987654321 ,
        healthIssues: 'Aucun',
        workCity: 2,
        startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        endDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        reference: 'Aucune',
        residenceType: 'logement supervisé',
        educationalLevel: 'études universitaires',

        /*Manque des champs qui sont dans le document*/

        departureReason: 'Emploi',
        hoursPerDay: 3,
        status: 'Employés réguliers',
        roamingTracking: true,
        communityWork: false,
        hourlyRate: 22,
        responsibleIntervenantID: 2,
        emergencyContact: this.mockEmergencyContactData(),
        followedBy: this.mockEmergencyContactData()
      },
      {
        active: 'Oui',
        lname: 'boucher',
        fname: 'Linette',
        birthday: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        sexe: 'Femme',
        address: '200 rue saint-jean',
        phone: 4508886666 ,
        NAS: 456789123 ,
        healthIssues: 'Aucun',
        workCity: 1,
        startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        endDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        reference: 'Aucune',
        residenceType: 'famille d’accueil',
        educationalLevel: 'études collégiales',

        /*Manque des champs qui sont dans le document*/

        departureReason: 'Retour aux études',
        hoursPerDay: 6,
        status: 'Employés réguliers',
        roamingTracking: false,
        communityWork: false,
        hourlyRate: 25.75,
        responsibleIntervenantID: 1,
        emergencyContact: this.mockEmergencyContactData(),
        followedBy: this.mockEmergencyContactData()
      }
    ];
  }



}
