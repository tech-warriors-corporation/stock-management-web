import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div class="app">
            <app-full-loading></app-full-loading>
            <app-layout><router-outlet></router-outlet></app-layout>
        </div>
    `
})
export class AppComponent{}
