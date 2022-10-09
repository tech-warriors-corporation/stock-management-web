import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Response } from "../../shared/types/response";
import { environment } from "../../../environments/environment";
import { API, DeleteItem, EditItem, GetItem, GetList, NewItem } from "../../shared/interfaces/restful";
import { Categories, Category, EditCategory, NewCategory } from "../../shared/types/category";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService implements API, GetList<Category>, DeleteItem, NewItem<NewCategory>, GetItem<Category>, EditItem<EditCategory>{
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

    newItem(category: NewCategory){
        return this.httpClient.post<Response<null>>(this.API, category);
    }

    getItem(id: number): Observable<Response<Category>> {
        return this.httpClient.get<Response<Category>>(`${this.API}/${id}`)
    }

    editItem(id: number, category: EditCategory): Observable<Response<null>> {
        return this.httpClient.patch<Response<null>>(`${this.API}/${id}`, category)
    }
}
