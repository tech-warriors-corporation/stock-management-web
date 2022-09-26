import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from "./login-routing.module";
import { DevelopedByModule } from "../../shared/components/developed-by/developed-by.module";
import { FormModule } from "../../shared/components/form/form.module";
import { InputModule } from "../../shared/components/input/input.module";
import { ButtonModule } from "../../shared/components/button/button.module";
import { FormInvalidModule } from "../../shared/pipes/form/form-invalid.module";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        DevelopedByModule,
        ReactiveFormsModule,
        FormModule,
        InputModule,
        ButtonModule,
        FormInvalidModule
    ],
})
export class LoginModule{}
