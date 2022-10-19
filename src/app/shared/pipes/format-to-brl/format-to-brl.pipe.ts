import { Pipe, PipeTransform } from '@angular/core';

import { Lang } from "../../enums/lang";
import { Currency } from "../../enums/currency";

@Pipe({
    name: 'formatToBrl'
})
export class FormatToBrlPipe implements PipeTransform {
    transform(value: any): string | null{
        return typeof value === 'number' ? value.toLocaleString(Lang.PT_BR, { currency: Currency.BRL, style: "currency" }) : null;
    }
}
