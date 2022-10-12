import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { finalize } from "rxjs";

import { FormConstants } from "../../../shared/components/form/form-constants";
import { ButtonType } from "../../../shared/enums/button-type";
import { New } from "../../../shared/base/new";
import { Path } from "../../../shared/enums/path";
import { ButtonOperation } from "../../../shared/enums/button-operation";
import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ColorPalette } from "../../../shared/enums/color-palette";
import { SnackBarService } from "../../../core/snack-bar/snack-bar.service";
import { ProductsService } from "../products.service";
import { NewProduct } from "../../../shared/types/product";
import { AutocompleteOptions } from "../../../shared/types/autocomplete";
import { CategoriesService } from "../../categories/categories.service";
import { BooleanAsNumber } from "../../../shared/enums/boolean-as-number";

@Component({
    selector: 'app-products-new',
    templateUrl: './products-new.component.html',
    styleUrls: ['../form/products-form.component.scss']
})
export class ProductsNewComponent extends New implements OnInit{
    submitting = false
    categoriesOptions: AutocompleteOptions = []
    formConstants = FormConstants
    buttonType = ButtonType
    path = Path
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette

    form = this.formBuilder.group({
        productName: [null, [Validators.required, Validators.maxLength(this.formConstants.PRODUCT_NAME_MAXLENGTH)]],
        categoryId: [{ value: null, disabled: true }, Validators.required],
    })

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private snackBarService: SnackBarService,
        private router: Router,
        private categoriesService: CategoriesService,
    ){
        super()
    }

    private getCategoriesOptions(){
        this.categoriesService
            .getAutocompleteList(BooleanAsNumber.TRUE)
            .subscribe(({ data: categories }) => {
                const categoryIdControl = this.form.get('categoryId') as FormControl
                this.categoriesOptions = categories

                categoryIdControl.enable()
            })
    }

    ngOnInit() {
        this.getCategoriesOptions()
    }

    submit(): void{
        this.submitting = true;
        this.productsService
            .newItem(this.form.getRawValue() as any as NewProduct)
            .pipe(finalize(() => this.submitting = false))
            .subscribe({
                next: () => {
                    this.snackBarService.open('Produto criado')
                    this.router.navigate([Path.DEFAULT, Path.PRODUCTS])
                },
                error: () => this.snackBarService.open('Tente novamente, não foi possível criar esse produto')
            })
    }
}
