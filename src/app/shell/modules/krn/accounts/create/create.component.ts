import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountsService} from "../accounts.service";
import {Account} from "../account.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  createAccountForm!: FormGroup;
  clientId: string | null = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountsService: AccountsService  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.clientId = params.get('clientId');
    });

    this.createAccountForm = new FormGroup({
      accountName: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  createAccount() {
    if (this.createAccountForm.valid && this.clientId) {
      const newAccount = this.createAccountForm.value;

      // Call AccountsService to add the new account
      this.accountsService.addAccount(this.clientId, newAccount.accountName, newAccount.amount)
        .then(() => {
          console.log('Account created successfully');
          // Redirect to accounts list after saving
          this.router.navigate(['/krn/accounts'], { queryParamsHandling: 'preserve' });
        })
        .catch(error => {
          console.error('Error creating account:', error);
        });
    } else {
      console.log('Form is invalid or clientId is missing');
    }
  }
}
