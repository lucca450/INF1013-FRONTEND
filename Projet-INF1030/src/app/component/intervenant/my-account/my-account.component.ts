import { Component, OnInit } from '@angular/core';
import {Intervenant} from '../../../models/intervenant/intervenant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
      fname: [this.intervenant.fname, Validators.required],
      lname: [this.intervenant.lname, Validators.required],
      email: [this.intervenant.email, [Validators.required, Validators.email]],
      phone: [this.intervenant.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.intervenant.address, [Validators.required]]
/*
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required]*/
    });
  }

  onEditAccount(): void {

    if (this.editMyAccountForm.valid) {
      console.log(this.intervenant.id);
      this.intervenantService.editAccount(this.intervenant.id , this.editMyAccountForm.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }
}
