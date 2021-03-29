import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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
import {SectorService} from '../../../services/sector/sector.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit, OnDestroy {

  formEditPerson:FormGroup;
  errorMessage: String;
  person: Person;
  // Récupérer les services
  statusList = []
  referenceList = []
  cities = []
  departureReasonList = []
  educationLevelList = []
  residenceTypeList = []
  //Énumération
  genderEnum = Object.entries(Gender).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;

  errorsSubscription: Subscription;
  personSubscription: Subscription;
  departureReasonSubscription: Subscription;
  statusSubscription: Subscription;
  workCitySubscription: Subscription;
  residenceTypeSubscription: Subscription;
  educationLevelSubscription: Subscription;
  referenceSubscription: Subscription;


  constructor(private formBuilder: FormBuilder,
              private personService: PersonService,
              private route: ActivatedRoute,
              private statusService: StatusService,
              private refererenceService: ReferenceService,
              private workCityService: WorkCityService,
              private departureReasonService: DepartureReasonService,
              private educationLevelService: EducationLevelService,
              private residenceTypeService: ResidenceTypeService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      this.errorsSubscription = this.personService.errorsSubject.subscribe(
        (error: any) => {
          this.errorMessage = error;
        }
      )
      const id =	Number(params.get('id'));

      this.personService.getPersonFromId(id);

      this.personSubscription = this.personService.personSubject.subscribe(
        (person: any) => {
          this.person = person;
          this.setAllAttributes()
        },
        (error: any) => {
          this.errorMessage = error;
        }
      )
    });
  }

  private setAllAttributes(){

    // On observe les requêtes qu'on va faire.

    this.departureReasonSubscription = this.departureReasonService.departureReasonsSubject.subscribe(
      (departureReasons: any) => {
        this.departureReasonList = departureReasons;
      },
      (error: any) => {
        this.errorMessage = error;

      }
    )
    this.statusSubscription = this.statusService.allStatusSubject.subscribe(
      (allStatus: any) => {
        this.statusList = allStatus;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    )

    this.workCitySubscription = this.workCityService.workCitiesSubject.subscribe(
      (workCities: any) => {
        this.cities = workCities;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    )

    this.residenceTypeSubscription = this.residenceTypeService.residencesTypeSubject.subscribe(
      (residencesType: any) => {
        this.residenceTypeList = residencesType;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    )

    this.educationLevelSubscription = this.educationLevelService.educationLevelsSubject.subscribe(
      (educationLevels: any) => {
        this.educationLevelList = educationLevels;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    )

    this.referenceSubscription = this.refererenceService.referencesSubject.subscribe(
      (references: any) => {
        this.referenceList = references;
        this.initForm();
      },
      (error: any) => {
        this.errorMessage = error;
        this.initForm();
      }
    )

    // On fait nos requêtes
    this.departureReasonService.getDeparturesReason();
    this.statusService.getStatus();
    this.workCityService.getWorkCities();
    this.residenceTypeService.getResidencesType();
    this.educationLevelService.getEducationLevels();
    this.refererenceService.getReferences();




  }

  private initForm(): void {
    this.firstFormGroup = this.formBuilder.group({
      fname: [this.person.fname],
      lname: [this.person.lname],
      birthday : [this.person.birthday],
      sexe: [this.person.sexe],
      address: [this.person.address],
      phone: [this.person.phone],
      NAS: [this.person.NAS],
      healthIssues: [this.person.healthIssues]
    });
    this.secondFormGroup = this.formBuilder.group({
      workCityID: [this.person.workCityID],
      startDate: [this.person.startDate],
      endDate: [this.person.endDate],
      referenceID: [this.person.referenceID],
      residenceTypeID: [this.person.residenceTypeID],
      educationalLevelID: [this.person.educationalLevelID]

    });
    this.thirdFormGroup = this.formBuilder.group({
      programStartDate: [this.person.programStartDate],
      programEndDate: [this.person.programEndDate],
      departureReasonID: [this.person.departureReasonID],
      hoursPerDay: [this.person.hoursPerDay/*, Validators.required*/],
      statusID: [this.person.statusID],
      roamingTracking: [this.person.roamingTracking],
      roamingStartDate: [this.person.roamingStartDate],
      roamingEndDate: [this.person.roamingEndDate],
      communityWork: [this.person.communityWork],
      communityStartDate: [this.person.communityStartDate],
      communityEndDate: [this.person.communityEndDate],
      hourlyRate: [this.person.hourlyRate/*, Validators.required*/],
      transportFees: [this.person.transportFees/*, Validators.required*/],
      responsibleIntervenantID: [this.person.responsibleIntervenantID]
    });
    this.fourthFormGroup = this.formBuilder.group({
      interfaceName:[this.person.emergencyContact.interfaceName],
      lname: [this.person.emergencyContact.lname],
      fname: [this.person.emergencyContact.fname],
      phone: [this.person.emergencyContact.phone],
      relation: [this.person.emergencyContact.relation/*, Validators.required*/]
    });

    if (this.person.followedBy.interfaceName === 'Doctor') {
        this.fifthFormGroup = this.formBuilder.group({
          interfaceName:[this.person.followedBy.interfaceName],
          lname: [this.person.followedBy.lname],
          fname: [this.person.followedBy.fname],
          phone: [this.person.followedBy.phone],
          email: [this.person.followedBy.email],
          fax: [this.person.followedBy.fax],
          organism: ['']
        });
    }
    if (this.person.followedBy.interfaceName === 'OtherPerson') {
      this.fifthFormGroup = this.formBuilder.group({
        interfaceName:[this.person.followedBy.interfaceName],
        lname: [this.person.followedBy.lname],
        fname: [this.person.followedBy.fname],
        phone: [this.person.followedBy.phone],
        email: [''],
        fax: [''],
        organism: [this.person.followedBy.organism]
      });
    }
    if (this.person.followedBy.interfaceName === 'Intervenant') {
      this.fifthFormGroup = this.formBuilder.group({
        interfaceName:[this.person.followedBy.interfaceName],
        lname: [this.person.followedBy.lname],
        fname: [this.person.followedBy.fname],
        phone: [this.person.followedBy.phone],
        email: [this.person.followedBy.email],
        fax: [''],
        organism: ['']
      });
    }
    if (this.person.followedBy.interfaceName === 'EmergencyContact') {
      this.fifthFormGroup = this.formBuilder.group({
        interfaceName:[this.person.followedBy.interfaceName],
        lname: [this.person.followedBy.lname],
        fname: [this.person.followedBy.fname],
        phone: [this.person.followedBy.phone],
        email: [''],
        fax: [''],
        organism: ['']
      });
    }
  }

  onEditPerson(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid && this.fifthFormGroup.valid) {
      this.formEditPerson = this.formBuilder.group({
        interfaceName: 'Person',
        id: [this.person.id],
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
      this.personService.editPerson(this.formEditPerson.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }

  onSubmit(): void {

  }
  onCancelPerson() {
    this.personService.cancelPerson();
  }

  ngOnDestroy(): void {
    this.errorsSubscription.unsubscribe();
    this.personSubscription.unsubscribe();
    this.departureReasonSubscription.unsubscribe();
    this.statusSubscription.unsubscribe();
    this.workCitySubscription.unsubscribe();
    this.residenceTypeSubscription.unsubscribe();
    this.educationLevelSubscription.unsubscribe();
    this.referenceSubscription.unsubscribe();
  }
}
