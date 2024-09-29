import {Component} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

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

  onSearch() {
    // Implement search functionality
  }

  onLanguageChange() {
    // Implement language change functionality
  }

  onNotificationClick() {
    // Handle notification click
  }

  onProfileClick() {
    // Handle profile click
  }

  toggleSearch() {

  }
}
