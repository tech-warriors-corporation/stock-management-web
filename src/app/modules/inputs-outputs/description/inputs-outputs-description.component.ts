import { Component, OnInit } from '@angular/core';

import { ButtonLayout } from "../../../shared/enums/button-layout";
import { DialogService } from "../../../core/dialog/dialog.service";
import { ActivityType } from "../../../shared/enums/activity-type";
import { Dictionary } from "../../../shared/types/dictionary";

@Component({
    selector: 'app-inputs-outputs-description',
    template: `
        <app-dialog primaryTitle="Descrição" [secondaryTitle]="title" [text]="description">
            <app-button [layout]="buttonLayout.FLAT"
                        dialog-action
                        (inClick)="close()"
                        label="Fechar">
            </app-button>
        </app-dialog>
    `,
})
export class InputsOutputsDescriptionComponent implements OnInit{
    buttonLayout = ButtonLayout
    title!: string
    description!: string

    constructor(private dialogService: DialogService){}

    ngOnInit(){
        const { productName, description, activityType } = this.dialogService.getCurrentData() as Dictionary

        this.title = `Descrição da ${activityType === ActivityType.INPUT ? 'entrada' : 'saída'} de ${productName}`;
        this.description = description;
    }

    close(){
        this.dialogService.close()
    }
}
