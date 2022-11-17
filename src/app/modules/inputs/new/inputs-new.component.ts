import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { New } from "../../../shared/base/new";
import { ButtonType } from "../../../shared/enums/button-type";
import { ButtonOperation } from "../../../shared/enums/button-operation";
import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ColorPalette } from "../../../shared/enums/color-palette";
import { Path } from "../../../shared/enums/path";
import { FormConstants } from "../../../shared/components/form/form-constants";

@Component({
    selector: 'app-inputs-new',
    templateUrl: './inputs-new.component.html',
    styleUrls: ['../../inputs-outputs/save/inputs-outputs-save.component.scss']
})
export class InputsNewComponent implements New{
    submitting = false;
    buttonType = ButtonType
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    path = Path
    formConstants = FormConstants
    maxDtEntered = new Date()
    isRequiredDtEntered = false

    form = this.formBuilder.group({
        dtEntered: [null],
        inputDescription: [null, Validators.maxLength(this.formConstants.INPUT_DESCRIPTION_MAXLENGTH)],
    });

    constructor(private formBuilder: FormBuilder){}

    submit(): void {
        // TODO: implement this method
    }
}
