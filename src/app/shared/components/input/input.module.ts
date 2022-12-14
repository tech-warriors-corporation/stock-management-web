import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { NgxCurrencyModule } from "ngx-currency";

import { InputComponent } from './input.component';
import { AutofocusModule } from "../../directives/autofocus/autofocus.module";
import { FormControlErrorModule } from "../../pipes/form/form-control-error.module";
import { FormControlInvalidModule } from "../../pipes/form/form-control-invalid.module";
import { ControlLengthModule } from "../../pipes/control-length/control-length.module";

@NgModule({
    declarations: [InputComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        AutofocusModule,
        FormControlErrorModule,
        FormControlInvalidModule,
        MatButtonModule,
        MatIconModule,
        ControlLengthModule,
        NgxCurrencyModule,
    ],
    exports: [InputComponent]
})
export class InputModule{}
