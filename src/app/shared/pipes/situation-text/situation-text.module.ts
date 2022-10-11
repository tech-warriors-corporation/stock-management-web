import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SituationTextPipe } from './situation-text.pipe';

@NgModule({
    declarations: [
        SituationTextPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SituationTextPipe
    ],
})
export class SituationTextModule{}
