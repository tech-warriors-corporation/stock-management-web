import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

import { MenuComponent } from './menu.component';
import { BreakLineModule } from "../../shared/components/break-line/break-line.module";
import { DevelopedByModule } from "../../shared/components/developed-by/developed-by.module";
import { MenuLinkComponent } from './menu-link.component';
import { ButtonModule } from "../../shared/components/button/button.module";
import { CanAccessRouteModule } from "../../shared/pipes/can-access-route/can-access-route.module";
import { SupportModule } from "../support/support.module";

@NgModule({
    declarations: [MenuComponent, MenuLinkComponent],
    imports: [
        CommonModule,
        MatSidenavModule,
        BreakLineModule,
        DevelopedByModule,
        RouterModule,
        MatIconModule,
        ButtonModule,
        CanAccessRouteModule,
        SupportModule
    ],
    exports: [MenuComponent]
})
export class MenuModule{}
