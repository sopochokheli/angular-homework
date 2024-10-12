import {Component} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";

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

  constructor(private authService: AuthService) {
  }

  onNotificationClick() {
  }

  onLogOutClick() {
    this.authService.logout();
  }

  toggleSearch() {
  }
}
