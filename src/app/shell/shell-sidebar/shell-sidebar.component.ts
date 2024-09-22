import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-shell-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './shell-sidebar.component.html',
  styleUrl: './shell-sidebar.component.css'
})
export class ShellSidebarComponent {
  @Input() username: string = 'Test Tester';
  @Input() status: string = 'TEST';
  @Input() profileImageUrl: string = 'assets/avatar.png';
  @Input() backgroundImageUrl: string = 'assets/background-image.jfif';
}
