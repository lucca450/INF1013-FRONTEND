import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/users/user';
import {Subscription} from 'rxjs';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-first-connexion',
  templateUrl: './first-connexion.component.html',
  styleUrls: ['./first-connexion.component.css']
})
export class FirstConnexionComponent implements OnInit, OnDestroy {

  EditPasswordForm: FormGroup;
  user: User;
  errorMessage: string;
  hideOldPasword = true;
  hideNewPassword = true;
  hideConfirmationPassword = true;

  // Subscription
  errorsSubscription: Subscription;
  id = 0;

  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // Vérifier s'il y a des erreurs.
    this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );

    this.route.paramMap.subscribe(params => {
       this.id =  Number(params.get('id'));
       this.initForm();
  });
}
  private initForm(): void {
    this.EditPasswordForm = this.formBuilder.group({
     /* oldPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],*/
      newPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]]
    });
  }

  OnSkipEditPassword(): void {
    this.intervenantService.skipFirstStepConnexion(this.id);
  }

  OnEditPassword(): void {
    if (this.EditPasswordForm.valid){
      if (this.EditPasswordForm.get('newPassword').value === this.EditPasswordForm.get('confirmPassword').value){
        //   if (this.EditPasswordForm.get('oldPassword').value === this.user.password){

        this.intervenantService.editPasswordIntervenant(this.id, this.EditPasswordForm.get('newPassword').value);
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
  }


}
