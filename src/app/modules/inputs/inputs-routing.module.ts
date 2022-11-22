import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Path } from "../../shared/enums/path";
import { InputsNewComponent } from "./new/inputs-new.component";
import { PageTitle } from "../../shared/enums/page-title";
import { InputsEditComponent } from "./edit/inputs-edit.component";

const routes: Routes = [
    {
        path: Path.NEW_INPUT,
        component: InputsNewComponent,
        data: {
            title: PageTitle.NEW_INPUT
        }
    },
    {
        path: Path.EDIT_INPUT,
        component: InputsEditComponent,
        data: {
            title: PageTitle.EDIT_INPUT
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InputsRoutingModule{}
