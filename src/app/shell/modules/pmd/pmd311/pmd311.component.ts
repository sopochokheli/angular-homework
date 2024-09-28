import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-pmd311',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './pmd311.component.html',
  styleUrl: './pmd311.component.css'
})
export class Pmd311Component {
  pmdForm: FormGroup = new FormGroup({});

  // Arrays to store dropdown options for carrier and receiver accounts
  carrierAccounts: { id: number, name: string }[] = [];
  receiverAccounts: { id: number, name: string }[] = [];

  ngOnInit(): void {
    // Initialize the form controls inside FormGroup
    this.pmdForm = new FormGroup({
      carrierAccount: new FormControl('', Validators.required),
      receiverAccount: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(1)]) // Amount should be positive
    });

    // Populate the carrier accounts (dropdown options)
    this.carrierAccounts = [
      { id: 1, name: 'ანგარიში 1' },
      { id: 2, name: 'ანგარიში 2' }
    ];

    // Populate the receiver accounts (dropdown options)
    this.receiverAccounts = [
      { id: 1, name: 'მიმღები ანგარიში 1' },
      { id: 2, name: 'მიმღები ანგარიში 2' }
    ];
  }

  // Method to handle form submission
  onSubmit() {
    if (this.pmdForm.valid) {
      const formData = this.pmdForm.value;
      console.log('Form data submitted:', formData);
      // Further logic for form submission can be added here
    }
  }
}
