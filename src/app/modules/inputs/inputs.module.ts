import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";

import { InputsComponent } from "./inputs.component";
import { HighlightPageModule } from "../../shared/components/highlight-page/highlight-page.module";
import { ButtonModule } from "../../shared/components/button/button.module";
import { ContentLoadingModule } from "../../shared/components/content-loading/content-loading.module";
import { EmptyStateModule } from "../../shared/components/empty-state/empty-state.module";
import { HasShowMoreModule } from "../../shared/pipes/has-show-more/has-show-more.module";
import { BadgeModule } from "../../shared/components/badge/badge.module";
import { FormatToBrlModule } from "../../shared/pipes/format-to-brl/format-to-brl.module";
import { TransformDateModule } from "../../shared/pipes/transform-date/transform-date.module";
import { ProductsModule } from "../products/products.module";
import { BooleanAsNumberToTextModule } from "../../shared/pipes/boolean-as-number-to-text/boolean-as-number-to-text.module";
import { InputsRoutingModule } from "./inputs-routing.module";
import { InputsNewComponent } from "./new/inputs-new.component";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";
import { FormModule } from "../../shared/components/form/form.module";
import { FormInvalidModule } from "../../shared/pipes/form/form-invalid.module";
import { TextAreaModule } from "../../shared/components/text-area/text-area.module";
import { DatePickerModule } from "../../shared/components/date-picker/date-picker.module";
import { CheckboxModule } from "../../shared/components/checkbox/checkbox.module";
import { InputModule } from "../../shared/components/input/input.module";

@NgModule({
    declarations: [InputsComponent, InputsNewComponent],
    exports: [
        InputsComponent
    ],
    imports: [
        CommonModule,
        InputsRoutingModule,
        HighlightPageModule,
        ButtonModule,
        MatTableModule,
        ContentLoadingModule,
        EmptyStateModule,
        HasShowMoreModule,
        BadgeModule,
        FormatToBrlModule,
        TransformDateModule,
        ProductsModule,
        BooleanAsNumberToTextModule,
        BuildingPageModule,
        FormModule,
        FormInvalidModule,
        TextAreaModule,
        DatePickerModule,
        CheckboxModule,
        InputModule,
    ]
})
export class InputsModule {}
