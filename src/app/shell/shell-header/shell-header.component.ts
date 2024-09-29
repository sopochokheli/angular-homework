import {Component} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shell-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    NgIf
  ],
  templateUrl: './shell-header.component.html',
  styleUrl: './shell-header.component.css'
})
export class ShellHeaderComponent {
  logoSrc = 'assets/logo.svg'; // Update with your logo path
  searchQuery: any;
  showSearch: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSearch() {
    // Implement search functionality
  }

  onLanguageChange() {
    // Implement language change functionality
  }

  onNotificationClick() {
    // Handle notification click
  }

  onLogOutClick() {
    this.authService.logout();
  }

  toggleSearch() {

  }
}
