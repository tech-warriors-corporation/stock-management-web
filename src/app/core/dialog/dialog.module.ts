import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from "@angular/material/dialog";

import { DialogComponent } from './dialog.component';
import { ButtonModule } from "../../shared/components/button/button.module";

@NgModule({
    declarations: [
        DialogComponent
    ],
    exports: [
        DialogComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        ButtonModule
    ]
})
export class DialogModule{}
