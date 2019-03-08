import { AbstractControl } from '@angular/forms';

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const valid = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}$/.test(control.value);
    return valid ? null : { invalidEmail: { valid: false, value: control.value } };
  }
