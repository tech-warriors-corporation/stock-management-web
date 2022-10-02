import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { ButtonType } from "../../enums/button-type";
import { ButtonLayout } from "../../enums/button-layout";

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss']
})
export class FiltersComponent{
    @Output() inSubmit = new EventEmitter<void>()
    @Input() form!: FormGroup
    @Input() disabledSubmit = false

    buttonType = ButtonType
    buttonLayout = ButtonLayout
}
