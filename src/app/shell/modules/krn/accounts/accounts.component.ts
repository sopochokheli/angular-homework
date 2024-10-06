import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountsService} from './accounts.service';
import {Account} from './account.model';


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
    this.route.queryParamMap.subscribe(params => {
      this.clientId = params.get('clientId');

      if (this.clientId) {
        const clientName = params.get('clientName') || '';
        this.fetchAccounts(this.clientId, clientName);
      }
    });
  }

  fetchAccounts(clientId: string, clientName: string) {
    this.accountsService.getAccounts(clientId).then(accounts => {
      this.accounts = accounts.map(account => ({
        ...account,
        name: clientName
      }));
    }).catch(error => {
      console.error('Error fetching accounts:', error);
    });
  }

  onDelete(account: Account) {
    console.log('Delete clicked for:', account);
    if (confirm('Are you sure you want to delete this account?')) {
      try {

        this.accountsService.deleteAccount(account.id).then(r => {
          this.accounts = this.accounts.filter(acc => acc.id !== account.id);
        });

      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  }

  addAccount() {
    this.router.navigate(['/krn/accounts/create'], {queryParamsHandling: 'preserve'});
  }
}
