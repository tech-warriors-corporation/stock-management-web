import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightPageComponent } from './highlight-page.component';

@NgModule({
    declarations: [HighlightPageComponent],
    exports: [HighlightPageComponent],
    imports: [CommonModule]
})
export class HighlightPageModule{}
