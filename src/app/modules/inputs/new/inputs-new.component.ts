import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";

import { Subscription } from "rxjs";

import { New } from "../../../shared/base/new";
import { ButtonType } from "../../../shared/enums/button-type";
import { ButtonOperation } from "../../../shared/enums/button-operation";
import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ColorPalette } from "../../../shared/enums/color-palette";
import { Path } from "../../../shared/enums/path";
import { FormConstants } from "../../../shared/components/form/form-constants";
import { formatDateToString, getPreviousDate } from "../../../shared/helpers/date";
import { BooleanAsNumber } from "../../../shared/enums/boolean-as-number";
import { FormService } from "../../../shared/components/form/form.service";
import { unsubscribeForAll } from "../../../shared/helpers/manipulate";

@Component({
    selector: 'app-inputs-new',
    templateUrl: './inputs-new.component.html',
    styleUrls: ['../../inputs-outputs/save/inputs-outputs-save.component.scss']
})
export class InputsNewComponent implements New, OnInit, OnDestroy{
    submitting = false;
    buttonType = ButtonType
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    path = Path
    formConstants = FormConstants
    yesterday = getPreviousDate()
    enteredSameDateAsCreatedValidators = [FormService.shouldBeBooleanAsNumberWithTrueValue]
    enteredSameDateAsCreatedLabel!: string
    dtEnteredValidators = [Validators.required]
    isRequiredDtEntered = false

    form = this.formBuilder.group({
        enteredSameDateAsCreated: [BooleanAsNumber.TRUE, this.enteredSameDateAsCreatedValidators],
        dtEntered: [{ value: null, disabled: true }],
        inputDescription: [null, Validators.maxLength(this.formConstants.INPUT_DESCRIPTION_MAXLENGTH)],
    });

    private subscriptions: Subscription[] = []

    constructor(private formBuilder: FormBuilder){}

    ngOnInit(){
        this.enteredSameDateAsCreatedLabel = `Entrou na mesma data de cadastro (${formatDateToString(new Date())})`

        this.watchEnteredSameDateAsCreatedChanges()
    }

    submit(): void {
        // TODO: implement this method
    }

    ngOnDestroy(){
        unsubscribeForAll(this.subscriptions)
    }

    private watchEnteredSameDateAsCreatedChanges(){
        const enteredSameDateAsCreatedControl = this.form.get('enteredSameDateAsCreated') as FormControl
        const dtEnteredControl = this.form.get('dtEntered') as FormControl

        const subscription = enteredSameDateAsCreatedControl.valueChanges.subscribe(value => {
            if(value){
                enteredSameDateAsCreatedControl.addValidators(this.enteredSameDateAsCreatedValidators)
                dtEnteredControl.disable()
                dtEnteredControl.removeValidators(this.dtEnteredValidators)
                dtEnteredControl.setValue(null)
                this.isRequiredDtEntered = false
            } else{
                enteredSameDateAsCreatedControl.removeValidators(this.enteredSameDateAsCreatedValidators)
                dtEnteredControl.enable()
                dtEnteredControl.addValidators(this.dtEnteredValidators)
                this.isRequiredDtEntered = true
            }
        })

        this.subscriptions.push(subscription);
    }
}
