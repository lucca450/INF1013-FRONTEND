import { Component, OnInit } from '@angular/core';
import {Intervenant} from '../../../models/intervenant/intervenant';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  intervenant: Intervenant;
  editMyAccountForm: FormGroup;

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
    this.editMyAccountForm = this.formBuilder.group({
      fname: [this.intervenant.fname],
      lname: [this.intervenant.lname],
      email: [this.intervenant.email],
      phone: [this.intervenant.phone],
      address: [this.intervenant.address]
    });
  }

  onEditAccount(): void {
    this.intervenantService.editAccount();
  }
}
