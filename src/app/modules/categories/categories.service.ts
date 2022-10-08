import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Response } from "../../shared/types/response";
import { environment } from "../../../environments/environment";
import { API, DeleteItem, GetList } from "../../shared/interfaces/restful";
import { Categories, Category } from "../../shared/types/category";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService implements API, GetList<Category>, DeleteItem {
    readonly API = `${environment.api}/categories`

    constructor(private httpClient: HttpClient){}

    getList(page: number, perPage: number, categoryName: string | null = null) {
        const params = { page, per_page: perPage }

        if (categoryName) Object.assign(params, { category_name: categoryName })

        return this.httpClient.get<Response<Categories>>(this.API, { params })
    }

    deleteItem(id: number){
        return this.httpClient.delete<Response<null>>(`${this.API}/${id}`)
    }
}
