import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from "@angular/material/sidenav";

import { Subscription } from "rxjs";

import { MenuService } from "./menu.service";
import { MenuLink } from "../../shared/types/menu-link";
import { PageTitle } from "../../shared/enums/page-title";
import { Path } from "../../shared/enums/path";
import { ButtonLayout } from "../../shared/enums/button-layout";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit, OnInit{
    @ViewChild('drawer', { static: true }) drawer!: MatDrawer;

    buttonLayout = ButtonLayout
    drawerToggle$!: Subscription;
    items!: MenuLink[]

    private watchUserChanged$!: Subscription

    constructor(private menuService: MenuService, private authService: AuthService){}

    ngOnInit(){
        const list = [
            {
                text: PageTitle.DASHBOARD,
                href: `/${Path.DASHBOARD}`,
                icon: 'dashboard',
            },
            {
                text: PageTitle.INPUTS_OUTPUTS,
                href: `/${Path.INPUTS_OUTPUTS}`,
                icon: 'sync_alt',
            },
            {
                text: PageTitle.STOCK,
                href: `/${Path.STOCK}`,
                icon: 'inventory_2',
            },
            {
                text: PageTitle.PRODUCTS,
                href: `/${Path.PRODUCTS}`,
                icon: 'sanitizer',
            },
            {
                text: PageTitle.CATEGORIES,
                href: `/${Path.CATEGORIES}`,
                icon: 'list_alt',
            },
            {
                text: PageTitle.USERS,
                href: `/${Path.USERS}`,
                icon: 'groups',
            },
        ]

        this.watchUserChanged$ = this.authService.watchUserChanged().subscribe(() => this.items = list)
    }

    ngAfterViewInit(): void{
        this.drawerToggle$ = this.menuService.watchToggle().subscribe(() => this.drawer.toggle())
    }

    ngOnDestroy(): void{
        this.watchUserChanged$?.unsubscribe();
        this.drawerToggle$?.unsubscribe();
    }
}
