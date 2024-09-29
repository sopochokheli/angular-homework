import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ClientsService} from "../clients.service";
import {Router} from "@angular/router";

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
export class Bpm001Component implements OnInit {
  clientForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    // Initialize the form with Reactive Form controls
    this.clientForm = new FormGroup({
      firstName: new FormControl('', Validators.required), // სახელი
      lastName: new FormControl('', Validators.required),  // გვარი
      plusPoints: new FormControl('', [Validators.required, Validators.min(0)]) // Plus ქულები
    });
  }

  constructor(private clientService: ClientsService, private router: Router) {
  }

  // Method to handle form submission
  onSubmit() {
    if (this.clientForm.valid) {
      const {firstName, lastName, plusPoints} = this.clientForm.value;

      this.clientService.addClients(firstName!, lastName!, plusPoints!).then(clientId => {

        console.log('Client added successfully with ID:', clientId);
        this.router.navigate(['/krn/krnicp'], { queryParams: { clientId: clientId } });

      }).catch(error => {
        console.error('Error adding client:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
