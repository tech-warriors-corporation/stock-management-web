import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { finalize } from "rxjs";

import { FormConstants } from "../../shared/components/form/form-constants";
import { InputMode } from "../../shared/enums/input-mode";
import { InputType } from "../../shared/enums/input-type";
import { ButtonType } from "../../shared/enums/button-type";
import { AuthService } from "../../core/auth/auth.service";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";
import { Path } from "../../shared/enums/path";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loading = false
    formConstants = FormConstants
    inputMode = InputMode
    inputType = InputType
    buttonType = ButtonType

    form: FormGroup = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email, Validators.maxLength(this.formConstants.EMAIL_MAXLENGTH)]],
        userPassword: [null, [Validators.required, Validators.minLength(this.formConstants.PASSWORD_MINLENGTH), Validators.maxLength(this.formConstants.PASSWORD_MAXLENGTH)]],
    });

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private snackBarService: SnackBarService,
        private router: Router
    ){}

    submit(): void {
        this.loading = true;

        this.authService.login(this.form.getRawValue()).pipe(finalize(() => this.loading = false)).subscribe({
            next: () => this.router.navigate([Path.DEFAULT, Path.DASHBOARD]),
            error: () => this.snackBarService.open('Dados de login inválidos')
        });
    }
}
