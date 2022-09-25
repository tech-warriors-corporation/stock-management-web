import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formControlInvalid'
})
export class FormControlInvalidPipe implements PipeTransform {
    transform(invalid: boolean, touched: boolean): boolean {
        return invalid && touched;
    }
}
