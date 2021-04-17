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

    // Fonction pour vérifier si on reçoit des erreurs de la pars du serveur et de les affichers.
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
      // On vérifie si la connexion passe. Si ça passe, la connexion va s'éffectuer dans le service.
      this.userService.login(username, password);
    }
  }

  ngOnDestroy(): void {
    this.verifyErrorSubscription.unsubscribe();
  }
}
