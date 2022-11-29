import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { finalize, Subscription } from "rxjs";

import { New } from "../../../shared/base/new";
import { FormService } from "../../../shared/components/form/form.service";
import { FormConstants } from "../../../shared/components/form/form-constants";
import { BooleanAsNumber } from "../../../shared/enums/boolean-as-number";
import { DATE_FORMAT_HINT, formatDateToString, getPreviousDate, today } from "../../../shared/helpers/date";
import { AutocompleteOptions } from "../../../shared/types/autocomplete";
import { NONE_VALUE, unsubscribeForAll } from "../../../shared/helpers/manipulate";
import { ProductsService } from "../../products/products.service";
import { Path } from "../../../shared/enums/path";
import { SnackBarService } from "../../../core/snack-bar/snack-bar.service";
import { OutputsService } from "../outputs.service";
import { NewOutput } from "../../../shared/types/output";
import { ButtonOperation } from "../../../shared/enums/button-operation";
import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ColorPalette } from "../../../shared/enums/color-palette";
import { ButtonType } from "../../../shared/enums/button-type";
import { InputType } from "../../../shared/enums/input-type";
import { InputMode } from "../../../shared/enums/input-mode";

@Component({
    selector: 'app-outputs-new',
    templateUrl: './outputs-new.component.html',
    styleUrls: ['../../inputs-outputs/save/inputs-outputs-save.component.scss'],
})
export class OutputsNewComponent extends New implements OnInit, OnDestroy{
    submitting = false;
    formConstants = FormConstants
    path = Path
    buttonOperation = ButtonOperation
    buttonType = ButtonType
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    inputType = InputType
    inputMode = InputMode
    dateFormatHint = DATE_FORMAT_HINT
    productOptions: AutocompleteOptions = []
    yesterday = getPreviousDate()
    isRequiredDtExited = false
    dtExitedValidators = [Validators.required]
    exitedSameDateAsCreatedValidators = [FormService.shouldBeBooleanAsNumberWithTrueValue]
    exitedSameDateAsCreatedLabel!: string

    form = this.formBuilder.group({
        productId: [{ value: this.formConstants.PRODUCT_ID_DEFAULT, disabled: true }, [Validators.required, FormService.notBe(this.formConstants.PRODUCT_ID_DEFAULT)]],
        productQuantity: [
            this.formConstants.INPUT_OUTPUT_DEFAULT_QUANTITY,
            [Validators.required, Validators.min(this.formConstants.INPUT_OUTPUT_MIN_QUANTITY), Validators.max(this.formConstants.INPUT_OUTPUT_MAX_QUANTITY)]
        ],
        productWentTo: [NONE_VALUE, [Validators.required, Validators.maxLength(this.formConstants.PRODUCT_WENT_TO_MAXLENGTH)]],
        hasProductExpiration: [BooleanAsNumber.FALSE],
        exitedSameDateAsCreated: [BooleanAsNumber.TRUE, this.exitedSameDateAsCreatedValidators],
        dtExited: [{ value: null, disabled: true }],
        outputDescription: [null, Validators.maxLength(this.formConstants.OUTPUT_DESCRIPTION_MAXLENGTH)],
    });

    private subscriptions: Subscription[] = []
    private updateAndValidityOptions: { onlySelf?: boolean; emitEvent?: boolean; } = { emitEvent: false }

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private snackBarService: SnackBarService,
        private router: Router,
        private outputsService: OutputsService,
    ){
        super();
    }

    submit(): void {
        this.submitting = true;

        const { exitedSameDateAsCreated, productQuantity, ...formValues } = this.form.getRawValue()

        this.outputsService
            .newItem({ ...formValues, productQuantity: +(productQuantity as number) } as NewOutput)
            .pipe(finalize(() => this.submitting = false))
            .subscribe({
                next: () => {
                    this.snackBarService.open('Saída cadastrada')
                    this.router.navigate([this.path.DEFAULT, this.path.INPUTS_OUTPUTS])
                },
                error: ({ error }) => this.snackBarService.open(error.data || 'Tente novamente, não foi possível cadastrar essa saída')
            })
    }

    ngOnInit(){
        this.exitedSameDateAsCreatedLabel = `Saiu na mesma data de cadastro (${formatDateToString(today())})`

        this.getProductOptions();
        this.watchExitedSameDateAsCreatedChanges();
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

    private watchExitedSameDateAsCreatedChanges(){
        const exitedSameDateAsCreatedControl = this.form.get('exitedSameDateAsCreated') as FormControl
        const dtExitedControl = this.form.get('dtExited') as FormControl

        const subscription = exitedSameDateAsCreatedControl.valueChanges.subscribe(value => {
            if(value){
                exitedSameDateAsCreatedControl.addValidators(this.exitedSameDateAsCreatedValidators)
                dtExitedControl.disable()
                dtExitedControl.removeValidators(this.dtExitedValidators)
                dtExitedControl.setValue(null)
                this.isRequiredDtExited = false
            } else{
                exitedSameDateAsCreatedControl.removeValidators(this.exitedSameDateAsCreatedValidators)
                dtExitedControl.enable()
                dtExitedControl.addValidators(this.dtExitedValidators)
                this.isRequiredDtExited = true
            }

            exitedSameDateAsCreatedControl.updateValueAndValidity(this.updateAndValidityOptions)
            dtExitedControl.updateValueAndValidity(this.updateAndValidityOptions)
        })

        this.subscriptions.push(subscription);
    }
}
