import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanAccessRoutePipe } from './can-access-route.pipe';

@NgModule({
    declarations: [CanAccessRoutePipe],
    exports: [CanAccessRoutePipe],
    imports: [CommonModule]
})
export class CanAccessRouteModule{}
