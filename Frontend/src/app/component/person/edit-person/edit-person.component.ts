import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonService} from '../../../services/person/person.service';
import {Person} from '../../../models/person/person';
import {ActivatedRoute} from '@angular/router';
import {WorkCityService} from '../../../services/workCity/work-city.service';
import {Gender} from '../../../enum/gender.enum';
import {StatusService} from '../../../services/status/status.service';
import {ReferenceService} from '../../../services/reference/reference.service';
import {DepartureReasonService} from '../../../services/departureReason/departure-reason.service';
import {EducationLevelService} from '../../../services/educationLevel/education-level.service';
import {ResidenceTypeService} from '../../../services/residenceType/residence-type.service';
import {Subscription} from 'rxjs';
import {dateLessThan} from '../../../Validators/dateLessthan';
import {dateLessThanToday} from '../../../Validators/dateLessThanToday';
import {User} from '../../../models/users/user';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {EmergencyContact} from '../../../models/emergency/emergency-contact';
import {FollowedBy} from '../../../models/followedBy/followedBy';
import {EmergencyContactService} from '../../../services/emergencyContact/emergency-contact.service';
import {FollowedByService} from '../../../services/followedBy/followed-by.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit, OnDestroy {

  intervenants: User[];
  formEditPerson: FormGroup;
  errorMessage: string;
  isLinear = true;
  person: Person;
  // Variables pour les services
  statusList = [];
  referenceList = [];
  cities = [];
  departureReasonList = [];
  educationLevelList = [];
  residenceTypeList = [];
  emergencyContact: EmergencyContact;
  followedBy: FollowedBy;
  // ??num??ration
  genderEnum = Object.entries(Gender).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));

  // Formgroup
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  // Subscription
  errorsSubscription: Subscription;
  personSubscription: Subscription;
  departureReasonSubscription: Subscription;
  statusSubscription: Subscription;
  workCitySubscription: Subscription;
  residenceTypeSubscription: Subscription;
  educationLevelSubscription: Subscription;
  referenceSubscription: Subscription;
  emergencyContactSubscription: Subscription;
  followedBySubscription: Subscription;
  intervenantSubscription: Subscription;


  constructor(private formBuilder: FormBuilder,
              private personService: PersonService,
              private route: ActivatedRoute,
              private statusService: StatusService,
              private refererenceService: ReferenceService,
              private workCityService: WorkCityService,
              private departureReasonService: DepartureReasonService,
              private educationLevelService: EducationLevelService,
              private residenceTypeService: ResidenceTypeService,
              private emergencyContactService: EmergencyContactService,
              private followedByService: FollowedByService,
              private intervenantService: IntervenantService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      // V??rification pour savoir si une requ??te ?? eu une erreur.
      this.errorsSubscription = this.personService.errorsSubject.subscribe(
        (error: any) => {
          this.errorMessage = error;
        }
      );
      const id =	Number(params.get('id'));

      // Appel de la m??thode qui fait la requ??te pour r??cup??rer les informations de la personne
      this.personService.getPersonFromId(id);
      // ??coute la r??ponse de la requ??te
      this.personSubscription = this.personService.personSubject.subscribe(
        (person: any) => {
          this.person = person;
          this.setAllAttributes();
        },
        (error: any) => {
          this.errorMessage = error;
        }
      );
    });
  }
  // Fonction pour modifier les attributs.
  private setAllAttributes(): void{

    // On observe les requ??tes qu'on va faire.
    this.intervenantSubscription = this.intervenantService.intervenantsSubject.subscribe(
      (inter: any) => {
        this.intervenants = inter;
        this.departureReasonService.getDeparturesReason();
      }
    );

    this.departureReasonSubscription = this.departureReasonService.departureReasonsSubject.subscribe(
      (departureReasons: any) => {
        this.departureReasonList = departureReasons;
        this.statusService.getStatus();
      },
      (error: any) => {
        this.errorMessage = error;

      }
    );
    this.statusSubscription = this.statusService.allStatusSubject.subscribe(
      (allStatus: any) => {
        this.statusList = allStatus;
        this.workCityService.getWorkCities();
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.workCitySubscription = this.workCityService.workCitiesSubject.subscribe(
      (workCities: any) => {
        this.cities = workCities;
        this.residenceTypeService.getResidencesType();
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.residenceTypeSubscription = this.residenceTypeService.residencesTypeSubject.subscribe(
      (residencesType: any) => {
        this.residenceTypeList = residencesType;
        this.educationLevelService.getEducationLevels();
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.educationLevelSubscription = this.educationLevelService.educationLevelsSubject.subscribe(
      (educationLevels: any) => {
        this.educationLevelList = educationLevels;
        this.emergencyContactService.getEmergencyContactById(this.person.emergencyContactId);
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );


    this.emergencyContactSubscription = this.emergencyContactService.emergencyContactSubject.subscribe(
      (emergencyContact: any) => {
        this.emergencyContact = emergencyContact;
        this.followedByService.getFollowedById(this.person.followedById);
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.followedBySubscription = this.followedByService.followBySubject.subscribe(
      (followedBy: any) => {
        this.followedBy = followedBy;
        this.refererenceService.getReferences();
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.referenceSubscription = this.refererenceService.referencesSubject.subscribe(
      (references: any) => {
        this.referenceList = references;
        this.initForm();
      },
      (error: any) => {
        this.errorMessage = error;
        this.initForm();
      }
    );

    // Appel de la requ??te qui va r??cup??rer les intervenants actifs et qui va appel?? les prochaines requ??tes qui ??coute
    this.intervenantService.getActiveIntervenants();

  }

  // Fonction pour modifier dynamiquement le 3i??me form.
  setThirdFormGroupValidators(): void {
    const roamingStartDate = this.thirdFormGroup.get('roamingStartDate');
    const roamingEndDate = this.thirdFormGroup.get('roamingEndDate');

    const communityStartDate = this.thirdFormGroup.get('communityStartDate');
    const communityEndDate = this.thirdFormGroup.get('communityEndDate');

    this.thirdFormGroup.get('roamingTracking').valueChanges
      .subscribe(roamingTracking => {
        if (roamingTracking === true) {
          roamingStartDate.setValidators([Validators.required]);
          roamingEndDate.setValidators([Validators.required]);
        }

        if (roamingTracking === false) {
          roamingStartDate.setValidators(null);
          roamingEndDate.setValidators(null);
        }
        roamingStartDate.updateValueAndValidity();
        roamingEndDate.updateValueAndValidity();
      });

    this.thirdFormGroup.get('communityWork').valueChanges
      .subscribe(communityWork => {

        if (communityWork === true) {
          communityStartDate.setValidators([Validators.required]);
          communityEndDate.setValidators([Validators.required]);
        }

        if (communityWork === false) {
          communityStartDate.setValidators(null);
          communityEndDate.setValidators(null);
        }
        communityStartDate.updateValueAndValidity();
        communityEndDate.updateValueAndValidity();
      });


  }

// Fonction pour modifier dynamiquement le 5i??me form.
  setFifthFormGroupValidators(): void {

    const email = this.fifthFormGroup.get('email');
    const fax = this.fifthFormGroup.get('fax');
    const organism = this.fifthFormGroup.get('organism');

    this.fifthFormGroup.get('interfaceName').valueChanges
      .subscribe(interfaceName => {

        if (interfaceName === 'User') {
          fax.setValidators(null);
          fax.setValue(null);
          email.setValidators([Validators.required, Validators.email]);
          organism.setValidators([Validators.required, Validators.maxLength(100)]);
        }

        if (interfaceName === 'Doctor') {
          organism.setValidators(null);
          organism.setValue(null);
          fax.setValidators([Validators.required, Validators.pattern('[0-9]{10}')]);
          email.setValidators([Validators.required, Validators.email]);
        }

        if (interfaceName === 'EmergencyContact') {
          email.setValidators(null);
          fax.setValidators(null);
          organism.setValidators(null);
          organism.setValue(null);
          email.setValue(null);
          fax.setValue(null);
        }

        if (interfaceName === 'OtherPerson') {
          email.setValidators(null);
          fax.setValidators(null);
          email.setValue(null);
          fax.setValue(null);
          organism.setValidators([Validators.required, Validators.maxLength(100)]);
        }


        organism.updateValueAndValidity();
        fax.updateValueAndValidity();
        email.updateValueAndValidity();
      });
  }

  // Initialisation du formulaire
  private initForm(): void {
    this.firstFormGroup = this.formBuilder.group({
      fname: [this.person.fname, [Validators.required, Validators.maxLength(40)]],
      lname: [this.person.lname, [Validators.required, Validators.maxLength(40)]],
      birthday : [this.person.birthday, [Validators.required]],
      sexe: [this.person.sexe, Validators.required],
      address: [this.person.address, [Validators.required, Validators.maxLength(50)]],
      phone: [this.person.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
      nas: [this.person.nas, [Validators.required, Validators.pattern('[0-9]{9}')]],
      healthIssues: [this.person.healthIssues, [Validators.required, Validators.maxLength(4000)]]
    }, { validators: dateLessThanToday('birthday')});
    this.secondFormGroup = this.formBuilder.group({
      workCityId: [this.person.workCityId, [Validators.required]],
      startDate: [this.person.startDate, [Validators.required]],
      endDate: [this.person.endDate, [Validators.required]],
      referenceId: [this.person.referenceId, [Validators.required]],
      residenceTypeId: [this.person.residenceTypeId, [Validators.required]],
      educationalLevelId: [this.person.educationalLevelId, [Validators.required]]

    }, { validators: dateLessThan('startDate', 'endDate')});
    // @ts-ignore
    this.thirdFormGroup = this.formBuilder.group({
      programStartDate: [this.person.programStartDate, [Validators.required]],
      programEndDate: [this.person.programEndDate, [Validators.required]],
      departureReasonId: [this.person.departureReasonId, [Validators.required]],
      hoursPerDay: [this.person.hoursPerDay, [Validators.required, Validators.min(0), Validators.max(24)]],
      statusId: [this.person.statusId, [Validators.required]],
      roamingTracking: [this.person.roamingTracking, [Validators.required]],
      roamingStartDate: [this.person.roamingStartDate, []],
      roamingEndDate: [this.person.roamingEndDate, []],
      communityWork: [this.person.communityWork, [Validators.required]],
      communityStartDate: [this.person.communityStartDate, []],
      communityEndDate: [this.person.communityEndDate, []],
      hourlyRate: [this.person.hourlyRate, [Validators.required,  Validators.min(0), Validators.max(999)]],
      transportFees: [this.person.transportFees, [Validators.required,  Validators.min(0), Validators.max(999)]],
      responsibleIntervenantId: [this.person.responsibleIntervenantId]
    }, { validators: [dateLessThan('programStartDate', 'programEndDate'),
                             dateLessThan('roamingStartDate', 'roamingEndDate'),
                             dateLessThan('communityStartDate', 'communityEndDate')]});

    this.setThirdFormGroupValidators();

    // VA FALOIR ALLER LES CHERCHER EN FAISANT UNE REQUETE CAR ON A JUSTE LES ID MAINTENANT
    this.fourthFormGroup = this.formBuilder.group({
          interfaceName: [this.emergencyContact.interfaceName],
          lname: [this.emergencyContact.lname, [Validators.required, Validators.maxLength(40)]],
          fname: [this.emergencyContact.fname, [Validators.required, Validators.maxLength(40)]],
          phone: [this.emergencyContact.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
          relation: [this.emergencyContact.relation, [Validators.required, Validators.maxLength(40)]]
        });
    if (this.followedBy.interfaceName.toString() === 'Doctor') {
        this.fifthFormGroup = this.formBuilder.group({
          interfaceName: [this.followedBy.interfaceName],
          lname: [this.followedBy.lname, [Validators.required, Validators.maxLength(40)]],
          fname: [this.followedBy.fname, [Validators.required, Validators.maxLength(40)]],
          phone: [this.followedBy.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
          email: [this.followedBy.email, [Validators.required, Validators.email]],
          fax: [this.followedBy.fax, [Validators.required, Validators.pattern('[0-9]{10}')]],
          organism: ['']
        });
      }
    else if (this.followedBy.interfaceName.toString() === 'OtherPerson') {
        this.fifthFormGroup = this.formBuilder.group({
          interfaceName: [this.followedBy.interfaceName],
          lname: [this.followedBy.lname, [Validators.required, Validators.maxLength(40)]],
          fname: [this.followedBy.fname, [Validators.required, Validators.maxLength(40)]],
          phone: [this.followedBy.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
          email: [''],
          fax: [''],
          organism: [this.followedBy.organism, [Validators.required, Validators.maxLength(100)]]
        });
      }
    else if (this.followedBy.interfaceName.toString() === 'User') {
        this.fifthFormGroup = this.formBuilder.group({
          interfaceName: [this.followedBy.interfaceName],
          lname: [this.followedBy.lname, [Validators.required, Validators.maxLength(40)]],
          fname: [this.followedBy.fname, [Validators.required, Validators.maxLength(40)]],
          phone: [this.followedBy.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
          email: [this.followedBy.email, [Validators.required, Validators.email]],
          fax: [''],
          organism: [this.followedBy.organism, [Validators.required, Validators.maxLength(100)]]
        });
      }
      else if (this.followedBy.interfaceName.toString() === 'EmergencyContact') {
          this.fifthFormGroup = this.formBuilder.group({
            interfaceName: [this.followedBy.interfaceName],
            lname: [this.followedBy.lname, [Validators.required, Validators.maxLength(40)]],
            fname: [this.followedBy.fname, [Validators.required, Validators.maxLength(40)]],
            phone: [this.followedBy.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
            email: [''],
            fax: [''],
            organism: ['']
          });
    }
    this.setFifthFormGroupValidators();
  }
  // Fonction pour r??agir lorsque la personne clique sur le bouton "Enregistrer"
  onEditPerson(): void {
    // On v??rifie que tous les formulaires ne contiennent pas d'erreur.
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid
      && this.fourthFormGroup.valid && this.fifthFormGroup.valid) {
      // On modifie le contacte d'urgence ?? la base de donn??e
      this.emergencyContactService.editEmergencyContact(this.fourthFormGroup.value);

      // On observe la requ??te pour voir si tout s'est bien pass??
      this.emergencyContactSubscription = this.emergencyContactService.emergencyContactsSubject.subscribe(
        (data: any) => {
          // On modifie la personne qui suis ?? la base de donne??.
          this.followedByService.editFollowedBy(this.fifthFormGroup.value);
          this.emergencyContactSubscription.unsubscribe();
          // On observe la requ??te pour voir si tout s'est bien pass??
          this.followedBySubscription = this.followedByService.followupsBySubject.subscribe(
            (followedData: any) => {
              this.followedBySubscription.unsubscribe();
              // On cr??er un nouveau form pour envoyer les donn??es au serveur et pouvoir modifier la personne
              this.formEditPerson = this.formBuilder.group({
                interfaceName: 'Person',
                id: [this.person.id],
                lname: [this.firstFormGroup.value.lname],
                fname: [this.firstFormGroup.value.fname],
                birthday : [this.firstFormGroup.value.birthday],
                sexe: [this.firstFormGroup.value.sexe],
                address: [this.firstFormGroup.value.address],
                phone: [this.firstFormGroup.value.phone],
                nas: [this.firstFormGroup.value.nas],
                healthIssues: [this.firstFormGroup.value.healthIssues],
                workCityId: [this.secondFormGroup.value.workCityId],
                startDate: [this.secondFormGroup.value.startDate],
                endDate: [this.secondFormGroup.value.endDate],
                referenceId: [this.secondFormGroup.value.referenceId],
                residenceTypeId: [this.secondFormGroup.value.residenceTypeId],
                educationalLevelId: [this.secondFormGroup.value.educationalLevelId],
                programStartDate: [this.thirdFormGroup.value.programStartDate],
                programEndDate: [this.thirdFormGroup.value.programEndDate],
                departureReasonId: [this.thirdFormGroup.value.departureReasonId],
                hoursPerDay: [this.thirdFormGroup.value.hoursPerDay],
                statusId: [this.thirdFormGroup.value.statusId],
                roamingTracking: [this.thirdFormGroup.value.roamingTracking],
                roamingStartDate: [this.thirdFormGroup.value.roamingStartDate],
                roamingEndDate: [this.thirdFormGroup.value.roamingEndDate],
                communityWork: [this.thirdFormGroup.value.communityWork],
                communityStartDate: [this.thirdFormGroup.value.communityStartDate],
                communityEndDate: [this.thirdFormGroup.value.communityEndDate],
                hourlyRate: [this.thirdFormGroup.value.hourlyRate],
                transportFees: [this.thirdFormGroup.value.transportFees],
                responsibleIntervenantId: [this.thirdFormGroup.value.responsibleIntervenantId],
                emergencyContactId: [this.person.emergencyContactId],
                followedById: [this.person.followedById],
                active: true
              });
              this.personService.editPerson(this.formEditPerson.value);
            },
            (error: any) => {
              this.errorMessage = error;
            }
          );

        },
        (error: any) => {
          this.errorMessage = error;
        }
      );
    }else {
      alert('Les champs en surbrillance contiennent des donn??es incorrectes, veuillez les corriger.');
    }
  }
  // Fonction pour r??agir lorsque l'utilisateur clique sur le bouton "Annuler"
  onCancelPerson(): void {
    this.unsubscribe();
    this.personService.cancelPerson();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  // Fonction pour d??sinscrire les subscriptions
  private unsubscribe(): void{
    this.errorsSubscription.unsubscribe();
    this.personSubscription.unsubscribe();
    this.departureReasonSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
    this.workCitySubscription.unsubscribe();
    this.residenceTypeSubscription.unsubscribe();
    this.educationLevelSubscription.unsubscribe();
    this.referenceSubscription.unsubscribe();
    this.emergencyContactSubscription.unsubscribe();
    this.followedBySubscription.unsubscribe();
    this.intervenantSubscription.unsubscribe();
  }
}


