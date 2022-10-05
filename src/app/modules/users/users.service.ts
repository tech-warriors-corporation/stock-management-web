import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';

import { ChangePasswordUser, EditUser, NewUser, User, Users } from "../../shared/types/user";
import { Response } from "../../shared/types/response";
import { environment } from "../../../environments/environment";
import { API, DeleteItem, EditItem, GetItem, GetList, NewItem } from "../../shared/interfaces/restful";

@Injectable({
    providedIn: 'root'
})
export class UsersService implements API, GetList<User>, DeleteItem, NewItem<NewUser>, GetItem<User>, EditItem<EditUser> {
    readonly API = `${environment.api}/users`

    constructor(private httpClient: HttpClient){}

    getList(page: number, perPage: number, userName: string | null = null, email: string | null = null) {
        const params = { page, per_page: perPage }

        if (userName) Object.assign(params, { user_name: userName })
        if (email) Object.assign(params, { email })

        return this.httpClient.get<Response<Users>>(this.API, { params })
    }

    newItem(user: NewUser){
        return this.httpClient.post<Response<null>>(this.API, user);
    }

    deleteItem(id: number){
        return this.httpClient.delete<Response<null>>(`${this.API}/${id}`)
    }

    getItem(id: number): Observable<Response<User>> {
        return this.httpClient.get<Response<User>>(`${this.API}/${id}`)
    }

    editItem(id: number, user: EditUser): Observable<Response<null>> {
        return this.httpClient.patch<Response<null>>(`${this.API}/${id}`, user)
    }

    changePassword(id: number, passwordUser: ChangePasswordUser): Observable<Response<null>>{
        return this.httpClient.patch<Response<null>>(`${this.API}/${id}/change_password`, passwordUser)
    }
}
