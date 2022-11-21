import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

import { ControlError } from "../../enums/control-error";
import { DATE_LENGTH, formatDateToString } from "../../helpers/date";
import { BooleanAsNumber } from "../../enums/boolean-as-number";

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

    static validateDate(id: string): ValidatorFn{
        let input: HTMLInputElement | null = null

        return (control: AbstractControl): ValidationErrors | null => {
            if(!input) input = document.getElementById(id) as HTMLInputElement;

            const value = control.value || null
            const dateString = value instanceof Date ? formatDateToString(value) : null
            const inputValue = input?.value || null

            if(dateString && inputValue && (dateString !== inputValue || dateString?.length !== DATE_LENGTH || inputValue?.length !== DATE_LENGTH))
                return { [ControlError.INVALID_DATE]: true }

            return null
        }
    }

    static shouldBeBooleanAsNumberWithTrueValue(control: AbstractControl): ValidationErrors | null{
        const { value } = control

        if(value !== BooleanAsNumber.TRUE)
            return { [ControlError.BOOLEAN_AS_NUMBER_WITH_TRUE_VALUE]: true }

        return null;
    }

    static notBe(wrongValue: number): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            const { value } = control

            if(value === wrongValue) return { [ControlError.WRONG_VALUE]: true }

            return null
        }
    }
}
