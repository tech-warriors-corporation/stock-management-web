import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
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
import { CategoriesService } from "../categories.service";
import { Category, EditCategory } from "../../../shared/types/category";

@Component({
    selector: 'app-categories-edit',
    templateUrl: './categories-edit.component.html',
    styleUrls: ['../form/categories-form.component.scss']
})
export class CategoriesEditComponent extends Edit<Category> implements OnInit{
    protected item!: Category;
    protected id!: number;

    formConstants = FormConstants
    buttonType = ButtonType
    path = Path
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    submitting = false
    loading = false
    form = this.formBuilder.group({ categoryName: ['', [Validators.required, Validators.maxLength(this.formConstants.CATEGORY_NAME_MAXLENGTH)]] })

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private snackBarService: SnackBarService,
        private router: Router,
        private route: ActivatedRoute
    ){
        super()
    }

    protected get(){
        this.loading = true
        this.categoriesService
            .getItem(this.id)
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: ({ data }) => {
                    this.item = data

                    const { categoryName } = this.item

                    this.form.patchValue({ categoryName })
                },
                error: () => {
                    this.snackBarService.open('A categoria não existe')
                    this.router.navigate([Path.DEFAULT, Path.CATEGORIES])
                }
            })
    }

    ngOnInit(){
        this.route.params.pipe(take(1)).subscribe(({ categoryId }) => {
            this.id = +categoryId
            this.get()
        })
    }

    submit(): void{
        this.submitting = true;
        this.categoriesService
            .editItem(this.id, this.form.getRawValue() as EditCategory)
            .pipe(finalize(() => this.submitting = false))
            .subscribe({
                next: () => {
                    this.snackBarService.open('Categoria editada')
                    this.router.navigate([Path.DEFAULT, Path.CATEGORIES])
                },
                error: () => this.snackBarService.open('Tente novamente, não foi possível editar essa categoria')
            })
    }
}
