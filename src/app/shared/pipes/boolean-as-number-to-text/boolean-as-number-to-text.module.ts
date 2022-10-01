import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooleanAsNumberToTextPipe } from './boolean-as-number-to-text.pipe';

@NgModule({
    declarations: [BooleanAsNumberToTextPipe],
    exports: [BooleanAsNumberToTextPipe],
    imports: [CommonModule]
})
export class BooleanAsNumberToTextModule{}
