import { Injectable } from '@angular/core';

import { User } from "../../shared/types/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    get user(): User | null {
        return null
    }

    get isLogged(): boolean{
        return !!this.user
    }
}
