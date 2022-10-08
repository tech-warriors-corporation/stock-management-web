import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from "./categories.component";
import { Path } from "../../shared/enums/path";
import { CategoriesNewComponent } from "./new/categories-new.component";

const routes: Routes = [
    {
        path: Path.NONE,
        component: CategoriesComponent,
    },
    {
        path: Path.NEW_CATEGORY,
        component: CategoriesNewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule {}
