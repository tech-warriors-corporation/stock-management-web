import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlLengthPipe } from './control-length.pipe';

@NgModule({
    declarations: [ControlLengthPipe],
    exports: [ControlLengthPipe],
    imports: [CommonModule]
})
export class ControlLengthModule{}
