import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from "./login-routing.module";
import { DevelopedByModule } from "../../shared/developed-by/developed-by.module";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        DevelopedByModule
    ],
})
export class LoginModule{}
