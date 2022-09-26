import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./core/auth/auth.guard";
import { Path } from "./shared/enums/path";

const routes: Routes = [
    {
        path: Path.LOGIN,
        loadChildren: () => import('./modules/login/login.module').then(module => module.LoginModule),
        canLoad: [AuthGuard],
    },
    {
        path: Path.DASHBOARD,
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(module => module.DashboardModule),
        canLoad: [AuthGuard],
    },
    {
        path: Path.NOT_FOUND,
        loadChildren: () => import('./modules/not-found/not-found.module').then(module => module.NotFoundModule),
        canLoad: [AuthGuard],
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: Path.DASHBOARD,
    },
    {
        path: '**',
        redirectTo: Path.NOT_FOUND,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
