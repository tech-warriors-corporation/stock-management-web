import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";

import { FullLoadingService } from "./full-loading.service";

@Component({
    selector: 'app-full-loading',
    templateUrl: './full-loading.component.html',
    styleUrls: ['./full-loading.component.scss']
})
export class FullLoadingComponent implements OnInit, OnDestroy{
    show = true;

    private showSubscription: Subscription | null = null;

    constructor(private fullLoadingService: FullLoadingService){}

    ngOnInit(): void{
        this.showSubscription = this.fullLoadingService.getShow().subscribe(show => this.show = show);
    }

    ngOnDestroy(): void{
        this.showSubscription?.unsubscribe();
    }
}
