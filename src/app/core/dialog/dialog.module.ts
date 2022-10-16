import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from "@angular/material/dialog";

import { DialogComponent } from './dialog.component';
import { ButtonModule } from "../../shared/components/button/button.module";
import { SafeHtmlModule } from "../../shared/pipes/safe-html/safe-html.module";

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
        ButtonModule,
        SafeHtmlModule
    ]
})
export class DialogModule{}
