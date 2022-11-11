import { Observable } from "rxjs";

import { Response } from "../types/response";

export interface API {
    readonly API: string
}

export interface GetList<T> {
    getList(...args: any[]): Observable<Response<T[]>>
}

export interface DeleteItem{
    deleteItem(id: number): Observable<Response<null>>
}

export interface NewItem<T>{
    newItem(item: T): Observable<Response<null>>
}

export interface GetItem<T>{
    getItem(id: number): Observable<Response<T>>
}

export interface EditItem<T>{
    editItem(id: number, item: T): Observable<Response<null>>
}

export interface GetAutocompleteList<T> {
    getAutocompleteList(...args: any[]): Observable<Response<T[]>>
}

export interface GetSelectList<T> {
    getSelectList(): Observable<Response<T[]>>
}
