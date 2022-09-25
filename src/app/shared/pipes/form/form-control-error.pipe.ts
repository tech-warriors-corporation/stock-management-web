import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from "@angular/forms";

import { FormControlError } from "../../types/form-control-error";

@Pipe({
    name: 'formControlError'
})
export class FormControlErrorPipe implements PipeTransform {
    private readonly errors: FormControlError[] = [
        { key: 'required', getMessage: () => 'Campo é obrigatório' },
        { key: 'email', getMessage: () => 'E-mail é inválido' },
        { key: 'maxlength', getMessage: () => 'Tamanho máximo de caracteres ultrapassado' },
        {
            key: 'minlength',
            getMessage: error => {
                const length = error.requiredLength;

                return `O mínimo é de ${error.requiredLength} caractere${length >= 2 ? 's' : ''}`;
            }
        },
    ];

    transform(errors: ValidationErrors | null): string {
        let message = '';

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
