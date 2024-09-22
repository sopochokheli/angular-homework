import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-auth-form-field',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './auth-form-field.component.html',
  styleUrl: './auth-form-field.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthFormFieldComponent),
      multi: true
    }
  ]
})
export class AuthFormFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() fieldId: string = '';
  @Input() control!: FormControl;
  @Input() iconClass: string = 'fas';

  onChange = (value: any) => {};
  onTouched = () => {};


  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
