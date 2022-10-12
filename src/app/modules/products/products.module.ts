import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { ButtonModule } from "../../shared/components/button/button.module";
import { ContentLoadingModule } from "../../shared/components/content-loading/content-loading.module";
import { EmptyStateModule } from "../../shared/components/empty-state/empty-state.module";
import { InputModule } from "../../shared/components/input/input.module";
import { FiltersModule } from "../../shared/components/filters/filters.module";
import { HighlightPageModule } from "../../shared/components/highlight-page/highlight-page.module";
import { HasShowMoreModule } from "../../shared/pipes/has-show-more/has-show-more.module";
import { SituationTextModule } from "../../shared/pipes/situation-text/situation-text.module";
import { AutocompleteModule } from "../../shared/components/autocomplete/autocomplete.module";

@NgModule({
    declarations: [ProductsComponent],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        ButtonModule,
        ContentLoadingModule,
        EmptyStateModule,
        MatTableModule,
        InputModule,
        FiltersModule,
        HighlightPageModule,
        HasShowMoreModule,
        SituationTextModule,
        AutocompleteModule,
    ]
})
export class ProductsModule {}
