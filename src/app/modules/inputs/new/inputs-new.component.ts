import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { finalize, Subscription } from "rxjs";

import { New } from "../../../shared/base/new";
import { ButtonType } from "../../../shared/enums/button-type";
import { ButtonOperation } from "../../../shared/enums/button-operation";
import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ColorPalette } from "../../../shared/enums/color-palette";
import { Path } from "../../../shared/enums/path";
import { FormConstants } from "../../../shared/components/form/form-constants";
import { DATE_FORMAT_HINT, formatDateToString, getPreviousDate, today } from "../../../shared/helpers/date";
import { BooleanAsNumber } from "../../../shared/enums/boolean-as-number";
import { FormService } from "../../../shared/components/form/form.service";
import { unsubscribeForAll } from "../../../shared/helpers/manipulate";
import { InputType } from "../../../shared/enums/input-type";
import { InputMode } from "../../../shared/enums/input-mode";
import { InputLayout } from "../../../shared/enums/input-layout";
import { AutocompleteOptions } from "../../../shared/types/autocomplete";
import { ProductsService } from "../../products/products.service";
import { InputsService } from "../inputs.service";
import { SnackBarService } from "../../../core/snack-bar/snack-bar.service";
import { NewInput } from "../../../shared/types/input";

@Component({
    selector: 'app-inputs-new',
    templateUrl: './inputs-new.component.html',
    styleUrls: ['../../inputs-outputs/save/inputs-outputs-save.component.scss']
})
export class InputsNewComponent extends New implements OnInit, OnDestroy{
    submitting = false;
    buttonType = ButtonType
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    path = Path
    formConstants = FormConstants
    inputType = InputType
    inputMode = InputMode
    inputLayout = InputLayout
    yesterday = getPreviousDate()
    enteredSameDateAsCreatedValidators = [FormService.shouldBeBooleanAsNumberWithTrueValue]
    enteredSameDateAsCreatedLabel!: string
    dtEnteredValidators = [Validators.required]
    isRequiredDtEntered = false
    isDonationValidators = [FormService.shouldBeBooleanAsNumberWithTrueValue]
    unitPriceValidators = [Validators.required]
    isRequiredUnitPrice = true
    productOptions: AutocompleteOptions = []
    dateFormatHint = DATE_FORMAT_HINT

    form = this.formBuilder.group({
        productId: [{ value: this.formConstants.PRODUCT_ID_DEFAULT, disabled: true }, [Validators.required, FormService.notBe(this.formConstants.PRODUCT_ID_DEFAULT)]],
        productQuantity: [
            this.formConstants.INPUT_OUTPUT_DEFAULT_QUANTITY,
            [Validators.required, Validators.min(this.formConstants.INPUT_OUTPUT_MIN_QUANTITY), Validators.max(this.formConstants.INPUT_OUTPUT_MAX_QUANTITY)]
        ],
        unitPrice: [this.formConstants.UNIT_PRICE_MIN, this.unitPriceValidators],
        isDonation: [BooleanAsNumber.FALSE],
        hasProductExpiration: [BooleanAsNumber.FALSE],
        enteredSameDateAsCreated: [BooleanAsNumber.TRUE, this.enteredSameDateAsCreatedValidators],
        dtEntered: [{ value: null, disabled: true }],
        inputDescription: [null, Validators.maxLength(this.formConstants.INPUT_DESCRIPTION_MAXLENGTH)],
    });

    private subscriptions: Subscription[] = []
    private updateAndValidityOptions: { onlySelf?: boolean; emitEvent?: boolean; } = { emitEvent: false }

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private inputsService: InputsService,
        private snackBarService: SnackBarService,
        private router: Router,
    ){
        super()
    }

    ngOnInit(){
        this.enteredSameDateAsCreatedLabel = `Entrou na mesma data de cadastro (${formatDateToString(today())})`

        this.getProductOptions();
        this.watchEnteredSameDateAsCreatedChanges()
        this.watchIsDonationChanges()
    }

    submit(): void {
        this.submitting = true;

        const { enteredSameDateAsCreated, productQuantity, ...formValues } = this.form.getRawValue()

        this.inputsService
            .newItem({ ...formValues, productQuantity: +(productQuantity as number) } as NewInput)
            .pipe(finalize(() => this.submitting = false))
            .subscribe({
                next: () => {
                    this.snackBarService.open('Entrada cadastrada')
                    this.router.navigate([Path.DEFAULT, Path.INPUTS_OUTPUTS])
                },
                error: () => this.snackBarService.open('Tente novamente, não foi possível cadastrar essa entrada')
            })
    }

    ngOnDestroy(){
        unsubscribeForAll(this.subscriptions)
    }

    private getProductOptions(){
        this.productsService.getAutocompleteList(BooleanAsNumber.TRUE).subscribe(({ data: products }) => {
            const productIdControl = this.form.get('productId') as FormControl
            this.productOptions = products

            productIdControl.enable()
        })
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

            enteredSameDateAsCreatedControl.updateValueAndValidity(this.updateAndValidityOptions)
            dtEnteredControl.updateValueAndValidity(this.updateAndValidityOptions)
        })

        this.subscriptions.push(subscription);
    }

    private watchIsDonationChanges(){
        const isDonationControl = this.form.get('isDonation') as FormControl
        const unitPriceControl = this.form.get('unitPrice') as FormControl

        const subscription = isDonationControl.valueChanges.subscribe(value => {
            if(value){
                isDonationControl.addValidators(this.isDonationValidators)
                unitPriceControl.disable()
                unitPriceControl.removeValidators(this.unitPriceValidators)
                unitPriceControl.setValue(null)
                this.isRequiredUnitPrice = false;
            } else{
                isDonationControl.removeValidators(this.isDonationValidators)
                unitPriceControl.enable()
                unitPriceControl.addValidators(this.unitPriceValidators)
                unitPriceControl.setValue(this.formConstants.UNIT_PRICE_MIN)
                this.isRequiredUnitPrice = true;
            }

            isDonationControl.updateValueAndValidity(this.updateAndValidityOptions)
            unitPriceControl.updateValueAndValidity(this.updateAndValidityOptions)
        })

        this.subscriptions.push(subscription)
    }
}
