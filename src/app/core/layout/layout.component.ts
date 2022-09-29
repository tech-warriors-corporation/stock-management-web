import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    template: `
        <div class="layout">
            <app-header class="layout__header"></app-header>
            <app-menu class="layout__menu">
                <div class="layout__content"><ng-content></ng-content></div>
            </app-menu>
        </div>
    `,
    styleUrls: ['layout.component.scss']
})
export class LayoutComponent{}
