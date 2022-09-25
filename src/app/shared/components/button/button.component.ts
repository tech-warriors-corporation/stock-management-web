import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonType } from "../../enums/button-type";
import { ButtonLayout } from "../../enums/button-layout";
import { ColorPalette } from "../../enums/color-palette";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
})
export class ButtonComponent{
    buttonLayout = ButtonLayout

    @Output() inClick = new EventEmitter<void>();
    @Input() label!: string
    @Input() layout: ButtonLayout = this.buttonLayout.RAISED
    @Input() type: ButtonType = ButtonType.BUTTON
    @Input() disabled = false;
    @Input() color: ColorPalette = ColorPalette.PRIMARY;
}
