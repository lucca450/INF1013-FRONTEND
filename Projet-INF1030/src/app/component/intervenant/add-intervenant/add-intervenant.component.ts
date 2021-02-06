import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';

@Component({
  selector: 'app-add-intervenant',
  templateUrl: './add-intervenant.component.html',
  styleUrls: ['./add-intervenant.component.css']
})
export class AddIntervenantComponent implements OnInit {

  addintervenantForm: FormGroup;
  intervenantInvalid: boolean;

  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
  }

  private initForm(): void {
    this.addintervenantForm = this.formBuilder.group({
      fname: [''/*, Validators.email*/],
      lname: [''/*, Validators.required*/],
      email: [''/*, Validators.required*/],
      phone: [''/*, Validators.required*/],
      address: [''/*, Validators.required*/]
    });
  }

  onAddIntervenant() {
    this.intervenantService.addIntervenant();
  }
}
