import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div class="app">
            <app-full-loading></app-full-loading>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent{}
