import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MatMenuTrigger } from "@angular/material/menu";

import { filter, Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { ButtonType } from "../../shared/enums/button-type";
import { MenuService } from "../menu/menu.service";
import { SupportService } from "../support/support.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
    @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

    title!: string
    userName!: string|null
    buttonType = ButtonType

    private data$!: Subscription
    private userChanged$!: Subscription
    private routerEvents$!: Subscription

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private menuService: MenuService,
        private router: Router,
        private supportService: SupportService,
    ){}

    private updateInfos(): void{
        let route: ActivatedRoute | null = this.route

        while (route?.firstChild) route = route.firstChild

        if (this.data$) this.data$.unsubscribe()

        this.data$ = route.data.subscribe(({ title }) => this.title = title)
        this.userName = this.authService.user?.userName || null
    }

    ngOnInit(): void{
        this.updateInfos();

        this.userChanged$ = this.authService.watchUserChanged().subscribe(() => this.updateInfos())
        this.routerEvents$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.updateInfos())
    }

    get isUserOptionsOpened(): boolean{
        return !!this.menuTrigger?.menuOpen
    }

    logout(){
        this.authService.logout()
    }

    toggleMenu(){
        this.menuService.emitToggle()
    }

    openSupportDialog(){
        this.supportService.openDialog()
    }

    ngOnDestroy(): void{
        this.data$?.unsubscribe()
        this.userChanged$?.unsubscribe()
        this.routerEvents$?.unsubscribe()
    }
}
