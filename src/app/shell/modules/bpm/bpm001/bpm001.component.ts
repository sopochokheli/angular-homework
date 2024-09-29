import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-bpm001',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './bpm001.component.html',
  styleUrl: './bpm001.component.css'
})
export class Bpm001Component {
  clientForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    // Initialize the form with Reactive Form controls
    this.clientForm = new FormGroup({
      firstName: new FormControl('', Validators.required), // სახელი
      lastName: new FormControl('', Validators.required),  // გვარი
      plusPoints: new FormControl('', [Validators.required, Validators.min(0)]) // Plus ქულები
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      console.log('Form submitted:', clientData);
      // Logic to handle form submission, like saving the data or making an API call
    } else {
      console.log('Form is invalid');
    }
  }
}
