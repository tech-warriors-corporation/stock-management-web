import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from "@angular/forms";

import { FormControlError } from "../../types/form-control-error";
import { ControlError } from "../../enums/control-error";
import { NONE_VALUE } from "../../helpers/manipulate";

const getInvalidDateMessage = () => "Data inválida"

@Pipe({
    name: 'formControlError'
})
export class FormControlErrorPipe implements PipeTransform {
    private readonly errors: FormControlError[] = [
        { key: ControlError.REQUIRED, getMessage: () => 'Campo é obrigatório' },
        { key: ControlError.EMAIL, getMessage: () => 'E-mail é inválido' },
        { key: ControlError.MAXLENGTH, getMessage: () => 'Tamanho máximo de caracteres ultrapassado' },
        {
            key: ControlError.MINLENGTH,
            getMessage: error => {
                const length = error.requiredLength;

                return `O mínimo é de ${error.requiredLength} caractere${length >= 2 ? 's' : NONE_VALUE}`;
            }
        },
        { key: ControlError.MIN, getMessage: ({ min }) => `O valor mínimo permitido é ${min}` },
        { key: ControlError.MAX, getMessage: ({ max }) => `O valor máximo permitido é ${max}` },
        { key: ControlError.PASSWORD_EQUALS_PASSWORD_CONFIRMATION, getMessage: () => 'As senhas não estão iguais' },
        { key: ControlError.INVALID_DATE, getMessage: getInvalidDateMessage },
        { key: ControlError.MAT_DATEPICKER_PARSE, getMessage: getInvalidDateMessage },
        { key: ControlError.MAT_DATEPICKER_MAX, getMessage: getInvalidDateMessage },
    ];

    transform(errors: ValidationErrors | null): string {
        let message = NONE_VALUE;

        if (errors)
            this.errors.every(error => {
                const errorValue = errors[error.key]

                if(errorValue){
                    message = error.getMessage(errorValue);

                    return false;
                }

                return true;
            });

        return message;
    }
}
