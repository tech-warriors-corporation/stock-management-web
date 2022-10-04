import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { ReactiveFormsModule } from "@angular/forms";

import { CheckboxComponent } from './checkbox.component';

@NgModule({
    declarations: [CheckboxComponent],
    exports: [CheckboxComponent],
    imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule]
})
export class CheckboxModule{}
