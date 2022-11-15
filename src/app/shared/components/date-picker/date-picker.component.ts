import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

// @ts-ignore
import * as textMask from "vanilla-text-mask/dist/vanillaTextMask.js";

import { InputType } from "../../enums/input-type";
import { InputMode } from "../../enums/input-mode";
import { FormService } from "../form/form.service";
import { DATE_LENGTH, dateTextMask, formatDateToString, formatStringToDate } from "../../helpers/date";
import { generateUniqueId } from "../../helpers/unique-id";

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, AfterViewInit, OnDestroy{
    @Input() form!: FormGroup;
    @Input() label!: string;
    @Input() placeholder!: string;
    @Input() name!: string;
    @Input() hint!: string;
    @Input() maxDate!: any
    @Input() required = false;
    @Input() autofocus = false;

    readonly id = generateUniqueId()
    readonly inputType = InputType
    readonly inputMode = InputMode
    private input!: HTMLInputElement
    control!: FormControl
    maskInputController!: any;

    ngOnInit(): void{
        this.control = this.form.get(this.name) as FormControl

        this.control.addValidators(FormService.validateDate(this.id))
    }

    ngAfterViewInit() {
        this.input = document.getElementById(this.id) as HTMLInputElement

        this.maskInputController = textMask.maskInput({
            inputElement: this.input,
            mask: dateTextMask,
            guide: false,
        });
    }

    onInput(event: Event){
        setTimeout(() => {
            const value = this.input?.value?.substr(0, DATE_LENGTH) || null

            if(value && value.length >= DATE_LENGTH){
                event.preventDefault()

                const date = formatStringToDate(value)
                const dateString = date instanceof Date ? formatDateToString(date) : null

                if(dateString && dateString === value) this.control.setValue(date, { onlySelf: true, emitEvent: false });
            }

            this.control.updateValueAndValidity()
        })
    }

    ngOnDestroy(){
        this.maskInputController.destroy()
    }
}
