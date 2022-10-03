import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { finalize, Subscription } from "rxjs";

import { UsersService } from "./users.service";
import { User, Users } from "../../shared/types/user";
import { Base } from "../../shared/base/base";
import { Columns } from "../../shared/interfaces/table";
import { TableService } from "../../shared/components/table/table.service";
import { FormConstants } from "../../shared/components/form/form-constants";
import { ButtonLayout } from "../../shared/enums/button-layout";
import { Path } from "../../shared/enums/path";
import { ButtonOperation } from "../../shared/enums/button-operation";
import { BooleanAsNumber } from "../../shared/enums/boolean-as-number";
import { ColorPalette } from "../../shared/enums/color-palette";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent extends Base<User> implements OnInit, Columns, OnDestroy{
    loading = false;
    showMoreLoading = false;
    list: Users = [];
    columns = ['userName', 'email', 'isAdmin', 'actions']
    formConstants = FormConstants
    buttonLayout = ButtonLayout
    buttonOperation = ButtonOperation
    count = 0
    path = Path
    booleanAsNumber = BooleanAsNumber
    colorPalette = ColorPalette
    userIdThatIsDeleting: number | null = null

    form = this.formBuilder.group({
        userName: [null, Validators.maxLength(this.formConstants.USER_NAME_MAXLENGTH)],
        email: [null, Validators.maxLength(this.formConstants.EMAIL_MAXLENGTH)]
    })

    protected page = 0
    protected readonly perPage = 10

    private getList$!: Subscription
    private deleteItem$!: Subscription

    constructor(
        private usersService: UsersService,
        public tableService: TableService,
        private formBuilder: FormBuilder,
        private snackBarService: SnackBarService,
    ){
        super()
    }

    protected get(): void{
        const { userName, email } = this.form.getRawValue()

        if (!this.showMoreLoading) this.loading = true;
        if (this.getList$) this.getList$.unsubscribe()

        this.getList$ = this.usersService.getList(this.page, this.perPage, userName, email)
                                         .pipe(finalize(() => {
                                             this.loading = false
                                             this.showMoreLoading = false
                                         }))
                                         .subscribe(({ data, count }) => {
                                             this.list = this.page === 0 ? data : [...this.list, ...data]
                                             this.count = count as number
                                         })
    }

    private startListing(): void{
        this.page = 0
        this.get()
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
        this.startListing()
    }

    delete(userId: number): void{
        this.userIdThatIsDeleting = userId
        this.deleteItem$ = this.usersService.deleteItem(userId).pipe(finalize(() => this.userIdThatIsDeleting = null)).subscribe({
            next: () => {
                this.startListing()
                this.snackBarService.open('Usuário deletado')
            },
            error: () => this.snackBarService.open('Ocorreu um problema ao deletar o usuário'),
        })
    }

    ngOnDestroy(){
        this.getList$?.unsubscribe()
        this.deleteItem$?.unsubscribe()
    }
}
