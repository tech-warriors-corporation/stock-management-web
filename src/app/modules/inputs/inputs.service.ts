import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Response } from "../../shared/types/response";
import { environment } from "../../../environments/environment";
import { API, DeleteItem, GetList, NewItem } from "../../shared/interfaces/restful";
import { Input, Inputs, NewInput } from "../../shared/types/input";
import { InputOutputFilter } from "../../shared/types/input-output";
import { Dictionary } from "../../shared/types/dictionary";
import { formatDateToString } from "../../shared/helpers/date";

@Injectable({
    providedIn: 'root'
})
export class InputsService implements API, GetList<Input>, DeleteItem, NewItem<NewInput>{
    readonly API = `${environment.api}/inputs`

    constructor(private httpClient: HttpClient){}

    getList(page: number, perPage: number, { productId, hasProductExpiration, createdById, dtCreated }: InputOutputFilter){
        const params: Dictionary = { page, per_page: perPage }

        if(typeof(productId) === 'number') params['product_id'] = productId
        if(typeof(hasProductExpiration) === 'number') params['has_product_expiration'] = hasProductExpiration
        if(typeof(createdById) === 'number') params['created_by_id'] = createdById
        if(dtCreated instanceof Date) params['dt_created'] = formatDateToString(dtCreated)

        return this.httpClient.get<Response<Inputs>>(this.API, { params })
    }

    deleteItem(id: number){
        return this.httpClient.delete<Response<null>>(`${this.API}/${id}`)
    }

    newItem({ dtEntered, ...input }: NewInput){
        if (!dtEntered) dtEntered = new Date()

        return this.httpClient.post<Response<null>>(this.API, { ...input, dtEntered });
    }
}
