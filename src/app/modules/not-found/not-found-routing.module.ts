import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from "./not-found.component";
import { Path } from "../../shared/enums/path";

const routes: Routes = [
    {
        path: Path.NONE,
        component: NotFoundComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotFoundRoutingModule{}
