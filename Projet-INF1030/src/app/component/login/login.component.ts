import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginInvalid: boolean;
  formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      username: [''/*, Validators.email*/],
      password: [''/*, Validators.required*/]
    });
  }


}
