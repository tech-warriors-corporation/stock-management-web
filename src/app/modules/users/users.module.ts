import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { LayoutModule } from "../../core/layout/layout.module";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";
import { ContentLoadingModule } from "../../shared/components/content-loading/content-loading.module";
import { EmptyStateModule } from "../../shared/components/empty-state/empty-state.module";
import { BooleanAsNumberToTextModule } from "../../shared/pipes/boolean-as-number-to-text/boolean-as-number-to-text.module";

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        LayoutModule,
        BuildingPageModule,
        MatTableModule,
        ContentLoadingModule,
        EmptyStateModule,
        BooleanAsNumberToTextModule
    ]
})
export class UsersModule {}
