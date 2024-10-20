import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  requiredFieldValidator(fieldName: string, minLength: number = 0, maxLength: number = Infinity): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      const isString = typeof value === 'string';
      const isNumber = typeof value === 'number';
      const isValid = (isString && value.trim() !== '') || (isNumber && value != null);

      if (!isValid) {
        return {requiredField: `გთხოვთ შეიყვანოთ ${fieldName}`};
      }

      if (isString) {
        if (value.length < minLength) {
          return {lengthError: `${fieldName} უნდა იყოს მინიმუმ ${minLength} სიმბოლოების სიგრძის`};
        }
        if (value.length > maxLength) {
          return {lengthError: `${fieldName} უნდა იყოს მაქსიმუმ ${maxLength} სიმბოლოების სიგრძის`};
        }
      }

      return null;
    };
  }

  minNumberValidator(minValue: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === null || value === undefined || isNaN(value) || value >= minValue) {
        return null;
      }
      return {minNumber: `გთოხვთ შეიყვანოთ მინიმუმ ${minValue}`};
    };
  }
}
