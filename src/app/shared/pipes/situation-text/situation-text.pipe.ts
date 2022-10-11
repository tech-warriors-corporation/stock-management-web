import { Pipe, PipeTransform } from '@angular/core';

import { BooleanAsNumber } from "../../enums/boolean-as-number";

@Pipe({
    name: 'situationText'
})
export class SituationTextPipe implements PipeTransform {
    transform(text: string, isActive: BooleanAsNumber): string {
        if (isActive === BooleanAsNumber.TRUE) return text

        return `${text} (deletado)`
    }
}
