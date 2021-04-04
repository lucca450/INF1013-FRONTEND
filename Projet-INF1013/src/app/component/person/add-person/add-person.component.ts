import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonService} from '../../../services/person/person.service';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {StatusService} from '../../../services/status/status.service';
import {Gender} from '../../../enum/gender.enum';
import {ReferenceService} from '../../../services/reference/reference.service';
import {WorkCityService} from '../../../services/workCity/work-city.service';
import {DepartureReasonService} from '../../../services/departureReason/departure-reason.service';
import {EducationLevelService} from '../../../services/educationLevel/education-level.service';
import {ResidenceTypeService} from '../../../services/residenceType/residence-type.service';
import {Subscription} from 'rxjs';
import {Person} from '../../../models/person/person';
import {User} from '../../../models/users/user';
import {dateLessThanToday} from '../../../Validators/dateLessThanToday';
import {dateLessThan} from '../../../Validators/dateLessthan';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit, OnDestroy{

  intervenants: User[];
  statusList = [];
  referenceList = [];
  cities = [];
  departureReasonList = [];
  educationLevelList = [];
  residenceTypeList = [];
  errorMessage: string;
  isLinear = true;

  // Énumération
  genderEnum = Object.entries(Gender).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));

  // Formgroup
  formAddPerson: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  // Subscription
  errorsSubscription: Subscription;
  departureReasonSubscription: Subscription;
  statusSubscription: Subscription;
  workCitySubscription: Subscription;
  residenceTypeSubscription: Subscription;
  educationLevelSubscription: Subscription;
  referenceSubscription: Subscription;
  intervenantSubscription: Subscription;


  constructor(private formBuilder: FormBuilder,
              private personService: PersonService,
              private intervenantService: IntervenantService,
              private statusService: StatusService,
              private refererenceService: ReferenceService,
              private workCityService: WorkCityService,
              private departureReasonService: DepartureReasonService,
              private educationLevelService: EducationLevelService,
              private residenceTypeService: ResidenceTypeService) { }

  ngOnInit(): void {

    // Vérification pour savoir si une requête à eu une erreur.
    this.errorsSubscription = this.personService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );
    // Récupération et modification des attributs
    this.SetAllAttributes();
    // Appel de méthode qui fait une requête pour récupèrer les intervenants actifs.
    this.intervenantService.getActiveIntervenants();
    // On écoute la requête pour récupèrer les intervenants
    this.intervenantSubscription = this.intervenantService.intervenantsSubject.subscribe(
      (inter: any) => {
        this.intervenants = inter;
        this.initForm();
      }
    );
  }

  private SetAllAttributes(): void{

    // On observe les requêtes qu'on va faire.
    this.departureReasonSubscription = this.departureReasonService.departureReasonsSubject.subscribe(
      (departureReasons: any) => {
        this.departureReasonList = departureReasons;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.statusSubscription = this.statusService.allStatusSubject.subscribe(
      (allStatus: any) => {
        this.statusList = allStatus;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.workCitySubscription = this.workCityService.workCitiesSubject.subscribe(
      (workCities: any) => {
        this.cities = workCities;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.residenceTypeSubscription = this.residenceTypeService.residencesTypeSubject.subscribe(
      (residencesType: any) => {
        this.residenceTypeList = residencesType;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.educationLevelSubscription = this.educationLevelService.educationLevelsSubject.subscribe(
      (educationLevels: any) => {
        this.educationLevelList = educationLevels;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.referenceSubscription = this.refererenceService.referencesSubject.subscribe(
      (references: any) => {
        this.referenceList = references;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

    // On fait nos requêtes
    this.departureReasonService.getDeparturesReason();
    this.statusService.getStatus();
    this.workCityService.getWorkCities();
    this.residenceTypeService.getResidencesType();
    this.educationLevelService.getEducationLevels();
    this.refererenceService.getReferences();
  }

  // Fonction pour modifier le 3ième groupe de validations et mettre des actions dynamique
  setThirdFormGroupValidators(): void {
    const roamingStartDate = this.thirdFormGroup.get('roamingStartDate');
    const roamingEndDate = this.thirdFormGroup.get('roamingEndDate');

    const communityStartDate = this.thirdFormGroup.get('communityStartDate');
    const communityEndDate = this.thirdFormGroup.get('communityEndDate');

    this.thirdFormGroup.get('roamingTracking').valueChanges
      .subscribe(roamingTracking => {

        if (roamingTracking === 'true') {
          roamingStartDate.setValidators([Validators.required]);
          roamingEndDate.setValidators([Validators.required]);
        }

        if (roamingTracking === 'false') {
          roamingStartDate.setValidators(null);
          roamingEndDate.setValidators(null);
        }
        roamingStartDate.updateValueAndValidity();
        roamingEndDate.updateValueAndValidity();
      });

    this.thirdFormGroup.get('communityWork').valueChanges
      .subscribe(communityWork => {

        if (communityWork === 'true') {
          communityStartDate.setValidators([Validators.required]);
          communityEndDate.setValidators([Validators.required]);
        }

        if (communityWork === 'false') {
          communityStartDate.setValidators(null);
          communityEndDate.setValidators(null);
        }
        communityStartDate.updateValueAndValidity();
        communityEndDate.updateValueAndValidity();
      });
  }
  // Fonction pour modifier le 5ième groupe de validations et mettre des actions dynamique
  setFifthFormGroupValidators(): void {

    const email = this.fifthFormGroup.get('email');
    const fax = this.fifthFormGroup.get('fax');
    const organism = this.fifthFormGroup.get('organism');

    this.fifthFormGroup.get('interfaceName').valueChanges
      .subscribe(interfaceName => {

        if (interfaceName === 'User') {
          fax.setValidators(null);
          email.setValidators([Validators.required, Validators.email]);
          organism.setValidators([Validators.required, Validators.maxLength(100)]);
        }

        if (interfaceName === 'Doctor') {
          organism.setValidators(null);
          fax.setValidators([Validators.required, Validators.pattern('[0-9]{10}')]);
          email.setValidators([Validators.required, Validators.email]);
        }

        if (interfaceName === 'EmergencyContact') {
          email.setValidators(null);
          fax.setValidators(null);
          organism.setValidators(null);
        }

        if (interfaceName === 'OtherPerson') {
          email.setValidators(null);
          fax.setValidators(null);
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

      fname: ['', [Validators.required, Validators.maxLength(40)]],
      lname: ['', [Validators.required, Validators.maxLength(40)]],
      birthday : ['', Validators.required],
      sexe: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      NAS: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      healthIssues: ['', [Validators.required, Validators.maxLength(4000)]],
      /*
      fname: ['', []],
      lname: ['', []],
      birthday : ['', []],
      sexe: ['', []],
      address: ['', []],
      phone: ['', []],
      NAS: ['', []],
      healthIssues: ['', []],*/
      }, { validators: dateLessThanToday('birthday')});

    this.secondFormGroup = this.formBuilder.group({
/*
      workCityID: [],
      startDate: [],
      endDate: [],
      referenceID: [],
      residenceTypeID: [],
      educationalLevelID: []
      */
      workCityID: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      referenceID: ['', [Validators.required]],
      residenceTypeID: ['', [Validators.required]],
      educationalLevelID: ['', [Validators.required]]

    });

    this.thirdFormGroup = this.formBuilder.group({

      programStartDate: ['', [Validators.required]],
      programEndDate: ['', [Validators.required]],
      departureReasonID: ['', [Validators.required]],
      hoursPerDay: ['', [Validators.required, Validators.min(0), Validators.max(24)]],
      statusID: ['', [Validators.required]],
      roamingTracking: ['', [Validators.required]],
      roamingStartDate: [, [Validators.required]],
      roamingEndDate: [, [Validators.required]],
      communityWork: ['', [Validators.required]],
      communityStartDate: [, [Validators.required]],
      communityEndDate: [, [Validators.required]],
      hourlyRate: ['', [Validators.required,  Validators.min(0), Validators.max(999)]],
      transportFees: ['', [Validators.required,  Validators.min(0), Validators.max(999)]],
      responsibleIntervenantID: ['', [Validators.required]],
/*
      programStartDate: [],
      programEndDate: [],
      departureReasonID: [],
      hoursPerDay: [],
      statusID: [],
      roamingTracking: [],
      roamingStartDate: [],
      roamingEndDate: [],
      communityWork: [],
      communityStartDate: [],
      communityEndDate: [],
      hourlyRate: [],
      transportFees: [],
      responsibleIntervenantID: []
*/
    }, { validators: [dateLessThan('programStartDate', 'programEndDate'),
        dateLessThan('roamingStartDate', 'roamingEndDate'),
        dateLessThan('communityStartDate', 'communityEndDate')]});

    // NE PAS SUPPRIMER, CETTE LIGNE EPRMET LES VALIDATIONS DYNAMIQUES !
    this.setThirdFormGroupValidators();

    this.fourthFormGroup = this.formBuilder.group({

      // interfaceName: ['EmergencyContact'],
      lname: ['', [Validators.required, Validators.maxLength(40)]],
      fname: ['', [Validators.required, Validators.maxLength(40)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      relation: ['', [Validators.required, Validators.maxLength(40)]]
      /*
      //interfaceName: ['EmergencyContact'],
      lname: ['', ],
      fname: ['', ],
      phone: ['', ],
      relation: ['', ]*/
    });

    this.fifthFormGroup = this.formBuilder.group({
      interfaceName: ['', Validators.required],
      lname: ['', [Validators.required, Validators.maxLength(40)]],
      fname: ['', [Validators.required, Validators.maxLength(40)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', ],
      fax: ['', ],
      organism: ['', [Validators.required, Validators.maxLength(100)]]
    });
    // Validations dynamiques du 5ième groupe.
    this.setFifthFormGroupValidators();
  }


  // Fonction pour réagir lorsque la personne clique sur le bouton "Ajouter"
  onAddPerson(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid
     && this.fourthFormGroup.valid && this.fifthFormGroup.valid) {
     // let formAddPersonTempo;
      this.formAddPerson = this.formBuilder.group({
        interfaceName: 'Person',
        lname: [this.firstFormGroup.value.lname],
        fname: [this.firstFormGroup.value.fname],
        birthday : [this.firstFormGroup.value.birthday],
        sexe: [this.firstFormGroup.value.sexe],
        address: [this.firstFormGroup.value.address],
        phone: [this.firstFormGroup.value.phone],
        NAS: [this.firstFormGroup.value.NAS],
        healthIssues: [this.firstFormGroup.value.healthIssues],
        workCityID: [this.secondFormGroup.value.workCityID],
        startDate: [this.secondFormGroup.value.startDate],
        endDate: [this.secondFormGroup.value.endDate],
        referenceID: [this.secondFormGroup.value.referenceID],
        residenceTypeID: [this.secondFormGroup.value.residenceTypeID],
        educationalLevelID: [this.secondFormGroup.value.educationalLevelID],
        programStartDate: [this.thirdFormGroup.value.programStartDate],
        programEndDate: [this.thirdFormGroup.value.programEndDate],
        departureReasonID: [this.thirdFormGroup.value.departureReasonID],
        hoursPerDay: [this.thirdFormGroup.value.hoursPerDay],
        statusID: [this.thirdFormGroup.value.statusID],
        roamingTracking: [this.thirdFormGroup.value.roamingTracking],
        roamingStartDate: [this.thirdFormGroup.value.roamingStartDate],
        roamingEndDate: [this.thirdFormGroup.value.roamingEndDate],
        communityWork: [this.thirdFormGroup.value.communityWork],
        communityStartDate: [this.thirdFormGroup.value.communityStartDate],
        communityEndDate: [this.thirdFormGroup.value.communityEndDate],
        hourlyRate: [this.thirdFormGroup.value.hourlyRate],
        transportFees: [this.thirdFormGroup.value.transportFees],
        responsibleIntervenantID: [this.thirdFormGroup.value.responsibleIntervenantID],
        emergencyContact: [this.fourthFormGroup.value],
        followedBy: [this.fifthFormGroup.value],
        active: true
      });
      this.personService.addPerson(this.formAddPerson.value);
    }else {
      alert('Les champs en surbrillance contiennent des données incorrectes, veuillez les corriger.');
    }
  }

  onCancelPerson(): void {
    this.unsubscribe();
    this.personService.cancelPerson();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe(): void{
    this.errorsSubscription.unsubscribe();
    this.departureReasonSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
    this.workCitySubscription.unsubscribe();
    this.residenceTypeSubscription.unsubscribe();
    this.educationLevelSubscription.unsubscribe();
    this.referenceSubscription.unsubscribe();
    this.intervenantSubscription.unsubscribe();
  }
}
