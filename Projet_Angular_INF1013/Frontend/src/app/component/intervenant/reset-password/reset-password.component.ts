import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {User} from '../../../models/users/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  EditPasswordForm: FormGroup;
  user: User;
  errorMessage: string;
  hideOldPasword = true;
  hideNewPassword = true;
  hideConfirmationPassword = true;
  openDialog = false;

  // Subscription
  errorsSubscription: Subscription;
  intervenantSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService, private route: ActivatedRoute){ }

  ngOnInit(): void {

    // Vérifier s'il y a des erreurs.
    this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.route.paramMap.subscribe(params => {
      if (this.openDialog === false){
     const id =  Number(params.get('id'));
      // Appel de la méthode pour obtenir les informations de l'intervenant.
     this.intervenantService.getIntervenantFromId(id);
      // On écoute la requête qui nous retourne les informations de l'intervenant.
     this.intervenantSubscription = this.intervenantService.intervenantSubject.subscribe(
        (intervenant: any) => {
          this.user = intervenant;
          this.initForm();
        }
      );
    }
      else{
        this.initForm();
      }
    });
  }

  private initForm(): void {
    this.EditPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]]
    });
  }

  OnCancelEditPassword(): void {
    this.intervenantService.cancelIntervenant();
  }

  private unSubscribe(): void{
    this.intervenantSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

  OnAddEditPassword(): void {

    if (this.EditPasswordForm.valid){
      if (this.EditPasswordForm.get('newPassword').value === this.EditPasswordForm.get('confirmPassword').value){
        if (this.EditPasswordForm.get('oldPassword').value === this.user.password){
          this.intervenantService.editPasswordIntervenant(this.user.id, this.EditPasswordForm.get('newPassword').value);
        }
        else{
          alert('L\'ancien mot de passe ne correspond pas à votre mot de passe actuel');
        }
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
}
