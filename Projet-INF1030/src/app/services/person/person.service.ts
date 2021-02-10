import { Injectable } from '@angular/core';
import {Doctor} from '../../models/doctor';
import {Person} from '../../models/person';
import {EmergencyContact} from '../../models/emergency-contact';
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

  private mockDoctorData(): Doctor{
    return {interfaceName: 'Doctor', lname: 'protou', fname: 'colin', email: 'test1@doctor.ca', fax: 8888888888, phone: 9333333333};
  }

  private mockEmergencyContactData(): EmergencyContact{
    return this.emergencyContact = {interfaceName: 'EmergencyContact', lname: 'smith', fname: 'john', phone: 8190002222, relation: 'Frère'};
  }

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
        workCity: '0',
        startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        endDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        reference: 'Aucune',
        residenceType: 'Appartement',
        educationalLevel: 'Études secondaires',

        programStartDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        programEndDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),

        departureReason: 'Problèmes de santé mentale',
        hoursPerDay: 8,
        status: 'Clientèle',
        roamingTracking: true,
        communityWork: true,
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
        workCity: '2',
        startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        endDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        reference: 'Aucune',
        residenceType: 'Logement supervisé',
        educationalLevel: 'Études universitaires',

        programStartDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        programEndDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),

        departureReason: 'Emploi',
        hoursPerDay: 3,
        status: 'Employés réguliers',
        roamingTracking: true,
        communityWork: false,
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
        workCity: '1',
        startDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        endDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        reference: 'Aucune',
        residenceType: 'Famille d’accueil',
        educationalLevel: 'Études collégiales',

        programStartDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),
        programEndDate: new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)),

        departureReason: 'Retour aux études',
        hoursPerDay: 6,
        status: 'Employés réguliers',
        roamingTracking: false,
        communityWork: false,
        hourlyRate: 25.75,
        transportFees: 5,
        responsibleIntervenantID: 1,
        emergencyContact: this.mockEmergencyContactData(),
        followedBy: this.mockDoctorData()
      }
    ];
  }


  addPerson(): void{
    this.router.navigate(['person']);
  }

  editPerson() {
    this.router.navigate(['person']);
  }
}
