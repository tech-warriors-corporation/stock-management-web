import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from "@angular/material/sidenav";
import { NavigationEnd, Router } from "@angular/router";

import { filter, Subscription } from "rxjs";

import { MenuService } from "./menu.service";
import { MenuLink } from "../../shared/types/menu-link";
import { PageTitle } from "../../shared/enums/page-title";
import { Path } from "../../shared/enums/path";
import { ButtonLayout } from "../../shared/enums/button-layout";
import { AuthService } from "../auth/auth.service";
import { SupportService } from "../support/support.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit, OnInit{
    @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

    buttonLayout = ButtonLayout
    path = Path
    drawerToggle$!: Subscription;
    items!: MenuLink[]

    private routerEvents$!: Subscription
    private watchUserChanged$!: Subscription

    constructor(
        private menuService: MenuService,
        private authService: AuthService,
        private router: Router,
        private supportService: SupportService,
    ){}

    private updateRoutes(): void{
        this.items = [
            {
                text: PageTitle.DASHBOARD,
                href: this.path.DASHBOARD,
                icon: 'dashboard',
            },
            {
                text: PageTitle.INPUTS_OUTPUTS,
                href: this.path.INPUTS_OUTPUTS,
                icon: 'sync_alt',
            },
            {
                text: PageTitle.PRODUCTS,
                href: this.path.PRODUCTS,
                icon: 'sanitizer',
            },
            {
                text: PageTitle.CATEGORIES,
                href: this.path.CATEGORIES,
                icon: 'list_alt',
            },
            {
                text: PageTitle.USERS,
                href: this.path.USERS,
                icon: 'groups',
            },
        ]
    }

    ngOnInit(){
        this.updateRoutes()

        this.routerEvents$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => this.updateRoutes())
        this.watchUserChanged$ = this.authService.watchUserChanged().subscribe(() => this.updateRoutes())
    }

    ngAfterViewInit(): void{
        this.drawerToggle$ = this.menuService.watchToggle().subscribe(() => this.drawer.toggle())
    }

    openSupportDialog(){
        this.supportService.openDialog()
    }

    ngOnDestroy(): void{
        this.routerEvents$?.unsubscribe();
        this.watchUserChanged$?.unsubscribe();
        this.drawerToggle$?.unsubscribe();
    }
}
