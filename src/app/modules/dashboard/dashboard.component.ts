import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { finalize, Subscription, zip } from "rxjs";
import { ChartType, GoogleChartComponent, Row } from "angular-google-charts";

import { DashboardCardFilter } from "../../shared/types/dashboard-card-filter";
import { InputsService } from "../inputs/inputs.service";
import { SnackBarService } from "../../core/snack-bar/snack-bar.service";
import { DashboardCardContentType } from "../../shared/enums/dashboard-card-content-type";
import { Colors } from "../../shared/enums/colors";
import { DashboardCardChart } from "../../shared/types/dashboard-card-chart";
import { MonthAbbreviation } from "../../shared/enums/month-abbreviation";
import { MenuService } from "../../core/menu/menu.service";
import { copy, unsubscribeForAll } from "../../shared/helpers/manipulate";
import { OutputsService } from "../outputs/outputs.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy{
    @ViewChild('inputsOutputsQuantityElement') inputsOutputsQuantityElement!: GoogleChartComponent;

    private readonly inputsOutputsQuantityColumns = ['Mês', 'Entradas', 'Saídas']
    private subscriptions: Subscription[] = []

    dashboardCardContentType = DashboardCardContentType
    inputsOutputsQuantityLoading = false
    productsDonatedAmount = 0
    productsDonatedLoading = false
    investedMoneyValue = 0
    investedMoneyLoading = false

    inputsOutputsQuantityChart: DashboardCardChart = {
        height: 600,
        dynamicResize: true,
        type: ChartType.ColumnChart,
        columns: this.inputsOutputsQuantityColumns,
        options: {
            legend: {
                position: 'top',
                alignment: 'center',
            },
            vAxis: {
                format: '0',
            },
            colors: [Colors.GREEN, Colors.ORANGE],
        },
        data: [
            [MonthAbbreviation.JANUARY, 0, 0],
            [MonthAbbreviation.FEBRUARY, 0, 0],
            [MonthAbbreviation.MARCH, 0, 0],
            [MonthAbbreviation.APRIL, 0, 0],
            [MonthAbbreviation.MAY, 0, 0],
            [MonthAbbreviation.JUNE, 0, 0],
            [MonthAbbreviation.JULY, 0, 0],
            [MonthAbbreviation.AUGUST, 0, 0],
            [MonthAbbreviation.SEPTEMBER, 0, 0],
            [MonthAbbreviation.OCTOBER, 0, 0],
            [MonthAbbreviation.NOVEMBER, 0, 0],
            [MonthAbbreviation.DECEMBER, 0, 0],
        ],
    }

    constructor(
        private inputsService: InputsService,
        private outputsService: OutputsService,
        private snackBarService: SnackBarService,
        private changeDetector: ChangeDetectorRef,
        private menuService: MenuService,
    ){}

    ngOnInit(){
        this.watchMenuToggle()
    }

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

    getInvestedMoney(filters: DashboardCardFilter){
        this.investedMoneyLoading = true

        this.inputsService
            .getInvestedMoney(filters)
            .pipe(finalize(() => this.investedMoneyLoading = false))
            .subscribe(
                ({ data }) => this.investedMoneyValue = data,
                () => this.snackBarService.open('Ocorreu um problema ao obter o valor investido nas entradas'),
            )
    }

    getInputsOutputsQuantity(filters: DashboardCardFilter){
        this.inputsOutputsQuantityLoading = true

        const data$ = zip(this.inputsService.getInputsQuantity(filters), this.outputsService.getOutputsQuantity(filters))

        data$.pipe(finalize(() => this.inputsOutputsQuantityLoading = false))
             .subscribe(
                 ([{ data: inputs }, { data: outputs }]) => {
                     const list: Row[] = copy(this.inputsOutputsQuantityChart.data)
                     const columns: string[] = copy(this.inputsOutputsQuantityColumns)

                     columns[1] = `${columns[1]} (${inputs.length})`
                     columns[2] = `${columns[2]} (${outputs.length})`

                     inputs.forEach(input => input.dtEntered = new Date(input.dtEntered))
                     outputs.forEach(output => output.dtExited = new Date(output.dtExited))

                     list.forEach((item, month) => {
                         let inputsInMonthQuantity = 0
                         let outputsInMonthQuantity = 0

                         inputs = inputs.filter(input => !(input.dtEntered.getMonth() === month && ++inputsInMonthQuantity))
                         outputs = outputs.filter(output => !(output.dtExited.getMonth() === month && ++outputsInMonthQuantity))

                         item[1] = inputsInMonthQuantity
                         item[2] = outputsInMonthQuantity
                     })

                     this.inputsOutputsQuantityChart = { ...this.inputsOutputsQuantityChart, data: list, columns }
                 },
                 () => this.snackBarService.open('Ocorreu um problema ao obter a quantidade de entradas e saídas'),
             )
             .add(() => this.drawChart(this.inputsOutputsQuantityElement))
    }

    ngOnDestroy(){
        unsubscribeForAll(this.subscriptions)
    }

    private drawChart(chart: GoogleChartComponent, ms = 0){
        setTimeout(() => {
            try{
                // @ts-ignore
                chart.drawChart()
            } catch(error){}
        }, ms)
    }

    private watchMenuToggle(){
        const subscription = this.menuService
                                 .watchToggle()
                                 .subscribe(() => this.drawChart(this.inputsOutputsQuantityElement, 500))

        this.subscriptions.push(subscription)
    }
}
