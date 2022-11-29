import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";

import { Path } from "../../shared/enums/path";
import { ButtonOperation } from "../../shared/enums/button-operation";
import { ButtonLayout } from "../../shared/enums/button-layout";
import { AutocompleteOptions } from "../../shared/types/autocomplete";
import { InputOutputFilter } from "../../shared/types/input-output";
import { ProductsService } from "../products/products.service";
import { ItemExpirationsService } from "../../shared/services/item-expirations.service";
import { SelectOptions } from "../../shared/types/select";
import { UsersService } from "../users/users.service";
import { DATE_FORMAT_HINT, today } from "../../shared/helpers/date";

@Component({
    selector: 'app-inputs-outputs',
    templateUrl: './inputs-outputs.component.html',
    styleUrls: ['inputs-outputs.component.scss']
})
export class InputsOutputsComponent implements OnInit{
    path = Path
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    productOptions: AutocompleteOptions = []
    expirationOptions: SelectOptions = []
    userOptions: SelectOptions = []
    maxDtCreated = today()
    dateFormatHint = DATE_FORMAT_HINT

    form = this.formBuilder.group({
        productId: [{ value: null, disabled: true }],
        hasProductExpiration: [{ value: null, disabled: true }],
        createdById: [{ value: null, disabled: true }],
        dtCreated: [null],
    })

    filters: InputOutputFilter = {
        productId: null,
        hasProductExpiration: null,
        createdById: null,
        dtCreated: null,
    }

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private itemExpirationsService: ItemExpirationsService,
        private usersService: UsersService,
    ){}

    private getProductOptions(){
        this.productsService.getAutocompleteList().subscribe(({ data: products }) => {
            const productIdControl = this.form.get('productId') as FormControl
            this.productOptions = products

            productIdControl.enable()
        })
    }

    private getExpirationOptions(){
        this.itemExpirationsService.getSelectList().subscribe(({ data: expirations }) => {
            const expirationControl = this.form.get('hasProductExpiration') as FormControl
            this.expirationOptions = expirations

            expirationControl.enable()
        })
    }

    private getUserOptions(){
        this.usersService.getSelectList().subscribe(({ data: users }) => {
            const createdByControl = this.form.get('createdById') as FormControl
            this.userOptions = users

            createdByControl.enable()
        })
    }

    ngOnInit() {
        this.getProductOptions()
        this.getUserOptions()
        this.getExpirationOptions()
    }

    submitForm(){
        const { productId, hasProductExpiration, createdById, dtCreated } = this.form.getRawValue()

        this.filters = { productId, hasProductExpiration, createdById, dtCreated }
    }
}
