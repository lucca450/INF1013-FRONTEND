import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-intervenant',
  templateUrl: './add-intervenant.component.html',
  styleUrls: ['./add-intervenant.component.css']
})
export class AddIntervenantComponent implements OnInit {

  addintervenantForm: FormGroup;
  intervenantInvalid: boolean;
  submitted = false;
  errorsSubscription: Subscription;
  errorMessage: String;

  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService) { }

  ngOnInit(): void {
    this.initForm();

    this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    )
  }

  onSubmit(): void {
  }

  private initForm(): void {
    this.addintervenantForm = this.formBuilder.group({
      id : this.intervenantService.intervenants.length,
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required]

    });
  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Ajouter"
  onAddIntervenant(): void {
    this.submitted = true;
    if (this.addintervenantForm.valid) {
      this.intervenantService.addIntervenantToServer(this.addintervenantForm.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }

  onCancelIntervenant(): void {
    this.intervenantService.cancelIntervenant();
    this.errorsSubscription.unsubscribe();
  }
}
