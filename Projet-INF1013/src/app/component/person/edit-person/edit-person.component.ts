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
  statusList = this.statusService.status;
  referenceList =this.refererenceService.reference;
  cities = this.workCityService.workCity;
  departureReasonList =this.departureReasonService.departureReason;
  educationLevelList =this.educationLevelService.educationLevel;
  residenceTypeList =this.residenceTypeService.residenceType;
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
          console.log(person);
          this.person = person;
          this.initForm();
        },
        (error: any) => {
          this.errorMessage = error;
        }
      )
    });
  }
  private initForm(): void {
    this.firstFormGroup = this.formBuilder.group({
      fname: [this.person.fname],
      lname: [this.person.lname],
      birthday : [],
      sexe: [this.person.sexe],
      address: [this.person.address],
      phone: [this.person.phone],
      NAS: [this.person.NAS],
      healthIssues: [this.person.healthIssues]
    });
    this.secondFormGroup = this.formBuilder.group({
      workCityID: [this.person.workCityID],
      startDate: [],
      endDate: [],

    });
    this.thirdFormGroup = this.formBuilder.group({
      programStartDate: [],
      programEndDate: [],
      hoursPerDay: [this.person.hoursPerDay/*, Validators.required*/],
      roamingStartDate: [],
      roamingEndDate: [],
      communityWork: [this.person.communityWork],
      communityStartDate: [],
      communityEndDate: [],
      hourlyRate: [this.person.hourlyRate/*, Validators.required*/],
      transportFees: [this.person.transportFees/*, Validators.required*/],
    });
    this.fourthFormGroup = this.formBuilder.group({
      lname: [this.person.emergencyContact.lname],
      fname: [this.person.emergencyContact.fname],
      phone: [this.person.emergencyContact.phone]
    });

    if (this.person.followedBy[0].interfaceName === 'Doctor') {
        this.fifthFormGroup = this.formBuilder.group({
          lname: [this.person.followedBy[0].lname],
          fname: [this.person.followedBy[0].fname],
          phone: [this.person.followedBy[0].phone],
          email: [this.person.followedBy[0].email],
          fax: [this.person.followedBy[0].fax]
        });
    }
    if (this.person.followedBy[0].interfaceName === 'OtherPerson') {
      this.fifthFormGroup = this.formBuilder.group({
        lname: [this.person.followedBy[0].lname],
        fname: [this.person.followedBy[0].fname],
        phone: [this.person.followedBy[0].phone],
        organism: [this.person.followedBy[0].organism]
      });
    }
    if (this.person.followedBy[0].interfaceName === 'Intervenant') {
      this.fifthFormGroup = this.formBuilder.group({
        lname: [this.person.followedBy[0].lname],
        fname: [this.person.followedBy[0].fname],
        phone: [this.person.followedBy[0].phone],
        followEmail: [this.person.followedBy[0].email]
      });
    }
    if (this.person.followedBy.interfaceName === 'EmergencyContact') {
      this.fifthFormGroup = this.formBuilder.group({
        lname: [this.person.followedBy.lname],
        fname: [this.person.followedBy.fname],
        phone: [this.person.followedBy.phone]
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
        birthday : [this.firstFormGroup.value.picker],
        sexe: [this.firstFormGroup.value.sexe],
        address: [this.firstFormGroup.value.address],
        phone: [this.firstFormGroup.value.phone],
        NAS: [this.firstFormGroup.value.NAS],
        healthIssues: [this.firstFormGroup.value.healthIssues],
        workCityID: [this.secondFormGroup.value.city],
        startDate: [this.secondFormGroup.value.startDate],
        endDate: [this.secondFormGroup.value.endDate],
        programStartDate: [this.thirdFormGroup.value.programStartDate],
        programEndDate: [this.thirdFormGroup.value.programEndDate],
        hoursPerDay: [this.thirdFormGroup.value.hoursPerDay],
        roamingStartDate: [this.thirdFormGroup.value.roamingStartDate],
        roamingEndDate: [this.thirdFormGroup.value.roamingEndDate],
        communityWork: [this.thirdFormGroup.value.communityWork],
        communityStartDate: [this.thirdFormGroup.value.communityStartDate],
        communityEndDate: [this.thirdFormGroup.value.communityEndDate],
        hourlyRate: [this.thirdFormGroup.value.hourlyRate],
        transportFees: [this.thirdFormGroup.value.transportFees],
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
  }
}
