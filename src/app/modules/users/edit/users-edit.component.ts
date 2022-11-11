import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { finalize, Subscription, take } from "rxjs";

import { FormConstants } from "../../../shared/components/form/form-constants";
import { InputType } from "../../../shared/enums/input-type";
import { InputMode } from "../../../shared/enums/input-mode";
import { ButtonType } from "../../../shared/enums/button-type";
import { Edit } from "../../../shared/base/edit";
import { Path } from "../../../shared/enums/path";
import { ButtonOperation } from "../../../shared/enums/button-operation";
import { FormService } from "../../../shared/components/form/form.service";
import { ButtonLayout } from "../../../shared/enums/button-layout";
import { ColorPalette } from "../../../shared/enums/color-palette";
import { BooleanAsNumber } from "../../../shared/enums/boolean-as-number";
import { UsersService } from "../users.service";
import { ChangePasswordUser, EditUser, User } from "../../../shared/types/user";
import { SnackBarService } from "../../../core/snack-bar/snack-bar.service";
import { AuthService } from "../../../core/auth/auth.service";
import { AuthLogin } from "../../../shared/types/auth";
import { NONE_VALUE } from "../../../shared/helpers/manipulate";

@Component({
    selector: 'app-users-edit',
    templateUrl: './users-edit.component.html',
    styleUrls: ['../form/users-form.component.scss']
})
export class UsersEditComponent extends Edit<User> implements OnDestroy, OnInit{
    private wantToChangePasswordControlChanges$!: Subscription

    protected item!: User;
    protected id!: number;

    inputType = InputType
    inputMode = InputMode
    formConstants = FormConstants
    buttonType = ButtonType
    path = Path
    buttonOperation = ButtonOperation
    buttonLayout = ButtonLayout
    colorPalette = ColorPalette
    submitting = false
    loading = false
    showPasswordFields = false

    form = this.formBuilder.group({
        userName: [NONE_VALUE, [Validators.required, Validators.maxLength(this.formConstants.USER_NAME_MAXLENGTH)]],
        email: [NONE_VALUE, [Validators.required, Validators.email, Validators.maxLength(this.formConstants.EMAIL_MAXLENGTH)]],
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
        isAdmin: [{ value: BooleanAsNumber.FALSE, disabled: true }, Validators.required],
        wantToChangePassword: [BooleanAsNumber.FALSE, Validators.required],
    })

    constructor(
        private formBuilder: FormBuilder,
        private userService: UsersService,
        private snackBarService: SnackBarService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private authService: AuthService,
    ){
        super()
    }

    protected get(){
        this.loading = true
        this.userService
            .getItem(this.id)
            .pipe(
                finalize(() => {
                    this.loading = false
                    this.changeDetector.detectChanges()
                })
            )
            .subscribe({
                next: ({ data }) => {
                    this.item = data

                    const { userName, email, isAdmin } = this.item

                    this.form.patchValue({ userName, email, isAdmin })
                },
                error: () => {
                    this.snackBarService.open('O usuário não existe')
                    this.router.navigate([Path.DEFAULT, Path.USERS])
                }
            })
    }

    ngOnInit(){
        this.watchWantToChangePasswordControlChanges()

        this.route.params.pipe(take(1)).subscribe(({ userId }) => {
            this.id = +userId
            this.get()
        })
    }

    async submit(): Promise<void>{
        this.submitting = true;

        try {
            const { userName, email, userPassword, userPasswordConfirmation, wantToChangePassword } = this.form.getRawValue();
            const currentUser = this.authService.user as User
            const isEditingCurrentUser = currentUser.userId === this.id

            await this.userService.editItem(this.id, { userName, email } as EditUser).toPromise()

            if (isEditingCurrentUser) await this.authService.login({ email, userPassword: currentUser.userPassword } as AuthLogin).toPromise()

            if (wantToChangePassword)
                await this.userService.changePassword(this.id, { userPassword, userPasswordConfirmation } as ChangePasswordUser).toPromise()

                if (isEditingCurrentUser) await this.authService.login({ email, userPassword } as AuthLogin).toPromise()

            this.snackBarService.open('Usuário editado')

            await this.router.navigate([Path.DEFAULT, Path.USERS])
        } catch(error) {
            console.error(error)
            this.snackBarService.open('Tente novamente, não foi possível editar esse usuário')
        } finally {
            this.submitting = false;
        }
    }

    ngOnDestroy(){
        this.wantToChangePasswordControlChanges$?.unsubscribe()
    }

    private watchWantToChangePasswordControlChanges(){
        const wantToChangePasswordControl = this.form.get('wantToChangePassword') as FormControl
        const userPasswordControl = this.form.get('userPassword') as FormControl
        const userPasswordConfirmationControl = this.form.get('userPasswordConfirmation') as FormControl

        this.wantToChangePasswordControlChanges$ = wantToChangePasswordControl.valueChanges.subscribe(value => {
            userPasswordControl.reset(NONE_VALUE)
            userPasswordConfirmationControl.reset(NONE_VALUE)

            this.showPasswordFields = value

            if(this.showPasswordFields){
                userPasswordControl.addValidators(Validators.required)
                userPasswordConfirmationControl.addValidators(Validators.required)
            } else{
                userPasswordControl.removeValidators(Validators.required)
                userPasswordConfirmationControl.removeValidators(Validators.required)
            }

            this.changeDetector.detectChanges()
        })
    }
}
