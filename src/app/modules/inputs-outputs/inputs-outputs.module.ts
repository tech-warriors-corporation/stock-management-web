import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputsOutputsRoutingModule } from "./inputs-outputs-routing.module";
import { InputsOutputsComponent } from "./inputs-outputs.component";
import { LayoutModule } from "../../core/layout/layout.module";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";

@NgModule({
    declarations: [InputsOutputsComponent],
    imports: [
        CommonModule,
        InputsOutputsRoutingModule,
        LayoutModule,
        BuildingPageModule
    ]
})
export class InputsOutputsModule {}
