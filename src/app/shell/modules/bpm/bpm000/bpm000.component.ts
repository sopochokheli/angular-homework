import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
export class Bpm000Component {
  clientSearchForm: FormGroup = new FormGroup({});
  clients: any[] = []; // Full list of clients
  filteredClients: any[] = []; // Filtered clients to display in the table
  searchPerformed = false; // Flag to check if search was performed

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    // Initialize the reactive form
    this.clientSearchForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      clientUniqueId: new FormControl('')
    });

    // Initialize client data (mock data)
    this.clients = [
      {firstName: 'ლევან', lastName: 'ჭანტურია', clientUniqueId: 17},
      {firstName: 'Test', lastName: 'Tester', clientUniqueId: 21},
      {firstName: 'Test 2', lastName: 'Tester', clientUniqueId: 20},
      {firstName: 'Test 5', lastName: 'Tester', clientUniqueId: 1},
      {firstName: 'Test 3', lastName: 'Tester', clientUniqueId: 19},
      {firstName: 'Test 4', lastName: 'Tester', clientUniqueId: 18}
    ];
  }

  // Method to handle form submission and filter clients
  onSubmit() {
    const {firstName, lastName, clientUniqueId} = this.clientSearchForm.value;

    // Set searchPerformed to true when form is submitted
    this.searchPerformed = true;

    // Filter the clients based on the search criteria
    this.filteredClients = this.clients.filter(client => {
      return (
        (!firstName || client.firstName.toLowerCase().includes(firstName.toLowerCase())) &&
        (!lastName || client.lastName.toLowerCase().includes(lastName.toLowerCase())) &&
        (!clientUniqueId || client.clientUniqueId.toString() === clientUniqueId)
      );
    });
  }

  goToAddClient() {
    this.router.navigate(['/bpm/bpm001']);
  }

  onClientRowClick(client: any) {
    this.router.navigate(['/krn/krnicp'], {queryParams: {clientId: client.clientUniqueId}});

  }
}
