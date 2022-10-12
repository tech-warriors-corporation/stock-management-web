import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Response } from "../../shared/types/response";
import { environment } from "../../../environments/environment";
import { API, DeleteItem, GetList } from "../../shared/interfaces/restful";
import { Product, Products } from "../../shared/types/product";

@Injectable({
    providedIn: 'root'
})
export class ProductsService implements API, GetList<Product>, DeleteItem{
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
}
