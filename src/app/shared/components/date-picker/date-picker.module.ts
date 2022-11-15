import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";

import { DatePickerComponent } from './date-picker.component';
import { FormControlInvalidModule } from "../../pipes/form/form-control-invalid.module";
import { FormControlErrorModule } from "../../pipes/form/form-control-error.module";
import { AutofocusModule } from "../../directives/autofocus/autofocus.module";

@NgModule({
    declarations: [DatePickerComponent],
    exports: [DatePickerComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        FormControlInvalidModule,
        FormControlErrorModule,
        ReactiveFormsModule,
        AutofocusModule,
    ]
})
export class DatePickerModule{}
