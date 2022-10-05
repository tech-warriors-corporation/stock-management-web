import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { ControlError } from "../../enums/ControlError";

@Injectable({
    providedIn: 'root'
})
export class FormService {
    static shouldPasswordEqualsPasswordConfirmation(compareControlName: string): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            const compareControl = control?.parent?.get(compareControlName)

            if (!compareControl) return null

            const firstPasswordValue = control.value
            const secondPasswordValue = compareControl.value

            if (!firstPasswordValue || !secondPasswordValue) return null

            const isEqual = firstPasswordValue === secondPasswordValue

            if (compareControl.hasError(ControlError.PASSWORD_EQUALS_PASSWORD_CONFIRMATION) && isEqual)
                setTimeout(() => compareControl.updateValueAndValidity(), 100)

            return !isEqual ? { [ControlError.PASSWORD_EQUALS_PASSWORD_CONFIRMATION]: true } : null;
        };
    }
}
