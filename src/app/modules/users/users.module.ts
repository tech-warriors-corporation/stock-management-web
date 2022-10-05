import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { ContentLoadingModule } from "../../shared/components/content-loading/content-loading.module";
import { EmptyStateModule } from "../../shared/components/empty-state/empty-state.module";
import { BooleanAsNumberToTextModule } from "../../shared/pipes/boolean-as-number-to-text/boolean-as-number-to-text.module";
import { FiltersModule } from "../../shared/components/filters/filters.module";
import { InputModule } from "../../shared/components/input/input.module";
import { ButtonModule } from "../../shared/components/button/button.module";
import { HasShowMoreModule } from "../../shared/pipes/has-show-more/has-show-more.module";
import { HighlightPageModule } from "../../shared/components/highlight-page/highlight-page.module";
import { UsersNewComponent } from './new/users-new.component';
import { FormModule } from "../../shared/components/form/form.module";
import { FormInvalidModule } from "../../shared/pipes/form/form-invalid.module";
import { CheckboxModule } from "../../shared/components/checkbox/checkbox.module";
import { UsersEditComponent } from "./edit/users-edit.component";

@NgModule({
    declarations: [UsersComponent, UsersNewComponent, UsersEditComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatTableModule,
        ContentLoadingModule,
        EmptyStateModule,
        BooleanAsNumberToTextModule,
        FiltersModule,
        InputModule,
        ButtonModule,
        HasShowMoreModule,
        HighlightPageModule,
        FormModule,
        FormInvalidModule,
        CheckboxModule
    ]
})
export class UsersModule {}
