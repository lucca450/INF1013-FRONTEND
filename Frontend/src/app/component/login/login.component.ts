import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginInvalid: boolean;
  errorMessage: any;
  // Subscription
  verifyErrorSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {

    this.verifyErrorSubscription = this.userService.verifySubjectError.subscribe(
      (errorResponse) => {
        this.errorMessage = errorResponse;
      },
      (error) => {
        this.errorMessage = error;
      }
    );

    this.initForm();
  }

  onSubmit(): void {
  }
  // Initilisation du formulaire
  private initForm(): void {

    /*
    // Pour se connecter automatiquement. Évidament, il faudra activer celui enbas
   this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
     */

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    // Permet de s'auto connecter :)
    /*
    setTimeout( ()=>{
      this.onSignIn();
    }, 500)

     */
  }

  // Fonction pour récupérer le control du nom d'utilisateur
  get username(): AbstractControl{
    return this.loginForm.get('username');
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Connexion"
  onSignIn(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      // this.userService.verifyUserExist('pierro_kool@hotmail.com', '1234');  // Auto connexion
      // On vérifie si la connexion passe
      this.userService.login(username, password);
      // this.userService.verifyUserExist(username, password);
      // On écoute la requête qui vérifie si la connexion passe pour voir s'il y a des erreurs.
    }
  }

  ngOnDestroy(): void {
    this.verifyErrorSubscription.unsubscribe();
  }
}
