import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { HeaderName } from "../../shared/enums/header-name";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.token;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' })

        if (token) headers = headers.append(HeaderName.TOKEN, token)

        const clonedRequest = request.clone({ headers, withCredentials: true });

        return next.handle(clonedRequest);
    }
}
