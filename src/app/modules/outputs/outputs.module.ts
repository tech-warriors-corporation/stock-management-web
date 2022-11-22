import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutputsComponent } from "./outputs.component";
import { OutputsRoutingModule } from "./outputs-routing.module";
import { OutputsNewComponent } from "./new/outputs-new.component";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";
import { OutputsEditComponent } from "./edit/outputs-edit.component";

@NgModule({
    declarations: [OutputsComponent, OutputsNewComponent, OutputsEditComponent],
    exports: [
        OutputsComponent
    ],
    imports: [
        CommonModule,
        OutputsRoutingModule,
        BuildingPageModule,
    ]
})
export class OutputsModule {}
