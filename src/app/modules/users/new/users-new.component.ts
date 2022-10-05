import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { finalize } from "rxjs";

import { FormConstants } from "../../../shared/components/form/form-constants";
import { InputType } from "../../../shared/enums/input-type";
import { InputMode } from "../../../shared/enums/input-mode";
import { ButtonType } from "../../../shared/enums/button-type";
import { New } from "../../../shared/base/new";
import { Path } from "../../../shared/enums/path";
import { ButtonOperation } from "../../../shared/enums/button-operation";
import { FormService } from "../../../shared/components/form/form.service";
import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ColorPalette } from "../../../shared/enums/color-palette";
import { BooleanAsNumber } from "../../../shared/enums/boolean-as-number";
import { UsersService } from "../users.service";
import { NewUser } from "../../../shared/types/user";
import { SnackBarService } from "../../../core/snack-bar/snack-bar.service";

@Component({
    selector: 'app-users-new',
    templateUrl: './users-new.component.html',
    styleUrls: ['../form/users-form.component.scss']
})
export class UsersNewComponent extends New{
    inputType = InputType
    inputMode = InputMode
    formConstants = FormConstants
    buttonType = ButtonType
    path = Path
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    submitting = false

    form = this.formBuilder.group({
        userName: [null, [Validators.required, Validators.maxLength(this.formConstants.USER_NAME_MAXLENGTH)]],
        email: [null, [Validators.required, Validators.email, Validators.maxLength(this.formConstants.EMAIL_MAXLENGTH)]],
        userPassword: [
            null,
            [
                Validators.required,
                Validators.minLength(this.formConstants.PASSWORD_MINLENGTH),
                Validators.maxLength(this.formConstants.PASSWORD_MAXLENGTH),
                FormService.shouldPasswordEqualsPasswordConfirmation('userPasswordConfirmation'),
            ]
        ],
        userPasswordConfirmation: [
            null,
            [
                Validators.required,
                Validators.minLength(this.formConstants.PASSWORD_MINLENGTH),
                Validators.maxLength(this.formConstants.PASSWORD_MAXLENGTH),
                FormService.shouldPasswordEqualsPasswordConfirmation('userPassword'),
            ]
        ],
        isAdmin: [BooleanAsNumber.FALSE, Validators.required]
    })

    constructor(private formBuilder: FormBuilder, private userService: UsersService, private snackBarService: SnackBarService, private router: Router){
        super()
    }

    submit(): void{
        this.submitting = true;
        this.userService
            .newItem(this.form.getRawValue() as any as NewUser)
            .pipe(finalize(() => this.submitting = false))
            .subscribe({
                next: () => {
                    this.snackBarService.open('Usuário criado')
                    this.router.navigate([Path.DEFAULT, Path.USERS])
                },
                error: () => this.snackBarService.open('Tente novamente, não foi possível criar esse usuário')
            })
    }
}
