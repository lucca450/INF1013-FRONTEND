import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PersonService} from '../../../services/person/person.service';
import {Person} from '../../../models/person';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  EditPersonForm: any;
  person: Person;
  personID: number;

  constructor(private formBuilder: FormBuilder,private personService: PersonService, private route: ActivatedRoute) { }

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
    this.EditPersonForm = this.formBuilder.group({
      fname: [''/*, Validators.email*/],
      lname: [''/*, Validators.required*/],
      phone: [''/*, Validators.required*/],
      address: [''/*, Validators.required*/],
      NAS: [''/*, Validators.required*/],
      hoursPerDay: [''/*, Validators.required*/],
      hourlyRate: [''/*, Validators.required*/],
      transportFees: [''/*, Validators.required*/],
      ressourceFname: [''/*, Validators.required*/],
      ressourceLname: [''/*, Validators.required*/],
      ressourcePhone: [''/*, Validators.required*/],
      followFname: [''/*, Validators.required*/],
      followLname: [''/*, Validators.required*/],
      followPhone: [''/*, Validators.required*/],
      followEmail: [''/*, Validators.required*/],
      followFax: [''/*, Validators.required*/],
      followOrganism: [''/*, Validators.required*/]


    });
  }

  onSubmit(): void {

  }
}
