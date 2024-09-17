import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {PasswordStrength} from "./signup-form.model";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isValidLength;
    if (!passwordValid) {
      return {
        passwordStrength: {
          hasUpperCase: hasUpperCase,
          hasLowerCase: hasLowerCase,
          hasNumeric: hasNumeric,
          hasSpecialChar: hasSpecialChar,
          isValidLength: isValidLength,
        } as PasswordStrength
      };
    }
    return null;
  };
}
