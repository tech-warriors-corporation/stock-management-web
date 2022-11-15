import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

// @ts-ignore
import * as textMask from "vanilla-text-mask/dist/vanillaTextMask.js";

import { InputType } from "../../enums/input-type";
import { InputMode } from "../../enums/input-mode";
import { FormService } from "../form/form.service";
import { dateTextMask } from "../../helpers/date";
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
    control!: FormControl
    maskInputController!: any;

    ngOnInit(): void{
        this.control = this.form.get(this.name) as FormControl

        this.control.addValidators(FormService.validateDate(this.id))
    }

    ngAfterViewInit() {
        this.maskInputController = textMask.maskInput({
            inputElement: document.getElementById(this.id),
            mask: dateTextMask,
            guide: false,
        });
    }

    ngOnDestroy(){
        this.maskInputController.destroy()
    }
}
