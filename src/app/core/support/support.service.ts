import { Injectable } from '@angular/core';

import { DialogService } from "../dialog/dialog.service";
import { SupportComponent } from "./support.component";
import { OpenDialog } from "../../shared/interfaces/dialog";
import { DialogRole } from "../../shared/enums/dialog-role";

@Injectable({
    providedIn: 'root'
})
export class SupportService implements OpenDialog{
    constructor(private dialogService: DialogService){}

    openDialog(){
        this.dialogService.open(SupportComponent, { maxWidth: '524px', role: DialogRole.ALERT_DIALOG })
    }
}
