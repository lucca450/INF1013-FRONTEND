import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {Subscription} from 'rxjs';
import {Role} from '../../../enum/role.enum';




// @ts-ignore
@Component({
  selector: 'app-add-intervenant',
  templateUrl: './add-intervenant.component.html',
  styleUrls: ['./add-intervenant.component.css']
})
export class AddIntervenantComponent implements OnInit, OnDestroy {

  addintervenantForm: FormGroup;
  // addUserForm: FormGroup;
  errorMessage: string;
  defaultRole = 'I';
  defaultActiveInnactif = 'true';
  hide = true;
  // Énumération
  roleEnum = Object.entries(Role).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));
  // Subscription
  errorsSubscription: Subscription;
  verifyUsernameSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService) { }

  ngOnInit(): void {
    this.initForm();
    // Vérifier s'il y a des erreurs.
    this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );

    // On vérifie si le nom de l'utilisateur est correcte pour ajouter la personne et envoyer le courriel, sinon message d'erreur
    this.verifyUsernameSubscription = this.intervenantService.intervenantVerifyUsernameSubject.subscribe(
      (data: any) => {
        const email = this.addintervenantForm.get('email').value;
        const username = this.addintervenantForm.get('username').value;
        const password = this.addintervenantForm.get('password').value;
        const firstname = this.addintervenantForm.get('fname').value;
        const lastname = this.addintervenantForm.get('lname').value;

        this.intervenantService.addIntervenant(this.addintervenantForm.value);
        this.intervenantService.sendEmail(email, username , password, firstname, lastname);
      },
      (error: any) => {
        this.errorMessage = error;
      },
    );
  }

  onSubmit(): void {
  }
  // Initialisation du formulaire
  private initForm(): void {
    const randomPassword = Math.random().toString(36).slice(-16);
    this.addintervenantForm = this.formBuilder.group({
      id: null,
      interfaceName: 'User',
      fname: ['', [Validators.required, Validators.maxLength(30)]],
      lname: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
     // password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      password: [randomPassword],
      role: ['', Validators.required],
      active: [true, Validators.required]
    });
/* Fusion avec intervenant
    this.addUserForm = this.formBuilder.group({
      interfaceName: 'User',
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      role: ['', Validators.required],
      active: [true, Validators.required]
    });

 */

  }

  // Fonction pour réagir lorsque la personne clique sur le bouton "Ajouter"
  onAddIntervenant(): void {
    /* Fusion avec intervenant
    const element: HTMLElement = document.getElementById('buttonintervenant') as HTMLElement;
    element.click();
     */

    if (this.addintervenantForm.valid) {
      this.intervenantService.verifyUsernameExist(this.addintervenantForm.get('username').value);
    }else {
      alert('Les champs en surbrillance contiennent des données incorrectes, veuillez les corriger.');
    }
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Annuler"
  onCancelIntervenant(): void {
    this.unsubscribe();
    this.intervenantService.cancelIntervenant();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private unsubscribe(): void{
    this.errorsSubscription.unsubscribe();
    this.verifyUsernameSubscription.unsubscribe();
  }

}
