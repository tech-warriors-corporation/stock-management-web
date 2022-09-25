import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";

import { FullLoadingService } from "./full-loading.service";

@Component({
    selector: 'app-full-loading',
    templateUrl: './full-loading.component.html',
    styleUrls: ['./full-loading.component.scss']
})
export class FullLoadingComponent implements OnInit, OnDestroy{
    show = false;

    private showSubscription: Subscription | null = null;

    constructor(private fullLoadingService: FullLoadingService, private changeDetector: ChangeDetectorRef){}

    ngOnInit(): void{
        this.showSubscription = this.fullLoadingService.getShow().subscribe(show => {
            this.show = show;
            this.changeDetector.detectChanges();
        });
    }

    ngOnDestroy(): void{
        this.showSubscription?.unsubscribe();
    }
}
