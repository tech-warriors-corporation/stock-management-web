import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";

import { OutputsComponent } from "./outputs.component";
import { OutputsRoutingModule } from "./outputs-routing.module";
import { OutputsNewComponent } from "./new/outputs-new.component";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";
import { OutputsEditComponent } from "./edit/outputs-edit.component";
import { HighlightPageModule } from "../../shared/components/highlight-page/highlight-page.module";
import { ContentLoadingModule } from "../../shared/components/content-loading/content-loading.module";
import { EmptyStateModule } from "../../shared/components/empty-state/empty-state.module";
import { ButtonModule } from "../../shared/components/button/button.module";
import { BadgeModule } from "../../shared/components/badge/badge.module";
import { ProductsModule } from "../products/products.module";
import { TransformDateModule } from "../../shared/pipes/transform-date/transform-date.module";
import { BooleanAsNumberToTextModule } from "../../shared/pipes/boolean-as-number-to-text/boolean-as-number-to-text.module";
import { HasShowMoreModule } from "../../shared/pipes/has-show-more/has-show-more.module";
import { FormModule } from "../../shared/components/form/form.module";
import { AutocompleteModule } from "../../shared/components/autocomplete/autocomplete.module";
import { InputModule } from "../../shared/components/input/input.module";
import { CheckboxModule } from "../../shared/components/checkbox/checkbox.module";
import { DatePickerModule } from "../../shared/components/date-picker/date-picker.module";
import { TextAreaModule } from "../../shared/components/text-area/text-area.module";
import { FormInvalidModule } from "../../shared/pipes/form/form-invalid.module";

@NgModule({
    declarations: [OutputsComponent, OutputsNewComponent, OutputsEditComponent],
    exports: [
        OutputsComponent
    ],
    imports: [
        CommonModule,
        OutputsRoutingModule,
        BuildingPageModule,
        HighlightPageModule,
        MatTableModule,
        ContentLoadingModule,
        EmptyStateModule,
        ButtonModule,
        BadgeModule,
        ProductsModule,
        TransformDateModule,
        BooleanAsNumberToTextModule,
        HasShowMoreModule,
        FormModule,
        AutocompleteModule,
        InputModule,
        CheckboxModule,
        DatePickerModule,
        TextAreaModule,
        FormInvalidModule,
    ]
})
export class OutputsModule {}
