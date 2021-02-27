import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/users/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginInvalid: boolean;
  accountID = 0;
  errorMessage: any;


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

   // this.userService.getUser();

    this.initForm();
  }

  onSubmit(): void {
  }

  private initForm(): void {
  /*  this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });*/

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });


  }

  get email(){
    return this.loginForm.get('email');
  }
  // Fonction pour réagir lorsque la personne clique sur le bouton "Connexion"
  onSignIn(): void {

    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    if (this.loginForm.valid) {
      //'pierro_kool@hotmail.com3','789'/*email,password*/

      this.userService.verifyUserExist('pierro_kool@hotmail.com', '123'/*email, password*/).then(
        (user) => {
          if (user) {
            this.userService.signIn();
          }
          else {
            this.errorMessage = 'Le courriel ou le mot de passe est invalide.';
          }
        },
        (error) => {
          this.errorMessage = error;
        }
      );

      /*
            if(this.userService.verifyUserExist('pierro_kool@hotmail.com','1234')){
              console.log('TRUE');
              this.userService.signIn();
            }
            else {
              console.log('false');
            }
          }

       */


    }
  }


}
