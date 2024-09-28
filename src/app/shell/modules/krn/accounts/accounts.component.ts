import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

interface Account {
  name: string;
  accountName: string;
  amount: number;
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  accounts: Account[] = [
    { name: 'Test 4 Tester', accountName: 'Test Account', amount: 300 },
    { name: 'Test 4 Tester', accountName: 'Test Account', amount: 9410 },
    { name: 'Test 4 Tester', accountName: 'ახალი ანგარიში', amount: 140 },
    { name: 'Test 4 Tester', accountName: 'ახალი ანგარიში 2', amount: 150 }
  ];

  onDelete(account: Account) {
    console.log('Delete clicked for:', account);
    // Implement deletion logic
  }

  addAccount() {
    console.log('Add account clicked');
    // Implement add logic
  }
}
