import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputsOutputsRoutingModule } from "./inputs-outputs-routing.module";
import { InputsOutputsComponent } from "./inputs-outputs.component";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";
import { InputsModule } from "../inputs/inputs.module";
import { HighlightPageModule } from "../../shared/components/highlight-page/highlight-page.module";
import { ButtonModule } from "../../shared/components/button/button.module";
import { FiltersModule } from "../../shared/components/filters/filters.module";
import { AutocompleteModule } from "../../shared/components/autocomplete/autocomplete.module";
import { InputsOutputsDescriptionComponent } from "./description/inputs-outputs-description.component";
import { DialogModule } from "../../core/dialog/dialog.module";
import { SelectModule } from "../../shared/components/select/select.module";
import { DatePickerModule } from "../../shared/components/date-picker/date-picker.module";

@NgModule({
    declarations: [InputsOutputsComponent, InputsOutputsDescriptionComponent],
    imports: [
        CommonModule,
        InputsOutputsRoutingModule,
        BuildingPageModule,
        InputsModule,
        HighlightPageModule,
        ButtonModule,
        FiltersModule,
        AutocompleteModule,
        DialogModule,
        SelectModule,
        DatePickerModule,
    ]
})
export class InputsOutputsModule {}
