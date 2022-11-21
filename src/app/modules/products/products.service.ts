import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map, Observable } from "rxjs";

import { Response } from "../../shared/types/response";
import { environment } from "../../../environments/environment";
import {
    API,
    DeleteItem,
    EditItem,
    GetAutocompleteList,
    GetItem,
    GetList,
    NewItem
} from "../../shared/interfaces/restful";
import { EditProduct, NewProduct, Product, Products } from "../../shared/types/product";
import { AutocompleteOptions } from "../../shared/types/autocomplete";
import { BooleanAsNumber } from "../../shared/enums/boolean-as-number";
import { Dictionary } from "../../shared/types/dictionary";

@Injectable({
    providedIn: 'root'
})
export class ProductsService implements API, GetList<Product>, DeleteItem, NewItem<NewProduct>, GetItem<Product>, EditItem<EditProduct>, GetAutocompleteList{
    readonly API = `${environment.api}/products`

    constructor(private httpClient: HttpClient){}

    getList (page: number, perPage: number, productName: string | null = null, categoryId: number | null = null) {
        const params = { page, per_page: perPage }

        if (productName) Object.assign(params, { product_name: productName })
        if (categoryId) Object.assign(params, { category_id: categoryId })

        return this.httpClient.get<Response<Products>>(this.API, { params })
    }

    deleteItem(id: number){
        return this.httpClient.delete<Response<null>>(`${this.API}/${id}`)
    }

    newItem(product: NewProduct){
        return this.httpClient.post<Response<null>>(this.API, product);
    }

    getItem(id: number): Observable<Response<Product>> {
        return this.httpClient.get<Response<Product>>(`${this.API}/${id}`)
    }

    editItem(id: number, product: EditProduct): Observable<Response<null>> {
        return this.httpClient.patch<Response<null>>(`${this.API}/${id}`, product)
    }

    getAutocompleteList(isActive?: BooleanAsNumber): Observable<Response<AutocompleteOptions>> {
        const params: Dictionary = {}

        if(typeof(isActive) === 'number') params['is_active'] = isActive

        return this.httpClient
                   .get<Response<Products>>(`${this.API}/autocomplete`, { params })
                   .pipe(
                       map(({ data: products, ...response }) => ({
                           ...response,
                           data: products.map(({ productId, productName, isActive }) => ({ value: productId, text: productName, isActive }))
                       }))
                   )
    }
}
