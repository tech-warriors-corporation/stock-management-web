import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralizePipe } from './pluralize.pipe';

@NgModule({
    declarations: [PluralizePipe],
    exports: [PluralizePipe],
    imports: [CommonModule]
})
export class PluralizeModule{}
