import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

import { Path } from 'src/app/shared/enums/path';
import { AuthService } from "./auth.service";
import { FullLoadingService } from "../full-loading/full-loading.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router, private fullLoadingService: FullLoadingService){}

    async canLoad(route: Route): Promise<boolean> {
        const { path } = route;
        const token = this.authService.token;
        let isLogged = this.authService.isLogged;

        if (!isLogged && token){
            this.fullLoadingService.setShow(true);

            try{
                await this.authService.userByToken().toPromise()
            } catch(error){
                console.error(error)
            } finally {
                isLogged = this.authService.isLogged;

                this.fullLoadingService.setShow(false);
            }
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
