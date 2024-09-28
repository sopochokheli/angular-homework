import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  createAccountForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  createAccount() {
    if (this.createAccountForm.valid) {
      const newAccount = this.createAccountForm.value;
      console.log('Account created:', newAccount);
      // Redirect to account list after saving
      this.router.navigate(['/krn/accounts']);
    } else {
      console.log('Form is invalid');
    }
  }
}
