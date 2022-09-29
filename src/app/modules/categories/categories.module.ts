import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { LayoutModule } from "../../core/layout/layout.module";

@NgModule({
    declarations: [CategoriesComponent],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        LayoutModule
    ]
})
export class CategoriesModule {}
