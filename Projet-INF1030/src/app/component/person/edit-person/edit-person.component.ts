import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PersonService} from '../../../services/person/person.service';
import {Person} from '../../../models/person';
import {ActivatedRoute} from '@angular/router';
import {City} from '../../../enum/city';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  EditPersonForm: any;
  person: Person;
  personID: number;
  cities = Object.entries(City).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));


  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder, private personService: PersonService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const idx =	Number(params.get('id'));
      this.personID = idx;
      const persons = this.personService.persons.filter(p => p.id === this.personID);
      this.person = persons[0];
    });

    this.initForm();
  }

  onEditPerson(): void {

    this.personService.editPerson();
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

    /*this.EditPersonForm = this.formBuilder.group({
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

  onSubmit(): void {

  }
}
