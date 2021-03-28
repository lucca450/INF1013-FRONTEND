import { Component, OnInit } from '@angular/core';
import {Intervenant} from '../../../models/intervenant/intervenant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  intervenant: Intervenant;
  intervenantSubscription: Subscription;
  editMyAccountForm: FormGroup;
  errorsSubscription: Subscription;
  errorMessage: String;

  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    )

    let id = 0;
    // Nous permet d'aller chercher les informations selon l'id passé dans le path
    this.route.paramMap.subscribe(params => {
      id =  Number(params.get('id'));

      this.intervenantSubscription = this.intervenantService.intervenantSubject.subscribe(
        (intervenant: any) => {
          this.intervenant = intervenant;
        },
        (error: any) => {
          this.errorMessage = error;
        }
      )
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
  // Fonction pour réagir lorsque la personne clique sur le bouton "Enregistrer"
  onEditAccount(): void {

    if (this.editMyAccountForm.valid) {
      console.log(this.intervenant.id);
      this.intervenantService.editAccount(this.intervenant.id , this.editMyAccountForm.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }

  onCancelAccount(): void {
    this.intervenantService.cancelIntervenant();
  }
}
