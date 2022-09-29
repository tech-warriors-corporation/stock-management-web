import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InputsOutputsComponent } from "./inputs-outputs.component";

const routes: Routes = [
    {
        path: '',
        component: InputsOutputsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InputsOutputsRoutingModule {}
