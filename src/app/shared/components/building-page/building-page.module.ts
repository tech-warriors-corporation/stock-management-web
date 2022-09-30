import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

import { BuildingPageComponent } from './building-page.component';

@NgModule({
    declarations: [BuildingPageComponent],
    imports: [CommonModule, MatIconModule],
    exports: [BuildingPageComponent],
})
export class BuildingPageModule{}
