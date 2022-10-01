import { Observable } from "rxjs";

import { Response } from "../types/response";

export interface API {
    readonly API: string
}

export interface GetList<T> {
    getList(...args: any[]): Observable<Response<T[]>>
}
