import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from "./categories.component";
import { Path } from "../../shared/enums/path";

const routes: Routes = [
    {
        path: Path.NONE,
        component: CategoriesComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule {}
