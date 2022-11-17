import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";

import { TextAreaComponent } from './text-area.component';
import { AutofocusModule } from "../../directives/autofocus/autofocus.module";
import { FormControlInvalidModule } from "../../pipes/form/form-control-invalid.module";
import { ControlLengthModule } from "../../pipes/control-length/control-length.module";
import { FormControlErrorModule } from "../../pipes/form/form-control-error.module";

@NgModule({
    declarations: [TextAreaComponent],
    exports: [TextAreaComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        AutofocusModule,
        MatInputModule,
        ReactiveFormsModule,
        FormControlInvalidModule,
        ControlLengthModule,
        FormControlErrorModule
    ]
})
export class TextAreaModule{}
