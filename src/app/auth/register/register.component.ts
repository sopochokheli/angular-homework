import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IRegisterForm} from "./register-form";
import {NgOptimizedImage} from "@angular/common";
import {AuthFormFieldComponent} from "../auth-form-field/auth-form-field.component";
import {AuthButtonFieldComponent} from "../auth-button-field/auth-button-field.component";
import {CompanyLogoComponent} from "../company-logo/company-logo.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    AuthFormFieldComponent,
    AuthButtonFieldComponent,
    CompanyLogoComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup<IRegisterForm>({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  passwordMatchValidator(group: FormGroup<IRegisterForm>): any {
    const password = this.registerForm?.get('password')?.value;
    const confirmPassword = this.registerForm?.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit() {

  }
}
