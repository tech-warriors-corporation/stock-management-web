import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { User, Users } from "../../shared/types/user";
import { Response } from "../../shared/types/response";
import { environment } from "../../../environments/environment";
import { API, GetList } from "../../shared/interfaces/restful";

@Injectable({
    providedIn: 'root'
})
export class UsersService implements API, GetList<User>{
    readonly API = `${environment.api}/users`

    constructor(private httpClient: HttpClient){}

    getList(page: number, perPage: number, userName: string | null = null, email: string | null = null) {
        const params = { page, per_page: perPage }

        if (userName) Object.assign(params, { user_name: userName })
        if (email) Object.assign(params, { email })

        return this.httpClient.get<Response<Users>>(this.API, { params })
    }
}
