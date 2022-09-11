import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { LayoutModule } from "../../global/layout/layout.module";

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        LayoutModule
    ]
})
export class DashboardModule{}
