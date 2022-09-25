import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    template: `
        <div class="layout">
            <app-header></app-header>
            <div class="layout__content"><ng-content></ng-content></div>
        </div>
    `,
    styleUrls: ['layout.component.scss']
})
export class LayoutComponent{}
