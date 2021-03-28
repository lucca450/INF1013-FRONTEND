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
      const id =	Number(params.get('id'));

      this.personService.getPersonFromId(id);

      this.personSubscription = this.personService.personSubject.subscribe(
        (person: any) => {
          this.person = person;
          this.initForm();
        },
        (error: any) => {
          this.errorMessage = error;
        }
      )
    });
  }
  onEditPerson(): void {
    let element: HTMLElement = document.getElementById('buttonintervenant') as HTMLElement;
    element.click();
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid && this.fifthFormGroup.valid) {
      this.formEditPerson = new FormGroup({form1:this.firstFormGroup,form2:this.secondFormGroup,form3:this.thirdFormGroup,form4:this.fourthFormGroup,form5:this.fifthFormGroup});
      this.personService.editPerson(this.formEditPerson.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }
  private initForm(): void {
    this.firstFormGroup = this.formBuilder.group({
      fname: [this.person.fname],
      lname: [this.person.lname],
      picker : [],
      sexe: [this.person.sexe],
      address: [this.person.address],
      phone: [this.person.phone],
      NAS: [this.person.NAS],
      healthIssues: [this.person.healthIssues]
    });
    this.secondFormGroup = this.formBuilder.group({
      city: [this.person.workCityID],
      picker1: [],
      picker2: [],

    });
    this.thirdFormGroup = this.formBuilder.group({
      picker3: [],
      picker4: [],
      hoursPerDay: [this.person.hoursPerDay/*, Validators.required*/],
      picker5: [],
      picker6: [],
      communityWork: [this.person.communityWork],
      picker7: [],
      picker8: [],
      hourlyRate: [this.person.hourlyRate/*, Validators.required*/],
      transportFees: [this.person.transportFees/*, Validators.required*/],
    });
    this.fourthFormGroup = this.formBuilder.group({
      ressourceFname: [this.person.emergencyContact.fname],
      ressourceLname: [this.person.emergencyContact.lname],
      ressourcePhone: [this.person.emergencyContact.phone],
    });
    if (this.person.followedBy.interfaceName === 'Doctor') {
        this.fifthFormGroup = this.formBuilder.group({
          followFname: [this.person.followedBy.fname],
          followLname: [this.person.followedBy.lname],
          followPhone: [this.person.followedBy.phone],
          followEmail: [this.person.followedBy.email],
          followFax: [this.person.followedBy.fax],
        });
    }
    if (this.person.followedBy.interfaceName === 'OtherPerson') {
      this.fifthFormGroup = this.formBuilder.group({
        followFname: [this.person.followedBy.fname],
        followLname: [this.person.followedBy.lname],
        followPhone: [this.person.followedBy.phone],
        followOrganism: [this.person.followedBy.organization]
      });
    }
    if (this.person.followedBy.interfaceName === 'Intervenant') {
      this.fifthFormGroup = this.formBuilder.group({
        followFname: [this.person.followedBy.fname],
        followLname: [this.person.followedBy.lname],
        followPhone: [this.person.followedBy.phone],
        followEmail: [this.person.followedBy.email],
        //followOrganism: [this.person.followedBy.organization]
      });
    }
    if (this.person.followedBy.interfaceName === 'EmergencyContact') {
      this.fifthFormGroup = this.formBuilder.group({
        followFname: [this.person.followedBy.fname],
        followLname: [this.person.followedBy.lname],
        followPhone: [this.person.followedBy.phone],
      });
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
