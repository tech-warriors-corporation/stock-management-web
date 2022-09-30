import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { LayoutModule } from "../../core/layout/layout.module";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";

@NgModule({
    declarations: [ProductsComponent],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        LayoutModule,
        BuildingPageModule
    ]
})
export class ProductsModule {}
