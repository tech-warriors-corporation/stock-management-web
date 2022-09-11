import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevelopedByComponent } from './developed-by.component';

@NgModule({
    declarations: [
        DevelopedByComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [DevelopedByComponent]
})
export class DevelopedByModule{}
