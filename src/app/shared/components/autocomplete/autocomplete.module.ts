import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AutocompleteComponent } from "./autocomplete.component";
import { FormControlInvalidModule } from "../../pipes/form/form-control-invalid.module";
import { FormControlErrorModule } from "../../pipes/form/form-control-error.module";
import { AutofocusModule } from "../../directives/autofocus/autofocus.module";
import { SituationTextModule } from "../../pipes/situation-text/situation-text.module";

@NgModule({
    declarations: [AutocompleteComponent],
    imports: [
        CommonModule,
        FormControlInvalidModule,
        FormControlErrorModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        AutofocusModule,
        MatInputModule,
        MatAutocompleteModule,
        SituationTextModule
    ],
    exports: [AutocompleteComponent]
})
export class AutocompleteModule {}
