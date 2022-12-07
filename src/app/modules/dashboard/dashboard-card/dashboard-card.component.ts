import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";

import { today, YEAR_FORMAT_HINT } from "../../../shared/helpers/date";
import { DatePickerFormat } from "../../../shared/enums/date-picker-format";
import { DashboardCardFilter } from "../../../shared/types/dashboard-card-filter";
import { AutocompleteOptions } from "../../../shared/types/autocomplete";
import { ProductsService } from "../../products/products.service";

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
    productOptions: AutocompleteOptions = []

    form = this.formBuilder.group({
        year: [this.today, [Validators.required]],
        productId: [{ value: null, disabled: true }],
    })

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
    ){}

    ngOnInit(){
        this.getProductOptions()
        this.submit()
    }

    submit(){
        this.inSubmit.next(this.form.getRawValue() as DashboardCardFilter)
    }

    private getProductOptions(){
        this.productsService.getAutocompleteList().subscribe(({ data: products }) => {
            const productIdControl = this.form.get('productId') as FormControl
            this.productOptions = products

            productIdControl.enable()
        })
    }
}
