import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {User} from '../../../models/users/user';
import {ActivatedRoute} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  EditPasswordForm: FormGroup;
  user: User;
  errorMessage: string;
  hideOldPasword = true;
  hideNewPassword = true;
  hideConfirmationPassword = true;

  // Subscription
  errorsSubscription: Subscription;
  closingDialog = 'closingChangePassword';

  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService, private route: ActivatedRoute,
              private dialogRef: MatDialogRef<ChangePasswordComponent>){ }

  ngOnInit(): void {

    // Vérifier s'il y a des erreurs.
    this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );
    this.initForm();
  }

  // Initialisation du formulaire
  private initForm(): void {
    this.EditPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]]
    });
  }

  // Réaction lorsque l'utilisateur clique sur le bouton enregistrer.
  OnEditPassword(): void {
    if (this.EditPasswordForm.valid){
      // Si les deux mots de passe son identique
      if (this.EditPasswordForm.get('newPassword').value === this.EditPasswordForm.get('confirmPassword').value){
        // On vérifie l'ancien mot de passe de l'utilisateur pour savoir s'il concorde.
     //   if (this.EditPasswordForm.get('oldPassword').value === this.user.password){
        // On ferme le dialogue et on envoie le password au component qui écoute.
        this.dialogRef.close(this.EditPasswordForm.get('newPassword').value);
      //  }
      //  else{
       //   alert('L\'ancien mot de passe ne correspond pas à votre mot de passe actuel');
       // }
      }
      else{
        alert('Le nouveau mot de passe ne correspond pas au mot de passe que vous avez confirmé.');
      }

    }else {
      alert('Les champs en surbrillance contiennent des données incorrectes, veuillez les corriger.');
    }

  }

  ngOnDestroy(): void {
    this.unSubscribe();
  }

  // Désinscription des subscription.
  private unSubscribe(): void{
    this.errorsSubscription.unsubscribe();
  }

}
