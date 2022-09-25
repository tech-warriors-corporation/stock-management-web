import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

import { NotFoundComponent } from './not-found.component';
import { LayoutModule } from "../../core/layout/layout.module";
import { NotFoundRoutingModule } from "./not-found-routing.module";

@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        LayoutModule,
        NotFoundRoutingModule,
        MatIconModule
    ]
})
export class NotFoundModule{}
