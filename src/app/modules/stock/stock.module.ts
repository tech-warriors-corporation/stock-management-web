import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from "./stock-routing.module";
import { StockComponent } from "./stock.component";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";

@NgModule({
    declarations: [StockComponent],
    imports: [
        CommonModule,
        StockRoutingModule,
        BuildingPageModule
    ]
})
export class StockModule {}
