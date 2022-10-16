import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ButtonType } from "../../../shared/enums/button-type";
import { New } from "../../../shared/base/new";
import { FormConstants } from "../../../shared/components/form/form-constants";
import { FormService } from "../../../shared/components/form/form.service";
import { InputType } from "../../../shared/enums/input-type";
import { ChangePasswordUser, User } from "../../../shared/types/user";
import { AuthLogin } from "../../../shared/types/auth";
import { SnackBarService } from "../../../core/snack-bar/snack-bar.service";
import { UsersService } from "../users.service";
import { AuthService } from "../../../core/auth/auth.service";
import { DialogService } from "../../../core/dialog/dialog.service";

@Component({
    selector: 'app-users-change-password',
    templateUrl: './users-change-password.component.html',
    styleUrls: ['./users-change-password.component.scss']
})
export class UsersChangePasswordComponent implements New, AfterViewInit{
    buttonLayout = ButtonLayout
    buttonType = ButtonType
    formConstants = FormConstants
    inputType = InputType
    submitting = false;

    form = this.formBuilder.group({
        userPassword: [
            '',
            [
                Validators.minLength(this.formConstants.PASSWORD_MINLENGTH),
                Validators.maxLength(this.formConstants.PASSWORD_MAXLENGTH),
                FormService.shouldPasswordEqualsPasswordConfirmation('userPasswordConfirmation'),
            ]
        ],
        userPasswordConfirmation: [
            '',
            [
                Validators.minLength(this.formConstants.PASSWORD_MINLENGTH),
                Validators.maxLength(this.formConstants.PASSWORD_MAXLENGTH),
                FormService.shouldPasswordEqualsPasswordConfirmation('userPassword'),
            ]
        ],
    })

    constructor(
        private formBuilder: FormBuilder,
        private snackBarService: SnackBarService,
        private router: Router,
        private userService: UsersService,
        private authService: AuthService,
        private dialogService: DialogService,
        private changeDetector: ChangeDetectorRef,
    ){}

    ngAfterViewInit(){
        this.changeDetector.detectChanges()
    }

    async submit(): Promise<void>{
        this.submitting = true;

        try {
            const { email, userId } = this.authService.user as User
            const { userPassword, userPasswordConfirmation } = this.form.getRawValue();

            await this.userService.changePassword(userId, { userPassword, userPasswordConfirmation } as ChangePasswordUser).toPromise()
            await this.authService.login({ email, userPassword } as AuthLogin).toPromise()

            this.snackBarService.open('Senha alterada')
            this.dialogService.close()
        } catch(error) {
            console.error(error)
            this.snackBarService.open('Tente novamente, não foi possível alterar a senha')
        } finally {
            this.submitting = false;
        }
    }
}
