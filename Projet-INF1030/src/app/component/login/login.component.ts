import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/authentification/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginInvalid: boolean;
  accountID = 0;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
  }

  private initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [''/*, Validators.email*/],
      password: [''/*, Validators.required*/]
    });
  }


  onSignIn(): void {
    this.authService.signIn().then(  // .then Pour réagir quand le callback sera appelé parce que c'est asynchrone
      () => {
        this.authService.signIn();
        this.router.navigate(['person'/*, this.accountID*/]);
      }
    );
  }
}
