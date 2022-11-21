import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder } from "@angular/forms";

import { finalize, Subscription } from "rxjs";

import { InputsService } from "./inputs.service";
import { List } from "../../shared/base/list";
import { Columns } from "../../shared/interfaces/table";
import { TableService } from "../../shared/components/table/table.service";
import { FormConstants } from "../../shared/components/form/form-constants";
import { ButtonLayout } from "../../shared/enums/button-layout";
import { Path } from "../../shared/enums/path";
import { ButtonOperation } from "../../shared/enums/button-operation";
import { ColorPalette } from "../../shared/enums/color-palette";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";
import { AutocompleteOptions } from "../../shared/types/autocomplete";
import { Input as InputType, Inputs } from "../../shared/types/input";
import { BadgeColor } from "../../shared/enums/badge-color";
import { InputOutputFilter } from "../../shared/types/input-output";
import { InputsOutputsDescriptionService } from "../inputs-outputs/description/inputs-outputs-description.service";
import { ActivityType } from "../../shared/enums/activity-type";

@Component({
    selector: 'app-inputs',
    templateUrl: './inputs.component.html',
    styleUrls: ['./inputs.component.scss']
})
export class InputsComponent extends List<InputType> implements Columns, OnDestroy{
    @Input('filters')
    set setFilters(filters: InputOutputFilter){
        this.filters = filters
        this.startListing()
    }

    private getList$!: Subscription
    private deleteItem$!: Subscription

    protected readonly perPage = 10
    protected page = 0
    protected filters!: InputOutputFilter;

    loading = false;
    showMoreLoading = false;
    count = 0
    columns = ['product', 'productQuantity', 'totalPrice', 'hasProductExpiration', 'type', 'createdBy', 'dtEntered', 'dtCreated', 'actions']
    inputIdThatIsDeleting: number | null = null
    categoriesOptions: AutocompleteOptions = []
    list: Inputs = [];
    formConstants = FormConstants
    buttonLayout = ButtonLayout
    buttonOperation = ButtonOperation
    path = Path
    colorPalette = ColorPalette
    badgeColor = BadgeColor

    constructor(
        private inputsService: InputsService,
        public tableService: TableService,
        private formBuilder: FormBuilder,
        private snackBarService: SnackBarService,
        private inputsOutputsDescriptionService: InputsOutputsDescriptionService,
    ){
        super()
    }

    private startListing(): void{
        this.page = 0
        this.get()
    }

    protected get(): void{
        if (this.getList$) this.getList$.unsubscribe()
        if (!this.showMoreLoading) this.loading = true;

        this.getList$ = this.inputsService
                            .getList(this.page, this.perPage, this.filters)
                            .pipe(finalize(() => this.showMoreLoading = this.loading = false))
                            .subscribe({
                                next: ({ data, count }) => {
                                    this.list = this.page === 0 ? data : [...this.list, ...data]
                                    this.count = count as number
                                },
                                error: () => this.snackBarService.open('Ocorreu um problema ao carregar a lista de entradas')
                            })
    }

    showMore(): void{
        this.page++;
        this.showMoreLoading = true;
        this.get()
    }

    delete(inputId: number): void{
        this.inputIdThatIsDeleting = inputId
        this.deleteItem$ = this.inputsService.deleteItem(this.inputIdThatIsDeleting).pipe(finalize(() => this.inputIdThatIsDeleting = null)).subscribe({
            next: () => {
                this.startListing()
                this.snackBarService.open('Entrada deletada')
            },
            error: ({ error }) => this.snackBarService.open(error.data || 'Ocorreu um problema ao deletar a entrada'),
        })
    }

    openDescriptionDialog(input: InputType): void{
        this.inputsOutputsDescriptionService.openDialog(
            input.product.productName,
            input.inputDescription as string,
            ActivityType.INPUT
        )
    }

    ngOnDestroy(){
        this.getList$?.unsubscribe()
        this.deleteItem$?.unsubscribe()
    }
}
