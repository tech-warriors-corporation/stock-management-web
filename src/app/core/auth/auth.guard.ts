import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

import { Path } from 'src/app/shared/enums/path';
import { AuthService } from "./auth.service";
import { FullLoadingService } from "../full-loading/full-loading.service";

export const getAdminRoutes = () => [Path.USERS, Path.CATEGORIES, Path.PRODUCTS]

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router, private fullLoadingService: FullLoadingService){}

    async canLoad(route: Route): Promise<boolean> {
        const { path } = route;
        const token = this.authService.token;
        const adminRoutes = getAdminRoutes()
        let isLogged = this.authService.isLogged;
        let isAdmin = this.authService.isAmin;

        if (!isLogged && token){
            this.fullLoadingService.setShow(true);

            try{
                await this.authService.userByToken().toPromise()
            } catch(error){
                console.error(error)
            } finally {
                isLogged = this.authService.isLogged;
                isAdmin = this.authService.isAmin;

                this.fullLoadingService.setShow(false);
            }
        }

        if (isLogged && !isAdmin && adminRoutes.includes(path as Path)){
            await this.router.navigateByUrl(`/${Path.DASHBOARD}`);

            return false
        }

        if (isLogged && path === Path.LOGIN){
            await this.router.navigateByUrl(`/${Path.DASHBOARD}`);

            return false;
        }

        if (!isLogged && path !== Path.LOGIN){
            await this.router.navigateByUrl(`/${Path.LOGIN}`);

            return false;
        }

        return true;
    }
}
