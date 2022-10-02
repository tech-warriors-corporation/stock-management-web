import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HasShowMorePipe } from './has-show-more.pipe';

@NgModule({
    declarations: [HasShowMorePipe],
    exports: [HasShowMorePipe],
    imports: [CommonModule]
})
export class HasShowMoreModule{}
