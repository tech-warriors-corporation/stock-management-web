import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";

import { DialogRole } from "../../shared/enums/dialog-role";
import { generateUniqueId } from "../../shared/helpers/unique-id";

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    constructor(private matDialog: MatDialog){}

    open(component: ComponentType<any>, { data, role, ...config }: MatDialogConfig = {}) {
        if (!data) data = null
        if (!role) role = DialogRole.DIALOG

        this.matDialog.open(component, {
            width: '100%',
            maxWidth: '650px',
            id: generateUniqueId(),
            closeOnNavigation: true,
            disableClose: false,
            autoFocus: true,
            restoreFocus: true,
            hasBackdrop: true,
            ...config,
            data,
            role,
        })
    }

    close(){
        this.matDialog.closeAll();
    }
}
