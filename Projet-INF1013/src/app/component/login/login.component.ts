import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/users/user';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginInvalid: boolean;
  accountID = 0;
  errorMessage: any;
  verifyErrorSubscription: Subscription


  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {

  //  const userRef = this.userService.test();
  //  this.user = this.userService.getByUserRef(userRef).valueChanges();

/*
    this.userService.getItems().subscribe(
      items => {
        console.log('test :' +items);
      }
    );
    */

    this.initForm();
  }

  onSubmit(): void {
  }

  private initForm(): void {

    // Pour se connecter automatiquement. Évidament, il faudra activer celui enbas
   this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
/*
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });

*/


    // Permet de s'auto connecter :)
    /*
    setTimeout( ()=>{
      this.onSignIn();
    }, 500)

     */


  }

  get email(){
    return this.loginForm.get('email');
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Connexion"
  onSignIn(): void {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;

      // Évidament, il faut mettre email et password à la place, lorsqu'on va faire la vrai connexion
      this.userService.verifyUserExist('pierro_kool@hotmail.com', '123');

      this.verifyErrorSubscription = this.userService.verifySubjectError.subscribe(
        (errorResponse)=>{
          console.log(errorResponse);
            this.errorMessage = errorResponse;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.verifyErrorSubscription.unsubscribe()
  }
}
