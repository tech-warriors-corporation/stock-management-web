import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { ButtonComponent } from './button.component';

@NgModule({
    declarations: [
        ButtonComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    exports: [
        ButtonComponent
    ],
})
export class ButtonModule{}
