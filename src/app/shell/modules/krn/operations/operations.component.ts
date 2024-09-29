import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css'
})
export class OperationsComponent {

  constructor(private router: Router) {
  }

  goToPmd311() {
    this.router.navigate(['/pmd/pmd311']);
  }
}
