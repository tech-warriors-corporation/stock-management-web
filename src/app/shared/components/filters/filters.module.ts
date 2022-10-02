import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { FiltersComponent } from './filters.component';
import { ButtonModule } from "../button/button.module";
import { FormInvalidModule } from "../../pipes/form/form-invalid.module";

@NgModule({
    declarations: [
        FiltersComponent
    ],
    exports: [
        FiltersComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        FormInvalidModule
    ]
})
export class FiltersModule{}
