 import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class EditIntervenantComponent implements OnInit, OnDestroy {

  // intervenant: Intervenant;
  intervenantSubscription: Subscription
  user: User;
  editintervenantForm: FormGroup;
  roleEnum = Object.entries(Role).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));
  editUserForm: FormGroup;
  errorsSubscription: Subscription;
  errorMessage: string;
  hide = true;
  sameAccount = false;


  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.errorsSubscription = this.intervenantService.errorsSubject.subscribe(
      (error: any) => {
        this.errorMessage = error;
      }
    );

    let id = 0;
    // Nous permet d'aller chercher les informations selon l'id passé dans le path
    this.route.paramMap.subscribe(params => {
      id =  Number(params.get('id'));
      this.intervenantService.getIntervenantFromId(id);

      this.intervenantSubscription = this.intervenantService.intervenantSubject.subscribe(

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
      );
    });
  }

  onSubmit(): void {
  }

  private initForm(): void {
    this.editintervenantForm = this.formBuilder.group({
      interfaceName: [this.user.interfaceName],
      fname: [this.user.fname,  [Validators.required, Validators.maxLength(30)]],
      lname: [this.user.lname, [Validators.required, Validators.maxLength(30)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.user.address, [Validators.required, Validators.maxLength(50)]],
      username: [this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      password: [this.user.password, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      role: [this.user.role, Validators.required],
      active: [this.user.active, Validators.required],
      id: [this.user.id],

    });
/*
    Fusion avec intervenant
    this.editUserForm = this.formBuilder.group({
      interfaceName:[this.user.interfaceName],
      username: [this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      password: [this.user.password, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      role: [this.user.role, Validators.required],
      active: [this.user.active, Validators.required],
      id: [this.user.id],
    });

 */
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Enregistrer"
  onEditIntervenant(): void {

/*
Fusion avec user
    let element: HTMLElement = document.getElementById('buttonintervenant') as HTMLElement;
    element.click();

 */

    if (this.editintervenantForm.valid) {
      console.log('ok validation');
      this.intervenantService.editIntervenant(this.editintervenantForm.value);
    }else {
      alert('Veuillez remplir tous les champs');
    }
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Annuler"
  onCancelIntervenant(): void {
    this.errorsSubscription.unsubscribe();
    this.intervenantSubscription.unsubscribe();
    this.intervenantService.cancelIntervenant();

  }

  ngOnDestroy(){
    this.errorsSubscription.unsubscribe();
    this.intervenantSubscription.unsubscribe();
  }
}
