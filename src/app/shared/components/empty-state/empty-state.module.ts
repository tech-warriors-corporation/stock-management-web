import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

import { EmptyStateComponent } from './empty-state.component';

@NgModule({
    declarations: [EmptyStateComponent],
    exports: [EmptyStateComponent],
    imports: [
        CommonModule,
        MatIconModule
    ]
})
export class EmptyStateModule{}
