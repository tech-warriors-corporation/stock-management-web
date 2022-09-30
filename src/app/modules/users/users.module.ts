import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { LayoutModule } from "../../core/layout/layout.module";
import { BuildingPageModule } from "../../shared/components/building-page/building-page.module";

@NgModule({
    declarations: [UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        LayoutModule,
        BuildingPageModule
    ]
})
export class UsersModule {}
