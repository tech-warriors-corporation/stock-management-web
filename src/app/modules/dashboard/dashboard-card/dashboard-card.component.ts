import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { today, YEAR_FORMAT_HINT } from "../../../shared/helpers/date";
import { DatePickerFormat } from "../../../shared/enums/date-picker-format";
import { DashboardCardFilter } from "../../../shared/types/dashboard-card-filter";

@Component({
    selector: 'app-dashboard-card',
    templateUrl: './dashboard-card.component.html',
    styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit{
    @Output() inSubmit = new EventEmitter<DashboardCardFilter>()
    @Input() loading = false
    @Input() highlightTitle!: string

    today = today()
    yearFormatHint = YEAR_FORMAT_HINT
    datePickerFormat = DatePickerFormat

    form = this.formBuilder.group({
        year: [this.today, [Validators.required]]
    })

    constructor(private formBuilder: FormBuilder){}

    ngOnInit(){
        this.submit()
    }

    submit(){
        this.inSubmit.next(this.form.getRawValue() as DashboardCardFilter)
    }
}
