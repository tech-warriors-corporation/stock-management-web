import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import { MAT_DATE_FORMATS, MatDateFormats } from "@angular/material/core";

// @ts-ignore
import * as textMask from "vanilla-text-mask/dist/vanillaTextMask.js";
import * as moment from "moment";

import { InputType } from "../../enums/input-type";
import { InputMode } from "../../enums/input-mode";
import { FormService } from "../form/form.service";
import { DATE_LENGTH, dateTextMask, formatDateToString, formatStringToDate, YEAR_LENGTH, yearTextMask } from "../../helpers/date";
import { generateUniqueId } from "../../helpers/unique-id";
import { DatePickerFormat } from "../../enums/date-picker-format";

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    providers: [
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {},
                display: {
                    dateA11yLabel: 'LL'
                },
            },
        },
    ]
})
export class DatePickerComponent implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild('picker', { static: false }) private picker!: MatDatepicker<moment.Moment>;
    @Input() form!: FormGroup;
    @Input() label!: string;
    @Input() placeholder!: string;
    @Input() name!: string;
    @Input() hint!: string;
    @Input() maxDate!: any
    @Input() required = false;
    @Input() autofocus = false;
    @Input() format = DatePickerFormat.DATE;

    readonly id = generateUniqueId()
    readonly inputType = InputType
    readonly inputMode = InputMode
    private input!: HTMLInputElement
    control!: FormControl
    maskInputController!: any;
    startView!: 'month' | 'year' | 'multi-year';
    maskInputFormat!: (string | RegExp)[]

    constructor(@Inject(MAT_DATE_FORMATS) private matDateFormats: MatDateFormats){}

    ngOnInit(): void{
        this.control = this.form.get(this.name) as FormControl

        switch(this.format){
            case DatePickerFormat.DATE:
                this.startView = 'month'
                this.maskInputFormat = dateTextMask

                this.control.addValidators(FormService.validateDate(this.id))
                this.setMatDateFormats('L', 'MMM YYYY', 'MMMM YYYY', ['l', 'LL'])

                break
            case DatePickerFormat.YEAR:
                const formatYear = 'YYYY'

                this.startView = 'multi-year'
                this.maskInputFormat = yearTextMask

                this.setMatDateFormats(formatYear, formatYear, formatYear, formatYear)

                break
        }
    }

    ngAfterViewInit() {
        this.input = document.getElementById(this.id) as HTMLInputElement

        this.maskInputController = textMask.maskInput({
            inputElement: this.input,
            mask: this.maskInputFormat,
            guide: false,
        });
    }

    onNextValue(){
        setTimeout(() => {
            const value = this.input?.value?.substr(0, DATE_LENGTH) || null

            switch(this.format){
                case DatePickerFormat.DATE:
                    if(value && value.length >= DATE_LENGTH){
                        const date = formatStringToDate(value)
                        const dateString = date instanceof Date ? formatDateToString(date) : null

                        if(dateString && dateString === value) this.setValue(date);
                    }

                    this.updateValueAndValidity()

                    break
                case DatePickerFormat.YEAR:
                    if(value && value.length >= YEAR_LENGTH)
                        this.onYearSelected(moment(`${value}-01-01`))

                    break
            }
        })
    }

    onYearSelected(event: moment.Moment){
        if(this.format !== DatePickerFormat.YEAR) return;

        const date = event.toDate();

        this.picker.close()
        this.setValue(date)
        this.updateValueAndValidity()
    }

    ngOnDestroy(){
        this.maskInputController.destroy()
    }

    private setValue(date: Date | null){
        this.control.setValue(date, { onlySelf: true, emitEvent: false })
    }

    private updateValueAndValidity(){
        this.control.updateValueAndValidity({ emitEvent: false })
    }

    private setMatDateFormats(
        dateInput: string,
        monthYearLabel: string,
        monthYearA11yLabel: string,
        parseDateInput: string | string[],
    ){
        Object.assign(this.matDateFormats.display, { dateInput, monthYearLabel, monthYearA11yLabel })

        this.matDateFormats.parse.dateInput = parseDateInput
    }
}
