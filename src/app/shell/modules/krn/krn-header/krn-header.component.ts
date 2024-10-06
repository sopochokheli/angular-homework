import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ClientsService} from "../../bpm/clients.service";
import {AccountsService} from "../accounts/accounts.service";

@Component({
  selector: 'app-krn-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './krn-header.component.html',
  styleUrl: './krn-header.component.css'
})
export class KrnHeaderComponent implements OnInit {
  clientId: string | null = null;
  clientName: string = "";
  plusPoints: number = 0;
  totalAmount: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private clientsService: ClientsService, private accountsService: AccountsService) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.clientId = params.get('clientId');

      const storedClientData = localStorage.getItem('clientData');

      if (storedClientData) {
        const clientData = JSON.parse(storedClientData);

        if (clientData.clientId == this.clientId) {
          this.clientName = clientData.clientName;
          this.plusPoints = clientData.plusPoints;
          this.totalAmount = clientData.totalAmount;
        } else {
          this.fetchClientDataFromService();
        }
      } else {
        this.fetchClientDataFromService();
        this.fetchTotalAmount();
      }

      this.accountsService.accountCreated.subscribe((amount: number) => {
        this.totalAmount += amount;
        this.updateLocalStorage();
      });

      this.accountsService.accountDeleted.subscribe((amount: number) => {
        this.totalAmount -= amount;
        this.updateLocalStorage();
      });
    });
  }

  updateLocalStorage() {
    const storedClientData = {
      clientId: this.clientId,
      clientName: this.clientName,
      plusPoints: this.plusPoints,
      totalAmount: this.totalAmount
    };
    localStorage.setItem('clientData', JSON.stringify(storedClientData));
  }

  fetchClientDataFromService() {
    this.clientsService.getClient(this.clientId ?? "").then(document => {
      this.clientName = document?.['firstName'] + ' ' + document?.['lastName'];
      this.plusPoints = document?.['plusPoints'];

      this.updateLocalStorage()
    });
  }

  fetchTotalAmount() {
    this.accountsService.getAccountsAmount(this.clientId ?? "").then(totalAmount => {
      this.totalAmount = totalAmount;

      const storedClientData = JSON.parse(localStorage.getItem('clientData') ?? '{}');
      localStorage.setItem('clientData', JSON.stringify({
        ...storedClientData,
        totalAmount: this.totalAmount
      }));
    }).catch(error => {
      console.error('Error fetching account amounts:', error);
    });
  }


  onLeaveClick() {
    localStorage.removeItem('clientData');
    this.router.navigate(['/bpm/bpm000']);
  }

  navigateWithParams(route: string) {
    this.router.navigate([route], {queryParamsHandling: 'preserve'});
  }

  navigateToAccounts(route: string) {
    this.router.navigate([route], {
      queryParams: {clientName: this.clientName},
      queryParamsHandling: 'merge'
    });
  }
}
