import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formInvalid'
})
export class FormInvalidPipe implements PipeTransform {
    transform(invalid: boolean, pristine = false): boolean {
        return invalid || pristine;
    }
}
