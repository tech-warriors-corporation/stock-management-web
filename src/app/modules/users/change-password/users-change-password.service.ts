import { Injectable } from '@angular/core';
import { MatDialogConfig } from "@angular/material/dialog";

import { UsersChangePasswordComponent } from "./users-change-password.component";
import { OpenDialog } from "../../../shared/interfaces/dialog";
import { DialogService } from "../../../core/dialog/dialog.service";
import { UsersChangePasswordLayout } from "../../../shared/enums/users-change-password-layout";

@Injectable({
    providedIn: 'root'
})
export class UsersChangePasswordService implements OpenDialog{
    constructor(private dialogService: DialogService){}

    openDialog(layout = UsersChangePasswordLayout.NORMAL){
        const config: MatDialogConfig = { data: { layout } }

        if (layout === UsersChangePasswordLayout.FIRST_TIME){
            config.disableClose = true
            config.autoFocus = false
        }

        this.dialogService.open(UsersChangePasswordComponent, config)
    }
}
