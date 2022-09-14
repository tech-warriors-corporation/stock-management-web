import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./global/auth/auth.guard";
import { Path } from "./shared/enums/path";

const routes: Routes = [
    {
        path: Path.LOGIN,
        loadChildren: () => import('./pages/login/login.module').then(module => module.LoginModule),
        canLoad: [AuthGuard],
    },
    {
        path: Path.DASHBOARD,
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(module => module.DashboardModule),
        canLoad: [AuthGuard],
    },
    {
        path: '**',
        loadChildren: () => import('./pages/not-found/not-found.module').then(module => module.NotFoundModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
