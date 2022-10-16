import { Injectable } from '@angular/core';

import { UsersChangePasswordComponent } from "./users-change-password.component";
import { OpenDialog } from "../../../shared/interfaces/dialog";
import { DialogService } from "../../../core/dialog/dialog.service";

@Injectable({
    providedIn: 'root'
})
export class UsersChangePasswordService implements OpenDialog{
    constructor(private dialogService: DialogService){}

    openDialog(){
        this.dialogService.open(UsersChangePasswordComponent)
    }
}
