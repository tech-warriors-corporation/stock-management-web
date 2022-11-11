import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { UsersChangePasswordLayout } from "../../../shared/enums/users-change-password-layout";
import { Dictionary } from "../../../shared/types/dictionary";
import { LabelsControl } from "../../../shared/types/labels-control";
import { generateUniqueId } from "../../../shared/helpers/unique-id";
import { NONE_VALUE } from "../../../shared/helpers/manipulate";

@Component({
    selector: 'app-users-change-password',
    templateUrl: './users-change-password.component.html',
    styleUrls: ['./users-change-password.component.scss']
})
export class UsersChangePasswordComponent implements New, AfterViewInit, OnInit{
    buttonLayout = ButtonLayout
    buttonType = ButtonType
    formConstants = FormConstants
    inputType = InputType
    submitting = false;
    inputPasswordId = generateUniqueId()
    text!: string
    secondaryTitle!: string
    buttonText!: string
    hasClose!: boolean
    passwordConfirmationLabels!: LabelsControl

    form = this.formBuilder.group({
        userPassword: [
            NONE_VALUE,
            [
                Validators.minLength(this.formConstants.PASSWORD_MINLENGTH),
                Validators.maxLength(this.formConstants.PASSWORD_MAXLENGTH),
                FormService.shouldPasswordEqualsPasswordConfirmation('userPasswordConfirmation'),
            ]
        ],
        userPasswordConfirmation: [
            NONE_VALUE,
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

    private focusInputPassword(){
        setTimeout(() => {
            const input = document.getElementById(this.inputPasswordId) as HTMLInputElement

            input.focus()
        }, 1000)
    }

    private setLayout(text: string, secondaryTitle: string, buttonText: string, hasClose: boolean, passwordConfirmationLabel: string, passwordConfirmationPlaceholder: string){
        this.text = text
        this.secondaryTitle = secondaryTitle
        this.buttonText = buttonText
        this.hasClose = hasClose
        this.passwordConfirmationLabels = { label: passwordConfirmationLabel, placeholder: passwordConfirmationPlaceholder }
    }

    ngOnInit(){
        const { layout } = this.dialogService.getCurrentData() as Dictionary

        switch (layout){
            case UsersChangePasswordLayout.NORMAL:
                this.setLayout(
                    "Aqui você pode garantir a segurança da sua conta alterando a senha.",
                    "Alterar senha",
                    "Alterar para nova senha",
                    true,
                    "Repetir nova senha",
                    "Coloque a repetição da nova senha",
                )

                break;
            case UsersChangePasswordLayout.FIRST_TIME:
                this.setLayout(
                    "Como é seu primeiro login, você tem que trocar sua senha para poder seguir com segurança.",
                    "Trocar senha",
                    "Alterar senha",
                    false,
                    "Confirmação da nova senha",
                    "Coloque a confirmação da nova senha",
                )

                break;
        }

        this.focusInputPassword()
    }

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
