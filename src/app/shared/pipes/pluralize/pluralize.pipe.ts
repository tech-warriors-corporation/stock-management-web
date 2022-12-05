import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {
    transform(value: number, singularText: string, pluralText: string): string {
        return value <= 1 ? singularText : pluralText;
    }
}
