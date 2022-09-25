import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

import { Path } from 'src/app/shared/enums/path';
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router){}

    canLoad(route: Route): boolean {
        const isLogged = this.authService.isLogged;
        const { path } = route;

        if (isLogged && path === Path.LOGIN){
            this.router.navigateByUrl(`/${Path.DASHBOARD}`);

            return false;
        }

        if (!isLogged && path !== Path.LOGIN){
            this.router.navigateByUrl(`/${Path.LOGIN}`);

            return false;
        }

        return true;
    }
}
