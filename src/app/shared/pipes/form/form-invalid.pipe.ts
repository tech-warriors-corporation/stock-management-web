import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formInvalid'
})
export class FormInvalidPipe implements PipeTransform {
    transform(invalid: boolean, pristine: boolean): boolean {
        return invalid || pristine;
    }
}
