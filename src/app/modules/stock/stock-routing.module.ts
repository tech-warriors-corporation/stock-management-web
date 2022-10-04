import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockComponent } from "./stock.component";
import { Path } from "../../shared/enums/path";

const routes: Routes = [
    {
        path: Path.NONE,
        component: StockComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StockRoutingModule {}
