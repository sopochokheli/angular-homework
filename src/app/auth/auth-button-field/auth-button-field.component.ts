import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-auth-button-field',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './auth-button-field.component.html',
  styleUrl: './auth-button-field.component.css'
})
export class AuthButtonFieldComponent {
  @Input() href: string = '';
  @Input() disabled: boolean = true;
  @Input() submitText: string = '';
  @Input() hrefText: string = '';
  @Input() iconClass: string = 'ui login';

}
