import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {Subscription} from "rxjs";
import {Role} from '../../../enum/role.enum';

@Component({
  selector: 'app-add-intervenant',
  templateUrl: './add-intervenant.component.html',
  styleUrls: ['./add-intervenant.component.css']
})
export class AddIntervenantComponent implements OnInit {

  addintervenantForm: FormGroup;
  addUserForm: FormGroup;
  roleEnum = Object.entries(Role).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));
  intervenantInvalid: boolean;
 // submitted = false;
  errorsSubscription: Subscription;
  errorMessage: String;
  defaultRole: String = "Intervenant";
  hide = true;

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
      id : this.intervenantService.intervenants.length, // Prendre le max plutot (Get a la bd)
      interfaceName:'intervenants',
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', Validators.required]
    });

    this.addUserForm = this.formBuilder.group({
      id : this.intervenantService.intervenants.length,
      interfaceName:'Users',
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });


  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Ajouter"
  onAddIntervenant(): void {
    console.log('HELLO')

    let element: HTMLElement = document.getElementById('buttonintervenant') as HTMLElement;
    element.click();



   // this.submitted = true;
    if (this.addintervenantForm.valid && this.addUserForm.valid) {
      this.intervenantService.addIntervenantToServer(this.addintervenantForm.value,this.addUserForm.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }

  onCancelIntervenant(): void {
    this.intervenantService.cancelIntervenant();
    this.errorsSubscription.unsubscribe();
  }
}
