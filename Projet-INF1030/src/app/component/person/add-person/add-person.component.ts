import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PersonService} from '../../../services/person/person.service';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {City} from '../../../enum/city';


@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  addPersonForm: FormGroup;
  personInvalid: boolean;
  intervenants = this.intervenantService.intervenants;
  cities = Object.entries(City).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));


  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder, private personService: PersonService, private intervenantService: IntervenantService) { }

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

    /*this.addPersonForm = this.formBuilder.group({
      fname: [''],
      lname: [''],
      phone: [''],
      address: [''],
      NAS: [''],
      hoursPerDay: [''],
      hourlyRate: [''],
      transportFees: [''],
      ressourceFname: [''],
      ressourceLname: [''],
      ressourcePhone: [''],
      followFname: [''],
      followLname: [''],
      followPhone: [''],
      followEmail: [''],
      followFax: [''],
      followOrganism: ['']
    });*/
  }

  onAddPerson(): void {
    this.personService.addPerson();
  }

  onSubmit(): void {

  }


}
