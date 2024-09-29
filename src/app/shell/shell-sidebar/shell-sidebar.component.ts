import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-shell-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './shell-sidebar.component.html',
  styleUrl: './shell-sidebar.component.css'
})
export class ShellSidebarComponent {
  @Input() username: string = 'Test Tester';
  @Input() status: string = 'TEST';
  @Input() profileImageUrl: string = 'assets/avatar.png';
  @Input() backgroundImageUrl: string = 'assets/background-image.jfif';
}
