import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";
import { HighlightPageModule } from "../../shared/components/highlight-page/highlight-page.module";
import { ButtonModule } from "../../shared/components/button/button.module";
import { FiltersModule } from "../../shared/components/filters/filters.module";
import { InputModule } from "../../shared/components/input/input.module";
import { HasShowMoreModule } from "../../shared/pipes/has-show-more/has-show-more.module";
import { ContentLoadingModule } from "../../shared/components/content-loading/content-loading.module";
import { EmptyStateModule } from "../../shared/components/empty-state/empty-state.module";

@NgModule({
    declarations: [CategoriesComponent],
    imports: [
        CommonModule,
        CategoriesRoutingModule,
        BuildingPageModule,
        HighlightPageModule,
        ButtonModule,
        FiltersModule,
        InputModule,
        MatTableModule,
        HasShowMoreModule,
        ContentLoadingModule,
        EmptyStateModule
    ]
})
export class CategoriesModule {}
