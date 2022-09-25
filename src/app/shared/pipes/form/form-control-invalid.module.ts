import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControlInvalidPipe } from './form-control-invalid.pipe';

@NgModule({
    declarations: [FormControlInvalidPipe],
    exports: [FormControlInvalidPipe],
    imports: [CommonModule]
})
export class FormControlInvalidModule{}
