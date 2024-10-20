import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {AccountsService} from "../../krn/accounts/accounts.service";
import {ValidatorsService} from "../../../../validators.service";

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
export class Pmd311Component implements OnInit {
  pmdForm: FormGroup = new FormGroup({});

  carrierAccounts: any[] = [];
  receiverAccounts: any[] = [];
  clientId: string | null = null;

  constructor(
    private accountsService: AccountsService,
    private route: ActivatedRoute,
    private validatorsService: ValidatorsService
  ) {
  }

  ngOnInit(): void {
    this.pmdForm = new FormGroup({
      carrierAccount: new FormControl('', this.validatorsService.requiredFieldValidator('ანგარიში')),
      receiverAccount: new FormControl('', this.validatorsService.requiredFieldValidator('მიმღები ანგარიში')),
      amount: new FormControl('', [this.validatorsService.requiredFieldValidator('თანხა'), this.validatorsService.minNumberValidator(1)])
    });

    this.route.queryParamMap.subscribe(params => {
      this.clientId = params.get('clientId');
      this.refreshAccounts();
    });
  }

  private getCarrierAccounts(clientId: string): void {
    this.accountsService.getAccounts(clientId).then(accounts => {
      this.carrierAccounts = accounts;
    }).catch(error => {
      console.error('Error fetching carrier accounts:', error);
    });
  }

  private getReceiverAccounts(clientId: string): void {
    this.accountsService.getAllAccounts(clientId).then(accounts => {
      this.receiverAccounts = accounts;
    }).catch(error => {
      console.error('Error fetching receiver accounts:', error);
    });
  }

  onSubmit() {
    if (this.pmdForm.valid) {
      const formData = this.pmdForm.value;
      const selectedCarrierAccount = this.carrierAccounts.find(account => account.id === formData.carrierAccount);
      const selectedReceiverAccount = this.receiverAccounts.find(account => account.id === formData.receiverAccount);
      const transferAmount = formData.amount;

      this.accountsService.transferFunds(selectedCarrierAccount, selectedReceiverAccount, transferAmount)
        .then(() => {
          console.log('Transfer completed successfully');
          this.pmdForm.reset();
          this.refreshAccounts();
        })
        .catch(error => {
          console.error('Transfer failed:', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }

  private refreshAccounts(): void {
    if (this.clientId) {
      this.getCarrierAccounts(this.clientId);
      this.getReceiverAccounts(this.clientId);
    }
  }
}
