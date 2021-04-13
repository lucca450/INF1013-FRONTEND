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
  intervenantSubscription: Subscription;
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

  private initForm(): void {
    this.EditPasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]]
    });
  }
  private unSubscribe(): void{
    this.intervenantSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }

  OnEditPassword(): void {

    if (this.EditPasswordForm.valid){
      if (this.EditPasswordForm.get('newPassword').value === this.EditPasswordForm.get('confirmPassword').value){
     //   if (this.EditPasswordForm.get('oldPassword').value === this.user.password){
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
    this.errorsSubscription.unsubscribe();
    this.intervenantSubscription.unsubscribe();
  }
}
