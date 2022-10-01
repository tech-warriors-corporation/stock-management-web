import { Pipe, PipeTransform } from '@angular/core';

import { BooleanAsNumber } from "../../enums/boolean-as-number";
import { ValueToText } from "../../enums/ValueToText";

@Pipe({
    name: 'booleanAsNumberToText'
})
export class BooleanAsNumberToTextPipe implements PipeTransform {
    transform(value: BooleanAsNumber): ValueToText{
        if (value === BooleanAsNumber.TRUE) return ValueToText.YES;
        else if(value === BooleanAsNumber.FALSE) return ValueToText.NO;

        return ValueToText.NONE
    }
}
