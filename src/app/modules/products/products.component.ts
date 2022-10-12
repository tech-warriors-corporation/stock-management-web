import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";

import { finalize, Subscription } from "rxjs";

import { ProductsService } from "./products.service";
import { List } from "../../shared/base/list";
import { Columns } from "../../shared/interfaces/table";
import { TableService } from "../../shared/components/table/table.service";
import { FormConstants } from "../../shared/components/form/form-constants";
import { ButtonLayout } from "../../shared/enums/button-layout";
import { Path } from "../../shared/enums/path";
import { ButtonOperation } from "../../shared/enums/button-operation";
import { ColorPalette } from "../../shared/enums/color-palette";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";
import { Product, Products } from "../../shared/types/product";
import { AutocompleteOptions } from "../../shared/types/autocomplete";
import { CategoriesService } from "../categories/categories.service";
import { Dictionary } from "../../shared/types/dictionary";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends List<Product> implements OnInit, Columns, OnDestroy{
    private getList$!: Subscription
    private deleteItem$!: Subscription

    protected page = 0
    protected readonly perPage = 20
    protected filters: Dictionary = {};

    loading = false;
    showMoreLoading = false;
    count = 0
    columns = ['productName', 'categoryName', 'actions']
    productIdThatIsDeleting: number | null = null
    categoriesOptions: AutocompleteOptions = []
    list: Products = [];
    formConstants = FormConstants
    buttonLayout = ButtonLayout
    buttonOperation = ButtonOperation
    path = Path
    colorPalette = ColorPalette

    form = this.formBuilder.group({
        productName: [null, Validators.maxLength(this.formConstants.PRODUCT_NAME_MAXLENGTH)],
        categoryId: [{ value: null, disabled: true }]
    })

    constructor(
        private productsService: ProductsService,
        public tableService: TableService,
        private formBuilder: FormBuilder,
        private snackBarService: SnackBarService,
        private categoriesService: CategoriesService,
    ){
        super()
    }

    private startListing(): void{
        this.page = 0
        this.get()
    }

    private getCategoriesOptions(){
        this.categoriesService
            .getAutocompleteList()
            .subscribe(({ data: categories }) => {
                const categoryIdControl = this.form.get('categoryId') as FormControl
                this.categoriesOptions = categories

                categoryIdControl.enable()
            })
    }

    protected get(): void{
        let { productName, categoryId } = this.filters

        if (!this.showMoreLoading) this.loading = true;
        if (this.getList$) this.getList$.unsubscribe()
        if (typeof categoryId !== 'number') categoryId = null

        this.getList$ = this.productsService
                            .getList(this.page, this.perPage, productName, categoryId)
                            .pipe(finalize(() => this.showMoreLoading = this.loading = false))
                            .subscribe({
                                next: ({ data, count }) => {
                                    this.list = this.page === 0 ? data : [...this.list, ...data]
                                    this.count = count as number
                                },
                                error: () => this.snackBarService.open('Ocorreu um problema ao carregar a lista de produtos')
                            })
    }

    ngOnInit(): void{
        this.startListing()
        this.getCategoriesOptions()
    }

    showMore(): void{
        this.page++;
        this.showMoreLoading = true;
        this.get()
    }

    submitForm(): void{
        this.filters = this.form.getRawValue()

        this.startListing()
    }

    delete(productId: number): void{
        this.productIdThatIsDeleting = productId
        this.deleteItem$ = this.productsService.deleteItem(this.productIdThatIsDeleting).pipe(finalize(() => this.productIdThatIsDeleting = null)).subscribe({
            next: () => {
                this.startListing()
                this.snackBarService.open('Produto deletado')
            },
            error: () => this.snackBarService.open('Ocorreu um problema ao deletar o produto'),
        })
    }

    ngOnDestroy(){
        this.getList$?.unsubscribe()
        this.deleteItem$?.unsubscribe()
    }
}
