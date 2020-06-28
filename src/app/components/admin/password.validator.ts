import { AbstractControl } from '@angular/forms';

export function PasswordValidatorc(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // tslint:disable-next-line:object-literal-key-quotes
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'mismatch': true } : null;
}
