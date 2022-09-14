import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { FullLoadingComponent } from './full-loading.component';

@NgModule({
    declarations: [FullLoadingComponent],
    imports: [CommonModule, MatProgressSpinnerModule],
    exports: [FullLoadingComponent]
})
export class FullLoadingModule{}
