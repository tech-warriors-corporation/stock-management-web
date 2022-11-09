import { Injectable } from '@angular/core';

import { OpenDialog } from "../../../shared/interfaces/dialog";
import { DialogService } from "../../../core/dialog/dialog.service";
import { ActivityType } from "../../../shared/enums/activity-type";
import { InputsOutputsDescriptionComponent } from "./inputs-outputs-description.component";

@Injectable({
    providedIn: 'root'
})
export class InputsOutputsDescriptionService implements OpenDialog {
    constructor(private dialogService: DialogService){}

    openDialog(productName: string, description: string, activityType: ActivityType): void {
        this.dialogService.open(InputsOutputsDescriptionComponent, {
            data: {
                productName,
                description,
                activityType,
            },
            maxWidth: '480px',
            width: '100%',
        })
    }
}
