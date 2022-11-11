import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";

import { SelectComponent } from './select.component';
import { FormControlInvalidModule } from "../../pipes/form/form-control-invalid.module";
import { FormControlErrorModule } from "../../pipes/form/form-control-error.module";
import { SituationTextModule } from "../../pipes/situation-text/situation-text.module";
import { AutofocusModule } from "../../directives/autofocus/autofocus.module";

@NgModule({
    declarations: [
        SelectComponent
    ],
    exports: [
        SelectComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormControlInvalidModule,
        FormControlErrorModule,
        SituationTextModule,
        AutofocusModule,
    ]
})
export class SelectModule{}
