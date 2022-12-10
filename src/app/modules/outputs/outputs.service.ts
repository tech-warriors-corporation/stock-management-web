import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { API, DeleteItem, EditItem, GetItem, GetList, NewItem } from "../../shared/interfaces/restful";
import { EditOutput, NewOutput, Output, Outputs } from "../../shared/types/output";
import { InputOutputFilter } from "../../shared/types/input-output";
import { Dictionary } from "../../shared/types/dictionary";
import { formatDateToString, today } from "../../shared/helpers/date";
import { Response } from "../../shared/types/response";
import { DashboardCardFilter } from "../../shared/types/dashboard-card-filter";

@Injectable({
    providedIn: 'root'
})
export class OutputsService implements API, GetList<Output>, DeleteItem, NewItem<NewOutput>, GetItem<Output>, EditItem<EditOutput>{
    readonly API = `${environment.api}/outputs`

    constructor(private httpClient: HttpClient){}

    getList(page: number, perPage: number, { productId, hasProductExpiration, createdById, dtCreated }: InputOutputFilter){
        const params: Dictionary = { per_page: perPage, page }

        if(typeof(productId) === 'number') Object.assign(params, { product_id: productId })
        if(typeof(hasProductExpiration) === 'number') Object.assign(params, { has_product_expiration: hasProductExpiration })
        if(typeof(createdById) === 'number') Object.assign(params, { created_by_id: createdById })
        if(dtCreated instanceof Date) Object.assign(params, { dt_created: formatDateToString(dtCreated) })

        return this.httpClient.get<Response<Outputs>>(this.API, { params })
    }

    deleteItem(id: number){
        return this.httpClient.delete<Response<null>>(`${this.API}/${id}`)
    }

    newItem({ dtExited, ...output }: NewOutput): Observable<Response<null>> {
        if (!dtExited) dtExited = today()

        return this.httpClient.post<Response<null>>(this.API, { ...output, dtExited });
    }

    getItem(id: number): Observable<Response<Output>> {
        return this.httpClient.get<Response<Output>>(`${this.API}/${id}`)
    }

    editItem(id: number, output: EditOutput): Observable<Response<null>> {
        return this.httpClient.patch<Response<null>>(`${this.API}/${id}`, output)
    }

    getOutputsQuantity({ year, productId }: DashboardCardFilter){
        const params: Dictionary = { year }

        if(productId) params['product_id'] = productId

        return this.httpClient.get<Response<Outputs>>(`${this.API}/quantity`, { params })
    }
}
