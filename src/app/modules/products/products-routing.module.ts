import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from "./products.component";
import { Path } from "../../shared/enums/path";
import { ProductsNewComponent } from "./new/products-new.component";
import { PageTitle } from "../../shared/enums/page-title";
import { ProductsEditComponent } from "./edit/products-edit.component";

const routes: Routes = [
    {
        path: Path.NONE,
        component: ProductsComponent,
    },
    {
        path: Path.NEW_PRODUCT,
        component: ProductsNewComponent,
        data: {
            title: PageTitle.NEW_PRODUCT
        }
    },
    {
        path: Path.EDIT_PRODUCT,
        component: ProductsEditComponent,
        data: {
            title: PageTitle.EDIT_PRODUCT
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {}
