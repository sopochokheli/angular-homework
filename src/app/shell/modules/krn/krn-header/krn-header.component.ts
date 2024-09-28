import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

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
export class KrnHeaderComponent {

  constructor(private router: Router) {
  }
  onLeaveClick() {

    this.router.navigate(['/bpm/bpm000']);
  }
}
