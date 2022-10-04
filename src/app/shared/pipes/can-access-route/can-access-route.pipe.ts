import { Pipe, PipeTransform } from '@angular/core';

import { AuthService } from "../../../core/auth/auth.service";
import { Path } from "../../enums/path";
import { getAdminRoutes } from "../../../core/auth/auth.guard";

@Pipe({
    name: 'canAccessRoute'
})
export class CanAccessRoutePipe implements PipeTransform {
    constructor(private authService: AuthService){}

    transform(route: string): boolean {
        const adminRoutes = getAdminRoutes()

        route = route.split(Path.DEFAULT).filter(Boolean)[0] as string;

        if (adminRoutes.includes(route as Path)) return this.authService.isAmin

        return true;
    }
}
