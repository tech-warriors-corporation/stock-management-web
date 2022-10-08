import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
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
import { CategoriesService } from "../categories.service";
import { NewCategory } from "../../../shared/types/category";

@Component({
    selector: 'app-categories-new',
    templateUrl: './categories-new.component.html',
    styleUrls: ['../form/categories-form.component.scss']
})
export class CategoriesNewComponent extends New{
    formConstants = FormConstants
    buttonType = ButtonType
    path = Path
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    submitting = false
    form = this.formBuilder.group({ categoryName: [null, [Validators.required, Validators.maxLength(this.formConstants.CATEGORY_NAME_MAXLENGTH)]] })

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private snackBarService: SnackBarService,
        private router: Router
    ){
        super()
    }

    submit(): void{
        this.submitting = true;
        this.categoriesService
            .newItem(this.form.getRawValue() as any as NewCategory)
            .pipe(finalize(() => this.submitting = false))
            .subscribe({
                next: () => {
                    this.snackBarService.open('Categoria criada')
                    this.router.navigate([Path.DEFAULT, Path.CATEGORIES])
                },
                error: () => this.snackBarService.open('Tente novamente, não foi possível criar essa categoria')
            })
    }
}
