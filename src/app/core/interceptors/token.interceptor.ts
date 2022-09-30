import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError, Observable, throwError } from "rxjs";

import { HeaderName } from "../../shared/enums/header-name";
import { AuthService } from "../auth/auth.service";
import { StatusCode } from "../../shared/enums/status-code";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.token;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' })

        if (token) headers = headers.append(HeaderName.TOKEN, token)

        const clonedRequest = request.clone({ headers });

        return next.handle(clonedRequest).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === StatusCode.UNAUTHORIZED)
                this.authService.logout()

            return throwError(error)
        }));
    }
}
