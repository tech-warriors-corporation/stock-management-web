import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { finalize, take } from "rxjs";

import { FormConstants } from "../../../shared/components/form/form-constants";
import { ButtonType } from "../../../shared/enums/button-type";
import { Edit } from "../../../shared/base/edit";
import { Path } from "../../../shared/enums/path";
import { ButtonOperation } from "../../../shared/enums/button-operation";
import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ColorPalette } from "../../../shared/enums/color-palette";
import { SnackBarService } from "../../../core/snack-bar/snack-bar.service";
import { Product } from "../../../shared/types/product";
import { AutocompleteOptions } from "../../../shared/types/autocomplete";
import { ProductsService } from "../products.service";
import { CategoriesService } from "../../categories/categories.service";
import { BooleanAsNumber } from "../../../shared/enums/boolean-as-number";
import { InputType } from "../../../shared/enums/input-type";
import { InputMode } from "../../../shared/enums/input-mode";
import { NONE_VALUE } from "../../../shared/helpers/manipulate";

@Component({
    selector: 'app-products-edit',
    templateUrl: './products-edit.component.html',
    styleUrls: ['../form/products-form.component.scss']
})
export class ProductsEditComponent extends Edit<Product> implements OnInit{
    protected item!: Product;
    protected id!: number;

    submitting = false
    loading = false
    isCategoryIdDeleted = false
    categoriesOptions: AutocompleteOptions = []
    formConstants = FormConstants
    buttonType = ButtonType
    path = Path
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    inputType = InputType
    inputMode = InputMode

    form = this.formBuilder.group<{ productName: any[], categoryId: any[], quantity: any[] }>({
        productName: [NONE_VALUE, [Validators.required, Validators.maxLength(this.formConstants.PRODUCT_NAME_MAXLENGTH)]],
        categoryId: [null, Validators.required],
        quantity: [{ value: null, disabled: true }],
    })

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private productsService: ProductsService,
        private snackBarService: SnackBarService,
        private router: Router,
        private route: ActivatedRoute
    ){
        super()
    }

    private disableCategoryIdControl(): void{
        const categories = this.categoriesOptions

        if(!categories.length || !this.item) return

        this.isCategoryIdDeleted = this.item.categoryIsActive === BooleanAsNumber.FALSE

        if (this.isCategoryIdDeleted){
            const control = this.form.get('categoryId') as FormControl

            control.disable()
        }
    }

    private getCategoriesOptions(){
        this.categoriesService.getAutocompleteList(BooleanAsNumber.TRUE).subscribe(({ data: categories }) => {
            this.categoriesOptions = categories
            this.disableCategoryIdControl()
        })
    }

    protected get(){
        this.loading = true
        this.productsService
            .getItem(this.id)
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: ({ data }) => {
                    this.item = data

                    const { productName, categoryId, quantity } = this.item

                    this.form.patchValue({ productName, categoryId, quantity })
                    this.disableCategoryIdControl()
                },
                error: () => {
                    this.snackBarService.open('O produto não existe')
                    this.router.navigate([Path.DEFAULT, Path.PRODUCTS])
                }
            })
    }

    ngOnInit(){
        this.route.params.pipe(take(1)).subscribe(({ productId }) => {
            this.id = +productId
            this.get()
        })

        this.getCategoriesOptions()
    }

    get showCategoryId(): boolean{
        return !this.isCategoryIdDeleted && !!this.categoriesOptions.length
    }

    submit(): void{
        this.submitting = true;

        const { productName, categoryId } = this.form.getRawValue()

        this.productsService
            .editItem(this.id, { productName, categoryId })
            .pipe(finalize(() => this.submitting = false))
            .subscribe({
                next: () => {
                    this.snackBarService.open('Produto editado')
                    this.router.navigate([Path.DEFAULT, Path.PRODUCTS])
                },
                error: () => this.snackBarService.open('Tente novamente, não foi possível editar esse produto')
            })
    }
}
