import { Component, OnInit } from '@angular/core';

import { Lang } from "./shared/enums/lang";

@Component({
    selector: 'app-root',
    template: `
        <div class="app">
            <app-full-loading></app-full-loading>
            <app-layout><router-outlet></router-outlet></app-layout>
        </div>
    `
})
export class AppComponent implements OnInit{
    ngOnInit(){
        google.charts.load('current', { packages: ['corechart'], language: Lang.PT_BR });
    }
}
