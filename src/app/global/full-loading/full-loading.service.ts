import { Injectable } from '@angular/core';

import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FullLoadingService {
    private show = new Subject<boolean>();

    getShow(): Observable<boolean>{
        return this.show.asObservable();
    }

    setShow(show: boolean): void{
        this.show.next(show);
    }
}
