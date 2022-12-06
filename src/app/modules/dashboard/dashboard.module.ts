import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";
import { DashboardCardComponent } from "./dashboard-card/dashboard-card.component";
import { HighlightPageModule } from "../../shared/components/highlight-page/highlight-page.module";
import { FiltersModule } from "../../shared/components/filters/filters.module";
import { DatePickerModule } from "../../shared/components/date-picker/date-picker.module";
import { ContentLoadingModule } from "../../shared/components/content-loading/content-loading.module";
import { PluralizeModule } from "../../shared/pipes/pluralize/pluralize.module";

@NgModule({
    declarations: [DashboardComponent, DashboardCardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        BuildingPageModule,
        HighlightPageModule,
        FiltersModule,
        DatePickerModule,
        ContentLoadingModule,
        PluralizeModule,
    ]
})
export class DashboardModule{}
