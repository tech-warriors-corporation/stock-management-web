import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from "./users.component";
import { UsersNewComponent } from "./new/users-new.component";
import { Path } from "../../shared/enums/path";
import { UsersEditComponent } from "./edit/users-edit.component";

const routes: Routes = [
    {
        path: Path.NONE,
        component: UsersComponent,
    },
    {
        path: Path.NEW_USER,
        component: UsersNewComponent,
        data: {
            title: 'Novo usuário'
        }
    },
    {
        path: Path.EDIT_USER,
        component: UsersEditComponent,
        data: {
            title: 'Editar usuário'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
