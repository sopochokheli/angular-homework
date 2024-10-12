import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {IRegisterForm} from "./register-form";
import {NgOptimizedImage} from "@angular/common";
import {AuthFormFieldComponent} from "../auth-form-field/auth-form-field.component";
import {AuthButtonFieldComponent} from "../auth-button-field/auth-button-field.component";
import {CompanyLogoComponent} from "../company-logo/company-logo.component";
import {AuthService} from "../auth.service";

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

  constructor(private authService: AuthService) {
  }

  passwordMatchValidator(group: FormGroup<IRegisterForm>): any {
    const password = this.registerForm?.get('password')?.value;
    const confirmPassword = this.registerForm?.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {notMatching: true};
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      console.log("log all", this.registerForm)
      const {username, password, name} = this.registerForm.value;

      try {

        await this.authService.signUp(
          username ?? "",
          password ?? "",
          name ?? ""
        );
      } catch (error) {
        console.error('Registration error:', error);
      }
    } else {
      console.error('Form is not valid');
    }
  }

}
