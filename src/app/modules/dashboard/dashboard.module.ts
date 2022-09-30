import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { LayoutModule } from "../../core/layout/layout.module";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        LayoutModule,
        BuildingPageModule
    ]
})
export class DashboardModule{}
