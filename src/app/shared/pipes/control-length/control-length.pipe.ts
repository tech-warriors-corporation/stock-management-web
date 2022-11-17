import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'controlLength',
})
export class ControlLengthPipe implements PipeTransform {
    transform(value: string | null, maxlength: number): string {
        return `${value?.length || 0}/${maxlength}`;
    }
}
