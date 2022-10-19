import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TransformDatePipe } from './transform-date.pipe';

@NgModule({
    declarations: [
        TransformDatePipe
    ],
    exports: [
        TransformDatePipe
    ],
    imports: [
        CommonModule
    ],
    providers: [
        DatePipe
    ]
})
export class TransformDateModule{}
