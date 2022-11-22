import { Component, Input, OnDestroy } from '@angular/core';

import { finalize, Subscription } from "rxjs";

import { List } from "../../shared/base/list";
import { Output, Outputs } from "../../shared/types/output";
import { Columns } from "../../shared/interfaces/table";
import { InputOutputFilter } from "../../shared/types/input-output";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";
import { OutputsService } from "./outputs.service";
import { ActivityType } from "../../shared/enums/activity-type";
import { InputsOutputsDescriptionService } from "../inputs-outputs/description/inputs-outputs-description.service";
import { TableService } from "../../shared/components/table/table.service";
import { Path } from "../../shared/enums/path";
import { ColorPalette } from "../../shared/enums/color-palette";
import { ButtonLayout } from "../../shared/enums/button-layout";
import { ButtonOperation } from "../../shared/enums/button-operation";
import { BadgeColor } from "../../shared/enums/badge-color";

@Component({
    selector: 'app-outputs',
    templateUrl: './outputs.component.html',
    styleUrls: ['./outputs.component.scss']
})
export class OutputsComponent extends List<Output> implements Columns, OnDestroy{
    @Input('filters')
    set setFilters(filters: InputOutputFilter){
        this.filters = filters
        this.startListing()
    }

    private getList$!: Subscription
    private deleteItem$!: Subscription

    protected filters!: InputOutputFilter;
    protected readonly perPage = 10
    protected page = 0

    outputIdThatIsDeleting!: number | null
    loading = false
    showMoreLoading = false
    count = 0
    columns = ['product', 'productQuantity', 'hasProductExpiration', 'productWentTo', 'type', 'createdBy', 'dtExited', 'dtCreated', 'actions']
    list: Outputs = []
    path = Path
    colorPalette = ColorPalette
    buttonLayout = ButtonLayout
    buttonOperation = ButtonOperation
    badgeColor = BadgeColor

    constructor(
        private snackBarService: SnackBarService,
        private outputsService: OutputsService,
        private inputsOutputsDescriptionService: InputsOutputsDescriptionService,
        public tableService: TableService,
    ){
        super();
    }

    private startListing(): void{
        this.page = 0
        this.get()
    }

    protected get(): void{
        if (this.getList$) this.getList$.unsubscribe()
        if (!this.showMoreLoading) this.loading = true;

        this.getList$ = this.outputsService
                            .getList(this.page, this.perPage, this.filters)
                            .pipe(finalize(() => this.showMoreLoading = this.loading = false))
                            .subscribe({
                                next: ({ data, count }) => {
                                    this.list = this.page === 0 ? data : [...this.list, ...data]
                                    this.count = count as number
                                },
                                error: () => this.snackBarService.open('Ocorreu um problema ao carregar a lista de saídas')
                            })
    }

    showMore(): void{
        this.page++;
        this.showMoreLoading = true;
        this.get()
    }

    delete(outputId: number): void{
        this.outputIdThatIsDeleting = outputId
        this.deleteItem$ = this.outputsService
                               .deleteItem(this.outputIdThatIsDeleting)
                               .pipe(finalize(() => this.outputIdThatIsDeleting = null))
                               .subscribe({
                                   next: () => {
                                       this.startListing()
                                       this.snackBarService.open('Saída deletada')
                                   },
                                   error: ({ error }) => this.snackBarService.open(error.data || 'Ocorreu um problema ao deletar a saída'),
                               })
    }

    openDescriptionDialog(output: Output): void{
        this.inputsOutputsDescriptionService.openDialog(
            output.product.productName,
            output.outputDescription as string,
            ActivityType.OUTPUT,
        )
    }

    ngOnDestroy(){
        this.getList$?.unsubscribe()
        this.deleteItem$?.unsubscribe()
    }
}
