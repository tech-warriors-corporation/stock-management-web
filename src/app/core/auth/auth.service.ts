import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, Subject, switchMap, tap } from "rxjs";

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
    private userChanged = new Subject<void>();
    private loggedUser: AuthUser = null

    @LocalStorage(StorageName.TOKEN)
    private currentToken!: AuthToken;

    constructor(private httpClient: HttpClient, private router: Router){}

    private setUser(user: AuthUser){
        this.loggedUser = user
        this.userChanged.next()
    }

    watchUserChanged(): Observable<void>{
        return this.userChanged.asObservable()
    }

    get token(): AuthToken {
        return copy(this.currentToken)
    }

    get user(): AuthUser {
        return copy(this.loggedUser)
    }

    get isLogged(): boolean{
        return !!this.user?.userId
    }

    get isAmin(): boolean{
        return !!this.user?.isAdmin
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
            next: response => this.setUser(response.data),
            error: () => this.logout()
        }));
    }

    logout(){
        this.currentToken = null;
        this.setUser(null);
        this.router.navigateByUrl(`/${Path.LOGIN}`);
    }
}
