import { AfterViewInit, Component } from '@angular/core';

import { FullLoadingService } from "./core/full-loading/full-loading.service";

@Component({
    selector: 'app-root',
    template: `
        <div class="app">
            <app-full-loading></app-full-loading>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent implements AfterViewInit{
    constructor(private fullLoadingService: FullLoadingService) {}

    ngAfterViewInit(): void {
        this.fullLoadingService.setShow(false); // TODO: remove this in the future
    }
}
