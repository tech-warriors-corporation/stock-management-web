import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControlErrorPipe } from './form-control-error.pipe';

@NgModule({
    declarations: [FormControlErrorPipe],
    exports: [FormControlErrorPipe],
    imports: [CommonModule]
})
export class FormControlErrorModule {}
