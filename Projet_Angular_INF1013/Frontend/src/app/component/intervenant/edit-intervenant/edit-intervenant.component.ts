 import {Component, OnDestroy, OnInit} from '@angular/core';
 import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
 import {IntervenantService} from '../../../services/intervenant/intervenant.service';
 import {ActivatedRoute} from '@angular/router';
 import {Role} from '../../../enum/role.enum';
 import {UserService} from '../../../services/user/user.service';
 import {User} from '../../../models/users/user';
 import {Subscription} from 'rxjs';
 import {MatDialog} from '@angular/material/dialog';
 import {ChangePasswordComponent} from '../change-password/change-password.component';
 @Component({
  selector: 'app-edit-intervenant',
  templateUrl: './edit-intervenant.component.html',
  styleUrls: ['./edit-intervenant.component.css']
})
export class EditIntervenantComponent implements OnInit, OnDestroy {

  // intervenant: Intervenant;
  user: User;
  editintervenantForm: FormGroup;

 // editUserForm: FormGroup;
  errorMessage: string;
  hide = true;
  sameAccount = false;
   // Énumération
   roleEnum = Object.entries(Role).filter(e => !isNaN(e[0]as any)).map(e => ({ name: e[1], id: e[0] }));
   // Subscription
   intervenantSubscription: Subscription;
   errorsSubscription: Subscription;


  constructor(private formBuilder: FormBuilder, private intervenantService: IntervenantService, private userService: UserService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

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
      // Appel de la méthode pour obtenir les informations de l'intervenant.
      this.intervenantService.getIntervenantFromId(id);
      // On écoute la requête qui nous retourne les informations de l'intervenant.
      this.intervenantSubscription = this.intervenantService.intervenantSubject.subscribe(

        (user: any) => {
          this.user = user;
          // Si l'utilisateur connecté est le même que celui de la requête, alors c'est le même compte.
          if (this.userService.user.id === this.user.id){
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
  // Initialisation du formulaire
  private initForm(): void {
    this.editintervenantForm = this.formBuilder.group({
      interfaceName: [this.user.interfaceName],
      fname: [this.user.fname,  [Validators.required, Validators.maxLength(30)]],
      lname: [this.user.lname, [Validators.required, Validators.maxLength(30)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.user.address, [Validators.required, Validators.maxLength(50)]],
      username: [this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      password: new FormControl({value: '', disabled: true }),
      role: [this.user.role, Validators.required],
      active: [this.user.active, Validators.required],
      id: [this.user.id],

    });
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Enregistrer"
  onEditIntervenant(): void {
    // On vérifie si le formulaire ne contient pas d'erreur
    if (this.editintervenantForm.valid) {
      this.intervenantService.editIntervenant(this.editintervenantForm.value);
    }else {
      alert('Les champs en surbrillance contiennent des données incorrectes, veuillez les corriger.');
    }
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Annuler"
  onCancelIntervenant(): void {
    this.unsubscribe();
    this.intervenantService.cancelIntervenant();
  }

  ngOnDestroy(): void{
    this.unsubscribe();
  }
   private unsubscribe(): void{
     this.errorsSubscription.unsubscribe();
     this.intervenantSubscription.unsubscribe();
   }

   OneditPassword(): void {
     const dialogRef = this.dialog.open(ChangePasswordComponent);
     dialogRef.componentInstance.user = this.user;
     dialogRef.afterClosed().subscribe(password => {
       // Si le mot de passe n'est pas fermer par le bouton annuler
      if (password !== 'closingChangePassword'){
        this.editintervenantForm.get('password').setValue(password);
      }
     });
   }
 }
