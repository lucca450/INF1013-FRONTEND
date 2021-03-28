 import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IntervenantService} from '../../../services/intervenant/intervenant.service';
import {ActivatedRoute} from '@angular/router';
import {Intervenant} from '../../../models/intervenant/intervenant';
 import {Subscription} from "rxjs";
 import {Role} from '../../../enum/role.enum';
 import {UserService} from '../../../services/user/user.service';
 import {User} from '../../../models/users/user';

@Component({
  selector: 'app-edit-intervenant',
  templateUrl: './edit-intervenant.component.html',
  styleUrls: ['./edit-intervenant.component.css']
})
export class EditIntervenantComponent implements OnInit {

  intervenant: Intervenant;
  intervenantSubscription: Subscription
  userSubscription: Subscription;
  user: User;
  editintervenantForm: FormGroup;
  roleEnum = Object.entries(Role).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));
  editUserForm: FormGroup;
  errorsSubscription: Subscription;
  errorUserSubscription: Subscription;
  errorMessage: string;
  hide = true;
  sameAccount = false;

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

              if(this.userService.user.id == this.user.id){
                this.sameAccount = true;
              }
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
    this.editintervenantForm = this.formBuilder.group({
      interfaceName: [this.intervenant.interfaceName],
      fname: [this.intervenant.fname, Validators.required],
      lname: [this.intervenant.lname, Validators.required],
      email: [this.intervenant.email, [Validators.required, Validators.email]],
      phone: [this.intervenant.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.intervenant.address, Validators.required],
      id: [this.intervenant.id],
    });

    this.editUserForm = this.formBuilder.group({
      interfaceName:[this.user.interfaceName],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      role: [this.user.role, Validators.required],
      active: [this.user.active, Validators.required],
      id: [this.user.id],
    });
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Enregistrer"
  onEditIntervenant(): void {

    let element: HTMLElement = document.getElementById('buttonintervenant') as HTMLElement;
    element.click();

    if (this.editintervenantForm.valid) {
      this.intervenantService.editIntervenant(this.editintervenantForm.value, this.editUserForm.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Annuler"
  onCancelIntervenant(): void {
    this.intervenantService.cancelIntervenant();
    this.errorsSubscription.unsubscribe();
    this.intervenantSubscription.unsubscribe();
    this.errorUserSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
