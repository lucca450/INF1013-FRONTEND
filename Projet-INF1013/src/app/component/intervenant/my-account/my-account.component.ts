import {Component, OnDestroy, OnInit} from '@angular/core';
import {Intervenant} from '../../../models/intervenant/intervenant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from '../../../models/users/user';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {

  intervenant: Intervenant;
  user: User;
  intervenantSubscription: Subscription
  userSubscription: Subscription;
  errorsSubscription: Subscription;
  errorUserSubscription: Subscription;
  editAccountUserForm: FormGroup;
  editAccountintervenantForm: FormGroup;
  editMyAccountForm: FormGroup;
  hide = true;
  errorMessage: String;

  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    )

    this.errorUserSubscription = this.userService.verifySubjectError.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    )

    let id = 0;
    // Nous permet d'aller chercher les informations selon l'id passé dans le path
    this.route.paramMap.subscribe(params => {
      id =  Number(params.get('id'));
      this.intervenantService.getIntervenantFromId(id);

      this.userSubscription = this.intervenantService.intervenantSubject.subscribe(

        (intervenant: any) => {
          console.log('get subscribeeeee');
          this.intervenant = intervenant;
          this.userService.getUserFromId(id);

          this.intervenantSubscription = this.userService.UserFromIdSubject.subscribe(
            (user: any) => {
              this.user = user;
              this.initForm();
            },
            (error: any) => {
              this.errorMessage = error;
            }
          )
        },
        (error: any) => {
          this.errorMessage = error;
        }
      )
    });
  }

  onSubmit(): void {
  }

  private initForm(): void {
    this.editAccountintervenantForm = this.formBuilder.group({
      fname: [this.intervenant.fname, Validators.required],
      lname: [this.intervenant.lname, Validators.required],
      email: [this.intervenant.email, [Validators.required, Validators.email]],
      phone: [this.intervenant.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.intervenant.address, [Validators.required]],
      id: [this.intervenant.id],
    });

    this.editAccountUserForm = this.formBuilder.group({
      interfaceName:[this.user.interfaceName],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      role: [this.user.role, Validators.required],
      active: [this.user.active, Validators.required],
      id: [this.user.id],
    });
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Enregistrer"
  onEditAccount(): void {

    let element: HTMLElement = document.getElementById('buttonintervenant') as HTMLElement;
    element.click();

    if (this.editAccountintervenantForm.valid && this.editAccountUserForm.valid) {
      this.intervenantService.editIntervenant(this.editAccountintervenantForm.value , this.editAccountUserForm.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }

  onCancelAccount(): void {
    this.intervenantService.cancelIntervenant();
  }

  ngOnDestroy(){
    this.errorsSubscription.unsubscribe();
    this.intervenantSubscription.unsubscribe();
    this.errorUserSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
