import { Component, Input } from '@angular/core';

import { DialogService } from "./dialog.service";
import { ButtonLayout } from "../../shared/enums/button-layout";

@Component({
    selector: 'app-dialog',
    template: `
        <div class="dialog">
            <div class="dialog__header">
                <h2 mat-dialog-title class="dialog__title">{{ primaryTitle }}</h2>
                <app-button (inClick)="close()"
                            class="dialog__button"
                            icon="close"
                            [layout]="buttonLayout.ICON"
                            label="Fechar">
                </app-button>
            </div>
            <div class="dialog__body">
                <mat-dialog-content>
                    <div class="dialog__content">
                        <h3 class="dialog__subtitle">{{ secondaryTitle }}</h3>
                        <ng-content></ng-content>
                    </div>
                </mat-dialog-content>
                <mat-dialog-actions align="center" class="dialog__actions">
                    <ng-content select="[dialog-action]"></ng-content>
                </mat-dialog-actions>
            </div>
        </div>
    `,
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent{
    @Input() primaryTitle!: string
    @Input() secondaryTitle!: string

    buttonLayout = ButtonLayout

    constructor(private dialogService: DialogService){}

    close(){
        this.dialogService.close()
    }
}
