import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Path } from "../../shared/enums/path";
import { OutputsNewComponent } from "./new/outputs-new.component";
import { PageTitle } from "../../shared/enums/page-title";
import { OutputsEditComponent } from "./edit/outputs-edit.component";

const routes: Routes = [
    {
        path: Path.NEW_OUTPUT,
        component: OutputsNewComponent,
        data: {
            title: PageTitle.NEW_OUTPUT
        }
    },
    {
        path: Path.EDIT_OUTPUT,
        component: OutputsEditComponent,
        data: {
            title: PageTitle.EDIT_OUTPUT
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OutputsRoutingModule {}
