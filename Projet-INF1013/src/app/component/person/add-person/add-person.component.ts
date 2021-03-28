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
      picker : [],
      sexe: [],
      address: [''/*, Validators.required*/],
      phone: [''/*, Validators.required*/],
      NAS: [''/*, Validators.required*/],
      healthIssues: []
    });
    this.secondFormGroup = this.formBuilder.group({
      city: [],
      picker1: [],
      picker2: [],

    });
    this.thirdFormGroup = this.formBuilder.group({
      picker3: [],
      picker4: [],
      hoursPerDay: [''/*, Validators.required*/],
      picker5: [],
      picker6: [],
      communityWork: [],
      picker7: [],
      picker8: [],
      hourlyRate: [''/*, Validators.required*/],
      transportFees: [''/*, Validators.required*/],
    });
    this.fourthFormGroup = this.formBuilder.group({
      ressourceFname: [''/*, Validators.required*/],
      ressourceLname: [''/*, Validators.required*/],
      ressourcePhone: [''/*, Validators.required*/],
    });
    this.fifthFormGroup = this.formBuilder.group({
      followFname: [''/*, Validators.required*/],
      followLname: [''/*, Validators.required*/],
      followPhone: [''/*, Validators.required*/],
      followEmail: [''/*, Validators.required*/],
      followFax: [''/*, Validators.required*/],
      followOrganism: [''/*, Validators.required*/]
    });
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Ajouter"
  onAddPerson(): void {
    let element: HTMLElement = document.getElementById('buttonintervenant') as HTMLElement;
    element.click();

    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid && this.fifthFormGroup.valid) {
      this.formAddPerson = new FormGroup({form1:this.firstFormGroup,form2:this.secondFormGroup,form3:this.thirdFormGroup,form4:this.fourthFormGroup,form5:this.fifthFormGroup});
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
