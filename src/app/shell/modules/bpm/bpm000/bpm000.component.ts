import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ClientsService} from "../clients.service";

@Component({
  selector: 'app-bpm000',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './bpm000.component.html',
  styleUrl: './bpm000.component.css'
})
export class Bpm000Component implements OnInit {
  clientSearchForm: FormGroup = new FormGroup({});
  clients: any[] = []; // Full list of clients
  filteredClients: any[] = []; // Filtered clients to display in the table
  searchPerformed = false; // Flag to check if search was performed

  constructor(private router: Router, private clientsService: ClientsService) {
  }

  ngOnInit(): void {
    // Initialize the reactive form
    this.clientSearchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      clientId: new FormControl('')
    });
  }

  async onSubmit() {
    const {firstName, lastName, clientId} = this.clientSearchForm.value;

    // Set searchPerformed to true when form is submitted
    this.searchPerformed = true;

    try {
      this.filteredClients = await this.clientsService.getClients(clientId, firstName, lastName);
      console.log('filtered clients', this.filteredClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      this.filteredClients = []; // Clear filtered clients on error
    }
  }

  goToAddClient() {
    this.router.navigate(['/bpm/bpm001']);
  }

  onClientRowClick(client: any) {
    console.log(client);
    this.router.navigate(['/krn/krnicp'], {queryParams: {clientId: client.clientId}});
  }
}
