import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Path } from 'src/app/shared/enums/path';
import { AuthService } from "./auth.service";
import { FullLoadingService } from "../full-loading/full-loading.service";
import { BooleanAsNumber } from "../../shared/enums/boolean-as-number";
import { UsersChangePasswordService } from "../../modules/users/change-password/users-change-password.service";
import { UsersChangePasswordLayout } from "../../shared/enums/users-change-password-layout";

export const getAdminRoutes = () => [Path.USERS, Path.CATEGORIES, Path.PRODUCTS]

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private fullLoadingService: FullLoadingService,
        private usersChangePasswordService: UsersChangePasswordService,
    ){}

    async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        const path = route.routeConfig?.path || '';
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

        const alreadyChangedPassword = this.authService.user?.alreadyChangedPassword

        if (isLogged && alreadyChangedPassword === BooleanAsNumber.FALSE)
            this.usersChangePasswordService.openDialog(UsersChangePasswordLayout.FIRST_TIME)

        if (isLogged && !isAdmin && adminRoutes.includes(path as Path)){
            await this.router.navigate([Path.DEFAULT, Path.DASHBOARD]);

            return false
        }

        if (isLogged && path === Path.LOGIN){
            await this.router.navigate([Path.DEFAULT, Path.DASHBOARD]);

            return false;
        }

        if (!isLogged && path !== Path.LOGIN){
            await this.router.navigate([Path.DEFAULT, Path.LOGIN]);

            return false;
        }

        return true;
    }
}
