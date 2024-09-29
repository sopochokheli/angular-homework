import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountsService} from './accounts.service';
import { Account } from './account.model';


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  clientId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountsService: AccountsService
  ) {
  }

  ngOnInit() {
    // Get the clientId from query params or other method
    this.route.queryParamMap.subscribe(params => {
      this.clientId = params.get('clientId');
      console.log('Client ID received:', this.clientId);

      if (this.clientId) {
        // Fetch accounts for this clientId
        this.fetchAccounts(this.clientId);
      }
    });
  }

  // Method to fetch accounts for a specific clientId
  fetchAccounts(clientId: string) {
    this.accountsService.getAccounts(clientId).then(accounts => {
      console.log('accounts:', accounts);
      this.accounts = accounts;
    }).catch(error => {
      console.error('Error fetching accounts:', error);
    });
  }

  onDelete(account: Account) {
    console.log('Delete clicked for:', account);
    // Implement deletion logic in AccountsService, e.g., this.accountsService.deleteAccount(account.id)
  }

  addAccount() {
    console.log('Add account clicked');
    this.router.navigate(['/krn/accounts/create'], {queryParamsHandling: 'preserve'});
  }
}
