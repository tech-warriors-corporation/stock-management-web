import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, switchMap, tap } from "rxjs";

import { User } from "../../shared/types/user";
import { environment } from "../../../environments/environment";
import { Response } from "../../shared/types/response";
import { LocalStorage } from "../../shared/decorators/local-storage";
import { StorageName } from "../../shared/enums/storage-name";
import { Path } from "../../shared/enums/path";
import { copy } from "../../shared/helpers/manipulate";

type AuthUser = User | null;
type AuthToken = string | null;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedUser: AuthUser = null

    @LocalStorage(StorageName.TOKEN)
    private currentToken!: AuthToken;

    constructor(private httpClient: HttpClient, private router: Router){}

    get token(): AuthToken {
        return copy(this.currentToken)
    }

    get user(): AuthUser {
        return copy(this.loggedUser)
    }

    get isLogged(): boolean{
        return !!this.user?.userId
    }

    login({ email, userPassword }: { email: string, userPassword: string }): Observable<Response<AuthUser>>{
        return this.httpClient
                   .post<Response<AuthToken>>(`${environment.api}/login`, { email, userPassword })
                   .pipe(
                       switchMap(response => {
                           this.currentToken = response.data

                           return this.userByToken()
                       })
                   );
    }

    userByToken(): Observable<Response<AuthUser>>{
        return this.httpClient.get<Response<AuthUser>>(`${environment.api}/user_by_token`).pipe(tap({
            next: response => this.loggedUser = response.data,
            error: () => this.logout()
        }));
    }

    logout(){
        this.currentToken = this.loggedUser = null;
        this.router.navigateByUrl(`/${Path.LOGIN}`);
    }
}
