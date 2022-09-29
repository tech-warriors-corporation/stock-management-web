import { Injectable } from '@angular/core';

import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private toggle = new Subject<void>();

    watchToggle(): Observable<void> {
        return this.toggle.asObservable();
    }

    emitToggle(): void{
        this.toggle.next();
    }
}
