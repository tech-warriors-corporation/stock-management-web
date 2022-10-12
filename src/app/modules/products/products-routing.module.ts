import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from "./products.component";
import { Path } from "../../shared/enums/path";
import { ProductsNewComponent } from "./new/products-new.component";
import { PageTitle } from "../../shared/enums/page-title";

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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {}
