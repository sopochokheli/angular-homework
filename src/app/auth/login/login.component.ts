import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from "@angular/router";
import {AuthFormFieldComponent} from "../auth-form-field/auth-form-field.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IRegisterForm} from "../register/register-form";
import {ILoginForm} from "./login-form";
import {AuthButtonFieldComponent} from "../auth-button-field/auth-button-field.component";
import {CompanyLogoComponent} from "../company-logo/company-logo.component";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    RouterOutlet,
    AuthFormFieldComponent,
    ReactiveFormsModule,
    AuthButtonFieldComponent,
    CompanyLogoComponent
  ],
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup<ILoginForm>({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  onSubmit() {

  }

}
