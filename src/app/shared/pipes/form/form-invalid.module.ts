import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormInvalidPipe } from './form-invalid.pipe';

@NgModule({
    declarations: [FormInvalidPipe],
    exports: [FormInvalidPipe],
    imports: [CommonModule]
})
export class FormInvalidModule{}
