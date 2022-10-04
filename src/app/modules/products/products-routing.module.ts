import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from "./products.component";
import { Path } from "../../shared/enums/path";

const routes: Routes = [
    {
        path: Path.NONE,
        component: ProductsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {}
