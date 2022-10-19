import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormatToBrlPipe } from './format-to-brl.pipe';

@NgModule({
    declarations: [
        FormatToBrlPipe
    ],
    exports: [
        FormatToBrlPipe
    ],
    imports: [
        CommonModule
    ]
})
export class FormatToBrlModule{}
