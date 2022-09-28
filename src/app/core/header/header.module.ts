import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

import { HeaderComponent } from "./header.component";

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule]
})
export class HeaderModule{}
