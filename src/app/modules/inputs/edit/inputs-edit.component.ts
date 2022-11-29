import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { finalize, Subscription, take } from "rxjs";

import { Edit } from "../../../shared/base/edit";
import { Path } from "../../../shared/enums/path";
import { SnackBarService } from "../../../core/snack-bar/snack-bar.service";
import { EditInput, Input } from "../../../shared/types/input";
import { InputsService } from "../inputs.service";
import { ButtonType } from "../../../shared/enums/button-type";
import { ButtonOperation } from "../../../shared/enums/button-operation";
import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ColorPalette } from "../../../shared/enums/color-palette";
import { FormConstants } from "../../../shared/components/form/form-constants";
import { InputType } from "../../../shared/enums/input-type";
import { InputMode } from "../../../shared/enums/input-mode";
import { InputLayout } from "../../../shared/enums/input-layout";
import { BooleanAsNumber } from "../../../shared/enums/boolean-as-number";
import { formatDateToString, today } from "../../../shared/helpers/date";
import { AutocompleteOptions } from "../../../shared/types/autocomplete";
import { ProductsService } from "../../products/products.service";
import { FormService } from "../../../shared/components/form/form.service";
import { NONE_VALUE, unsubscribeForAll } from "../../../shared/helpers/manipulate";

@Component({
    selector: 'app-inputs-edit',
    templateUrl: './inputs-edit.component.html',
    styleUrls: ['../../inputs-outputs/save/inputs-outputs-save.component.scss']
})
export class InputsEditComponent extends Edit<Input> implements OnInit, OnDestroy{
    private subscriptions: Subscription[] = []
    private updateAndValidityOptions: { onlySelf?: boolean; emitEvent?: boolean; } = { emitEvent: false }
    private unitPriceValidators = [Validators.required]
    private isDonationValidators = [FormService.shouldBeBooleanAsNumberWithTrueValue]

    protected item!: Input;
    protected id!: number;

    buttonType = ButtonType
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    path = Path
    formConstants = FormConstants
    inputType = InputType
    inputMode = InputMode
    inputLayout = InputLayout
    submitting = false
    loading = false
    productOptions: AutocompleteOptions = []
    canNotEditControlHint = 'Esse campo não pode ser editado'
    isRequiredUnitPrice = true
    enteredSameDateAsCreatedDisabled = true
    enteredSameDateAsCreatedLabel!: string

    form = this.formBuilder.group({
        productId: [{ value: this.formConstants.PRODUCT_ID_DEFAULT, disabled: true }],
        productQuantity: [{ value: this.formConstants.INPUT_OUTPUT_DEFAULT_QUANTITY, disabled: true }],
        unitPrice: [this.formConstants.UNIT_PRICE_MIN, this.unitPriceValidators],
        isDonation: [BooleanAsNumber.FALSE],
        hasProductExpiration: [BooleanAsNumber.FALSE],
        enteredSameDateAsCreated: [{ value: BooleanAsNumber.TRUE, disabled: this.enteredSameDateAsCreatedDisabled }],
        dtEntered: [{ value: today(), disabled: true }],
        inputDescription: [NONE_VALUE, Validators.maxLength(this.formConstants.INPUT_DESCRIPTION_MAXLENGTH)],
    })

    constructor(
        private formBuilder: FormBuilder,
        private snackBarService: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        private inputsService: InputsService,
        private productsService: ProductsService,
    ){
        super()
    }

    protected get(){
        this.loading = true
        this.inputsService
            .getItem(this.id)
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: ({ data }) => {
                    this.item = data

                    let { dtCreated, dtEntered, hasProductExpiration, inputDescription, isDonation, product, productQuantity, unitPrice } = this.item

                    dtCreated = new Date(dtCreated)
                    dtEntered = new Date(dtEntered)

                    const dtCreatedAsText = formatDateToString(dtCreated)
                    const enteredSameDateAsCreated = dtCreatedAsText === formatDateToString(dtEntered) ? BooleanAsNumber.TRUE : BooleanAsNumber.FALSE

                    this.enteredSameDateAsCreatedLabel = `Entrou na mesma data de cadastro (${dtCreatedAsText})`

                    this.form.patchValue({
                        enteredSameDateAsCreated,
                        hasProductExpiration,
                        inputDescription,
                        isDonation,
                        productId: product.productId,
                        dtEntered: enteredSameDateAsCreated === BooleanAsNumber.TRUE ? null : dtEntered,
                        productQuantity,
                        unitPrice,
                    })
                },
                error: () => {
                    this.snackBarService.open('A entrada não existe')
                    this.router.navigate([Path.DEFAULT, Path.INPUTS_OUTPUTS])
                }
            })
    }

    ngOnInit(){
        this.route.params.pipe(take(1)).subscribe(({ inputId }) => {
            this.id = +inputId
            this.get()
        })

        this.getProductOptions();
        this.watchIsDonationChanges();
    }

    submit(): void{
        this.submitting = true;

        const { unitPrice, hasProductExpiration, isDonation, inputDescription } = this.form.getRawValue()

        this.inputsService
            .editItem(this.id, { unitPrice, hasProductExpiration, isDonation, inputDescription } as EditInput)
            .pipe(finalize(() => this.submitting = false))
            .subscribe({
                next: () => {
                    this.snackBarService.open('Entrada editada')
                    this.router.navigate([Path.DEFAULT, Path.INPUTS_OUTPUTS])
                },
                error: () => this.snackBarService.open('Tente novamente, não foi possível editar essa entrada')
            })
    }

    ngOnDestroy(){
        unsubscribeForAll(this.subscriptions)
    }

    private getProductOptions(){
        this.productsService
            .getAutocompleteList(BooleanAsNumber.TRUE)
            .subscribe(({ data: products }) => this.productOptions = products)
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
            } else{
                isDonationControl.removeValidators(this.isDonationValidators)
                unitPriceControl.enable()
                unitPriceControl.addValidators(this.unitPriceValidators)
                unitPriceControl.setValue(this.item.unitPrice ?? this.formConstants.UNIT_PRICE_MIN)
            }

            this.isRequiredUnitPrice = !value;

            isDonationControl.updateValueAndValidity(this.updateAndValidityOptions)
            unitPriceControl.updateValueAndValidity(this.updateAndValidityOptions)
        })

        this.subscriptions.push(subscription)
    }
}
