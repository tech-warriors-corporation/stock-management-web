import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";

import { DialogRole } from "../../shared/enums/dialog-role";
import { generateUniqueId } from "../../shared/helpers/unique-id";
import { Dictionary } from "../../shared/types/dictionary";

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    private reference: MatDialogRef<any> | null = null

    constructor(private matDialog: MatDialog){}

    open(component: ComponentType<any>, { data, role, ...config }: MatDialogConfig = {}) {
        this.close()

        if (!data) data = null
        if (!role) role = DialogRole.DIALOG

        this.reference = this.matDialog.open(component, {
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
        this.reference = null;
    }

    getCurrentData(): Dictionary | null{
        return this.reference?._containerInstance?._config?.data || null
    }
}
