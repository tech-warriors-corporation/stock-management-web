import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";

import { filter, Subscription } from "rxjs";

import { Path } from "../../shared/enums/path";

@Component({
    selector: 'app-layout',
    template: `
        <div class="layout" *ngIf="!isOutOfApplication; else contentTemplate">
            <app-header class="layout__header"></app-header>
            <app-menu class="layout__menu">
                <div class="layout__content"><ng-container *ngTemplateOutlet="contentTemplate"></ng-container></div>
            </app-menu>
        </div>
        
        <ng-template #contentTemplate><ng-content></ng-content></ng-template>
    `,
    styleUrls: ['layout.component.scss']
})
export class LayoutComponent implements OnDestroy, OnInit{
    isOutOfApplication = false

    private routesOutOfApplication = [Path.LOGIN]
    private routerEvents$!: Subscription;

    constructor(private router: Router){}

    ngOnInit(): void{
        this.routerEvents$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any)  => {
            this.isOutOfApplication = this.routesOutOfApplication.some(url => event.url.includes(url))
        })
    }

    ngOnDestroy(): void{
        this.routerEvents$?.unsubscribe();
    }
}
