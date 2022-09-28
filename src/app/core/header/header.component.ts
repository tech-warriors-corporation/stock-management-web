import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatMenuTrigger } from "@angular/material/menu";

import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
    @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

    title!: string
    userName!: string|null

    private data$!: Subscription

    constructor(private authService: AuthService, private route: ActivatedRoute){}

    ngOnInit(): void{
        this.userName = this.authService.user?.userName || null
        this.data$ = this.route.data.subscribe(({ title }) => this.title = title)
    }

    get isUserOptionsOpened(): boolean{
        return !!this.menuTrigger?.menuOpen
    }

    logout(){
        this.authService.logout()
    }

    ngOnDestroy(): void{
        this.data$?.unsubscribe()
    }
}
