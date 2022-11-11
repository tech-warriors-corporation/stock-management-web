import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs";

import { GetSelectList } from "../interfaces/restful";
import { SelectOption, SelectOptions } from "../types/select";
import { Response } from "../types/response";
import { BooleanAsNumber } from "../enums/boolean-as-number";
import { createResponse, NONE_VALUE } from "../helpers/manipulate";

@Injectable({
    providedIn: 'root'
})
export class ItemExpirationsService implements GetSelectList<SelectOption>{
    getSelectList(): Observable<Response<SelectOptions>> {
        return of(
            createResponse<SelectOptions>([
                { value: BooleanAsNumber.TRUE, text: "Sim", isActive: BooleanAsNumber.TRUE },
                { value: BooleanAsNumber.FALSE, text: "Não", isActive: BooleanAsNumber.TRUE },
                { value: NONE_VALUE, text: "Ambos", isActive: BooleanAsNumber.TRUE },
            ])
        )
    }
}
