import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';

import { finalize } from "rxjs";

import { DashboardCardFilter } from "../../shared/types/dashboard-card-filter";
import { InputsService } from "../inputs/inputs.service";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit{
    productsDonatedAmount = 0
    productsDonatedLoading = false

    constructor(
        private inputsService: InputsService,
        private snackBarService: SnackBarService,
        private changeDetector: ChangeDetectorRef,
    ){}

    ngAfterViewInit(){
        this.changeDetector.detectChanges()
    }

    getProductsDonated(filters: DashboardCardFilter){
        this.productsDonatedLoading = true

        this.inputsService
            .getProductsDonated(filters)
            .pipe(finalize(() => this.productsDonatedLoading = false))
            .subscribe(
                ({ count }) => this.productsDonatedAmount = count as number,
                () => this.snackBarService.open('Ocorreu um problema ao obter a quantidade de produtos doados nas entradas'),
            )
    }
}
