import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PersonService} from '../../../services/person/person.service';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {StatusService} from '../../../services/status/status.service';
import {Gender} from '../../../enum/gender.enum';
import {ReferenceService} from '../../../services/reference/reference.service';
import {WorkCityService} from '../../../services/workCity/work-city.service';
import {DepartureReasonService} from '../../../services/departureReason/departure-reason.service';
import {EducationLevelService} from '../../../services/educationLevel/education-level.service';
import {ResidenceTypeService} from '../../../services/residenceType/residence-type.service';
import {SectorService} from '../../../services/sector/sector.service';
import {Intervenant} from '../../../models/intervenant/intervenant';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  intervenants: Intervenant[];
  formAddPerson:FormGroup;
  statusList = this.statusService.status;
  referenceList =this.refererenceService.reference;
  cities = this.workCityService.workCity;
  departureReasonList =this.departureReasonService.departureReason;
  educationLevelList =this.educationLevelService.educationLevel;
  residenceTypeList =this.residenceTypeService.residenceType;
  genderEnum = Object.entries(Gender).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));


  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;


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
    this.initForm();
  }

  private initForm(): void {

    this.firstFormGroup = this.formBuilder.group({
      fname: [''/*, Validators.email*/],
      lname: [''/*, Validators.required*/],
      birthday : [],
      sexe: [],
      address: [''/*, Validators.required*/],
      phone: [''/*, Validators.required*/],
      NAS: [''/*, Validators.required*/],
      healthIssues: []
    });
    this.secondFormGroup = this.formBuilder.group({
      workCityID: [],
      startDate: [],
      endDate: [],

    });
    this.thirdFormGroup = this.formBuilder.group({
      programStartDate: [],
      programEndDate: [],
      hoursPerDay: [''/*, Validators.required*/],
      roamingStartDate: [],
      roamingEndDate: [],
      communityWork: [],
      communityStartDate: [],
      communityEndDate: [],
      hourlyRate: [''/*, Validators.required*/],
      transportFees: [''/*, Validators.required*/],
    });
    this.fourthFormGroup = this.formBuilder.group({
      lname: [''/*, Validators.required*/],
      fname: [''/*, Validators.required*/],
      phone: [''/*, Validators.required*/],
    });
    this.fifthFormGroup = this.formBuilder.group({
      lname: [''/*, Validators.required*/],
      fname: [''/*, Validators.required*/],
      phone: [''/*, Validators.required*/],
      email: [''/*, Validators.required*/],
      fax: [''/*, Validators.required*/],
      organism: [''/*, Validators.required*/],
    });
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Ajouter"
  onAddPerson(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid && this.fifthFormGroup.valid) {
     // let formAddPersonTempo;
      this.formAddPerson = this.formBuilder.group({
        interfaceName: 'Person',
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
      this.personService.addPerson(this.formAddPerson.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }

  onSubmit(): void {

  }


  onCancelPerson() {
    this.personService.cancelPerson();
  }
}
