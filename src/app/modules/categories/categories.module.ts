import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { LayoutModule } from "../../core/layout/layout.module";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";

@NgModule({
    declarations: [CategoriesComponent],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        LayoutModule,
        BuildingPageModule
    ]
})
export class CategoriesModule {}
