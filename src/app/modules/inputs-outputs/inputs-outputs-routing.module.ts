import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InputsOutputsComponent } from "./inputs-outputs.component";
import { Path } from "../../shared/enums/path";

const routes: Routes = [
    {
        path: Path.NONE,
        component: InputsOutputsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InputsOutputsRoutingModule {}
