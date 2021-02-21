import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {ActivatedRoute} from '@angular/router';
import {Intervenant} from '../../../models/intervenant/intervenant';

@Component({
  selector: 'app-edit-intervenant',
  templateUrl: './edit-intervenant.component.html',
  styleUrls: ['./edit-intervenant.component.css']
})
export class EditIntervenantComponent implements OnInit {

  intervenant: Intervenant;
  editintervenantForm: FormGroup;
  intervenantInvalid: boolean;

  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let index = 0;
    // Nous permet d'aller chercher les informations selon l'id passé dans le path
    this.route.paramMap.subscribe(params => {
      index =  Number(params.get('id'));
      this.intervenant =  this.intervenantService.intervenants[index];
    });
    this.initForm();
  }

  onSubmit(): void {
  }

  private initForm(): void {
    this.editintervenantForm = this.formBuilder.group({
      fname: [this.intervenant.fname],
      lname: [this.intervenant.lname],
      email: [this.intervenant.email],
      phone: [this.intervenant.phone],
      address: [this.intervenant.address]
    });
  }

  onEditIntervenant(): void {
    this.intervenantService.editIntervenant();
  }

  onCancelIntervenant(): void {
    this.intervenantService.cancelIntervenant();
  }
}
