import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from "./core/auth/auth.guard";
import { Path } from "./shared/enums/path";
import { PageTitle } from "./shared/enums/page-title";

const routes: Routes = [
    {
        path: Path.LOGIN,
        loadChildren: () => import('./modules/login/login.module').then(module => module.LoginModule),
        canActivate: [AuthGuard],
    },
    {
        path: Path.DASHBOARD,
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(module => module.DashboardModule),
        canActivate: [AuthGuard],
        data: {
            title: PageTitle.DASHBOARD
        }
    },
    {
        path: Path.INPUTS,
        loadChildren: () => import('./modules/inputs/inputs.module').then(module => module.InputsModule),
        canActivate: [AuthGuard],
    },
    {
        path: Path.INPUTS_OUTPUTS,
        loadChildren: () => import('./modules/inputs-outputs/inputs-outputs.module').then(module => module.InputsOutputsModule),
        canActivate: [AuthGuard],
        data: {
            title: PageTitle.INPUTS_OUTPUTS
        }
    },
    {
        path: Path.PRODUCTS,
        loadChildren: () => import('./modules/products/products.module').then(module => module.ProductsModule),
        canActivate: [AuthGuard],
        data: {
            title: PageTitle.PRODUCTS
        }
    },
    {
        path: Path.CATEGORIES,
        loadChildren: () => import('./modules/categories/categories.module').then(module => module.CategoriesModule),
        canActivate: [AuthGuard],
        data: {
            title: PageTitle.CATEGORIES
        }
    },
    {
        path: Path.USERS,
        loadChildren: () => import('./modules/users/users.module').then(module => module.UsersModule),
        canActivate: [AuthGuard],
        data: {
            title: PageTitle.USERS
        }
    },
    {
        path: Path.NOT_FOUND,
        loadChildren: () => import('./modules/not-found/not-found.module').then(module => module.NotFoundModule),
        canActivate: [AuthGuard],
        data: {
            title: PageTitle.NOT_FOUND
        }
    },
    {
        path: Path.NONE,
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
