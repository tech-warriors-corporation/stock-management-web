import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportComponent } from './support.component';
import { DialogModule } from "../dialog/dialog.module";
import { ButtonModule } from "../../shared/components/button/button.module";

@NgModule({
    declarations: [
        SupportComponent
    ],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule
    ]
})
export class SupportModule{}
