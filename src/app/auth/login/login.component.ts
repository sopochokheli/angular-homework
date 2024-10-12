import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AuthFormFieldComponent} from "../auth-form-field/auth-form-field.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ILoginForm} from "./login-form";
import {AuthButtonFieldComponent} from "../auth-button-field/auth-button-field.component";
import {CompanyLogoComponent} from "../company-logo/company-logo.component";
import {AuthService} from "../auth.service";

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
  loginForm = new FormGroup<ILoginForm>(<ILoginForm>{
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService) {
  }

  onSubmit() {
    console.log('Form submitted:', this.loginForm.value)
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username && password) {
      console.log('Signing in:', username, password)
      this.authService.signIn(username, password);
    } else {
      console.error('Username and password are required');
    }
  }
}
