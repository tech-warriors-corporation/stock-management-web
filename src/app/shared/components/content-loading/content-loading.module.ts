import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ContentLoadingComponent } from './content-loading.component';

@NgModule({
    declarations: [
        ContentLoadingComponent
    ],
    exports: [
        ContentLoadingComponent
    ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ]
})
export class ContentLoadingModule{}
