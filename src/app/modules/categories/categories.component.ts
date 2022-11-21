import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { finalize, Subscription } from "rxjs";

import { CategoriesService } from "./categories.service";
import { Category, Categories } from "../../shared/types/category";
import { List } from "../../shared/base/list";
import { Columns } from "../../shared/interfaces/table";
import { TableService } from "../../shared/components/table/table.service";
import { FormConstants } from "../../shared/components/form/form-constants";
import { ButtonLayout } from "../../shared/enums/button-layout";
import { Path } from "../../shared/enums/path";
import { ButtonOperation } from "../../shared/enums/button-operation";
import { ColorPalette } from "../../shared/enums/color-palette";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";
import { Dictionary } from "../../shared/types/dictionary";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends List<Category> implements OnInit, Columns, OnDestroy{
    loading = false;
    showMoreLoading = false;
    list: Categories = [];
    count = 0
    columns = ['categoryName', 'actions']
    formConstants = FormConstants
    buttonLayout = ButtonLayout
    buttonOperation = ButtonOperation
    path = Path
    colorPalette = ColorPalette
    form = this.formBuilder.group({ categoryName: [null, Validators.maxLength(this.formConstants.CATEGORY_NAME_MAXLENGTH)] })
    categoryIdThatIsDeleting: number | null = null

    protected page = 0
    protected readonly perPage = 10
    protected filters: Dictionary = {}

    private getList$!: Subscription
    private deleteItem$!: Subscription

    constructor(
        private categoriesService: CategoriesService,
        public tableService: TableService,
        private formBuilder: FormBuilder,
        private snackBarService: SnackBarService,
    ){
        super()
    }

    private startListing(): void{
        this.page = 0
        this.get()
    }

    protected get(): void{
        const { categoryName } = this.filters

        if (this.getList$) this.getList$.unsubscribe()
        if (!this.showMoreLoading) this.loading = true;

        this.getList$ = this.categoriesService
                            .getList(this.page, this.perPage, categoryName)
                            .pipe(finalize(() => this.showMoreLoading = this.loading = false))
                            .subscribe({
                                next: ({ data, count }) => {
                                    this.list = this.page === 0 ? data : [...this.list, ...data]
                                    this.count = count as number
                                },
                                error: () => this.snackBarService.open('Ocorreu um problema ao carregar a lista de categorias')
                            })
    }

    ngOnInit(): void{
        this.startListing()
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

    delete(categoryId: number): void{
        this.categoryIdThatIsDeleting = categoryId
        this.deleteItem$ = this.categoriesService.deleteItem(this.categoryIdThatIsDeleting).pipe(finalize(() => this.categoryIdThatIsDeleting = null)).subscribe({
            next: () => {
                this.startListing()
                this.snackBarService.open('Categoria deletada')
            },
            error: () => this.snackBarService.open('Ocorreu um problema ao deletar a categoria'),
        })
    }

    ngOnDestroy(){
        this.getList$?.unsubscribe()
        this.deleteItem$?.unsubscribe()
    }
}
