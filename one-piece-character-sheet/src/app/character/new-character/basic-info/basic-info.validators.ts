import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {MinMax} from "./basic-info.component";

export function ageValidator(min: number = 8, max: number = 140): ValidatorFn {
  return minMaxValidator({min: min, max: max});
}

export function validateNumberInput(event: KeyboardEvent): void {
  const allowedKeys: string[] = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
  const key: string = event.key;
  if (allowedKeys.includes(key)) {
    return;
  }
  if (!/^\d$/.test(key)) {
    event.preventDefault();
  }
}

export function validatePhysicalInput(event: KeyboardEvent): void {
  const allowedKeys: string[] = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', ',', '.'];
  const key: string = event.key;
  if (allowedKeys.includes(key)) {
    return;
  }
  if (!/^-?\d+$/.test(key)) {
    event.preventDefault();
  }
}

export function minMaxValidator(minMax: MinMax): ValidatorFn {
  const min: number = minMax.min;
  const max: number = minMax.max;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return {invalid: {min, max}};
    }
    const valueAsNumber: number = Number(value.replace(',', '.'));
    if (isNaN(valueAsNumber) || valueAsNumber < min || valueAsNumber > max) {
      return {invalid: {min, max}};
    }
    return null;
  };
}
