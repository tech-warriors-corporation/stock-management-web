import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from "@angular/common";

@Pipe({
    name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {
    constructor(private datePipe: DatePipe){}

    transform(date: string): string | null{
        return this.datePipe.transform(date, 'dd/MM/yyyy');
    }
}
