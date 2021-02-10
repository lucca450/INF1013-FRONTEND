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


  constructor(private formBuilder: FormBuilder, private personService: PersonService, private intervenantService: IntervenantService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.addPersonForm = this.formBuilder.group({
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

  onAddPerson(): void {
    this.personService.addPerson();
  }

  onSubmit(): void {

  }
}
