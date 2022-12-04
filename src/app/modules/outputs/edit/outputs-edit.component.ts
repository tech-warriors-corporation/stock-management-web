import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { finalize, take } from "rxjs";

import { Edit } from "../../../shared/base/edit";
import { EditOutput, Output } from "../../../shared/types/output";
import { AutocompleteOptions } from "../../../shared/types/autocomplete";
import { ProductsService } from "../../products/products.service";
import { SnackBarService } from "../../../core/snack-bar/snack-bar.service";
import { OutputsService } from "../outputs.service";
import { formatDateToString, today } from "../../../shared/helpers/date";
import { BooleanAsNumber } from "../../../shared/enums/boolean-as-number";
import { Path } from "../../../shared/enums/path";
import { NONE_VALUE } from "../../../shared/helpers/manipulate";
import { FormConstants } from "../../../shared/components/form/form-constants";
import { ButtonOperation } from "../../../shared/enums/button-operation";
import { ColorPalette } from "../../../shared/enums/color-palette";
import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ButtonType } from "../../../shared/enums/button-type";
import { InputType } from "../../../shared/enums/input-type";
import { InputMode } from "../../../shared/enums/input-mode";

@Component({
    selector: 'app-outputs-edit',
    templateUrl: './outputs-edit.component.html',
    styleUrls: ['../../inputs-outputs/save/inputs-outputs-save.component.scss'],
})
export class OutputsEditComponent extends Edit<Output> implements OnInit{
    protected item!: Output;
    protected id!: number;

    formConstants = FormConstants
    path = Path
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    buttonType = ButtonType
    inputType = InputType
    inputMode = InputMode
    productOptions: AutocompleteOptions = []
    submitting = false
    loading = false
    canNotEditControlHint = 'Esse campo não pode ser editado'
    exitedSameDateAsCreatedDisabled = true
    exitedSameDateAsCreatedLabel!: string

    form = this.formBuilder.group({
        productId: [{ value: this.formConstants.PRODUCT_ID_DEFAULT, disabled: true }],
        productQuantity: [{ value: this.formConstants.INPUT_OUTPUT_DEFAULT_QUANTITY, disabled: true }],
        productWentTo: [NONE_VALUE, [Validators.required, Validators.maxLength(this.formConstants.PRODUCT_WENT_TO_MAXLENGTH)]],
        hasProductExpiration: [BooleanAsNumber.FALSE],
        exitedSameDateAsCreated: [{ value: BooleanAsNumber.TRUE, disabled: this.exitedSameDateAsCreatedDisabled }],
        dtExited: [{ value: today(), disabled: true }],
        outputDescription: [NONE_VALUE, Validators.maxLength(this.formConstants.OUTPUT_DESCRIPTION_MAXLENGTH)],
    });

    constructor(
        private formBuilder: FormBuilder,
        private snackBarService: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        private outputsService: OutputsService,
        private productsService: ProductsService,
    ) {
        super();
    }

    ngOnInit() {
        this.route.params.pipe(take(1)).subscribe(({ outputId }) => {
            this.id = +outputId
            this.get()
        })

        this.getProductOptions();
    }

    submit(): void{
        this.submitting = true;

        const { outputDescription, hasProductExpiration, productWentTo } = this.form.getRawValue()

        this.outputsService
            .editItem(this.id, { outputDescription, hasProductExpiration, productWentTo } as EditOutput)
            .pipe(finalize(() => this.submitting = false))
            .subscribe({
                next: () => {
                    this.snackBarService.open('Saída editada')
                    this.router.navigate([Path.DEFAULT, Path.INPUTS_OUTPUTS])
                },
                error: () => this.snackBarService.open('Tente novamente, não foi possível editar essa saída')
            })
    }

    protected get(){
        this.loading = true
        this.outputsService
            .getItem(this.id)
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: ({ data }) => {
                    this.item = data

                    let { dtCreated, dtExited, hasProductExpiration, outputDescription, product, productQuantity, productWentTo } = this.item

                    dtCreated = new Date(dtCreated)
                    dtExited = new Date(dtExited)

                    const dtCreatedAsText = formatDateToString(dtCreated)
                    const exitedSameDateAsCreated = dtCreatedAsText === formatDateToString(dtExited) ? BooleanAsNumber.TRUE : BooleanAsNumber.FALSE

                    this.exitedSameDateAsCreatedLabel = `Saiu na mesma data de cadastro (${dtCreatedAsText})`

                    this.form.patchValue({
                        exitedSameDateAsCreated,
                        hasProductExpiration,
                        outputDescription,
                        productWentTo,
                        productId: product.productId,
                        dtExited: exitedSameDateAsCreated === BooleanAsNumber.TRUE ? null : dtExited,
                        productQuantity,
                    })
                },
                error: () => {
                    this.snackBarService.open('A saída não existe')
                    this.router.navigate([Path.DEFAULT, Path.INPUTS_OUTPUTS])
                }
            })
    }

    private getProductOptions(){
        this.productsService
            .getAutocompleteList()
            .subscribe(({ data: products }) => this.productOptions = products)
    }
}
