import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PersonService} from '../../../services/person/person.service';
import {Person} from '../../../models/person/person';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Gender} from '../../../enum/gender.enum';
import {WorkCityService} from '../../../services/workCity/work-city.service';
import {DepartureReasonService} from '../../../services/departureReason/departure-reason.service';
import {StatusService} from '../../../services/status/status.service';
import {EducationLevelService} from '../../../services/educationLevel/education-level.service';
import {ResidenceTypeService} from '../../../services/residenceType/residence-type.service';
import {ReferenceService} from '../../../services/reference/reference.service';
import {Subscription} from 'rxjs';
import {EmergencyContact} from "../../../models/emergency/emergency-contact";
import {FollowedBy} from "../../../models/followedBy/followedBy";
import {EmergencyContactService} from "../../../services/emergencyContact/emergency-contact.service";
import {FollowedByService} from "../../../services/followedBy/followed-by.service";

@Component({
  selector: 'app-details-person',
  templateUrl: './details-person.component.html',
  styleUrls: ['./details-person.component.css']
})
export class DetailsPersonComponent implements OnInit, OnDestroy {

  errorMessage: string;
  person: Person;
  departureReasonName: string;
  status: string;
  city: string;
  residenceType: string;
  educationLevel: string;
  reference: string;
  workCity: string;
  isSlideChecked = false;
  emergencyContact: EmergencyContact;
  followedBy: FollowedBy;
  // Énumération
  gender = Object.keys(Gender).map(key => Gender[key]);
  // Récupération des services

  intervenant = this.intervenantService;
  fullname: string;

  // Subscription
  errorsSubscription: Subscription;
  personSubscription: Subscription;
  personFullNameSubscription: Subscription;
  departureReasonSubscription: Subscription;
  statusSubscription: Subscription;
  workCitySubscription: Subscription;
  residenceTypeSubscription: Subscription;
  educationLevelSubscription: Subscription;
  referenceSubscription: Subscription;
  emergencyContactSubscription: Subscription;
  followedBySubscription: Subscription;

  constructor(private personService: PersonService ,
              private intervenantService: IntervenantService,
              private departureReasonService: DepartureReasonService,
              private statusService: StatusService,
              private workCityService: WorkCityService,
              private residenceTypeService: ResidenceTypeService,
              private referenceService: ReferenceService,
              private educationLevelService: EducationLevelService,
              private emergencyContactService: EmergencyContactService,
              private followedByService: FollowedByService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      // Vérification pour savoir si une requête à eu une erreur.
      this.errorsSubscription = this.personService.errorsSubject.subscribe(
        (error: any) => {
          this.errorMessage = error;
        }
      );
      const id =	Number(params.get('id'));

      // Appel de la méthode qui récupère les informations de la personne
      this.personService.getPersonFromId(id);
      // On écoute la requête.
      this.personSubscription = this.personService.personSubject.subscribe(
        (person: any) => {
          console.log('Person find');
          console.log(person);
          this.person = person;
          this.SetAllAttributes(person);
        },
        (error: any) => {
          this.errorMessage = error;
        }
      );
    });
  }
  // Fonction pour modifier tous les attributs.
  private SetAllAttributes(person: Person): void{

    // On observe les requêtes qu'on va faire.
    this.personFullNameSubscription = this.intervenantService.intervenantsFullnameSubject.subscribe(
      (fullname: any) => {
        this.fullname = fullname;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.departureReasonSubscription = this.departureReasonService.departureReasonSubject.subscribe(
      (name: any) => {
        this.departureReasonName = name;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );
    this.statusSubscription = this.statusService.statusSubject.subscribe(
      (name: any) => {
        this.status = name;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.workCitySubscription = this.workCityService.workCitySubject.subscribe(
      (name: any) => {
        this.workCity = name;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.residenceTypeSubscription = this.residenceTypeService.residenceTypeSubject.subscribe(
      (name: any) => {
        this.residenceType = name;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.educationLevelSubscription = this.educationLevelService.educationLevelSubject.subscribe(
      (name: any) => {
        this.educationLevel = name;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.referenceSubscription = this.referenceService.referenceSubject.subscribe(
      (name: any) => {
        this.reference = name;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.emergencyContactSubscription = this.emergencyContactService.emergencyContactSubject.subscribe(
      (emergencyContact: any) => {
        this.emergencyContact = emergencyContact;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.followedBySubscription = this.followedByService.followBySubject.subscribe(
      (followedBy: any) => {
        this.followedBy = followedBy;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    // On fait nos requêtes
    this.intervenantService.intervenantFullName(person.responsibleIntervenantId);
    this.departureReasonService.getDepartureReasonName(person.departureReasonId);
    this.statusService.getStatusName(person.statusId);
    this.workCityService.getWorkCityName(person.workCityId);
    this.residenceTypeService.getResidencesTypeName(person.residenceTypeId);
    this.educationLevelService.getEducationLevelName(person.educationalLevelId);
    this.referenceService.getReferenceName(person.referenceId);
    this.emergencyContactService.getEmergencyContactById(this.person.emergencyContactId);
    this.followedByService.getFollowedById(this.person.followedById);
  }

  // Fonction pour gèrer le slider du NAS.
  toggleChanges($event: MatSlideToggleChange): void {
    this.isSlideChecked = $event.checked;
  }

  ngOnDestroy(): void {
    this.errorsSubscription.unsubscribe();
    this.personSubscription.unsubscribe();
    this.personFullNameSubscription.unsubscribe();
    this.departureReasonSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
    this.workCitySubscription.unsubscribe();
    this.residenceTypeSubscription.unsubscribe();
    this.educationLevelSubscription.unsubscribe();
    this.referenceSubscription.unsubscribe();
    this.emergencyContactSubscription.unsubscribe();
    this.followedBySubscription.unsubscribe();
  }
}

