import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonType } from "../../enums/button-type";
import { ButtonLayout } from "../../enums/button-layout";
import { ColorPalette } from "../../enums/color-palette";
import { ButtonOperation } from "../../enums/button-operation";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent{
    buttonLayout = ButtonLayout
    buttonOperation = ButtonOperation

    @Output() inClick = new EventEmitter<void>();
    @Input() label!: string
    @Input() icon!: string
    @Input() link!: string | string[]
    @Input() layout: ButtonLayout = this.buttonLayout.RAISED
    @Input() type: ButtonType = ButtonType.BUTTON
    @Input() disabled = false;
    @Input() loading = false;
    @Input() color: ColorPalette = ColorPalette.PRIMARY;
    @Input() operation: ButtonOperation = this.buttonOperation.BUTTON;

    loadingColor = ColorPalette.PRIMARY

    get isDisabled(): boolean{
        return this.disabled || this.loading
    }

    get classes(): string{
        const classes = ['button']

        if (this.loading) classes.push('button--loading')

        return classes.join(' ')
    }
}
