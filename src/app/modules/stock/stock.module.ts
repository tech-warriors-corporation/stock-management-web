import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from "./stock-routing.module";
import { StockComponent } from "./stock.component";
import { LayoutModule } from "../../core/layout/layout.module";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";

@NgModule({
    declarations: [StockComponent],
    imports: [
        CommonModule,
        StockRoutingModule,
        LayoutModule,
        BuildingPageModule
    ]
})
export class StockModule {}
